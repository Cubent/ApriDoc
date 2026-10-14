import Link from 'next/link';
import type { Faq } from '@/lib/tool-content';
import { Callout } from './shared';

export const toc = [
  { id: 'perche-da-mobile', title: 'Perché da telefono sembra impossibile' },
  { id: 'iphone', title: 'Come aprire un P7M da iPhone' },
  { id: 'android', title: 'Come aprire un P7M da Android' },
  { id: 'dalla-mail', title: 'Se il P7M arriva via email o WhatsApp' },
  { id: 'dopo', title: 'Dopo l’estrazione' },
  { id: 'problemi', title: 'Problemi frequenti' },
  { id: 'conclusione', title: 'In sintesi' },
  { id: 'domande', title: 'Domande frequenti' },
];

export const summary = [
  'Da iPhone e Android un P7M si apre dal browser, senza installare app.',
  'Basta scaricare l’allegato sul telefono e selezionarlo nello strumento online.',
  'Il file viene letto nel browser e non è inviato a nessun server.',
];

export const faq: Faq[] = [
  {
    q: 'Posso aprire un file P7M dal telefono?',
    a: 'Sì. Scarichi l’allegato sul telefono e lo selezioni in uno strumento online che lavora nel browser, come Safari o Chrome. Non serve installare nessuna app.',
  },
  {
    q: 'Serve un’app per aprire un P7M su iPhone?',
    a: 'No. Con Safari puoi aprire uno strumento online, scegliere il file dall’app File e leggere il documento.',
  },
  {
    q: 'Dove trovo il file dopo averlo scaricato?',
    a: 'Su iPhone nell’app File, di solito nella cartella Download o in “Su questo iPhone”. Su Android nell’app File o Download.',
  },
  {
    q: 'Posso aprire un P7M ricevuto su WhatsApp?',
    a: 'Sì: salva il file nel telefono e selezionalo nello strumento. Se il file non si scarica, chiedi al mittente di inviarlo come documento.',
  },
  {
    q: 'Il documento viene caricato online?',
    a: 'Con lo strumento di ApriDoc.com no: il file viene elaborato nel browser e resta sul tuo telefono.',
  },
];

export function Content() {
  return (
    <>
      <p>
        Ti arriva un <strong>.p7m</strong> sul telefono mentre sei fuori ufficio e devi leggerlo subito? Si può fare
        senza computer e senza installare app. Questa guida spiega come aprire un P7M da iPhone e da Android. Per capire
        il formato leggi <Link href="/blog/file-p7m-cosa-sono">File P7M: cosa sono</Link>.
      </p>

      <h2 id="perche-da-mobile">Perché da telefono sembra impossibile</h2>
      <p>
        Un file P7M è una busta di firma digitale che contiene il documento. Né il visualizzatore di Mail né quello di
        Android sanno estrarre il contenuto, per questo toccando l’allegato non succede nulla o compare solo
        l’opzione di condividerlo. Il documento va estratto con uno strumento adatto: il browser basta.
      </p>

      <h2 id="iphone">Come aprire un P7M da iPhone</h2>
      <ol>
        <li>
          <strong>Salva il file.</strong> Dalla mail tieni premuto l’allegato (o tocca l’icona di condivisione) e scegli{' '}
          <em>Salva su File</em>.
        </li>
        <li>
          <strong>Apri lo strumento</strong> in Safari:{' '}
          <Link href="/strumenti/apri-file-p7m">Apri file P7M</Link>.
        </li>
        <li>
          <strong>Tocca la casella</strong> e scegli <em>Sfoglia</em>, poi seleziona il file dalla cartella dove
          l’hai salvato.
        </li>
        <li>
          <strong>Leggi o scarica</strong> il documento. Il PDF si apre nell’anteprima del telefono.
        </li>
      </ol>

      <h2 id="android">Come aprire un P7M da Android</h2>
      <ol>
        <li>
          <strong>Scarica l’allegato</strong> dall’email: il file finisce nella cartella <em>Download</em>.
        </li>
        <li>
          <strong>Apri lo strumento</strong> in Chrome:{' '}
          <Link href="/strumenti/apri-file-p7m">Apri file P7M</Link>.
        </li>
        <li>
          <strong>Tocca la casella</strong> e scegli il file dai documenti o dai download.
        </li>
        <li>
          <strong>Leggi o scarica</strong> il documento estratto, che si apre con l’app PDF del telefono.
        </li>
      </ol>

      <h2 id="dalla-mail">Se il P7M arriva via email o WhatsApp</h2>
      <ul>
        <li>
          <strong>Email.</strong> Scarica prima l’allegato, poi selezionalo dallo strumento. Aprire l’anteprima
          dell’allegato non basta.
        </li>
        <li>
          <strong>WhatsApp e messaggistica.</strong> Salva il file nel telefono e selezionalo come sopra. Se non riesci a
          scaricarlo, chiedi di reinviarlo come documento e non come foto.
        </li>
        <li>
          <strong>Cloud.</strong> Se il file è su Drive o iCloud, scaricalo nel telefono prima di selezionarlo.
        </li>
      </ul>

      <Callout>
        <strong>Privacy:</strong> il file viene letto nel browser del telefono e non è inviato a nessun server. Evita
        però di aprire documenti riservati su reti Wi-Fi pubbliche e tieni aggiornato il sistema.
      </Callout>

      <h2 id="dopo">Dopo l’estrazione</h2>
      <p>
        Il documento che scarichi si apre con le app già presenti: un PDF con l’anteprima del telefono, un file Word con
        l’app Word o Documenti. Se contiene una fattura XML ti serve un visualizzatore di fatture; vedi{' '}
        <Link href="/blog/fattura-elettronica-xml-p7m">Fattura elettronica XML.P7M</Link>. Per ottenere un PDF da altri
        formati usa <Link href="/strumenti/convertire-p7m-in-pdf">da P7M a PDF</Link>.
      </p>

      <h2 id="problemi">Problemi frequenti</h2>
      <h3>Il file non compare nella selezione</h3>
      <p>
        Controlla di averlo scaricato nel telefono e non solo visualizzato in anteprima. Su iPhone cercalo nell’app
        File, su Android in Download.
      </p>
      <h3>Il browser non permette di scegliere il file</h3>
      <p>
        Prova ad aprire lo strumento direttamente da Safari o Chrome, non dal browser interno di un’altra app.
      </p>
      <h3>Il documento estratto non si apre</h3>
      <p>
        Controlla il tipo di file indicato nel nome originale e usa l’app adatta (per un XML serve un visualizzatore di
        fatture).
      </p>

      <h2 id="conclusione">In sintesi</h2>
      <p>
        Per aprire un P7M da iPhone o Android scarica il file, apri lo strumento nel browser e selezionalo: in pochi
        secondi leggi il documento senza app. Ricorda che aprire non significa verificare la firma.{' '}
        <Link href="/strumenti/apri-file-p7m">Apri il tuo P7M dal telefono</Link>.
      </p>
    </>
  );
}
