import Link from 'next/link';
import type { Faq } from '@/lib/tool-content';
import { Callout } from './shared';

export const toc = [
  { id: 'cosa-significa', title: 'Cosa significa estrarre un PDF' },
  { id: 'passaggi', title: 'Come estrarre il PDF in 3 passaggi' },
  { id: 'file-multipli', title: 'Più file, più firme' },
  { id: 'qualita', title: 'Il PDF resta identico?' },
  { id: 'valore-legale', title: 'Cosa conservare' },
  { id: 'problemi', title: 'Problemi frequenti' },
  { id: 'conclusione', title: 'In sintesi' },
  { id: 'domande', title: 'Domande frequenti' },
];

export const summary = [
  'Estrarre un PDF da un P7M significa recuperare il documento originale contenuto nella busta di firma.',
  'Il PDF estratto è identico all’originale, ma non contiene più la firma: quella resta nel P7M.',
  'Conserva sempre il file .p7m: è la prova della firma.',
];

export const faq: Faq[] = [
  {
    q: 'Come si estrae un PDF da un file P7M?',
    a: 'Con uno strumento che apre la busta di firma: carichi il file .p7m, il documento contenuto compare e lo scarichi come PDF. Non serve rinominare il file.',
  },
  {
    q: 'Il PDF estratto è identico all’originale?',
    a: 'Sì. L’estrazione recupera il documento così com’era prima della firma, senza modificarlo o ricomprimerlo.',
  },
  {
    q: 'Il PDF estratto ha ancora la firma digitale?',
    a: 'No: la firma è nella busta .p7m. Il PDF contiene il documento, non la firma, che resta nel file originale.',
  },
  {
    q: 'Posso estrarre il PDF da una fattura XML.P7M?',
    a: 'Dentro una fattura c’è un file XML, non un PDF. Puoi estrarre l’XML e, se serve, generare un PDF di lettura a partire dal contenuto.',
  },
  {
    q: 'È sicuro estrarre il PDF online?',
    a: 'Dipende dallo strumento: se elabora il file nel browser, il documento non lascia il tuo dispositivo. Se lo carica su un server, passa da un servizio esterno.',
  },
];

export function Content() {
  return (
    <>
      <p>
        Cerchi come <strong>estrarre un PDF da un file P7M</strong>? Di solito vuoi una cosa sola: avere il PDF pulito,
        da leggere, stampare o inoltrare, senza la busta di firma. È un’operazione rapida, ma vale la pena capire cosa
        ottieni e cosa no. Se vuoi prima le basi leggi{' '}
        <Link href="/blog/file-p7m-cosa-sono">File P7M: cosa sono</Link>.
      </p>

      <h2 id="cosa-significa">Cosa significa estrarre un PDF da un P7M</h2>
      <p>
        Un file <code>contratto.pdf.p7m</code> è una busta che contiene il PDF e la firma digitale. Estrarre significa{' '}
        <strong>aprire la busta e recuperare il PDF originale</strong>, esattamente com’era prima di essere firmato. Non
        è una conversione: non cambia il formato né la qualità.
      </p>

      <h2 id="passaggi">Come estrarre il PDF in 3 passaggi</h2>
      <ol>
        <li>
          <strong>Apri lo strumento.</strong> Vai su <Link href="/strumenti/convertire-p7m-in-pdf">da P7M a PDF</Link>{' '}
          oppure su <Link href="/strumenti/apri-file-p7m">Apri file P7M</Link>.
        </li>
        <li>
          <strong>Carica il file.</strong> Trascina il <code>.pdf.p7m</code> nella casella o selezionalo dal dispositivo.
        </li>
        <li>
          <strong>Scarica il PDF.</strong> Controlla il documento e premi il pulsante di download.
        </li>
      </ol>
      <p>Tutto avviene nel browser: il file non è inviato a nessun server.</p>

      <h2 id="file-multipli">Più file, più firme</h2>
      <ul>
        <li>
          Se hai <strong>più P7M</strong>, estraili uno alla volta e poi, se vuoi un unico file, uniscili con{' '}
          <Link href="/strumenti/unisci-pdf-online">Unisci PDF</Link>.
        </li>
        <li>
          Se il nome ha <strong>due .p7m</strong> (<code>.pdf.p7m.p7m</code>) il documento è firmato due volte: leggi{' '}
          <Link href="/blog/p7m-doppia-firma">come aprirlo</Link>.
        </li>
        <li>
          Se hai solo un <strong>.p7s</strong>, non c’è nulla da estrarre: il documento è in un altro file.
        </li>
      </ul>

      <h2 id="qualita">Il PDF resta identico?</h2>
      <p>
        Sì. Il documento viene recuperato byte per byte, senza ricompressione. Testo, immagini, impaginazione e
        eventuali moduli restano quelli dell’originale. Se il PDF era già protetto con una password, dovrai usare la
        stessa password anche dopo l’estrazione.
      </p>

      <h2 id="valore-legale">Cosa conservare</h2>
      <Callout>
        <strong>Il PDF estratto non contiene la firma.</strong> La firma digitale è nel file <code>.p7m</code>. Per
        dimostrare chi ha firmato e quando, conserva e invia il P7M originale, non il PDF.
      </Callout>
      <ul>
        <li>il file <code>.p7m</code> originale, senza modifiche;</li>
        <li>il PDF estratto, come copia di lettura;</li>
        <li>l’eventuale report di verifica, se hai fatto una verifica con valore legale.</li>
      </ul>

      <h2 id="problemi">Problemi frequenti</h2>
      <h3>Il file scaricato non è un PDF</h3>
      <p>
        Controlla il nome: <code>fattura.xml.p7m</code> contiene un XML, <code>lettera.docx.p7m</code> un file Word. Vedi{' '}
        <Link href="/blog/come-convertire-p7m-in-pdf">Come convertire un P7M in PDF</Link>.
      </p>
      <h3>Il file non si apre</h3>
      <p>
        Scaricalo di nuovo e consulta <Link href="/blog/p7m-non-si-apre">Il P7M non si apre: 7 cause</Link>.
      </p>

      <h2 id="conclusione">In sintesi</h2>
      <p>
        Estrarre un PDF da un P7M è un’operazione di pochi secondi: ottieni il documento originale, identico, senza la
        firma. Tieni da parte il P7M per il valore legale.{' '}
        <Link href="/strumenti/convertire-p7m-in-pdf">Estrai ora il tuo PDF</Link>.
      </p>
    </>
  );
}
