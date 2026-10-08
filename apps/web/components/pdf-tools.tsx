'use client';

import JSZip from 'jszip';
import { PDFDocument, StandardFonts, degrees, rgb } from 'pdf-lib';
import { useState } from 'react';
import { baseName, downloadBlob, parsePages, readBytes } from '@/lib/files';
import {
  ActionButton,
  DoneBox,
  Dropzone,
  ErrorBox,
  FileRow,
  Label,
  Panel,
  useJob,
} from './tool-ui';

const PDF = 'application/pdf';

async function loadPdf(file: File) {
  try {
    return await PDFDocument.load(await readBytes(file), { ignoreEncryption: false });
  } catch {
    throw new Error('Impossibile leggere il PDF: il file è danneggiato o protetto da password.');
  }
}

/** Hook: pick one PDF and know its page count. */
function useSinglePdf() {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState(0);
  const job = useJob();
  const pick = async (files: File[]) => {
    const f = files[0];
    setFile(null);
    job.setError(null);
    try {
      const doc = await loadPdf(f);
      setPages(doc.getPageCount());
      setFile(f);
    } catch (e) {
      job.setError(e instanceof Error ? e.message : 'Errore');
    }
  };
  return { file, pages, pick, reset: () => setFile(null), job };
}

function PdfPicker({ s }: { s: ReturnType<typeof useSinglePdf> }) {
  return (
    <>
      {!s.file && <Dropzone accept=".pdf,application/pdf" label="Seleziona un file PDF" onFiles={s.pick} />}
      <ErrorBox message={s.job.error} />
      {s.file && <FileRow file={s.file} onRemove={s.reset}><span className="text-sm font-semibold">{s.pages} pagine</span></FileRow>}
    </>
  );
}

/* ------------------------------ Unisci PDF ------------------------------ */

export function MergePdf() {
  const [files, setFiles] = useState<File[]>([]);
  const job = useJob();

  const move = (i: number, d: number) =>
    setFiles((f) => {
      const n = [...f];
      const j = i + d;
      if (j < 0 || j >= n.length) return f;
      [n[i], n[j]] = [n[j], n[i]];
      return n;
    });

  const run = () =>
    job.run(async () => {
      const out = await PDFDocument.create();
      for (const f of files) {
        const src = await loadPdf(f);
        const copied = await out.copyPages(src, src.getPageIndices());
        copied.forEach((p) => out.addPage(p));
      }
      downloadBlob(await out.save(), 'unito.pdf', PDF);
      return `Creato unito.pdf con ${out.getPageCount()} pagine.`;
    });

  return (
    <div className="space-y-5">
      <Dropzone
        accept=".pdf,application/pdf"
        multiple
        label={files.length ? 'Aggiungi altri PDF' : 'Seleziona i file PDF da unire'}
        onFiles={(f) => setFiles((x) => [...x, ...f])}
      />
      {files.length > 0 && (
        <Panel>
          <div className="space-y-2">
            {files.map((f, i) => (
              <FileRow key={`${f.name}-${i}`} file={f} onRemove={() => setFiles(files.filter((_, k) => k !== i))}>
                <button className="btn-ghost !px-3 !py-1" onClick={() => move(i, -1)} disabled={i === 0} aria-label="Su">↑</button>
                <button className="btn-ghost !px-3 !py-1" onClick={() => move(i, 1)} disabled={i === files.length - 1} aria-label="Giù">↓</button>
              </FileRow>
            ))}
          </div>
          <ErrorBox message={job.error} />
          <DoneBox message={job.done} />
          <ActionButton busy={job.busy} disabled={files.length < 2} onClick={run}>
            Unisci {files.length} PDF
          </ActionButton>
          {files.length < 2 && <p className="text-center text-sm text-[#5b6270]">Seleziona almeno due file.</p>}
        </Panel>
      )}
    </div>
  );
}

/* ----------------------------- Dividere PDF ----------------------------- */

