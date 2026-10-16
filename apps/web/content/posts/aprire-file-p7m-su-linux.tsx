import Link from 'next/link';
import type { Faq } from '@/lib/tool-content';
import { Callout, Table } from './shared';

export const toc = [
  { id: 'perche', title: 'Perché su Linux non si apre' },
  { id: 'browser', title: 'Metodo 1: dal browser' },
  { id: 'openssl', title: 'Metodo 2: dal terminale con OpenSSL' },
  { id: 'molti-file', title: 'Molti file in una volta' },
  { id: 'confronto', title: 'Quale scegliere' },
  { id: 'problemi', title: 'Problemi frequenti' },
  { id: 'conclusione', title: 'In sintesi' },
  { id: 'domande', title: 'Domande frequenti' },
];

export const summary = [
  'Su Linux un file .p7m si apre estraendone il documento: dal browser o con OpenSSL da terminale.',
  'Il metodo del browser non richiede installazioni; OpenSSL è utile per automatizzare molti file.',
  'Estrarre il documento non significa verificare la firma.',
];

export const faq: Faq[] = [
  {
    q: 'Come si apre un file P7M su Linux?',
    a: 'Dal browser con uno strumento online che estrae il documento, oppure dal terminale con OpenSSL. In entrambi i casi il documento viene estratto dalla busta di firma.',
  },
  {
    q: 'Serve un programma di firma digitale su Linux?',
    a: 'Solo se ti serve la verifica con valore legale. Per leggere o scaricare il documento bastano il browser o OpenSSL.',
  },
  {
    q: 'Cosa significa -noverify nel comando OpenSSL?',
    a: 'Che il comando non controlla la catena di certificati: estrae il contenuto ma non verifica la firma.',
  },
  {
    q: 'Il file è in formato testuale, come lo estraggo?',
    a: 'Se il file è codificato in Base64 (PEM) cambia -inform DER in -inform PEM nel comando.',
  },
  {
    q: 'Funziona con ogni distribuzione?',
    a: 'Il browser sì. OpenSSL è presente nella gran parte delle distribuzioni; se manca si installa con il gestore pacchetti.',
  },
];

export function Content() {
  return (
    <>
      <p>
        Su Linux un file <strong>.p7m</strong> non si apre con un doppio clic: nessun lettore predefinito sa estrarre il
        documento dalla busta di firma. Per fortuna hai due strade semplici, una grafica e una da terminale. Per capire il
        formato leggi <Link href="/blog/file-p7m-cosa-sono">File P7M: cosa sono</Link>.
      </p>

      <h2 id="perche">Perché su Linux non si apre</h2>
      <p>
        Il P7M è una busta CAdES che contiene documento e firma. I lettori di PDF o di testo non riconoscono la busta, e
        i software ufficiali dei prestatori di firma sono spesso pensati per Windows. Il contenuto va quindi{' '}
        <strong>estratto</strong>; poi il documento si apre con il lettore di sempre.
      </p>

      <h2 id="browser">Metodo 1: dal browser</h2>
      <ol>
        <li>
          Apri <Link href="/strumenti/apri-file-p7m">Apri file P7M</Link> in Firefox, Chrome o Chromium.
        </li>
        <li>Trascina il file <code>.p7m</code> dal file manager alla casella.</li>
        <li>Leggi il documento e i dati del firmatario.</li>
        <li>Scarica il documento estratto.</li>
      </ol>
      <p>Il file viene elaborato nel browser e non è caricato su un server.</p>

      <h2 id="openssl">Metodo 2: dal terminale con OpenSSL</h2>
      <p>Con OpenSSL estrai il documento da un file in formato DER (il più comune) così:</p>
      <p>
        <code>openssl smime -verify -noverify -in documento.pdf.p7m -inform DER -out documento.pdf</code>
      </p>
      <ul>
        <li>
          Se il file è in Base64 (testo), usa <code>-inform PEM</code>.
        </li>
        <li>
          <code>-noverify</code> salta il controllo dei certificati: il comando <strong>estrae</strong> il contenuto, non
          verifica la firma.
        </li>
        <li>
          Per i file annidati (<code>.p7m.p7m</code>) ripeti il comando sul risultato.
        </li>
      </ul>

      <h2 id="molti-file">Molti file in una volta</h2>
      <p>Con la shell puoi estrarre una cartella intera di P7M con un ciclo:</p>
      <p>
        <code>{'for f in *.pdf.p7m; do openssl smime -verify -noverify -in "$f" -inform DER -out "${f%.p7m}"; done'}</code>
      </p>
      <p>
        Controlla prima su un file che il formato sia DER; i file con nome diverso da <code>.pdf.p7m</code> richiedono di
        adattare il filtro.
      </p>

      <h2 id="confronto">Quale scegliere</h2>
      <Table
        head={['Metodo', 'Difficoltà', 'Adatto a']}
        rows={[
          ['Browser', 'Facile', 'Pochi file, lettura veloce'],
          ['OpenSSL', 'Media', 'Molti file, script, server'],
          ['Software di firma', 'Media', 'Verifica con valore legale'],
        ]}
      />
      <Callout>
        <strong>Aprire non è verificare.</strong> Entrambi i metodi estraggono il documento: per dimostrarne la validità
        serve un software di verifica qualificato. Conserva sempre il file <code>.p7m</code> originale.
      </Callout>

      <h2 id="problemi">Problemi frequenti</h2>
      <h3>OpenSSL segnala un errore sul file</h3>
      <p>
        Prova a cambiare <code>-inform DER</code> in <code>-inform PEM</code>, oppure controlla che il file non sia
        incompleto: vedi <Link href="/blog/p7m-non-si-apre">Il P7M non si apre: 7 cause</Link>.
      </p>
      <h3>Il file estratto non si apre</h3>
      <p>
        Verifica l’estensione originale: un XML è una fattura elettronica, non un PDF.
      </p>

      <h2 id="conclusione">In sintesi</h2>
      <p>
        Su Linux un P7M si apre estraendo il documento: dal browser in pochi secondi, da terminale con OpenSSL per
        automatizzare. <Link href="/strumenti/apri-file-p7m">Apri il tuo file P7M</Link>.
      </p>
    </>
  );
}
