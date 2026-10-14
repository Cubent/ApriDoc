import Link from 'next/link';
import type { Faq } from '@/lib/tool-content';
import { Callout, Table } from './shared';

export const toc = [
  { id: 'perche-su-windows', title: 'Perché su Windows non si apre' },
  { id: 'browser', title: 'Metodo 1: dal browser' },
  { id: 'software', title: 'Metodo 2: software di firma' },
  { id: 'openssl', title: 'Metodo 3: OpenSSL' },
  { id: 'confronto', title: 'Quale scegliere' },
  { id: 'problemi', title: 'Problemi frequenti' },
  { id: 'conclusione', title: 'In sintesi' },
  { id: 'domande', title: 'Domande frequenti' },
];

export const summary = [
  'Windows non estrae il documento da un file .p7m con un doppio clic: serve uno strumento dedicato.',
  'Senza installare programmi puoi aprirlo dal browser; i software di firma servono per la verifica legale.',
  'Rinominare il file non funziona: il documento va estratto dalla busta.',
];

export const faq: Faq[] = [
  {
    q: 'Come si apre un file P7M su Windows?',
    a: 'Il modo più rapido è usare uno strumento online dal browser: trascini il file, vedi il documento e lo scarichi. In alternativa puoi usare un software di firma digitale o OpenSSL.',
  },
  {
    q: 'Posso aprire un P7M senza Dike o altri programmi di firma?',
    a: 'Sì. Per leggere o scaricare il documento basta uno strumento online che elabora il file nel browser. I programmi di firma servono quando ti occorre la verifica con valore legale.',
  },
  {
    q: 'Posso cambiare l’estensione da .p7m a .pdf?',
    a: 'No. Il file resta una busta di firma e un lettore PDF non riesce ad aprirlo. Il documento va estratto.',
  },
  {
    q: 'Il file P7M resta sul mio computer?',
    a: 'Con lo strumento di ApriDoc.com sì: viene letto nel browser e non è inviato a nessun server.',
  },
  {
    q: 'Funziona con Edge, Chrome e Firefox?',
    a: 'Sì, basta un browser moderno su Windows 10 o Windows 11.',
  },
];

export function Content() {
  return (
    <>
      <p>
        Su Windows un file <strong>.p7m</strong> non si apre facendo doppio clic: Esplora file non sa estrarre il
        documento dalla busta di firma, e i lettori PDF o Word non lo riconoscono. Ecco tre modi per aprirlo, dal più
        veloce al più completo. Se vuoi prima capire il formato, leggi{' '}
        <Link href="/blog/file-p7m-cosa-sono">File P7M: cosa sono</Link>.
      </p>

      <h2 id="perche-su-windows">Perché su Windows non si apre</h2>
      <p>
        Un P7M è un contenitore (formato CAdES) che racchiude il documento e la firma. Windows non lo associa a un
        programma in grado di leggerne il contenuto, quindi serve uno strumento che <strong>estragga</strong> il
        documento. Una volta estratto, il file si apre normalmente con Adobe Reader, Word o il programma adatto.
      </p>

      <h2 id="browser">Metodo 1: dal browser, senza installare nulla</h2>
      <p>
        Funziona con Edge, Chrome e Firefox. Con{' '}
        <Link href="/strumenti/apri-file-p7m">Apri file P7M di ApriDoc.com</Link>:
      </p>
      <ol>
        <li>Apri lo strumento dal browser.</li>
        <li>
          Trascina il file <code>.p7m</code> da Esplora file nella casella, oppure clicca per selezionarlo.
        </li>
        <li>Controlla il documento, il firmatario e la data di firma.</li>
        <li>Scarica il documento: lo trovi nella cartella Download.</li>
      </ol>
      <p>Il file è elaborato localmente, senza caricamento su server.</p>

      <h2 id="software">Metodo 2: con un software di firma digitale</h2>
      <p>
        I prestatori di servizi fiduciari offrono programmi gratuiti per Windows che estraggono il documento e verificano
        la firma. È la scelta giusta se ti serve una <strong>verifica con valore legale</strong>, per esempio per una
        pratica o un contenzioso. Troverai il software sul sito del prestatore che ha emesso la tua firma, oppure presso
        altri prestatori che offrono il programma di verifica.
      </p>

      <h2 id="openssl">Metodo 3: OpenSSL da riga di comando</h2>
      <p>
        Se hai OpenSSL (ad esempio incluso in Git per Windows), puoi estrarre il documento con questo comando:
      </p>
      <p>
        <code>openssl smime -verify -noverify -in documento.pdf.p7m -inform DER -out documento.pdf</code>
      </p>
      <p>
        Se il file è in formato testuale (Base64) usa <code>-inform PEM</code>. Il parametro <code>-noverify</code>{' '}
        salta il controllo dei certificati: il comando estrae il contenuto ma non verifica la firma.
      </p>

      <h2 id="confronto">Quale scegliere</h2>
      <Table
        head={['Metodo', 'Difficoltà', 'Quando usarlo']}
        rows={[
          ['Browser', 'Facile', 'Vuoi solo leggere o scaricare il documento'],
          ['Software di firma', 'Media', 'Ti serve la verifica con valore legale'],
          ['OpenSSL', 'Avanzata', 'Hai molti file o lavori da riga di comando'],
        ]}
      />
      <Callout>
        <strong>Aprire non è verificare.</strong> Estrarre il documento non prova che la firma sia valida. Conserva il
        file <code>.p7m</code> originale e usa un software qualificato quando il documento deve avere effetti legali.
      </Callout>

      <h2 id="problemi">Problemi frequenti su Windows</h2>
      <h3>Windows mostra il file con un’icona strana o chiede con quale app aprirlo</h3>
      <p>
        È normale: non c’è un’app predefinita per il formato. Non scegliere un lettore PDF: il file va prima estratto.
      </p>
      <h3>Vedo solo “documento.pdf” senza .p7m</h3>
      <p>
        Esplora file può nascondere le estensioni note. Attiva la visualizzazione delle estensioni dal menu Visualizza
        per vedere il nome completo e capire cosa contiene il file.
      </p>
      <h3>Il documento estratto non si apre</h3>
      <p>
        Controlla il tipo di file: un <code>.xml</code> è una fattura elettronica e non si apre con un lettore PDF.
      </p>

      <h2 id="conclusione">In sintesi</h2>
      <p>
        Su Windows un P7M si apre estraendone il documento. Il browser è il metodo più rapido, un software di firma serve
        per la verifica legale, OpenSSL per chi preferisce la riga di comando.{' '}
        <Link href="/strumenti/apri-file-p7m">Apri il tuo file P7M</Link>.
      </p>
    </>
  );
}