export function SplitPdf() {
  const s = useSinglePdf();
  const [mode, setMode] = useState<'range' | 'each'>('range');
  const [range, setRange] = useState('1');

  const run = () =>
    s.job.run(async () => {
      const src = await loadPdf(s.file!);
      const name = baseName(s.file!.name);
      if (mode === 'range') {
        const idx = parsePages(range, s.pages);
        if (!idx) throw new Error(`Intervallo non valido. Usa ad esempio 1-3, 5 (il PDF ha ${s.pages} pagine).`);
        const out = await PDFDocument.create();
        (await out.copyPages(src, idx)).forEach((p) => out.addPage(p));
        downloadBlob(await out.save(), `${name}-estratto.pdf`, PDF);
        return `Estratte ${idx.length} pagine.`;
      }
      const zip = new JSZip();
      for (let i = 0; i < s.pages; i++) {
        const out = await PDFDocument.create();
        const [p] = await out.copyPages(src, [i]);
        out.addPage(p);
        zip.file(`${name}-pagina-${i + 1}.pdf`, await out.save());
      }
      downloadBlob(await zip.generateAsync({ type: 'blob' }), `${name}-pagine.zip`, 'application/zip');
      return `Creato un ZIP con ${s.pages} file PDF.`;
    });

  return (
    <div className="space-y-5">
      <PdfPicker s={s} />
      {s.file && (
        <Panel>
          <div className="flex gap-3">
            {([['range', 'Estrai pagine'], ['each', 'Una pagina per file']] as const).map(([v, l]) => (
              <button
                key={v}
                onClick={() => setMode(v)}
                className={`flex-1 rounded-xl border px-4 py-3 font-semibold ${mode === v ? 'border-[#1f087a] bg-[#1f087a]/10 text-[#1f087a]' : 'border-[#e6e8ec]'}`}
              >
                {l}
              </button>
            ))}
          </div>
          {mode === 'range' && (
            <Label text="Pagine da estrarre">
              <input className="field" value={range} onChange={(e) => setRange(e.target.value)} placeholder="es. 1-3, 5, 8-" />
            </Label>
          )}
          <DoneBox message={s.job.done} />
          <ActionButton busy={s.job.busy} onClick={run}>Dividi PDF</ActionButton>
        </Panel>
      )}
    </div>
  );
}

/* ----------------------------- Ruotare PDF ------------------------------ */

export function RotatePdf() {
  const s = useSinglePdf();
  const [angle, setAngle] = useState(90);
  const [range, setRange] = useState('');

  const run = () =>
    s.job.run(async () => {
      const doc = await loadPdf(s.file!);
      const idx = range.trim() ? parsePages(range, s.pages) : doc.getPageIndices();
      if (!idx) throw new Error(`Pagine non valide (il PDF ha ${s.pages} pagine).`);
      for (const i of idx) {
        const page = doc.getPage(i);
        page.setRotation(degrees((page.getRotation().angle + angle) % 360));
      }
      downloadBlob(await doc.save(), `${baseName(s.file!.name)}-ruotato.pdf`, PDF);
      return `Ruotate ${idx.length} pagine.`;
    });

  return (
    <div className="space-y-5">
      <PdfPicker s={s} />
      {s.file && (
        <Panel>
          <Label text="Rotazione">
            <select className="field" value={angle} onChange={(e) => setAngle(Number(e.target.value))}>
              <option value={90}>90° in senso orario</option>
              <option value={180}>180°</option>
              <option value={270}>90° in senso antiorario</option>
            </select>
          </Label>
          <Label text="Pagine (lascia vuoto per tutte)">
            <input className="field" value={range} onChange={(e) => setRange(e.target.value)} placeholder="es. 2, 4-6" />
          </Label>
          <DoneBox message={s.job.done} />
          <ActionButton busy={s.job.busy} onClick={run}>Ruota PDF</ActionButton>
        </Panel>
      )}
    </div>
  );
}

/* ----------------------------- Organizza PDF ---------------------------- */

