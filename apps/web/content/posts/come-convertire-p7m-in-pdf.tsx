import Link from 'next/link';
import type { Faq } from '@/lib/tool-content';
import { Callout, Table } from './shared';

export const toc = [
  { id: 'estrarre-o-convertire', title: 'Estrarre o convertire?' },
  { id: 'passaggi', title: 'Come convertire un P7M in PDF' },
  { id: 'per-formato', title: 'Cosa succede a seconda del contenuto' },
  { id: 'pdf-a', title: 'PDF/A e opzioni utili' },
  { id: 'valore-legale', title: 'Il PDF ha valore legale?' },
  { id: 'errori', title: 'Errori da evitare' },
  { id: 'conclusione', title: 'In sintesi' },
  { id: 'domande', title: 'Domande frequenti' },
];

export const summary = [
  'Se la busta .p7m contiene già un PDF, non si converte nulla: si estrae il documento originale.',
  'Se contiene un altro formato (XML, immagine, Word) puoi ottenere un PDF dopo l’estrazione.',
  'Il PDF ottenuto non conserva la firma: per il valore legale conserva sempre il file .p7m originale.',
];

export const faq: Faq[] = [
  {
    q: 'Come si converte un P7M in PDF?',
    a: 'Si apre il file con uno strumento che estrae il contenuto dalla busta di firma. Se dentro c’è un PDF, lo scarichi così com’è; se c’è un altro formato, puoi generare un PDF a partire dal contenuto estratto.',
  },
  {
    q: 'Convertire un P7M in PDF mantiene la firma digitale?',
    a: 'No. La firma resta nel file .p7m: il PDF ottenuto contiene il documento, non la busta di firma. Conserva il file originale se ti serve dimostrare la firma.',
  },
  {
    q: 'Posso convertire un P7M in PDF/A?',
    a: 'Sì, è possibile generare un PDF/A, il formato pensato per l’archiviazione a lungo termine. Con lo strumento di ApriDoc.com lo attivi dalle opzioni di download.',
  },
  {
    q: 'Cosa faccio con una fattura XML.P7M?',
    a: 'La busta contiene un file XML. Puoi estrarlo e leggerlo, oppure generare un PDF per consultarla più comodamente. Il documento fiscale resta il file XML.',
  },
  {
    q: 'Serve installare un programma?',
    a: 'No: con uno strumento online che lavora nel browser trascini il file e scarichi il risultato senza installare nulla. Il file non viene caricato su un server.',
  },
];

export function Content() {
  return (
    <>
      <p>
        Quando cerchi <strong>come convertire un P7M in PDF</strong> vuoi, quasi sempre, una cosa semplice: leggere il
        documento senza programmi di firma digitale. La risposta dipende da cosa c’è dentro la busta. Qui trovi i
        passaggi e i casi da conoscere. Se ti serve prima capire il formato, leggi{' '}
        <Link href="/blog/file-p7m-cosa-sono">File P7M: cosa sono e come funzionano</Link>.
      </p>

      <h2 id="estrarre-o-convertire">Estrarre o convertire: qual è la differenza</h2>
      <p>
        Un file <code>.p7m</code> non è un formato di documento, è una <strong>busta di firma digitale</strong> che
        contiene un file. Per questo spesso non c’è nulla da “convertire”: il PDF è già dentro e basta{' '}
        <strong>estrarlo</strong>, ottenendo il documento originale identico, byte per byte.
      </p>
      <p>
        La conversione vera e propria serve quando il contenuto <em>non</em> è un PDF: un’immagine, un file Word o un
        XML di fattura. In quel caso prima si estrae il file e poi lo si trasforma in PDF.
      </p>

      <h2 id="passaggi">Come convertire un P7M in PDF, passo passo</h2>
      <ol>
        <li>
          Apri la pagina <Link href="/strumenti/convertire-p7m-in-pdf">da P7M a PDF</Link> dal browser.
        </li>
        <li>
          Trascina il file <code>.p7m</code> nella casella oppure selezionalo dal dispositivo.
        </li>
        <li>Controlla il documento estratto e i dati del firmatario, se ti servono.</li>
        <li>
          Premi <strong>Scarica PDF</strong>. Dalle opzioni puoi attivare il PDF/A, i dati della firma e la numerazione
          delle pagine.
        </li>
      </ol>
      <p>Il file viene elaborato nel browser: non è inviato a nessun server.</p>

      <h2 id="per-formato">Cosa succede a seconda del contenuto</h2>
      <Table
        head={['Nome del file', 'Cosa contiene', 'Risultato']}
        rows={[
          ['contratto.pdf.p7m', 'Un PDF', 'Estrai il PDF originale, senza alterazioni'],
          ['fattura.xml.p7m', 'Una fattura XML', 'Estrai l’XML e, se vuoi, genera un PDF per leggerla'],
          ['foto.jpg.p7m', 'Un’immagine', 'Estrai l’immagine e trasformala in PDF'],
          ['lettera.docx.p7m', 'Un file Word', 'Estrai il documento e salvalo come PDF dal programma'],
          ['atto.pdf.p7m.p7m', 'Un PDF firmato due volte', 'Estrai i due livelli, poi usa il PDF'],
        ]}
      />

      <h2 id="pdf-a">PDF/A e opzioni utili</h2>
      <p>
        Il <strong>PDF/A</strong> è una variante del PDF pensata per la conservazione nel tempo: incorpora i font e non
        dipende da risorse esterne. Può servire se devi archiviare il documento o consegnarlo a un ente che lo richiede.
        Hai poi la possibilità di aggiungere una pagina con i dati della firma, utile per mostrare chi ha firmato e quando
        senza dover allegare il file originale.
      </p>

      <h2 id="valore-legale">Il PDF ottenuto ha valore legale?</h2>
      <p>
        Il PDF estratto è una <em>copia di lettura</em>: contiene il documento, ma non la firma digitale. Il valore legale
        sta nel file <code>.p7m</code> firmato. Per questo:
      </p>
      <ul>
        <li>conserva sempre il file <code>.p7m</code> originale;</li>
        <li>invia il P7M, non il PDF, quando il destinatario deve verificare la firma;</li>
        <li>usa un software di verifica qualificato se devi dimostrare la validità in un procedimento.</li>
      </ul>
      <Callout>
        <strong>Aprire non è verificare.</strong> Estrarre il contenuto di un P7M e controllarne la firma sono operazioni
        diverse. Lo strumento di ApriDoc.com mostra i dati della firma, ma non esegue la verifica con valore legale.
      </Callout>

      <h2 id="errori">Errori da evitare</h2>
      <ul>
        <li>
          <strong>Rinominare il file</strong> togliendo <code>.p7m</code>: non estrae il documento e il file non si apre.
        </li>
        <li>
          <strong>Stampare in PDF</strong> un documento aperto da un lettore di firma: perdi la qualità e il testo
          selezionabile. Meglio estrarre l’originale.
        </li>
        <li>
          <strong>Buttare il P7M</strong> dopo aver ottenuto il PDF: è l’unico file che contiene la firma.
        </li>
      </ul>

      <h2 id="conclusione">In sintesi</h2>
      <p>
        Per “convertire” un P7M in PDF di solito basta estrarre il documento dalla busta. Se il contenuto è un altro
        formato lo trasformi in PDF dopo l’estrazione. Tieni il P7M originale per il valore legale.{' '}
        <Link href="/strumenti/convertire-p7m-in-pdf">Converti ora il tuo P7M in PDF</Link>.
      </p>
    </>
  );
}
