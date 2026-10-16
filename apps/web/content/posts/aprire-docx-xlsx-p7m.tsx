import Link from 'next/link';
import type { Faq } from '@/lib/tool-content';
import { Callout, Table } from './shared';

export const toc = [
  { id: 'cosa-sono', title: 'Cosa sono Word ed Excel firmati' },
  { id: 'come-aprirli', title: 'Come aprirli' },
  { id: 'formati', title: 'Quali formati trovi' },
  { id: 'modificare', title: 'Posso modificarli?' },
  { id: 'firma-interna', title: 'Firma nel file o in una busta' },
  { id: 'problemi', title: 'Problemi frequenti' },
  { id: 'conclusione', title: 'In sintesi' },
  { id: 'domande', title: 'Domande frequenti' },
];

export const summary = [
  'Un Word o un Excel con estensione aggiuntiva .p7m è un file Office racchiuso in una busta di firma.',
  'Si apre estraendo il file e poi usando Word o Excel come al solito.',
  'Se modifichi il documento estratto, la firma originale non si applica più al nuovo file.',
];

export const faq: Faq[] = [
  {
    q: 'Come si apre un file Word firmato in formato P7M?',
    a: 'Estraendo il documento dalla busta di firma con uno strumento online o con un software di firma. Il file Word ottenuto si apre normalmente con Word o un programma compatibile.',
  },
  {
    q: 'Posso modificare il documento dopo averlo estratto?',
    a: 'Sì, ma la modifica produce un nuovo file: la firma originale riguarda il documento com’era quando è stato firmato, quindi non vale per la versione modificata.',
  },
  {
    q: 'Perché il file Excel sembra non avere dati?',
    a: 'Se hai provato ad aprire il P7M direttamente con Excel, il programma non riconosce la busta. Estrai prima il file e aprilo dal documento ottenuto.',
  },
  {
    q: 'È meglio firmare in PDF che in Word?',
    a: 'In genere i documenti destinati a essere conservati o inviati a terzi si firmano in PDF, perché il formato è stabile e non modificabile facilmente. La scelta dipende dalle regole di chi riceve il documento.',
  },
  {
    q: 'Lo strumento di ApriDoc.com apre anche i file DOCX e XLSX?',
    a: 'Estrae qualsiasi documento contenuto nella busta, compresi Word ed Excel. Per leggerli poi usi il programma Office.',
  },
];

export function Content() {
  return (
    <>
      <p>
        Ti è arrivato un file con un nome come <code>contratto.docx.p7m</code> o <code>budget.xlsx.p7m</code>? Dentro c’è
        un normale documento Office, chiuso in una busta di firma digitale. Ecco come aprirlo e cosa succede se lo
        modifichi. Le basi del formato sono in <Link href="/blog/file-p7m-cosa-sono">File P7M: cosa sono</Link>.
      </p>

      <h2 id="cosa-sono">Cosa sono Word ed Excel firmati</h2>
      <p>
        Il nome conserva l’estensione originale e aggiunge quella della busta: <code>.docx</code> o <code>.xlsx</code>{' '}
        indicano il documento, <code>.p7m</code> la firma che lo avvolge. Word ed Excel non sanno leggere la busta,
        quindi aprendo direttamente il file compare un errore o la richiesta di scegliere un programma.
      </p>

      <h2 id="come-aprirli">Come aprirli</h2>
      <ol>
        <li>
          Apri <Link href="/strumenti/apri-file-p7m">Apri file P7M</Link> dal browser.
        </li>
        <li>Trascina il file nella casella.</li>
        <li>Controlla firmatario e data, poi scarica il documento estratto.</li>
        <li>Apri il file ottenuto con Word, Excel o un programma compatibile.</li>
      </ol>
      <p>Il file è elaborato nel browser, senza caricamento su server.</p>

      <h2 id="formati">Quali formati trovi</h2>
      <Table
        head={['Nome del file', 'Contiene', 'Si apre con']}
        rows={[
          ['relazione.docx.p7m', 'Documento Word', 'Word, LibreOffice Writer'],
          ['budget.xlsx.p7m', 'Foglio di calcolo', 'Excel, LibreOffice Calc'],
          ['slide.pptx.p7m', 'Presentazione', 'PowerPoint, LibreOffice Impress'],
          ['modulo.odt.p7m', 'Documento OpenDocument', 'LibreOffice, Word'],
        ]}
      />

      <h2 id="modificare">Posso modificarli?</h2>
      <p>
        Puoi modificare il file estratto come un normale documento Office. Ricorda però che la firma digitale attesta il
        contenuto <em>al momento della firma</em>: dopo una modifica, il nuovo file non è più quello firmato. Se devi
        conservare la prova della firma, tieni da parte il <code>.p7m</code> originale e lavora su una copia.
      </p>

      <Callout>
        <strong>Attenzione:</strong> aprire e modificare un documento Office estratto non cambia il P7M originale. Per
        avere un documento firmato con le tue modifiche, va firmato di nuovo.
      </Callout>

      <h2 id="firma-interna">Firma nel file o in una busta</h2>
      <p>
        Alcuni documenti Office possono contenere una firma <em>interna</em> al file, senza la busta P7M: in quel caso il
        file ha l’estensione normale (<code>.docx</code>) e si apre direttamente. Il P7M compare quando la firma è
        stata apposta con un software di firma che avvolge il file in una busta CAdES.
      </p>

      <h2 id="problemi">Problemi frequenti</h2>
      <h3>Il documento estratto è danneggiato</h3>
      <p>
        Scarica di nuovo il P7M e ripeti l’estrazione. Se il problema persiste, consulta{' '}
        <Link href="/blog/p7m-non-si-apre">Il P7M non si apre: 7 cause e soluzioni</Link>.
      </p>
      <h3>Mi serve un PDF</h3>
      <p>
        Apri il documento estratto in Word o Excel e salvalo come PDF dal programma. Per i PDF vedi{' '}
        <Link href="/blog/come-convertire-p7m-in-pdf">Come convertire un P7M in PDF</Link>.
      </p>

      <h2 id="conclusione">In sintesi</h2>
      <p>
        Un Word o un Excel con estensione P7M è un normale file Office in una busta di firma: estrailo e aprilo come
        sempre. Conserva il P7M per la prova della firma.{' '}
        <Link href="/strumenti/apri-file-p7m">Estrai il tuo documento</Link>.
      </p>
    </>
  );
}
