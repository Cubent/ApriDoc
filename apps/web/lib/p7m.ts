import * as asn1js from 'asn1js';
import { dnKey, pair } from './dn';
import { Certificate, ContentInfo, SignedData } from 'pkijs';

export type P7mSigner = {
  commonName: string;
  organization?: string;
  country?: string;
  serialHex: string;
  serialNumber?: string;
  issuer: string;
  issuerOrg?: string;
  issuerCn?: string;
  issuerDn: string;
  notBefore: Date;
  notAfter: Date;
  isSigner: boolean;
};

export type P7mResult = {
  bytes: Uint8Array;
  fileName: string;
  mime: string;
  kind: 'pdf' | 'image' | 'xml' | 'text' | 'other';
  signers: P7mSigner[];
  signingTime?: Date;
  digestAlgorithm?: string;
  p7mSize: number;
  layers: number;
};

const DIGESTS: Record<string, string> = {
  '1.3.14.3.2.26': 'SHA-1',
  '2.16.840.1.101.3.4.2.1': 'SHA-256',
  '2.16.840.1.101.3.4.2.2': 'SHA-384',
  '2.16.840.1.101.3.4.2.3': 'SHA-512',
};

const OID_NAMES: Record<string, string> = {
  '2.5.4.3': 'CN',
  '2.5.4.10': 'O',
  '2.5.4.5': 'SERIAL',
  '2.5.4.6': 'C',
};

const bufOf = (u: Uint8Array): ArrayBuffer =>
  u.buffer.slice(u.byteOffset, u.byteOffset + u.byteLength) as ArrayBuffer;

/** P7M files are usually raw DER/BER, but some are PEM or base64 text. */
function normalise(input: Uint8Array): Uint8Array {
  if (input[0] === 0x30) return input;
  const text = new TextDecoder('latin1').decode(input.subarray(0, Math.min(input.length, 2_000_000)));
  const stripped = text.replace(/-----(BEGIN|END)[^-]+-----/g, '').replace(/\s+/g, '');
  if (stripped.length > 8 && /^[A-Za-z0-9+/=]+$/.test(stripped)) {
    try {
      const bin = atob(stripped);
      const out = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
      return out;
    } catch {
      /* fall through */
    }
  }
  return input;
}

const hex = (u: Uint8Array) => Array.from(u, (x) => x.toString(16).padStart(2, '0')).join('');

function octets(os: any): Uint8Array {
  if (os.idBlock?.isConstructed && Array.isArray(os.valueBlock?.value)) {
    const parts = os.valueBlock.value.map(octets) as Uint8Array[];
    const out = new Uint8Array(parts.reduce((n, p) => n + p.length, 0));
    let o = 0;
    for (const p of parts) {
      out.set(p, o);
      o += p.length;
    }
    return out;
  }
  return new Uint8Array(os.valueBlock.valueHexView);
}

function rdn(name: any): Record<string, string> {
  const out: Record<string, string> = {};
  for (const tv of name.typesAndValues ?? []) {
    const key = OID_NAMES[tv.type] ?? tv.type;
    if (!out[key]) out[key] = String(tv.value.valueBlock.value);
  }
  return out;
}

