import Link from 'next/link';
import type { Faq } from '@/lib/tool-content';
import { Callout } from './shared';

export const toc = [
  { id: 'metodo', title: 'Il metodo più veloce' },
  { id: 'passaggi', title: 'Passo dopo passo' },
  { id: 'immagini-incorporate', title: 'Pagina o immagini incorporate?' },
  { id: 'conclusione', title: 'In sintesi' },
  { id: 'domande', title: 'Domande frequenti' },
];

export const summary = [
  'Per salvare una sola pagina come immagine, estraila dal PDF e poi convertila in JPG.',
  'Con due strumenti e meno di un minuto ottieni solo la pagina che ti serve.',
  'Convertire una pagina non è lo stesso che estrarre le foto contenute nel PDF.',
];

export const faq: Faq[] = [
  {
    q: 'Come salvo una sola pagina di un PDF come immagine?',
    a: 'Estrai la pagina con lo strumento Dividi PDF, indicando il numero, poi convertila in JPG con PDF in JPG.',
  },
  {
    q: 'Posso salvare più pagine non consecutive?',
    a: 'Sì: in Dividi PDF puoi indicare più pagine e intervalli, per esempio 1-3, 5, 8, e poi convertire il risultato.',
  },
  {
    q: 'Posso estrarre le foto presenti in un PDF?',
    a: 'Convertire una pagina produce un’immagine dell’intera pagina, testo compreso. Non è la stessa cosa che recuperare le foto originali incorporate nel documento.',
  },
  {
    q: 'Il PDF originale viene modificato?',
    a: 'No, l’originale resta intatto: ricevi un nuovo file.',
  },
];

export function Content() {
  return (
    <>
      <p>
        Hai un PDF di venti pagine e ti serve <strong>una pagina sola, come immagine</strong>: per una chat, un
        modulo, una presentazione. Non devi convertire tutto e cercare: bastano due passaggi.
      </p>

      <h2 id="metodo">Il metodo più veloce</h2>
      <p>
        Prima <strong>estrai</strong> la pagina in un PDF a parte, poi <strong>convertila</strong> in JPG. Così ottieni
        un solo file, senza dover scartare le altre immagini.
      </p>

      <h2 id="passaggi">Passo dopo passo</h2>
      <ol>
        <li>
          Apri <Link href="/strumenti/dividi-pdf-online">Dividi PDF</Link>, carica il documento e indica la pagina,
          per esempio <code>5</code>, oppure più pagine come <code>1-3, 5, 8</code>.
        </li>
        <li>Scarica il PDF con la sola pagina scelta.</li>
        <li>
          Aprilo in <Link href="/strumenti/convertire-pdf-in-jpg">PDF in JPG</Link> e scarica l’immagine.
        </li>
      </ol>
      <p>Entrambi gli strumenti lavorano nel browser: il file non viene inviato a nessun server.</p>

      <h2 id="immagini-incorporate">Pagina o immagini incorporate?</h2>
      <Callout>
        Convertire una pagina dà <strong>un’immagine dell’intera pagina</strong>, con testo e grafica insieme. Se
        cerchi le foto originali contenute nel PDF, il risultato sarà diverso: l’immagine includerà tutto quello che
        c’è sulla pagina.
      </Callout>
      <p>
        Per scegliere la nitidezza giusta leggi{' '}
        <Link href="/blog/pdf-in-jpg-qualita-dpi">PDF in JPG: quale risoluzione scegliere</Link>.
      </p>

      <h2 id="conclusione">In sintesi</h2>
      <p>
        Estrai, poi converti. <Link href="/strumenti/dividi-pdf-online">Inizia da Dividi PDF</Link>.
      </p>
    </>
  );
}
