// Keeps the analysed file in the browser (IndexedDB) across the Stripe / sign-in redirects.
// Nothing is ever uploaded to a server.
const DB = 'apridoc';
const STORE = 'pending';
const KEY = 'file';

function open(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB, 1);
    req.onupgradeneeded = () => req.result.createObjectStore(STORE);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function tx<T>(mode: IDBTransactionMode, run: (s: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  const db = await open();
  return new Promise((resolve, reject) => {
    const req = run(db.transaction(STORE, mode).objectStore(STORE));
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export const savePendingFile = (file: File) => tx('readwrite', (s) => s.put(file, KEY)).catch(() => undefined);
export const loadPendingFile = () => tx<File | undefined>('readonly', (s) => s.get(KEY)).catch(() => undefined);
export const clearPendingFile = () => tx('readwrite', (s) => s.delete(KEY)).catch(() => undefined);

export async function sha256Hex(bytes: Uint8Array): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', bytes as BufferSource);
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, '0')).join('');
}