export function OrganizePdf() {
  const s = useSinglePdf();
  const [order, setOrder] = useState('');

  const run = () =>
    s.job.run(async () => {
      const src = await loadPdf(s.file!);
      const idx = parsePages(order || `1-${s.pages}`, s.pages);
      if (!idx) throw new Error(`Ordine non valido. Usa ad esempio 3,1,2,5-7 (il PDF ha ${s.pages} pagine).`);
      const out = await PDFDocument.create();
      (await out.copyPages(src, idx)).forEach((p) => out.addPage(p));
      downloadBlob(await out.save(), `${baseName(s.file!.name)}-organizzato.pdf`, PDF);
      return `Nuovo PDF con ${idx.length} pagine.`;
    });

  return (
    <div className="space-y-5">
      <PdfPicker s={s} />
      {s.file && (
        <Panel>
          <Label text="Nuovo ordine delle pagine">
            <input
              className="field"
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              placeholder={`es. 3,1,2,5-${s.pages}  (le pagine omesse vengono eliminate)`}
            />
          </Label>
          <p className="text-sm text-[#5b6270]">
            Indica le pagine nell’ordine desiderato: quelle che non scrivi vengono eliminate, quelle ripetute vengono duplicate.
          </p>
          <DoneBox message={s.job.done} />
          <ActionButton busy={s.job.busy} onClick={run}>Organizza PDF</ActionButton>
        </Panel>
      )}
    </div>
  );
}

/* ------------------------------- JPG in PDF ----------------------------- */

async function toPng(file: File): Promise<Uint8Array> {
  const bmp = await createImageBitmap(file);
  const c = document.createElement('canvas');
  c.width = bmp.width;
  c.height = bmp.height;
  c.getContext('2d')!.drawImage(bmp, 0, 0);
  const blob: Blob = await new Promise((res, rej) => c.toBlob((b) => (b ? res(b) : rej()), 'image/png'));
  return new Uint8Array(await blob.arrayBuffer());
}

export function ImagesToPdf() {
  const [files, setFiles] = useState<File[]>([]);
  const [size, setSize] = useState<'a4' | 'fit'>('a4');
  const [margin, setMargin] = useState(24);
  const job = useJob();

  const run = () =>
    job.run(async () => {
      const out = await PDFDocument.create();
      for (const f of files) {
        const bytes = await readBytes(f);
        const isJpg = /jpe?g$/i.test(f.type) || /\.jpe?g$/i.test(f.name);
        const isPng = /png$/i.test(f.type) || /\.png$/i.test(f.name);
        const img = isJpg
          ? await out.embedJpg(bytes)
          : isPng
            ? await out.embedPng(bytes)
            : await out.embedPng(await toPng(f));
        if (size === 'fit') {
          const p = out.addPage([img.width + margin * 2, img.height + margin * 2]);
          p.drawImage(img, { x: margin, y: margin, width: img.width, height: img.height });
        } else {
          const landscape = img.width > img.height;
          const [W, H] = landscape ? [841.89, 595.28] : [595.28, 841.89];
          const p = out.addPage([W, H]);
          const scale = Math.min((W - margin * 2) / img.width, (H - margin * 2) / img.height, 1 * 10);
          const w = img.width * scale;
          const h = img.height * scale;
          p.drawImage(img, { x: (W - w) / 2, y: (H - h) / 2, width: w, height: h });
        }
      }
      downloadBlob(await out.save(), 'immagini.pdf', PDF);
      return `Creato immagini.pdf con ${files.length} pagine.`;
    });

  return (
    <div className="space-y-5">
      <Dropzone
        accept="image/jpeg,image/png,image/webp,image/gif,image/bmp"
        multiple
        label={files.length ? 'Aggiungi altre immagini' : 'Seleziona immagini JPG o PNG'}
        onFiles={(f) => setFiles((x) => [...x, ...f])}
      />
      {files.length > 0 && (
        <Panel>
          <div className="space-y-2">
            {files.map((f, i) => (
              <FileRow key={`${f.name}-${i}`} file={f} onRemove={() => setFiles(files.filter((_, k) => k !== i))} />
            ))}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Label text="Dimensione pagina">
              <select className="field" value={size} onChange={(e) => setSize(e.target.value as 'a4' | 'fit')}>
                <option value="a4">A4 (orientamento automatico)</option>
                <option value="fit">Adatta all’immagine</option>
              </select>
            </Label>
            <Label text="Margine (pt)">
              <input type="number" min={0} max={200} className="field" value={margin} onChange={(e) => setMargin(Math.max(0, Number(e.target.value) || 0))} />
            </Label>
          </div>
          <ErrorBox message={job.error} />
          <DoneBox message={job.done} />
          <ActionButton busy={job.busy} onClick={run}>Converti in PDF</ActionButton>
        </Panel>
      )}
    </div>
  );
}

