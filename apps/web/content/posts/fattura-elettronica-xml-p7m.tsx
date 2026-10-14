import Link from 'next/link';
import type { Faq } from '@/lib/tool-content';
import { Callout, Table } from './shared';

export const toc = [
  { id: 'cose', title: 'Cos’è una fattura XML.P7M' },
  { id: 'perche-p7m', title: 'Perché la fattura è firmata' },
  { id: 'come-aprirla', title: 'Come aprirla e leggerla' },
  { id: 'contenuto', title: 'Cosa trovi nel file XML' },
  { id: 'pdf', title: 'Si può avere un PDF?' },
  { id: 'conservazione', title: 'Cosa conservare' },
  { id: 'problemi', title: 'Problemi frequenti' },
  { id: 'conclusione', title: 'In sintesi' },
  { id: 'domande', title: 'Domande frequenti' },
];

export const summary = [
  'Una fattura .xml.p7m è una fattura elettronica XML racchiusa in una busta di firma digitale.',
  'Per leggerla estrai il file XML dalla busta; il PDF è solo una copia di lettura.',
  'Il documento fiscale è il file XML (o XML.P7M): conservalo sempre nella sua forma originale.',
];

export const faq: Faq[] = [
  {
    q: 'Come si apre una fattura XML.P7M?',
    a: 'Si estrae il file XML dalla busta di firma con uno strumento online o con un software di firma. Poi lo leggi con un visualizzatore di fatture elettroniche o lo importi nel gestionale.',
  },
  {
    q: 'Una fattura in PDF ha valore come quella XML?',
    a: 'No. La fattura elettronica è il file XML trasmesso tramite il Sistema di Interscambio: il PDF è una copia di cortesia, utile per leggerla, ma non è il documento fiscale.',
  },
  {
    q: 'Perché alcune fatture hanno estensione .p7m?',
    a: 'Perché sono state firmate digitalmente in formato CAdES: il file XML è racchiuso in una busta e prende l’estensione .p7m. La firma non è obbligatoria in tutti i casi.',
  },
  {
    q: 'Posso aprire la fattura da smartphone?',
    a: 'Sì. Con uno strumento che lavora nel browser puoi estrarre l’XML da iPhone o Android; per leggerla comodamente serve poi un visualizzatore di fatture.',
  },
  {
    q: 'Il file XML estratto è identico all’originale?',
    a: 'Sì: l’estrazione recupera il contenuto della busta senza modificarlo. Conserva comunque anche il file .p7m originale.',
  },
];

