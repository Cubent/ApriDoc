'use client';

import { useEffect, useRef, useState } from 'react';

/** Renders every page of a PDF to canvases inside the app (no browser PDF plugin needed). */
export function PdfPreview({ bytes }: { bytes: Uint8Array }) {
  const host = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading');
  const [pages, setPages] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const el = host.current;
    (async () => {
      try {
        const pdfjs = await import('pdfjs-dist');
        pdfjs.GlobalWorkerOptions.workerSrc = new URL(
          'pdfjs-dist/build/pdf.worker.min.mjs',
          import.meta.url
        ).toString();
        const doc = await pdfjs.getDocument({ data: bytes.slice() }).promise;
        if (cancelled || !el) return;
        el.replaceChildren();
        setPages(doc.numPages);
        const ratio = window.devicePixelRatio || 1;
        const width = Math.min(el.clientWidth || 800, 900);
        for (let i = 1; i <= doc.numPages; i++) {
          const page = await doc.getPage(i);
          if (cancelled) return;
          const base = page.getViewport({ scale: 1 });
          const viewport = page.getViewport({ scale: (width / base.width) * ratio });
          const canvas = document.createElement('canvas');
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          canvas.style.width = `${viewport.width / ratio}px`;
          canvas.style.height = `${viewport.height / ratio}px`;
          canvas.className = 'mx-auto mb-4 max-w-full rounded-lg bg-white';
          el.appendChild(canvas);
          await page.render({ canvasContext: canvas.getContext('2d')!, viewport }).promise;
          if (i === 1) setState('ready');
        }
        setState('ready');
      } catch {
        if (!cancelled) setState('error');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [bytes]);

  return (
    <div className="rounded-2xl border border-[#e6e8ec] bg-[#eceef2] p-4">
      <div className="mb-3 flex items-center justify-between text-sm font-semibold text-[#5b6270]">
        <span>Anteprima del documento</span>
        {pages > 0 && <span>{pages} {pages === 1 ? 'pagina' : 'pagine'}</span>}
      </div>
      {state === 'loading' && <p className="py-10 text-center text-[#5b6270]">Caricamento anteprima…</p>}
      {state === 'error' && (
        <p className="py-10 text-center text-[#5b6270]">
          Anteprima non disponibile per questo PDF: puoi comunque scaricarlo.
        </p>
      )}
      <div ref={host} className="max-h-[80vh] overflow-y-auto" />
    </div>
  );
}