/* ----------------------------- Numero di pagine ------------------------- */

export function PageNumbers() {
  const s = useSinglePdf();
  const [pos, setPos] = useState('bottom-center');
  const [fmt, setFmt] = useState('{n}');
  const [start, setStart] = useState(1);

  const run = () =>
    s.job.run(async () => {
      const doc = await loadPdf(s.file!);
      const font = await doc.embedFont(StandardFonts.Helvetica);
      const total = doc.getPageCount();
      doc.getPages().forEach((page, i) => {
        const text = fmt.replace('{n}', String(i + start)).replace('{t}', String(total + start - 1));
        const size = 11;
        const w = font.widthOfTextAtSize(text, size);
        const { width, height } = page.getSize();
        const [v, h] = pos.split('-');
        const x = h === 'left' ? 36 : h === 'right' ? width - 36 - w : (width - w) / 2;
        const y = v === 'top' ? height - 36 : 28;
        page.drawText(text, { x, y, size, font, color: rgb(0.15, 0.15, 0.15) });
      });
      downloadBlob(await doc.save(), `${baseName(s.file!.name)}-numerato.pdf`, PDF);
      return 'Numeri di pagina aggiunti.';
    });

  return (
    <div className="space-y-5">
      <PdfPicker s={s} />
      {s.file && (
        <Panel>
          <div className="grid gap-4 sm:grid-cols-3">
            <Label text="Posizione">
              <select className="field" value={pos} onChange={(e) => setPos(e.target.value)}>
                <option value="bottom-center">In basso al centro</option>
                <option value="bottom-right">In basso a destra</option>
                <option value="bottom-left">In basso a sinistra</option>
                <option value="top-center">In alto al centro</option>
                <option value="top-right">In alto a destra</option>
                <option value="top-left">In alto a sinistra</option>
              </select>
            </Label>
            <Label text="Formato">
              <select className="field" value={fmt} onChange={(e) => setFmt(e.target.value)}>
                <option value="{n}">1</option>
                <option value="Pagina {n}">Pagina 1</option>
                <option value="Pagina {n} di {t}">Pagina 1 di N</option>
                <option value="{n} / {t}">1 / N</option>
              </select>
            </Label>
            <Label text="Inizia da">
              <input type="number" min={0} className="field" value={start} onChange={(e) => setStart(Number(e.target.value) || 0)} />
            </Label>
          </div>
          <DoneBox message={s.job.done} />
          <ActionButton busy={s.job.busy} onClick={run}>Aggiungi numeri di pagina</ActionButton>
        </Panel>
      )}
    </div>
  );
}

/* -------------------------------- Filigrana ----------------------------- */