export function Content() {
  return (
    <>
      <p>
        Hai ricevuto una fattura con nome tipo <code>IT01234567890_ABCDE.xml.p7m</code> e non sai come leggerla? Non sei
        solo: è uno dei casi più comuni per professionisti, partite IVA e uffici amministrativi. Ecco cos’è questo file,
        come aprirlo e cosa conservare. Per i dettagli sul formato vedi{' '}
        <Link href="/blog/file-p7m-cosa-sono">File P7M: cosa sono</Link>.
      </p>

      <h2 id="cose">Cos’è una fattura XML.P7M</h2>
      <p>
        La fattura elettronica italiana è un file <strong>XML</strong> che segue un tracciato definito e viene trasmesso
        tramite il Sistema di Interscambio (SdI). Se il file è stato firmato digitalmente in formato CAdES, l’XML viene
        racchiuso in una busta e il nome diventa <code>nomefile.xml.p7m</code>. Dentro la busta c’è quindi la fattura,
        insieme alla firma di chi l’ha emessa.
      </p>

      <h2 id="perche-p7m">Perché la fattura è firmata</h2>
      <p>
        La firma garantisce l’<strong>autenticità</strong> e l’<strong>integrità</strong> della fattura: sai chi l’ha
        emessa e che non è stata modificata dopo la firma. Nei rapporti con la pubblica amministrazione la firma è
        prevista; tra privati può non essere presente, per questo vedrai fatture sia <code>.xml</code> sia{' '}
        <code>.xml.p7m</code>. La regola applicabile al tuo caso dipende dal tipo di cliente e dalla modalità di
        trasmissione.
      </p>

      <h2 id="come-aprirla">Come aprire e leggere una fattura XML.P7M</h2>
      <ol>
        <li>
          Apri lo strumento <Link href="/strumenti/apri-file-p7m">Apri file P7M</Link> dal browser.
        </li>
        <li>
          Trascina il file <code>.xml.p7m</code> nella casella.
        </li>
        <li>
          Lo strumento estrae il file XML e ne mostra il <strong>contenuto testuale</strong>, insieme ai dati del
          firmatario.
        </li>
        <li>Scarica l’XML per importarlo nel gestionale o leggerlo con un visualizzatore di fatture.</li>
      </ol>
      <p>
        Il file viene letto nel browser e non è caricato su server, un vantaggio con documenti che contengono dati fiscali
        e personali.
      </p>

      <h2 id="contenuto">Cosa trovi nel file XML</h2>
      <Table
        head={['Sezione', 'Cosa contiene']}
        rows={[
          ['Cedente/prestatore', 'Dati di chi emette la fattura: denominazione, partita IVA, sede'],
          ['Cessionario/committente', 'Dati di chi riceve la fattura'],
          ['Dati generali', 'Tipo documento, data e numero, importo totale'],
          ['Dettaglio linee', 'Descrizione, quantità, prezzo e aliquota IVA di ogni voce'],
          ['Dati di pagamento', 'Modalità, scadenza e coordinate bancarie'],
        ]}
      />

      <h2 id="pdf">Si può avere la fattura in PDF?</h2>
      <p>
        Sì, ma è una <strong>copia di lettura</strong>. Puoi estrarre l’XML e generare un PDF per consultarlo più
        comodamente o girarlo a chi non usa un gestionale: vedi come fare in{' '}
        <Link href="/blog/come-convertire-p7m-in-pdf">Come convertire un P7M in PDF</Link>. Il documento fiscale, però,
        resta il file XML.
      </p>
      <Callout>
        <strong>Importante:</strong> un PDF non sostituisce la fattura elettronica. Se un cliente o il commercialista
        richiede il documento originale, invia il file XML (o XML.P7M).
      </Callout>

      <h2 id="conservazione">Cosa conservare</h2>
      <ul>
        <li>il file <code>.xml</code> o <code>.xml.p7m</code> originale, senza modifiche;</li>
        <li>le ricevute del Sistema di Interscambio, quando presenti;</li>
        <li>una copia PDF solo come comodità di lettura.</li>
      </ul>
      <p>
        Per gli obblighi di conservazione e i termini applicabili al tuo caso, rivolgiti al tuo commercialista o al
        servizio di conservazione che utilizzi.
      </p>

      <h2 id="problemi">Problemi frequenti</h2>
      <h3>Il file si apre ma sembra solo codice</h3>
      <p>
        È normale: l’XML è un formato per i programmi. Per vederlo impaginato usa un visualizzatore di fatture
        elettroniche o importalo nel gestionale.
      </p>
      <h3>Il file ha due estensioni .p7m</h3>
      <p>
        Un nome come <code>fattura.xml.p7m.p7m</code> indica una firma annidata: estrai i due livelli uno dopo l’altro.
      </p>
      <h3>La fattura è in un file .p7s</h3>
      <p>
        È una firma staccata: ti servono sia il file XML sia il file di firma.
      </p>

      <h2 id="conclusione">In sintesi</h2>
      <p>
        Una fattura XML.P7M è una fattura elettronica firmata: per leggerla basta estrarre l’XML dalla busta. Conserva
        l’originale e usa il PDF solo come copia di lettura.{' '}
        <Link href="/strumenti/apri-file-p7m">Apri la tua fattura XML.P7M</Link>.
      </p>
    </>
  );
}
