export const readBytes = async (file: File) => new Uint8Array(await file.arrayBuffer());

export function downloadBlob(data: BlobPart | Uint8Array, name: string, type: string) {
  const url = URL.createObjectURL(new Blob([data as BlobPart], { type }));
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 10_000);
}

export const baseName = (name: string) => name.replace(/\.[^.]+$/, '');

export const formatSize = (n: number) =>
  n < 1024 ? `${n} B` : n < 1024 ** 2 ? `${(n / 1024).toFixed(1)} KB` : `${(n / 1024 ** 2).toFixed(2)} MB`;

/** Parses "1-3, 5, 8-" into zero-based page indexes. Returns null when invalid. */
export function parsePages(input: string, total: number): number[] | null {
  const out: number[] = [];
  for (const raw of input.split(',')) {
    const part = raw.trim();
    if (!part) continue;
    const m = /^(\d*)\s*-\s*(\d*)$/.exec(part);
    if (m) {
      const from = m[1] ? Number(m[1]) : 1;
      const to = m[2] ? Number(m[2]) : total;
      if (from < 1 || to > total || from > to) return null;
      for (let p = from; p <= to; p++) out.push(p - 1);
    } else if (/^\d+$/.test(part)) {
      const p = Number(part);
      if (p < 1 || p > total) return null;
      out.push(p - 1);
    } else {
      return null;
    }
  }
  return out.length ? out : null;
}
