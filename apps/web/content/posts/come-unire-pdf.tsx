import Link from 'next/link';
import type { Faq } from '@/lib/tool-content';
import { Callout } from './shared';

export const toc = [
  { id: 'passaggi', title: 'Come unire i PDF in 3 passaggi' },
  { id: 'ordine', title: 'Mettere le pagine nell’ordine giusto' },
  { id: 'prima-di-unire', title: 'Prima di unire' },
  { id: 'firmati', title: 'PDF firmati e file P7M' },
  { id: 'conclusione', title: 'In sintesi' },
  { id: 'domande', title: 'Domande frequenti' },
];

export const summary = [
  'Puoi unire più PDF in un unico file nel browser, scegliendo l’ordine dei documenti.',
  'Prima di unire, ruota o elimina le pagine che non servono.',
  'Unire un PDF firmato ne invalida la firma: unisci le copie, conserva gli originali.',
];

export const faq: Faq[] = [
  {
    q: 'Come unisco più PDF in uno?',
    a: 'Carica i file nello strumento Unisci PDF, scegli l’ordine e scarica il documento unico.',
  },
  {
    q: 'Posso cambiare l’ordine dei file?',
    a: 'Sì, prima di unire puoi decidere la sequenza. Per riordinare le pagine dopo l’unione usa Organizza PDF.',
  },
  {
    q: 'Unire i PDF peggiora la qualità?',
    a: 'No: le pagine vengono combinate, non ricompresse. Testo e immagini restano quelli originali.',
  },
  {
    q: 'I miei file vengono caricati su un server?',
    a: 'No: l’unione avviene nel browser e i file non lasciano il tuo dispositivo.',
  },
  {
    q: 'Posso unire un PDF firmato?',
    a: 'Tecnicamente sì, ma la firma digitale non sarà più valida nel file unito, perché il documento cambia. Conserva gli originali firmati.',
  },
];

export function Content() {
  return (
    <>
      <p>
        Contratto, allegati, documenti d’identità: spesso devi consegnare <strong>un solo PDF</strong> e invece ne hai
        quattro. <strong>Unire più PDF</strong> è rapido e gratuito, e il risultato è un file ordinato da inviare in un
        colpo solo.
      </p>

      <h2 id="passaggi">Come unire i PDF in 3 passaggi</h2>
      <ol>
        <li>
          <strong>Apri lo strumento.</strong> Vai su <Link href="/strumenti/unisci-pdf-online">Unisci PDF</Link>.
        </li>
        <li>
          <strong>Aggiungi i file</strong> e mettili nell’ordine in cui vuoi che compaiano.
        </li>
        <li>
          <strong>Scarica il PDF unico.</strong> Tutto avviene nel browser, senza upload.
        </li>
      </ol>

      <h2 id="ordine">Mettere le pagine nell’ordine giusto</h2>
      <p>
        Il consiglio più utile: <strong>numera i file prima</strong> (01-contratto, 02-allegato…), così li trovi nella
        sequenza corretta. Se dopo l’unione devi spostare qualche pagina, usa{' '}
        <Link href="/strumenti/organizza-pdf-online">Organizza PDF</Link>.
      </p>

      <h2 id="prima-di-unire">Prima di unire</h2>
      <ul>
        <li>
          pagine storte? <Link href="/strumenti/ruota-pdf-online">Ruotale</Link> prima;
        </li>
        <li>
          pagine in più? <Link href="/blog/eliminare-pagine-da-pdf">Eliminale</Link> per avere un file più leggero;
        </li>
        <li>
          foto o scansioni? <Link href="/blog/come-trasformare-foto-in-pdf">Trasformale in PDF</Link> e poi uniscile.
        </li>
      </ul>

      <h2 id="firmati">PDF firmati e file P7M</h2>
      <Callout>
        <strong>Unire modifica il documento.</strong> Se un PDF è firmato digitalmente, la firma non resta valida nel
        file unito. Unisci solo copie di lettura e conserva gli originali firmati.
      </Callout>
      <p>
        Hai dei file <code>.p7m</code>? Prima estrai il documento con{' '}
        <Link href="/strumenti/apri-file-p7m">Apri file P7M</Link>, poi uniscili. Dettagli in{' '}
        <Link href="/blog/estrarre-pdf-da-p7m">Come estrarre un PDF da un P7M</Link>.
      </p>

      <h2 id="conclusione">In sintesi</h2>
      <p>
        Carica, ordina, scarica. <Link href="/strumenti/unisci-pdf-online">Unisci ora i tuoi PDF</Link>.
      </p>
    </>
  );
}