export function Watermark() {
  const s = useSinglePdf();
  const [text, setText] = useState('RISERVATO');
  const [size, setSize] = useState(72);
  const [opacity, setOpacity] = useState(0.2);
  const [angle, setAngle] = useState(45);

  const run = () =>
    s.job.run(async () => {
      if (!text.trim()) throw new Error('Inserisci il testo della filigrana.');
      const doc = await loadPdf(s.file!);
      const font = await doc.embedFont(StandardFonts.HelveticaBold);
      let w: number;
      try {
        w = font.widthOfTextAtSize(text, size);
      } catch {
        throw new Error('Il testo contiene caratteri non supportati: usa lettere latine standard.');
      }
      const rad = (angle * Math.PI) / 180;
      for (const page of doc.getPages()) {
        const { width, height } = page.getSize();
        // Position so the text's centre sits on the page centre after rotation.
        const x = width / 2 - (w / 2) * Math.cos(rad) + (size / 3) * Math.sin(rad);
        const y = height / 2 - (w / 2) * Math.sin(rad) - (size / 3) * Math.cos(rad);
        page.drawText(text, { x, y, size, font, color: rgb(0.5, 0.5, 0.5), opacity, rotate: degrees(angle) });
      }
      downloadBlob(await doc.save(), `${baseName(s.file!.name)}-filigrana.pdf`, PDF);
      return 'Filigrana applicata a tutte le pagine.';
    });

  return (
    <div className="space-y-5">
      <PdfPicker s={s} />
      {s.file && (
        <Panel>
          <Label text="Testo">
            <input className="field" value={text} onChange={(e) => setText(e.target.value)} />
          </Label>
          <div className="grid gap-4 sm:grid-cols-3">
            <Label text={`Dimensione: ${size}`}>
              <input type="range" min={20} max={160} value={size} onChange={(e) => setSize(Number(e.target.value))} className="w-full" />
            </Label>
            <Label text={`Trasparenza: ${Math.round((1 - opacity) * 100)}%`}>
              <input type="range" min={5} max={90} value={Math.round(opacity * 100)} onChange={(e) => setOpacity(Number(e.target.value) / 100)} className="w-full" />
            </Label>
            <Label text={`Rotazione: ${angle}°`}>
              <input type="range" min={0} max={90} value={angle} onChange={(e) => setAngle(Number(e.target.value))} className="w-full" />
            </Label>
          </div>
          <DoneBox message={s.job.done} />
          <ActionButton busy={s.job.busy} onClick={run}>Applica filigrana</ActionButton>
        </Panel>
      )}
    </div>
  );
}

/* -------------------------------- PDF in JPG ---------------------------- */

export function PdfToJpg() {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState(0.92);
  const [scale, setScale] = useState(2);
  const job = useJob();

  const run = () =>
    job.run(async () => {
      const pdfjs = await import('pdfjs-dist');
      pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString();
      const doc = await pdfjs.getDocument({ data: await readBytes(file!) }).promise;
      const zip = new JSZip();
      const name = baseName(file!.name);
      for (let i = 1; i <= doc.numPages; i++) {
        const page = await doc.getPage(i);
        const viewport = page.getViewport({ scale });
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext('2d')!;
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        await page.render({ canvasContext: ctx, viewport }).promise;
        const blob: Blob = await new Promise((res, rej) => canvas.toBlob((b) => (b ? res(b) : rej()), 'image/jpeg', quality));
        zip.file(`${name}-pagina-${i}.jpg`, blob);
      }
      if (doc.numPages === 1) {
        const only = Object.values(zip.files)[0];
        downloadBlob(await only.async('blob'), only.name, 'image/jpeg');
      } else {
        downloadBlob(await zip.generateAsync({ type: 'blob' }), `${name}-jpg.zip`, 'application/zip');
      }
      return `Convertite ${doc.numPages} pagine in JPG.`;
    });

  return (
    <div className="space-y-5">
      {!file && <Dropzone accept=".pdf,application/pdf" label="Seleziona un file PDF" onFiles={(f) => setFile(f[0])} />}
      {file && (
        <>
          <FileRow file={file} onRemove={() => setFile(null)} />
          <Panel>
            <div className="grid gap-4 sm:grid-cols-2">
              <Label text="Risoluzione">
                <select className="field" value={scale} onChange={(e) => setScale(Number(e.target.value))}>
                  <option value={1.5}>Normale (~110 DPI)</option>
                  <option value={2}>Alta (~150 DPI)</option>
                  <option value={3}>Molto alta (~220 DPI)</option>
                </select>
              </Label>
              <Label text="Qualità JPG">
                <select className="field" value={quality} onChange={(e) => setQuality(Number(e.target.value))}>
                  <option value={0.75}>Media</option>
                  <option value={0.92}>Alta</option>
                  <option value={1}>Massima</option>
                </select>
              </Label>
            </div>
            <ErrorBox message={job.error} />
            <DoneBox message={job.done} />
            <ActionButton busy={job.busy} onClick={run}>Converti in JPG</ActionButton>
          </Panel>
        </>
      )}
    </div>
  );
}
