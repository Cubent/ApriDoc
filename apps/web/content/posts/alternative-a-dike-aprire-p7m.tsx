import Link from 'next/link';
import type { Faq } from '@/lib/tool-content';
import { Callout, Table } from './shared';

export const toc = [
  { id: 'perche-cercare', title: 'Perché cercare un’alternativa' },
  { id: 'opzioni', title: 'Le opzioni gratuite' },
  { id: 'confronto', title: 'Confronto rapido' },
  { id: 'quale-scegliere', title: 'Quale scegliere' },
  { id: 'attenzione', title: 'Attenzione a' },
  { id: 'conclusione', title: 'In sintesi' },
  { id: 'domande', title: 'Domande frequenti' },
];

export const summary = [
  'Per aprire un P7M non devi per forza installare DiKe: esistono alternative online e per smartphone.',
  'Gli strumenti online che lavorano nel browser sono i più rapidi per leggere o scaricare il documento.',
  'Per la verifica con valore legale servono software di verifica qualificati, di vari prestatori.',
];

export const faq: Faq[] = [
  {
    q: 'Serve per forza DiKe per aprire un P7M?',
    a: 'No. DiKe è uno dei programmi gratuiti più citati, ma non è l’unico: ci sono software di altri prestatori, servizi di verifica online e strumenti che estraggono il documento dal browser.',
  },
  {
    q: 'Qual è il modo più veloce per aprire un P7M senza installare nulla?',
    a: 'Uno strumento online che elabora il file nel browser: trascini il file, leggi il documento e lo scarichi. Funziona anche da smartphone.',
  },
  {
    q: 'Le alternative a DiKe verificano anche la firma?',
    a: 'Dipende. I software di verifica dei prestatori e i servizi di verifica online controllano la firma; gli strumenti che si limitano ad aprire il file estraggono il documento e mostrano i dati del firmatario, senza una verifica con valore legale.',
  },
  {
    q: 'Sono sicuri gli strumenti online?',
    a: 'Dipende da come funzionano: se il file è elaborato nel browser non viene inviato a un server. Se invece viene caricato, passa da un servizio esterno. Con documenti riservati preferisci la prima soluzione.',
  },
  {
    q: 'Dove trovo l’elenco ufficiale dei software di verifica?',
    a: 'AgID pubblica l’elenco dei software di verifica delle firme digitali. È il riferimento da consultare per scegliere uno strumento adatto a una verifica formale.',
  },
];

export function Content() {
  return (
    <>
      <p>
        Molte guide consigliano <strong>DiKe</strong> per aprire un file .p7m, ma non tutti vogliono installare un
        programma per leggere un solo allegato. La buona notizia: ci sono diverse alternative gratuite, e la scelta
        giusta dipende da cosa devi fare. Per la procedura base vedi{' '}
        <Link href="/blog/come-aprire-file-p7m">Come aprire un file P7M</Link>.
      </p>

      <h2 id="perche-cercare">Perché cercare un’alternativa</h2>
      <ul>
        <li>non vuoi installare software per un’operazione occasionale;</li>
        <li>lavori da un dispositivo dove non puoi installare programmi;</li>
        <li>hai un Mac o uno smartphone;</li>
        <li>ti serve solo leggere o scaricare il documento, non una verifica formale.</li>
      </ul>

      <h2 id="opzioni">Le opzioni gratuite</h2>
      <h3>1. Strumento online che lavora nel browser</h3>
      <p>
        Trascini il file, vedi il documento e i dati del firmatario, scarichi l’originale. Con{' '}
        <Link href="/strumenti/apri-file-p7m">Apri file P7M di ApriDoc.com</Link> il file non lascia il tuo dispositivo.
        È la strada più rapida, ma non sostituisce una verifica con valore legale.
      </p>
      <h3>2. Servizi di verifica online dei prestatori</h3>
      <p>
        Alcuni prestatori di servizi fiduciari offrono pagine di verifica online (ad esempio PosteCert e InfoCert,
        secondo le guide consultate). Carichi il file e ricevi l’esito della verifica, a volte con un report scaricabile.
        Tieni presente che il file viene inviato al servizio.
      </p>
      <h3>3. Software di firma dei prestatori</h3>
      <p>
        Programmi gratuiti come ArubaSign, o come quelli di altri certificatori, estraggono il documento e verificano la
        firma. Si installano sul computer e sono adatti a un uso frequente o a verifiche formali.
      </p>
      <h3>4. App per smartphone</h3>
      <p>
        Esistono app dei prestatori per Android e iPhone che importano il file e lo aprono. Se hai solo il telefono,
        leggi anche <Link href="/blog/aprire-file-p7m-da-iphone-android">come aprire un P7M da iPhone e Android</Link>.
      </p>
      <h3>5. Visualizzatori di fatture elettroniche</h3>
      <p>
        Se il file è una fattura (<code>.xml.p7m</code>) puoi usare un visualizzatore dedicato. Vedi{' '}
        <Link href="/blog/fattura-elettronica-xml-p7m">Fattura elettronica XML.P7M</Link>.
      </p>

      <h2 id="confronto">Confronto rapido</h2>
      <Table
        head={['Opzione', 'Installazione', 'Verifica legale', 'Adatta a']}
        rows={[
          ['Strumento nel browser', 'No', 'No', 'Leggere e scaricare il documento'],
          ['Verifica online del prestatore', 'No', 'Sì', 'Un controllo occasionale della firma'],
          ['Software desktop', 'Sì', 'Sì', 'Uso frequente, pratiche formali'],
          ['App per smartphone', 'App', 'Dipende', 'Aprire un file dal telefono'],
        ]}
      />

      <h2 id="quale-scegliere">Quale scegliere</h2>
      <ul>
        <li>
          <strong>Devi solo leggere il documento?</strong> Usa uno strumento nel browser.
        </li>
        <li>
          <strong>Devi dimostrare la validità della firma?</strong> Usa un software o un servizio di verifica di un
          prestatore qualificato.
        </li>
        <li>
          <strong>Lavori spesso con P7M?</strong> Installa un software di firma sul computer.
        </li>
      </ul>

      <h2 id="attenzione">Attenzione a</h2>
      <Callout>
        <strong>Privacy e affidabilità.</strong> Prima di caricare un documento riservato su un servizio online, controlla
        se il file viene elaborato nel browser o inviato a un server. Scarica i software solo dai siti ufficiali dei
        prestatori. Per l’elenco dei software di verifica, consulta quello pubblicato da AgID.
      </Callout>
      <p>
        Questa guida non è affiliata ai prestatori citati: i nomi indicano software e servizi esistenti, le cui funzioni
        possono cambiare nel tempo.
      </p>

      <h2 id="conclusione">In sintesi</h2>
      <p>
        Per leggere un P7M non serve DiKe: un strumento nel browser basta in pochi secondi. Per una verifica formale
        usa un software o un servizio qualificato. <Link href="/strumenti/apri-file-p7m">Apri subito il tuo P7M</Link>.
      </p>
    </>
  );
}
