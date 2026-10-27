import Link from 'next/link';
import type { Faq } from '@/lib/tool-content';
import { Callout } from './shared';

export const toc = [
  { id: 'problema', title: 'Il problema: la rotazione non resta' },
  { id: 'passaggi', title: 'Come ruotare un PDF in 3 passaggi' },
  { id: 'singole-pagine', title: 'Ruotare solo alcune pagine' },
  { id: 'scansioni', title: 'Scansioni storte o capovolte' },
  { id: 'conclusione', title: 'In sintesi' },
  { id: 'domande', title: 'Domande frequenti' },
];

export const summary = [
  'Ruotare la pagina nel lettore PDF spesso è solo temporaneo: alla riapertura torna storta.',
  'Con lo strumento giusto la rotazione viene salvata nel file.',
  'Puoi ruotare tutte le pagine o solo quelle che scegli, di 90°, 180° o 270°.',
];

export const faq: Faq[] = [
  {
    q: 'Come ruoto un PDF in modo permanente?',
    a: 'Carica il file nello strumento Ruota PDF, scegli l’angolo e scarica il nuovo documento: la rotazione è salvata nel file.',
  },
  {
    q: 'Posso ruotare una sola pagina?',
    a: 'Sì, puoi ruotare tutte le pagine oppure solo quelle che selezioni.',
  },
  {
    q: 'Di quanti gradi posso ruotare?',
    a: 'Di 90°, 180° o 270°.',
  },
  {
    q: 'La qualità del PDF cambia?',
    a: 'No: cambia solo l’orientamento della pagina, il contenuto resta lo stesso.',
  },
  {
    q: 'Il file viene caricato online?',
    a: 'No: la rotazione avviene nel browser, il PDF non lascia il dispositivo.',
  },
];

export function Content() {
  return (
    <>
      <p>
        Hai scansionato un documento e una pagina è uscita <strong>di lato o capovolta</strong>? La giri nel lettore, ma
        quando la riapri è di nuovo storta, o lo è per chi la riceve. Ecco come{' '}
        <strong>ruotare un PDF e salvare la rotazione</strong>.
      </p>

      <h2 id="problema">Il problema: la rotazione non resta</h2>
      <p>
        Molti lettori PDF girano la pagina solo nella visualizzazione: il file non cambia. Per far sì che l’orientamento
        sia corretto per tutti serve una rotazione <strong>salvata nel documento</strong>.
      </p>

      <h2 id="passaggi">Come ruotare un PDF in 3 passaggi</h2>
      <ol>
        <li>
          Apri <Link href="/strumenti/ruota-pdf-online">Ruota PDF</Link> e carica il file.
        </li>
        <li>Scegli l’angolo: 90°, 180° o 270°.</li>
        <li>Scarica il PDF: la rotazione è ora parte del file.</li>
      </ol>

      <h2 id="singole-pagine">Ruotare solo alcune pagine</h2>
      <p>
        In un documento misto, ad esempio con una tabella in orizzontale tra pagine verticali, non devi girare tutto:
        seleziona solo le pagine che servono e lascia le altre come sono.
      </p>
      <Callout>
        <strong>Non sai quale angolo scegliere?</strong> Per una pagina capovolta usa 180°. Per una pagina di lato prova
        90°: se si gira dalla parte sbagliata, ripeti l’operazione con 270°. Il file originale non cambia, quindi puoi
        riprovare.
      </Callout>

      <h2 id="scansioni">Scansioni storte o capovolte</h2>
      <p>
        Se hai fotografato o scansionato i fogli, il consiglio è questo: prima{' '}
        <Link href="/blog/come-trasformare-foto-in-pdf">trasformali in PDF</Link>, poi correggi l’orientamento, poi{' '}
        <Link href="/blog/come-unire-pdf">uniscili</Link> in un unico file. Se devi anche spostare o eliminare pagine usa{' '}
        <Link href="/strumenti/organizza-pdf-online">Organizza PDF</Link>.
      </p>

      <h2 id="conclusione">In sintesi</h2>
      <p>
        Ruota, scarica, fatto. <Link href="/strumenti/ruota-pdf-online">Ruota ora il tuo PDF</Link>.
      </p>
    </>
  );
}
