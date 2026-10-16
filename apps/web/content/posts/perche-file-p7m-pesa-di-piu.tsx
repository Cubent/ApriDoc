import Link from 'next/link';
import type { Faq } from '@/lib/tool-content';
import { Callout, Table } from './shared';

export const toc = [
  { id: 'risposta', title: 'La risposta breve' },
  { id: 'cosa-aggiunge', title: 'Cosa aggiunge la busta' },
  { id: 'base64', title: 'Il caso Base64' },
  { id: 'quanto', title: 'Quanto in più pesa' },
  { id: 'ridurre', title: 'Si può ridurre?' },
  { id: 'invio', title: 'Consigli per l’invio' },
  { id: 'conclusione', title: 'In sintesi' },
  { id: 'domande', title: 'Domande frequenti' },
];

export const summary = [
  'Un P7M pesa più del documento originale perché contiene anche firma, certificato e altri dati.',
  'Se il file è codificato in Base64 la dimensione cresce di circa un terzo.',
  'Il documento estratto ha la stessa dimensione dell’originale: il peso extra è solo della busta.',
];

export const faq: Faq[] = [
  {
    q: 'Perché il file P7M è più grande del PDF originale?',
    a: 'Perché oltre al documento contiene la firma digitale, il certificato del firmatario e, spesso, la catena dei certificati dell’ente emittente.',
  },
  {
    q: 'Di quanto è più grande?',
    a: 'In genere di alcuni kilobyte, in base ai certificati inclusi. Se il file è in formato testuale (Base64) la dimensione cresce di circa un terzo.',
  },
  {
    q: 'Il PDF estratto pesa quanto l’originale?',
    a: 'Sì: l’estrazione recupera il documento così com’era, senza ricompressione.',
  },
  {
    q: 'Posso comprimere un P7M?',
    a: 'Modificare il file ne altera la firma. Se devi ridurre il peso, comprimi il documento originale prima di firmarlo, oppure invia il file in un archivio ZIP.',
  },
  {
    q: 'Un file P7M molto piccolo è un problema?',
    a: 'Se pesa pochissimo (pochi byte) è probabilmente incompleto o danneggiato. Scaricalo di nuovo.',
  },
];

export function Content() {
  return (
    <>
      <p>
        Confronti un PDF con la sua versione <code>.pdf.p7m</code> e noti che il secondo è più grande: non è un errore.
        Ecco da dove viene la differenza di peso e cosa puoi fare. Per capire il formato leggi{' '}
        <Link href="/blog/file-p7m-cosa-sono">File P7M: cosa sono</Link>.
      </p>

      <h2 id="risposta">La risposta breve</h2>
      <p>
        Un P7M non contiene solo il documento: contiene una <strong>busta di firma</strong>. Il documento originale è
        incluso integralmente e a esso si aggiungono la firma e i dati che servono a verificarla.
      </p>

      <h2 id="cosa-aggiunge">Cosa aggiunge la busta</h2>
      <Table
        head={['Elemento', 'A cosa serve']}
        rows={[
          ['Documento originale', 'Il contenuto firmato, byte per byte'],
          ['Firma digitale', 'L’impronta del documento cifrata con la chiave del firmatario'],
          ['Certificato del firmatario', 'Nome, ente emittente, periodo di validità'],
          ['Catena di certificati', 'I certificati degli enti che hanno emesso quello del firmatario'],
          ['Attributi firmati', 'Algoritmo di hash e, se presente, data e ora di firma'],
        ]}
      />

      <h2 id="base64">Il caso Base64</h2>
      <p>
        Alcuni file P7M sono salvati in forma testuale (Base64, a volte chiamata PEM) invece che binaria. Questa
        codifica rappresenta i dati con caratteri leggibili e aumenta le dimensioni di circa un <strong>terzo</strong>.
        È una differenza di codifica: il contenuto è lo stesso.
      </p>

      <h2 id="quanto">Quanto in più pesa</h2>
      <p>
        La parte aggiunta è di solito piccola rispetto a un documento di qualche centinaio di kilobyte, ma può contare su
        file molto leggeri. Dipende dal numero di certificati inclusi e dal numero di firme: ogni firma aggiunge i propri
        dati. Un file con doppia firma, per esempio, è più grande di uno con una sola; vedi{' '}
        <Link href="/blog/doppia-firma-digitale-p7m">doppia firma P7M</Link>.
      </p>

      <h2 id="ridurre">Si può ridurre?</h2>
      <Callout>
        <strong>Non modificare il P7M.</strong> Qualsiasi alterazione del file può invalidare la firma. Riduci il peso{' '}
        <em>prima</em> di firmare, comprimendo il documento originale.
      </Callout>
      <ul>
        <li>comprimi il PDF o riduci le immagini prima di apporre la firma;</li>
        <li>evita certificati o allegati superflui;</li>
        <li>se devi inviare più file, usa un archivio ZIP.</li>
      </ul>

      <h2 id="invio">Consigli per l’invio</h2>
      <ul>
        <li>controlla il limite di dimensione degli allegati del tuo servizio di posta o della PEC;</li>
        <li>se l’allegato è troppo grande, usa un servizio di condivisione file e invia il link;</li>
        <li>conserva sempre il file <code>.p7m</code> originale, senza modificarlo.</li>
      </ul>

      <h2 id="conclusione">In sintesi</h2>
      <p>
        Il P7M pesa più del documento perché include firma e certificati. Il documento estratto ha la dimensione
        originale. Se vuoi leggerlo,{' '}
        <Link href="/strumenti/apri-file-p7m">apri il tuo P7M</Link>.
      </p>
    </>
  );
}