function parseOnce(input: Uint8Array) {
  const data = normalise(input);
  const asn1 = asn1js.fromBER(bufOf(data));
  if (asn1.offset === -1) throw new Error('Il file non è una busta firmata valida (.p7m).');

  let signedData: SignedData;
  try {
    const ci = new ContentInfo({ schema: asn1.result });
    signedData = new SignedData({ schema: ci.content });
  } catch {
    throw new Error('Il file non contiene una firma digitale PKCS#7/CAdES leggibile.');
  }

  const eContent = signedData.encapContentInfo.eContent;
  if (!eContent) {
    throw new Error(
      'Firma “detached”: il documento originale non è contenuto nel file .p7m (è in un file separato).'
    );
  }

  const content = octets(eContent);

  const signerSerials = new Set<string>();
  let signingTime: Date | undefined;
  let digestAlgorithm: string | undefined;
  for (const si of signedData.signerInfos) {
    const oid = si.digestAlgorithm?.algorithmId;
    if (oid && !digestAlgorithm) digestAlgorithm = DIGESTS[oid] ?? oid;
    const sid: any = si.sid;
    if (sid?.serialNumber) {
      signerSerials.add(hex(new Uint8Array(sid.serialNumber.valueBlock.valueHexView)));
    }
    for (const attr of si.signedAttrs?.attributes ?? []) {
      if (attr.type === '1.2.840.113549.1.9.5' && attr.values[0]) {
        const v: any = attr.values[0];
        const d = v.toDate?.();
        if (d instanceof Date && !Number.isNaN(d.getTime())) signingTime = d;
      }
    }
  }

  const signers: P7mSigner[] = [];
  for (const c of signedData.certificates ?? []) {
    if (!(c instanceof Certificate)) continue;
    const subject = rdn(c.subject);
    const issuer = rdn(c.issuer);
    const serialHex = hex(new Uint8Array(c.serialNumber.valueBlock.valueHexView));
    signers.push({
      commonName: subject.CN ?? subject.O ?? 'Sconosciuto',
      organization: subject.O,
      country: subject.C,
      serialHex,
      serialNumber: subject.SERIAL,
      issuer: issuer.CN ?? issuer.O ?? 'Sconosciuto',
      issuerOrg: issuer.O,
      issuerCn: issuer.CN,
      issuerDn: dnKey(
        (c.issuer.typesAndValues ?? []).map((tv: any) => pair(tv.type, String(tv.value.valueBlock.value)))
      ),
      notBefore: c.notBefore.value,
      notAfter: c.notAfter.value,
      isSigner: signerSerials.has(serialHex),
    });
  }

  return { content, signers, signingTime, digestAlgorithm };
}

function sniff(b: Uint8Array): { mime: string; ext: string; kind: P7mResult['kind'] } {
  const head = (n: number) => String.fromCharCode(...b.subarray(0, n));
  if (head(4) === '%PDF') return { mime: 'application/pdf', ext: 'pdf', kind: 'pdf' };
  if (b[0] === 0xff && b[1] === 0xd8) return { mime: 'image/jpeg', ext: 'jpg', kind: 'image' };
  if (head(4) === '\x89PNG') return { mime: 'image/png', ext: 'png', kind: 'image' };
  if (head(2) === 'PK') return { mime: 'application/zip', ext: 'zip', kind: 'other' };
  const start = new TextDecoder('utf-8').decode(b.subarray(0, 200)).trimStart();
  if (start.startsWith('<?xml') || start.startsWith('<p:Fattura') || start.startsWith('<')) {
    return { mime: 'application/xml', ext: 'xml', kind: 'xml' };
  }
  try {
    const sample = new TextDecoder('utf-8', { fatal: true }).decode(b.subarray(0, 4000));
    const binary = Array.from(sample).some((ch) => {
      const c = ch.charCodeAt(0);
      return c < 9 || (c > 13 && c < 32);
    });
    if (!binary) return { mime: 'text/plain', ext: 'txt', kind: 'text' };
  } catch {
    /* not text */
  }
  return { mime: 'application/octet-stream', ext: 'bin', kind: 'other' };
}

export function extractP7m(input: Uint8Array, originalName: string): P7mResult {
  let current = input;
  let layers = 0;
  let signers: P7mSigner[] = [];
  let signingTime: Date | undefined;
  let digestAlgorithm: string | undefined;

  // Documents can be signed more than once (nested envelopes): unwrap them all.
  for (let i = 0; i < 8; i++) {
    const r = parseOnce(current);
    layers++;
    signers = [...signers, ...r.signers];
    signingTime = signingTime ?? r.signingTime;
    digestAlgorithm = digestAlgorithm ?? r.digestAlgorithm;
    current = r.content;
    if (current[0] !== 0x30) break;
    try {
      parseOnce(current);
    } catch {
      break;
    }
  }

  const type = sniff(current);
  let fileName = originalName.replace(/\.p7m$/i, '');
  if (!/\.[A-Za-z0-9]{2,5}$/.test(fileName)) fileName += `.${type.ext}`;
  // If name still ends with .p7m after stripping (e.g. file.pdf.p7m.p7m) the loop above handled it.
  return { bytes: current, fileName, mime: type.mime, kind: type.kind, signers, signingTime, digestAlgorithm, p7mSize: input.length, layers };
}
