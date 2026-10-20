import Link from 'next/link';
import type { Faq } from '@/lib/tool-content';
import { Table } from './shared';

export const toc = [
  { id: 'cos-e-dpi', title: 'Cosa sono i DPI' },
  { id: 'quale-scegliere', title: 'Quale risoluzione scegliere' },
  { id: 'peso', title: 'Qualità e peso del file' },
  { id: 'testo-nitido', title: 'Se il testo deve restare nitido' },
  { id: 'conclusione', title: 'In sintesi' },
  { id: 'domande', title: 'Domande frequenti' },
];

export const summary = [
  'La risoluzione, in DPI, decide quanto è nitida e quanto pesa l’immagine ottenuta dal PDF.',
  'Per lo schermo bastano valori medi, per la stampa serve una risoluzione alta.',
  'Alzare i DPI non migliora un PDF già sfocato: lo rende solo più pesante.',
];

export const faq: Faq[] = [
  {
    q: 'Quanti DPI servono per convertire un PDF in JPG?',
    a: 'Come regola pratica: circa 72 per il web, 150 per leggere a schermo o inviare in chat, 300 per stampare.',
  },
  {
    q: 'Perché il JPG è più pesante del PDF?',
    a: 'Un PDF contiene testo e grafica vettoriale, leggeri. Il JPG è fatto di pixel, quindi a risoluzione alta pesa di più.',
  },
  {
    q: 'Posso migliorare la qualità dopo la conversione?',
    a: 'No: se l’immagine esce sfocata, ripeti la conversione con una risoluzione più alta partendo dal PDF.',
  },
  {
    q: 'Il JPG perde qualità a ogni salvataggio?',
    a: 'Il formato JPG comprime l’immagine con una piccola perdita. Evita di salvarlo e ri-salvarlo più volte.',
  },
];

export function Content() {
  return (
    <>
      <p>
        Quando converti un PDF in immagine devi scegliere la risoluzione, e il valore giusto cambia a seconda di cosa
        devi farci. Ecco una guida semplice per decidere senza sprecare spazio. Prima le basi:{' '}
        <Link href="/blog/come-convertire-pdf-in-jpg">come convertire un PDF in JPG</Link>.
      </p>

      <h2 id="cos-e-dpi">Cosa sono i DPI</h2>
      <p>
        I <strong>DPI</strong> (punti per pollice) indicano quanti pixel descrivono ogni pollice della pagina. Più sono,
        più l’immagine è dettagliata, ma anche più grande.
      </p>

      <h2 id="quale-scegliere">Quale risoluzione scegliere</h2>
      <Table
        head={['Uso', 'DPI indicativi', 'Perché']}
        rows={[
          ['Web e social', '72', 'File leggero, sufficiente per lo schermo'],
          ['Chat, email, lettura', '150', 'Buon equilibrio tra nitidezza e peso'],
          ['Stampa', '300', 'Dettaglio pieno su carta'],
        ]}
      />
      <p>Sono valori indicativi: se il testo è molto piccolo, passa alla risoluzione successiva.</p>

      <h2 id="peso">Qualità e peso del file</h2>
      <p>
        Raddoppiare i DPI quadruplica i pixel, quindi il file cresce in fretta. Se devi inviare molte pagine, scegli il
        valore più basso che resta leggibile. Con {' '}
        <Link href="/strumenti/convertire-pdf-in-jpg">PDF in JPG</Link> puoi riprovare quante volte vuoi, il file non
        lascia il tuo browser.
      </p>

      <h2 id="testo-nitido">Se il testo deve restare nitido</h2>
      <p>
        Il JPG è pensato per le foto: sul testo piccolo può creare un leggero alone. Se la nitidezza è la priorità,
        alza la risoluzione oppure valuta se non basta inviare il PDF stesso.
      </p>

      <h2 id="conclusione">In sintesi</h2>
      <p>
        72 per il web, 150 per leggere e condividere, 300 per stampare. Prova adesso:{' '}
        <Link href="/strumenti/convertire-pdf-in-jpg">converti il tuo PDF in JPG</Link>.
      </p>
    </>
  );
}
