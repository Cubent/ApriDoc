import fontkit from '@pdf-lib/fontkit';
import { PDFDocument, StandardFonts, rgb, type PDFFont } from 'pdf-lib';
import type { P7mResult } from './p7m';
import { makePdfA } from './pdfa';

const A4: [number, number] = [595.28, 841.89];
const MARGIN = 36;
const AUTHOR = 'ApriDoc.com';

export type ConvertOptions = {
  /** Produce an archival PDF/A-2b file (fonts embedded, XMP metadata, sRGB output intent). */
  pdfa: boolean;
  /** Prepend a page with the signer and certificate details. */
  cover: boolean;
  /** Print "Pagina n di N" at the foot of every page. */
  pageNumbers: boolean;
  /** Where to get the embedded font from (PDF/A only). Defaults to the copy served by the site. */
  loadFont?: () => Promise<Uint8Array>;
};

/** Whether the document inside a P7M can be turned into a PDF (PDFs already are one). */
export const canConvertToPdf = (r: P7mResult) =>
  r.kind === 'xml' || r.kind === 'text' || (r.kind === 'image' && /^image\/(png|jpe?g)$/.test(r.mime));

const defaultFont = async () => new Uint8Array(await (await fetch('/fonts/DejaVuSansMono.ttf')).arrayBuffer());

const day = (d: Date) => d.toLocaleDateString('it-IT');

function coverLines(r: P7mResult): string[] {
  const signers = r.signers.filter((s) => s.isSigner);
  const shown = signers.length ? signers : r.signers.slice(0, 1);
  const out = ['Riepilogo della firma digitale', '', `Documento: ${r.fileName}`];
  if (r.signingTime) out.push(`Data di firma: ${r.signingTime.toLocaleString('it-IT')}`);
  if (r.digestAlgorithm) out.push(`Algoritmo di hash: ${r.digestAlgorithm}`);
  shown.forEach((s, i) => {
    out.push('', shown.length > 1 ? `Firmatario ${i + 1}` : 'Firmatario');
    out.push(`  Nome: ${s.commonName}`);
    if (s.organization && s.organization !== s.commonName) out.push(`  Organizzazione: ${s.organization}`);
    if (s.country) out.push(`  Paese: ${s.country}`);
    out.push(`  Emesso da: ${s.issuer}`);
    out.push(`  Validità: dal ${day(s.notBefore)} al ${day(s.notAfter)}`);
    out.push(`  Numero seriale: ${s.serialHex}`);
  });
  out.push('', 'Generato da ApriDoc.com. Il file non è stato verificato crittograficamente.');
  return out;
}

export async function convertToPdf(r: P7mResult, opts: ConvertOptions): Promise<Uint8Array> {
  const created = new Date();
  const doc = await PDFDocument.create({ updateMetadata: false });
  doc.registerFontkit(fontkit);

  // PDF/A forbids non-embedded fonts, so it gets a real TrueType font; otherwise the built-in Courier is enough.
  const font: PDFFont = opts.pdfa
    ? await doc.embedFont(await (opts.loadFont ?? defaultFont)(), { subset: true })
    : await doc.embedFont(StandardFonts.Courier);
  const clean = (s: string) =>
    s.replace(/\t/g, '    ').replace(
      opts.pdfa ? /[^\n\r\x20-\x7E\xA0-￿]/g : /[^\n\r\x20-\x7E\xA0-\xFF]/g,
      '?',
    );

  const size = 9;
  const lineHeight = 12;
  const charWidth = font.widthOfTextAtSize('M', size);
  const perLine = Math.floor((A4[0] - MARGIN * 2) / charWidth);
  const perPage = Math.floor((A4[1] - MARGIN * 2 - 14) / lineHeight);
  const ink = rgb(0.12, 0.14, 0.19);

  const textPages = (lines: string[]) => {
    const wrapped: string[] = [];
    for (const raw of lines) {
      if (!raw) wrapped.push('');
      for (let i = 0; i < raw.length; i += perLine) wrapped.push(raw.slice(i, i + perLine));
    }
    for (let start = 0; start < Math.max(wrapped.length, 1); start += perPage) {
      const page = doc.addPage(A4);
      wrapped.slice(start, start + perPage).forEach((line, i) => {
        page.drawText(line, { x: MARGIN, y: A4[1] - MARGIN - (i + 1) * lineHeight, size, font, color: ink });
      });
    }
  };

  if (opts.cover) textPages(coverLines(r).map(clean));

  if (r.kind === 'image') {
    const img = r.mime === 'image/png' ? await doc.embedPng(r.bytes) : await doc.embedJpg(r.bytes);
    const [W, H] = A4;
    const scale = Math.min((W - MARGIN * 2) / img.width, (H - MARGIN * 2) / img.height, 1);
    const w = img.width * scale;
    const h = img.height * scale;
    doc.addPage(A4).drawImage(img, { x: (W - w) / 2, y: (H - h) / 2, width: w, height: h });
  } else {
    textPages(clean(new TextDecoder('utf-8').decode(r.bytes)).split(/\r?\n/));
  }

  if (opts.pageNumbers) {
    const pages = doc.getPages();
    pages.forEach((page, i) => {
      const label = `Pagina ${i + 1} di ${pages.length}`;
      const w = font.widthOfTextAtSize(label, 8);
      page.drawText(label, { x: (A4[0] - w) / 2, y: 20, size: 8, font, color: rgb(0.45, 0.48, 0.55) });
    });
  }

  if (opts.pdfa) makePdfA(doc, { title: r.fileName, author: AUTHOR, created });
  return doc.save({ useObjectStreams: !opts.pdfa });
}
