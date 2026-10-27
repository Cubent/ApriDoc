import Link from 'next/link';
import type { Faq } from '@/lib/tool-content';
import { Callout } from './shared';

export const toc = [
  { id: 'come-funziona', title: 'Come funziona' },
  { id: 'esempi', title: 'Esempi pratici' },
  { id: 'passaggi', title: 'Passo dopo passo' },
  { id: 'consigli', title: 'Consigli utili' },
  { id: 'conclusione', title: 'In sintesi' },
  { id: 'domande', title: 'Domande frequenti' },
];

export const summary = [
  'Con Organizza PDF indichi l’ordine che vuoi ottenere: le pagine che non elenchi vengono eliminate.',
  'Ripetendo un numero duplichi la pagina, cambiando l’ordine la sposti.',
  'Il PDF originale non viene toccato: ricevi un nuovo file.',
];

export const faq: Faq[] = [
  {
    q: 'Come elimino una pagina da un PDF?',
    a: 'In Organizza PDF scrivi le pagine che vuoi tenere: quelle non elencate vengono rimosse. Per togliere la 2 da un PDF di 5 pagine scrivi 1,3-5.',
  },
  {
    q: 'Come riordino le pagine?',
    a: 'Scrivi il nuovo ordine, per esempio 3,1,2: la terza pagina diventa la prima.',
  },
  {
    q: 'Posso duplicare una pagina?',
    a: 'Sì, basta ripetere il numero nell’elenco.',
  },
  {
    q: 'Il file originale viene modificato?',
    a: 'No, scarichi un nuovo PDF e l’originale resta com’è.',
  },
  {
    q: 'Il PDF viene caricato su un server?',
    a: 'No: tutto avviene nel browser.',
  },
];

export function Content() {
  return (
    <>
      <p>
        Una pagina bianca, un allegato sbagliato, o semplicemente un ordine da sistemare: capita spesso di dover{' '}
        <strong>eliminare o riordinare le pagine di un PDF</strong> prima di inviarlo. Ecco come farlo in un minuto, senza
        programmi.
      </p>

      <h2 id="come-funziona">Come funziona</h2>
      <p>
        Nello strumento <Link href="/strumenti/organizza-pdf-online">Organizza PDF</Link> scrivi{' '}
        <strong>l’ordine finale</strong> che vuoi ottenere, con numeri separati da virgole e intervalli con il trattino.
        Le pagine che non scrivi vengono eliminate, quelle ripetute vengono duplicate.
      </p>

      <h2 id="esempi">Esempi pratici</h2>
      <ul>
        <li><code>1,3-5</code>: elimina la pagina 2 di un PDF di 5 pagine;</li>
        <li><code>3,1,2,5-7</code>: sposta la 3 all’inizio e tiene le pagine da 5 a 7;</li>
        <li><code>1,1,2</code>: duplica la prima pagina.</li>
      </ul>

      <h2 id="passaggi">Passo dopo passo</h2>
      <ol>
        <li>Carica il PDF in Organizza PDF.</li>
        <li>Scrivi l’elenco delle pagine nell’ordine desiderato.</li>
        <li>Scarica il nuovo PDF e controlla il risultato.</li>
      </ol>

      <h2 id="consigli">Consigli utili</h2>
      <Callout>
        <strong>Controlla sempre il risultato.</strong> L’originale non cambia, quindi puoi ripetere l’operazione quante
        volte vuoi.
      </Callout>
      <ul>
        <li>
          Vuoi solo <strong>estrarre</strong> alcune pagine? Usa{' '}
          <Link href="/strumenti/dividi-pdf-online">Dividi PDF</Link>.
        </li>
        <li>
          Pagine storte? <Link href="/blog/ruotare-pdf-in-modo-permanente">Ruotale in modo permanente</Link>.
        </li>
        <li>
          Devi unire più documenti dopo il riordino? <Link href="/blog/come-unire-pdf">Ecco come unire i PDF</Link>.
        </li>
      </ul>

      <h2 id="conclusione">In sintesi</h2>
      <p>
        Scrivi l’ordine, scarica, fatto. <Link href="/strumenti/organizza-pdf-online">Organizza il tuo PDF</Link>.
      </p>
    </>
  );
}
