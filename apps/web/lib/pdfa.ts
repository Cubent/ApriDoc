import { PDFDocument, PDFHexString, PDFName, PDFString } from 'pdf-lib';

// PDF/A-2b needs: embedded fonts, XMP metadata that matches the Info dictionary,
// and an output intent with an ICC colour profile. This file covers the last two.

const fixed = (v: number) => Math.round(v * 65536);

/** A small matrix/TRC sRGB profile (ICC v2.1), built here so no binary asset has to ship. */
function srgbProfile(): Uint8Array {
  const tag = (sig: string, data: number[]) => ({ sig, data });
  const u32 = (n: number) => [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255];
  const ascii = (s: string) => Array.from(s, (c) => c.charCodeAt(0));
  const xyz = (x: number, y: number, z: number) => [...ascii('XYZ '), ...u32(0), ...u32(fixed(x)), ...u32(fixed(y)), ...u32(fixed(z))];
  const text = (s: string) => [...ascii('text'), ...u32(0), ...ascii(s), 0];

  const name = 'sRGB IEC61966-2.1';
  const desc = [
    ...ascii('desc'), ...u32(0), ...u32(name.length + 1), ...ascii(name), 0,
    ...u32(0), ...u32(0), 0, 0, 0, ...new Array(67).fill(0),
  ];
  // gamma 2.2 as u8Fixed8
  const trc = [...ascii('curv'), ...u32(0), ...u32(1), 0x02, 0x33];

  const tags = [
    tag('cprt', text('Public domain')),
    tag('desc', desc),
    tag('wtpt', xyz(0.9642, 1.0, 0.8249)),
    tag('rXYZ', xyz(0.4360747, 0.2225045, 0.0139322)),
    tag('gXYZ', xyz(0.3850649, 0.7168786, 0.0971045)),
    tag('bXYZ', xyz(0.1430804, 0.0606169, 0.7141733)),
    tag('rTRC', trc),
    tag('gTRC', trc),
    tag('bTRC', trc),
  ];

  const table: number[] = [...u32(tags.length)];
  const body: number[] = [];
  let offset = 128 + 4 + tags.length * 12;
  const placed = new Map<string, number>();
  for (const t of tags) {
    const key = t.data.join(',');
    let at = placed.get(key);
    if (at === undefined) {
      at = offset;
      placed.set(key, at);
      body.push(...t.data);
      while (body.length % 4) body.push(0);
      offset = 128 + 4 + tags.length * 12 + body.length;
    }
    table.push(...ascii(t.sig), ...u32(at), ...u32(t.data.length));
  }

  const header = new Array(128).fill(0);
  const put = (at: number, bytes: number[]) => bytes.forEach((b, i) => (header[at + i] = b));
  const total = 128 + table.length + body.length;
  put(0, u32(total));
  put(8, [2, 0x10, 0, 0]);
  put(12, ascii('mntr'));
  put(16, ascii('RGB '));
  put(20, ascii('XYZ '));
  put(24, [0x07, 0xe9, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0]); // 2025-01-01 00:00:00
  put(36, ascii('acsp'));
  put(68, [...u32(fixed(0.9642)), ...u32(fixed(1)), ...u32(fixed(0.8249))]);
  return Uint8Array.from([...header, ...table, ...body]);
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const isoDate = (d: Date) => d.toISOString().replace(/\.\d{3}Z$/, 'Z');

/** Marks the document as PDF/A-2b. Call just before saving; save with `useObjectStreams: false`. */
export function makePdfA(doc: PDFDocument, meta: { title: string; author: string; created: Date }) {
  const created = new Date(Math.floor(meta.created.getTime() / 1000) * 1000);

  doc.setTitle(meta.title);
  doc.setAuthor(meta.author);
  doc.setCreator(meta.author);
  doc.setProducer(meta.author);
  doc.setCreationDate(created);
  doc.setModificationDate(created);
  // Info keys that must agree with XMP are all set above; drop anything else pdf-lib may have added.
  doc.setSubject('');
  doc.setKeywords([]);
  const info = doc.context.lookup(doc.context.trailerInfo.Info);
  if (info && 'delete' in info) {
    (info as unknown as { delete(k: PDFName): void }).delete(PDFName.of('Subject'));
    (info as unknown as { delete(k: PDFName): void }).delete(PDFName.of('Keywords'));
  }

  const when = isoDate(created);
  const xmp = `<?xpacket begin="﻿" id="W5M0MpCehiHzreSzNTczkc9d"?>
<x:xmpmeta xmlns:x="adobe:ns:meta/">
 <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
  <rdf:Description rdf:about="" xmlns:pdfaid="http://www.aiim.org/pdfa/ns/id/" pdfaid:part="2" pdfaid:conformance="B"/>
  <rdf:Description rdf:about="" xmlns:dc="http://purl.org/dc/elements/1.1/">
   <dc:title><rdf:Alt><rdf:li xml:lang="x-default">${esc(meta.title)}</rdf:li></rdf:Alt></dc:title>
   <dc:creator><rdf:Seq><rdf:li>${esc(meta.author)}</rdf:li></rdf:Seq></dc:creator>
  </rdf:Description>
  <rdf:Description rdf:about="" xmlns:xmp="http://ns.adobe.com/xap/1.0/" xmp:CreateDate="${when}" xmp:ModifyDate="${when}" xmp:CreatorTool="${esc(meta.author)}"/>
  <rdf:Description rdf:about="" xmlns:pdf="http://ns.adobe.com/pdf/1.3/" pdf:Producer="${esc(meta.author)}"/>
 </rdf:RDF>
</x:xmpmeta>
<?xpacket end="w"?>`;

  const ctx = doc.context;
  const metadata = ctx.register(
    ctx.stream(new TextEncoder().encode(xmp), { Type: 'Metadata', Subtype: 'XML' }),
  );
  doc.catalog.set(PDFName.of('Metadata'), metadata);

  const icc = ctx.register(ctx.flateStream(srgbProfile(), { N: 3 }));
  const intent = ctx.register(
    ctx.obj({
      Type: 'OutputIntent',
      S: 'GTS_PDFA1',
      OutputConditionIdentifier: PDFString.of('sRGB IEC61966-2.1'),
      Info: PDFString.of('sRGB IEC61966-2.1'),
      DestOutputProfile: icc,
    }),
  );
  doc.catalog.set(PDFName.of('OutputIntents'), ctx.obj([intent]));

  // The trailer must carry a file identifier.
  const id = Array.from(crypto.getRandomValues(new Uint8Array(16)), (b) => b.toString(16).padStart(2, '0')).join('');
  ctx.trailerInfo.ID = ctx.obj([PDFHexString.of(id), PDFHexString.of(id)]);
}
