import Link from 'next/link';
import type { Faq } from '@/lib/tool-content';
import { Callout, Table } from './shared';

export const toc = [
  { id: 'cosa-significa', title: 'Cosa significa .p7m.p7m' },
  { id: 'perche', title: 'Perché un documento ha più firme' },
  { id: 'come-aprirlo', title: 'Come aprire un P7M con doppia firma' },
  { id: 'firma-multipla', title: 'Firma annidata o firme parallele' },
  { id: 'cosa-verificare', title: 'Cosa controllare' },
  { id: 'problemi', title: 'Problemi frequenti' },
  { id: 'conclusione', title: 'In sintesi' },
  { id: 'domande', title: 'Domande frequenti' },
];

export const summary = [
  'Un nome come documento.pdf.p7m.p7m indica un documento firmato e poi firmato di nuovo: due buste una dentro l’altra.',
  'Per leggerlo vanno estratti i due livelli, uno dopo l’altro, fino al documento finale.',
  'Ogni livello può avere un firmatario diverso: controlla chi ha firmato e in che ordine.',
];

export const faq: Faq[] = [
  {
    q: 'Cosa vuol dire che un file ha due estensioni .p7m?',
    a: 'Che la busta di firma contiene un’altra busta di firma. Il documento è stato firmato una prima volta e il file risultante è stato firmato di nuovo, spesso da un’altra persona.',
  },
  {
    q: 'Come apro un file .p7m.p7m?',
    a: 'Estraendo il contenuto livello dopo livello. Uno strumento che gestisce le firme annidate lo fa in automatico e ti restituisce il documento finale, elencando i firmatari trovati.',
  },
  {
    q: 'Posso rinominare il file togliendo un .p7m?',
    a: 'No. Resterebbe comunque una busta di firma e non si aprirebbe come un normale documento.',
  },
  {
    q: 'Una firma doppia ha più valore di una firma singola?',
    a: 'Non necessariamente. Ogni firma ha il valore che le deriva dal tipo di firma e dal certificato; due firmatari possono servire a documentare, per esempio, un’approvazione e una controfirma.',
  },
  {
    q: 'Cosa faccio se il secondo livello non si apre?',
    a: 'Verifica di avere il file completo e che non sia una firma staccata (.p7s). Se il problema persiste, prova con un software di firma digitale o chiedi al mittente di reinviare il file.',
  },
];

export function Content() {
  return (
    <>
      <p>
        Hai davanti un file con <strong>due volte .p7m</strong> alla fine, come <code>atto.pdf.p7m.p7m</code>, e non sai
        cosa significhi? È una situazione più comune di quanto sembri, soprattutto con pratiche che passano per più
        firmatari. Ecco cos’è, come aprirlo e come leggere l’elenco delle firme. Le basi del formato sono in{' '}
        <Link href="/blog/file-p7m-cosa-sono">File P7M: cosa sono</Link>.
      </p>

      <h2 id="cosa-significa">Cosa significa .p7m.p7m</h2>
      <p>
        Un file <code>.p7m</code> è una busta che contiene un documento e la firma. Se la busta viene firmata di nuovo,
        il software crea una <strong>seconda busta</strong> attorno alla prima e aggiunge un’altra estensione{' '}
        <code>.p7m</code>. Leggendo il nome da destra a sinistra si scoprono i livelli: il file più esterno è{' '}
        <code>.p7m</code>, dentro c’è un altro <code>.p7m</code>, dentro ancora il documento (<code>.pdf</code>).
      </p>

      <h2 id="perche">Perché un documento ha più firme</h2>
      <ul>
        <li>
          <strong>Approvazione e controfirma.</strong> Un responsabile firma, poi un secondo soggetto controfirma.
        </li>
        <li>
          <strong>Passaggi tra uffici.</strong> Ogni ufficio che riceve il documento lo firma per attestare il passaggio.
        </li>
        <li>
          <strong>Parti diverse di un contratto.</strong> Ogni parte firma a sua volta il file ricevuto.
        </li>
        <li>
          <strong>Invio per PEC o sistemi automatici.</strong> Alcuni sistemi appongono una firma al file prima
          dell’invio.
        </li>
      </ul>

      <h2 id="come-aprirlo">Come aprire un P7M con doppia firma</h2>
      <ol>
        <li>
          Apri <Link href="/strumenti/apri-file-p7m">Apri file P7M</Link> dal browser.
        </li>
        <li>
          Trascina il file <code>.p7m.p7m</code> nella casella.
        </li>
        <li>
          Lo strumento apre le buste in sequenza e ti mostra il <strong>documento finale</strong> insieme all’elenco
          dei firmatari trovati.
        </li>
        <li>Scarica il documento estratto.</li>
      </ol>
      <p>
        Il file è letto nel browser e non viene caricato su server. Se il documento finale è un PDF ma ti serve un altro
        formato, vedi <Link href="/blog/come-convertire-p7m-in-pdf">Come convertire un P7M in PDF</Link>.
      </p>

      <h2 id="firma-multipla">Firma annidata o firme parallele</h2>
      <Table
        head={['Tipo', 'Come appare', 'Come si legge']}
        rows={[
          ['Firme annidate', 'Più estensioni: atto.pdf.p7m.p7m', 'Una busta dentro l’altra: si estrae livello per livello'],
          ['Firme parallele', 'Una sola estensione .p7m', 'Una busta con più firmatari sullo stesso documento'],
        ]}
      />
      <p>
        Nelle firme parallele il file ha un solo <code>.p7m</code> ma contiene più firme. Nelle annidate ogni firma
        copre anche quella precedente.
      </p>

      <h2 id="cosa-verificare">Cosa controllare</h2>
      <ul>
        <li>chi ha firmato a ciascun livello;</li>
        <li>la data di firma, quando presente;</li>
        <li>se l’ordine delle firme corrisponde a quello atteso (chi firma per primo, chi controfirma).</li>
      </ul>
      <Callout>
        <strong>Aprire non è verificare.</strong> Estrarre il documento e leggere i nomi dei firmatari non equivale a
        verificare ogni firma. Per un uso legale servono un software di verifica qualificato e il file originale.
      </Callout>

      <h2 id="problemi">Problemi frequenti</h2>
      <h3>Il primo livello si apre, il secondo no</h3>
      <p>
        Può dipendere da un file incompleto o da una firma staccata. Scarica di nuovo il file e controlla le estensioni
        con <Link href="/blog/p7m-non-si-apre">Il P7M non si apre: 7 cause e soluzioni</Link>.
      </p>

      <h2 id="conclusione">In sintesi</h2>
      <p>
        Un file <code>.p7m.p7m</code> è un documento firmato due volte: per leggerlo basta estrarre i due livelli,
        uno dopo l’altro. <Link href="/strumenti/apri-file-p7m">Apri il tuo file con doppia firma</Link>.
      </p>
    </>
  );
}
