import Link from 'next/link';
import type { Faq } from '@/lib/tool-content';
import { Callout } from './shared';

export const toc = [
  { id: 'perche', title: 'Perché convertire un PDF in JPG' },
  { id: 'passaggi', title: 'Come fare in 3 passaggi' },
  { id: 'cosa-ottieni', title: 'Cosa ottieni' },
  { id: 'privacy', title: 'Privacy: dove va il tuo file?' },
  { id: 'problemi', title: 'Problemi frequenti' },
  { id: 'conclusione', title: 'In sintesi' },
  { id: 'domande', title: 'Domande frequenti' },
];

export const summary = [
  'Ogni pagina del PDF diventa un’immagine JPG, comoda da inviare, pubblicare o inserire in un altro documento.',
  'Bastano tre passaggi, nel browser e senza installare programmi.',
  'Più alta è la risoluzione, più nitida e pesante è l’immagine.',
];

export const faq: Faq[] = [
  {
    q: 'Come si converte un PDF in JPG?',
    a: 'Carica il PDF nello strumento, scegli la risoluzione e scarica le immagini: una per pagina, raccolte in un archivio ZIP.',
  },
  {
    q: 'Posso convertire un PDF di più pagine?',
    a: 'Sì. Ogni pagina diventa un’immagine separata e le ricevi tutte insieme in un file ZIP.',
  },
  {
    q: 'La qualità peggiora?',
    a: 'Dipende dalla risoluzione scelta. Per leggere a schermo basta un valore medio, per stampare conviene una risoluzione alta.',
  },
  {
    q: 'Il mio PDF viene caricato su un server?',
    a: 'No: la conversione avviene nel tuo browser e il file non lascia il dispositivo.',
  },
  {
    q: 'Serve installare un programma?',
    a: 'No. Funziona da qualsiasi browser, su computer e su telefono.',
  },
];

export function Content() {
  return (
    <>
      <p>
        Devi mandare una pagina di un PDF in chat, metterla su un sito o inserirla in una presentazione? Il modo più
        semplice è <strong>convertire il PDF in JPG</strong>: ogni pagina diventa una foto che si apre ovunque.
      </p>

      <h2 id="perche">Perché convertire un PDF in JPG</h2>
      <ul>
        <li>inviare una pagina su <strong>WhatsApp o Telegram</strong> come immagine;</li>
        <li>caricare un documento in un modulo che accetta <strong>solo immagini</strong>;</li>
        <li>usare una pagina in <strong>slide, post o documenti</strong>;</li>
        <li>avere un’<strong>anteprima</strong> leggera di un file pesante.</li>
      </ul>

      <h2 id="passaggi">Come fare in 3 passaggi</h2>
      <ol>
        <li>
          <strong>Apri lo strumento.</strong> Vai su <Link href="/strumenti/convertire-pdf-in-jpg">PDF in JPG</Link>.
        </li>
        <li>
          <strong>Carica il PDF</strong> e scegli la risoluzione: più alta per stampare, media per leggere a schermo.
        </li>
        <li>
          <strong>Scarica le immagini.</strong> Le ricevi in un archivio ZIP, una per pagina.
        </li>
      </ol>

      <h2 id="cosa-ottieni">Cosa ottieni</h2>
      <p>
        Un file <code>.jpg</code> per ogni pagina, nello stesso ordine del documento. Il testo diventa parte
        dell’immagine: non si può più selezionare né cercare. Se ti serve il testo modificabile, il PDF originale è la
        scelta giusta.
      </p>

      <h2 id="privacy">Privacy: dove va il tuo file?</h2>
      <p>
        Molti servizi online caricano il PDF sui loro server per convertirlo. Per un documento riservato non è l’ideale.
      </p>
      <Callout>
        Gli strumenti di ApriDoc elaborano il file <strong>nel tuo browser</strong>: il PDF non viene inviato a
        nessun server.
      </Callout>

      <h2 id="problemi">Problemi frequenti</h2>
      <h3>L’immagine è sfocata</h3>
      <p>
        Hai scelto una risoluzione troppo bassa. Ripeti la conversione con un valore più alto: leggi{' '}
        <Link href="/blog/pdf-in-jpg-qualita-dpi">quale risoluzione scegliere</Link>.
      </p>
      <h3>Mi serve una sola pagina</h3>
      <p>
        Estrai prima la pagina che ti interessa: ecco come{' '}
        <Link href="/blog/salvare-pagina-pdf-come-immagine">salvare una pagina di un PDF come immagine</Link>.
      </p>
      <h3>Devo fare il contrario</h3>
      <p>
        Per trasformare foto in PDF usa <Link href="/strumenti/convertire-jpg-in-pdf">JPG in PDF</Link>.
      </p>

      <h2 id="conclusione">In sintesi</h2>
      <p>
        Convertire un PDF in JPG richiede pochi secondi e nessun programma.{' '}
        <Link href="/strumenti/convertire-pdf-in-jpg">Converti ora il tuo PDF</Link>.
      </p>
    </>
  );
}
