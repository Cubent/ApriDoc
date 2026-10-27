import Link from 'next/link';
import type { Faq } from '@/lib/tool-content';
import { Table } from './shared';

export const toc = [
  { id: 'differenza', title: 'La differenza in una riga' },
  { id: 'confronto', title: 'Confronto rapido' },
  { id: 'quando-p7m', title: 'Quando usare il P7M' },
  { id: 'quando-pdf', title: 'Quando basta un PDF firmato' },
  { id: 'convertire', title: 'Da un formato all’altro' },
  { id: 'conclusione', title: 'In sintesi' },
  { id: 'domande', title: 'Domande frequenti' },
];

export const summary = [
  'Il P7M è una busta che contiene documento e firma; il PDF firmato (PAdES) ha la firma dentro il PDF.',
  'Il PDF firmato si apre con qualsiasi lettore, il P7M richiede uno strumento che apra la busta.',
  'Spesso il formato lo decide chi riceve: in dubbio, chiedi cosa accetta.',
];

export const faq: Faq[] = [
  {
    q: 'È meglio P7M o PDF firmato?',
    a: 'Dipende da chi riceve. Il PDF firmato è più comodo da leggere; il P7M è richiesto da alcuni enti e per formati diversi dal PDF, come l’XML delle fatture.',
  },
  {
    q: 'Un PDF firmato ha lo stesso valore di un P7M?',
    a: 'Se la firma è qualificata e valida, sì: cambia il formato tecnico, non l’efficacia.',
  },
  {
    q: 'Posso trasformare un P7M in PDF firmato?',
    a: 'No, estrarre il PDF dal P7M ne elimina la firma. Per avere un PDF firmato serve firmarlo di nuovo, con la firma del titolare.',
  },
  {
    q: 'Perché la mia fattura è .xml.p7m?',
    a: 'Perché è un file XML firmato in formato CAdES: il contenuto non è un PDF, quindi la firma viene racchiusa in una busta.',
  },
];

export function Content() {
  return (
    <>
      <p>
        Devi inviare un documento firmato e non sai se scegliere un <strong>P7M o un PDF</strong>? Oppure ne hai
        ricevuto uno e ti chiedi perché non è un normale PDF. Ecco la differenza, spiegata senza sigle inutili.
      </p>

      <h2 id="differenza">La differenza in una riga</h2>
      <p>
        Un <strong>P7M</strong> è una busta (formato CAdES) che racchiude il documento originale e la firma. Un{' '}
        <strong>PDF firmato</strong> (formato PAdES) è un normale PDF con la firma incorporata.
      </p>

      <h2 id="confronto">Confronto rapido</h2>
      <Table
        head={['', 'P7M (CAdES)', 'PDF firmato (PAdES)']}
        rows={[
          ['Estensione', '.p7m (es. contratto.pdf.p7m)', '.pdf'],
          ['Si apre con', 'Strumento che apre la busta', 'Qualsiasi lettore PDF'],
          ['Formati supportati', 'Qualsiasi file (PDF, XML, Word…)', 'Solo PDF'],
          ['Firma visibile', 'Non nel documento', 'Può avere un riquadro visibile'],
        ]}
      />

      <h2 id="quando-p7m">Quando usare il P7M</h2>
      <ul>
        <li>quando il documento <strong>non è un PDF</strong>, come una fattura XML;</li>
        <li>quando l’ente o il cliente <strong>richiede esplicitamente</strong> il formato CAdES;</li>
        <li>per le comunicazioni con la pubblica amministrazione che lo prevedono.</li>
      </ul>

      <h2 id="quando-pdf">Quando basta un PDF firmato</h2>
      <ul>
        <li>quando il destinatario non è pratico e vuole <strong>aprire il file con un clic</strong>;</li>
        <li>quando vuoi una firma visibile sul documento;</li>
        <li>per contratti e moduli scambiati tra privati e aziende.</li>
      </ul>

      <h2 id="convertire">Da un formato all’altro</h2>
      <p>
        Puoi <strong>estrarre</strong> il PDF da un P7M, ma ottieni il documento senza firma: per i dettagli leggi{' '}
        <Link href="/blog/come-convertire-p7m-in-pdf">Come convertire un P7M in PDF</Link>. Per capire anche il P7S
        guarda <Link href="/blog/differenza-p7m-p7s-pades">Differenza tra P7M, P7S e PAdES</Link>.
      </p>

      <h2 id="conclusione">In sintesi</h2>
      <p>
        Stesso valore, formato diverso: scegli in base a chi riceve. Hai un P7M da leggere?{' '}
        <Link href="/strumenti/apri-file-p7m">Aprilo qui, nel browser</Link>.
      </p>
    </>
  );
}
