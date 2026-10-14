import Link from 'next/link';
import type { Faq } from '@/lib/tool-content';
import { Callout, Table } from './shared';

export const toc = [
  { id: 'in-breve', title: 'La differenza in breve' },
  { id: 'p7m', title: 'P7M: firma avvolgente' },
  { id: 'p7s', title: 'P7S: firma staccata' },
  { id: 'pades', title: 'PAdES: firma nel PDF' },
  { id: 'xades', title: 'E XAdES?' },
  { id: 'confronto', title: 'Tabella comparativa' },
  { id: 'quale-ho', title: 'Quale formato ho ricevuto' },
  { id: 'conclusione', title: 'In sintesi' },
  { id: 'domande', title: 'Domande frequenti' },
];

export const summary = [
  'P7M: documento e firma nello stesso file (busta CAdES). Va estratto per leggere il documento.',
  'P7S: solo la firma, il documento è in un file separato che deve restare insieme.',
  'PAdES: la firma è dentro il PDF, che si apre normalmente con un lettore PDF.',
];

export const faq: Faq[] = [
  {
    q: 'Qual è la differenza tra P7M e P7S?',
    a: 'Il P7M contiene sia il documento sia la firma (firma avvolgente); il P7S contiene solo la firma, mentre il documento è un file a parte (firma staccata).',
  },
  {
    q: 'Cosa significa PAdES?',
    a: 'PAdES è il formato di firma incorporata nei file PDF. Il documento resta un normale PDF, con la firma al suo interno.',
  },
  {
    q: 'Meglio P7M o PAdES?',
    a: 'Dipende dall’uso. PAdES è più comodo per i PDF perché si apre subito; il P7M è più generale e funziona con qualsiasi tipo di file. Il valore legale dipende dal tipo di firma, non dal formato.',
  },
  {
    q: 'Un file P7S si può aprire da solo?',
    a: 'No. Contiene soltanto la firma: senza il documento originale a cui si riferisce non c’è nulla da leggere.',
  },
  {
    q: 'Il formato cambia il valore legale?',
    a: 'In generale il valore dipende dal tipo di firma (ad esempio una firma elettronica qualificata) e dal certificato, non dall’estensione. I requisiti specifici possono dipendere dal contesto d’uso.',
  },
];

export function Content() {
  return (
    <>
      <p>
        <strong>P7M, P7S e PAdES</strong> sono tre modi di firmare digitalmente un documento. Si somigliano e si
        confondono facilmente, ma si comportano in modo diverso quando devi aprirli. Questa guida spiega le differenze e
        ti aiuta a riconoscere quale hai ricevuto. Per i dettagli sul P7M vedi{' '}
        <Link href="/blog/file-p7m-cosa-sono">File P7M: cosa sono</Link>.
      </p>

      <h2 id="in-breve">La differenza in breve</h2>
      <p>
        La domanda da farsi è: <em>dove si trova la firma rispetto al documento?</em> Nel P7M documento e firma sono
        insieme in una busta; nel P7S sono in due file separati; nel PAdES la firma è incorporata nel PDF.
      </p>

      <h2 id="p7m">P7M: firma avvolgente (CAdES)</h2>
      <p>
        Il file <code>.p7m</code> è una busta che racchiude il documento originale e la firma digitale. Il nome conserva
        l’estensione originale (<code>contratto.pdf.p7m</code>). Poiché il documento è <em>dentro</em> la struttura di
        firma, un lettore PDF non lo apre: va prima estratto, ad esempio con lo strumento{' '}
        <Link href="/strumenti/apri-file-p7m">Apri file P7M</Link>.
      </p>

      <h2 id="p7s">P7S: firma staccata (CAdES)</h2>
      <p>
        Il file <code>.p7s</code> contiene <strong>solo la firma</strong>. Il documento resta un file a parte e i due
        devono essere conservati insieme: senza uno dei due non si può né leggere né verificare. Si incontra, per esempio,
        quando il documento è molto grande o deve restare leggibile così com’è.
      </p>

      <h2 id="pades">PAdES: firma nel PDF</h2>
      <p>
        Con il formato <strong>PAdES</strong> la firma è incorporata nel file PDF. Il documento resta un normale{' '}
        <code>.pdf</code>: lo apri subito con qualsiasi lettore, che mostra l’esito della firma in un pannello o con
        un’etichetta. È il formato più comodo per i PDF.
      </p>

      <h2 id="xades">E XAdES?</h2>
      <p>
        <strong>XAdES</strong> è la firma per i file XML, la firma è inserita nell’XML stesso. Si usa, tra l’altro, per le
        fatture elettroniche, che possono essere firmate anche in questo modo invece che in formato P7M. Vedi{' '}
        <Link href="/blog/fattura-elettronica-xml-p7m">Fattura elettronica XML.P7M</Link>.
      </p>

      <h2 id="confronto">Tabella comparativa</h2>
      <Table
        head={['Formato', 'Estensione', 'Dove sta la firma', 'Come si apre']}
        rows={[
          ['CAdES avvolgente', '.p7m', 'Insieme al documento, in una busta', 'Estraendo il documento'],
          ['CAdES staccata', '.p7s', 'In un file separato', 'Serve anche il documento originale'],
          ['PAdES', '.pdf', 'Dentro il PDF', 'Con un normale lettore PDF'],
          ['XAdES', '.xml', 'Dentro il file XML', 'Come un XML; la firma è nel file'],
        ]}
      />

      <h2 id="quale-ho">Quale formato ho ricevuto</h2>
      <ul>
        <li>
          <strong>Il nome finisce con .p7m</strong> → busta CAdES: estrai il documento.
        </li>
        <li>
          <strong>Il nome finisce con .p7s</strong> → solo la firma: cerca il documento originale.
        </li>
        <li>
          <strong>È un .pdf che si apre e mostra una firma</strong> → PAdES.
        </li>
        <li>
          <strong>È un .xml con una firma</strong> → XAdES (fattura o altro file XML).
        </li>
      </ul>
      <Callout>
        <strong>Valore legale:</strong> non dipende dall’estensione ma dal tipo di firma e dal certificato. Per una
        verifica completa serve un software di verifica qualificato: aprire il file non basta.
      </Callout>

      <h2 id="conclusione">In sintesi</h2>
      <p>
        P7M avvolge documento e firma, P7S contiene solo la firma, PAdES incorpora la firma nel PDF. Riconoscere il
        formato ti dice subito come aprire il file. Se hai un P7M,{' '}
        <Link href="/strumenti/apri-file-p7m">estrai il documento</Link> in pochi secondi.
      </p>
    </>
  );
}
