import Link from 'next/link';
import type { Faq } from '@/lib/tool-content';
import { Callout } from './shared';

export const toc = [
  { id: 'quando-serve', title: 'Quando serve' },
  { id: 'passaggi', title: 'Come fare in 3 passaggi' },
  { id: 'foto-documenti', title: 'Foto di documenti: 4 consigli' },
  { id: 'impostazioni', title: 'Formato pagina e margini' },
  { id: 'conclusione', title: 'In sintesi' },
  { id: 'domande', title: 'Domande frequenti' },
];

export const summary = [
  'Puoi trasformare una o più immagini JPG e PNG in un unico PDF, direttamente dal browser.',
  'Scegli formato pagina (A4 o su misura) e margini, poi scarica il documento.',
  'Per un risultato leggibile fotografa i documenti dritti e con buona luce.',
];

export const faq: Faq[] = [
  {
    q: 'Come trasformo una foto in PDF?',
    a: 'Carica l’immagine nello strumento JPG in PDF, scegli formato pagina e margini e scarica il documento.',
  },
  {
    q: 'Posso unire più foto in un solo PDF?',
    a: 'Sì: carica più immagini e ottieni un unico documento con una pagina per immagine.',
  },
  {
    q: 'Quali formati di immagine sono accettati?',
    a: 'JPG e PNG.',
  },
  {
    q: 'Le mie foto vengono caricate online?',
    a: 'No: la conversione avviene nel tuo browser e le immagini non lasciano il dispositivo.',
  },
  {
    q: 'Posso farlo dal telefono?',
    a: 'Sì, funziona da qualsiasi browser: scatta la foto, aprila nello strumento e scarica il PDF.',
  },
];

export function Content() {
  return (
    <>
      <p>
        Hai fotografato un documento, una ricevuta o un contratto e ti chiedono un <strong>PDF</strong>? Trasformare una
        foto in PDF è una cosa di pochi secondi, e non serve installare un’app.
      </p>

      <h2 id="quando-serve">Quando serve</h2>
      <ul>
        <li>inviare un documento a un ufficio che accetta solo PDF;</li>
        <li>riunire più foto o scansioni in un <strong>unico file</strong>;</li>
        <li>archiviare ricevute e fatture in modo ordinato.</li>
      </ul>

      <h2 id="passaggi">Come fare in 3 passaggi</h2>
      <ol>
        <li>
          <strong>Apri lo strumento.</strong> Vai su <Link href="/strumenti/convertire-jpg-in-pdf">JPG in PDF</Link>.
        </li>
        <li>
          <strong>Carica le immagini.</strong> Puoi aggiungere una foto o più foto JPG e PNG.
        </li>
        <li>
          <strong>Imposta e scarica.</strong> Scegli formato pagina e margini, poi scarica il PDF.
        </li>
      </ol>

      <h2 id="foto-documenti">Foto di documenti: 4 consigli</h2>
      <ul>
        <li><strong>Luce uniforme:</strong> evita ombre e riflessi sul foglio.</li>
        <li><strong>Foglio dritto:</strong> fotografa dall’alto, senza inclinare il telefono.</li>
        <li><strong>Sfondo neutro:</strong> un tavolo scuro fa risaltare i bordi.</li>
        <li><strong>Un foglio, una foto:</strong> così ogni pagina del PDF resta leggibile.</li>
      </ul>

      <h2 id="impostazioni">Formato pagina e margini</h2>
      <p>
        Con il formato <strong>A4</strong> l’immagine viene adattata a una pagina standard, ideale per documenti da
        stampare o inviare. Con il formato <strong>su misura</strong> la pagina prende le dimensioni dell’immagine. I
        margini lasciano un bordo bianco attorno alla foto.
      </p>
      <Callout>
        Se la foto è storta o capovolta nel PDF, correggila poi con{' '}
        <Link href="/strumenti/ruota-pdf-online">Ruota PDF</Link>. Per unire più documenti usa{' '}
        <Link href="/strumenti/unisci-pdf-online">Unisci PDF</Link>.
      </Callout>

      <h2 id="conclusione">In sintesi</h2>
      <p>
        Scatta, carica, scarica. <Link href="/strumenti/convertire-jpg-in-pdf">Trasforma le tue foto in PDF</Link>. Ti
        serve il contrario? Leggi{' '}
        <Link href="/blog/come-convertire-pdf-in-jpg">Come convertire un PDF in JPG</Link>.
      </p>
    </>
  );
}
