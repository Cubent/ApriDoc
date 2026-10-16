import Link from 'next/link';
import type { Faq } from '@/lib/tool-content';
import { Callout, Table } from './shared';

export const toc = [
  { id: 'dipende', title: 'Dipende da cosa c’è dentro' },
  { id: 'word-dentro', title: 'Se dentro c’è un file Word' },
  { id: 'pdf-dentro', title: 'Se dentro c’è un PDF' },
  { id: 'xml-dentro', title: 'Se dentro c’è un XML' },
  { id: 'tabella', title: 'Riepilogo' },
  { id: 'qualita', title: 'Qualità della conversione' },
  { id: 'conclusione', title: 'In sintesi' },
  { id: 'domande', title: 'Domande frequenti' },
];

export const summary = [
  'Un P7M non si converte direttamente in Word: prima si estrae il documento dalla busta di firma.',
  'Se dentro c’è già un file Word, basta estrarlo. Se c’è un PDF, serve poi un convertitore da PDF a Word.',
  'Il file Word ottenuto non conserva la firma: tieni da parte il P7M originale.',
];

export const faq: Faq[] = [
  {
    q: 'Posso convertire un P7M in Word?',
    a: 'Il P7M è una busta, non un documento. Si estrae il contenuto: se è un file Word, hai già il documento. Se è un PDF, lo converti in Word con un apposito convertitore.',
  },
  {
    q: 'Lo strumento di ApriDoc.com converte il PDF in Word?',
    a: 'No. Estrae il documento dal P7M e può generare un PDF; la conversione da PDF a Word richiede un altro strumento.',
  },
  {
    q: 'La conversione da PDF a Word è perfetta?',
    a: 'Dipende dal PDF. I PDF con testo selezionabile si convertono meglio; quelli ottenuti da scansioni richiedono il riconoscimento del testo (OCR) e possono perdere impaginazione.',
  },
  {
    q: 'Il file Word ottenuto ha valore legale?',
    a: 'No: la firma resta nel P7M originale. Il file Word è una copia di lavoro; per dimostrare la firma conserva il file .p7m.',
  },
  {
    q: 'Posso modificare il documento di un P7M?',
    a: 'Sì, dopo averlo estratto lavori su una copia. La firma originale però non si applica più alla versione modificata.',
  },
];

export function Content() {
  return (
    <>
      <p>
        Cerchi come <strong>convertire un P7M in Word</strong> per poter modificare il documento? La risposta breve: il
        P7M non si converte, si apre. Quello che puoi ottenere dipende da cosa contiene la busta. Per le basi vedi{' '}
        <Link href="/blog/file-p7m-cosa-sono">File P7M: cosa sono</Link>.
      </p>

      <h2 id="dipende">Dipende da cosa c’è dentro</h2>
      <p>
        Un file <code>.p7m</code> è un contenitore: racchiude il documento originale insieme alla firma. Il nome ti dice
        cosa contiene: in <code>lettera.docx.p7m</code> c’è un Word, in <code>contratto.pdf.p7m</code> un PDF, in{' '}
        <code>fattura.xml.p7m</code> un XML.
      </p>

      <h2 id="word-dentro">Se dentro c’è un file Word</h2>
      <p>
        È il caso più semplice: <strong>estrai</strong> il documento e lo apri con Word. Non serve alcuna conversione.
        Vedi <Link href="/blog/aprire-docx-xlsx-p7m">come aprire Word ed Excel firmati</Link>.
      </p>

      <h2 id="pdf-dentro">Se dentro c’è un PDF</h2>
      <ol>
        <li>
          Estrai il PDF con <Link href="/strumenti/apri-file-p7m">Apri file P7M</Link>.
        </li>
        <li>
          Converti il PDF in Word con un convertitore da PDF a Word (anche quello di Word, che apre i PDF e li trasforma
          in documenti modificabili).
        </li>
        <li>Rivedi impaginazione, tabelle e caratteri: la conversione non è sempre perfetta.</li>
      </ol>

      <h2 id="xml-dentro">Se dentro c’è un XML</h2>
      <p>
        Una fattura elettronica non si trasforma in Word: si legge con un visualizzatore. Se ti serve una copia
        leggibile, vedi <Link href="/blog/fattura-elettronica-xml-p7m">Fattura elettronica XML.P7M</Link>.
      </p>

      <h2 id="tabella">Riepilogo</h2>
      <Table
        head={['Contenuto', 'Cosa fare', 'Per ottenere un Word']}
        rows={[
          ['File Word (.docx)', 'Estrai il documento', 'Non serve convertire'],
          ['PDF', 'Estrai il PDF', 'Convertilo da PDF a Word'],
          ['XML (fattura)', 'Estrai l’XML', 'Non adatto: usa un visualizzatore'],
          ['Immagine', 'Estrai l’immagine', 'Inseriscila in un documento Word'],
        ]}
      />

      <h2 id="qualita">Qualità della conversione</h2>
      <ul>
        <li>I PDF con testo selezionabile si convertono meglio.</li>
        <li>I PDF da scansione richiedono il riconoscimento del testo (OCR).</li>
        <li>Tabelle, colonne e immagini possono spostarsi: ricontrolla il risultato.</li>
        <li>Lavora su una copia e conserva l’originale.</li>
      </ul>
      <Callout>
        <strong>La firma non si converte.</strong> Il file Word non contiene la firma digitale: per provarla serve il
        file <code>.p7m</code> originale. Se devi far valere il documento, invia il P7M, non il Word.
      </Callout>

      <h2 id="conclusione">In sintesi</h2>
      <p>
        Per “convertire” un P7M in Word devi prima estrarre il documento: se è un Word hai finito, se è un PDF serve un
        convertitore. Tieni da parte il P7M originale.{' '}
        <Link href="/strumenti/apri-file-p7m">Estrai il tuo documento</Link>.
      </p>
    </>
  );
}
