import Link from 'next/link';
import type { Faq } from '@/lib/tool-content';
import { Callout } from './shared';

export const toc = [
  { id: 'prima-controlla', title: 'Prima controlla questo' },
  { id: 'cause', title: '7 cause e soluzioni' },
  { id: 'riepilogo', title: 'Riepilogo' },
  { id: 'conclusione', title: 'In sintesi' },
  { id: 'domande', title: 'Domande frequenti' },
];

export const summary = [
  'Un P7M che non si apre di solito ha una causa semplice: il programma sbagliato o un file incompleto.',
  'Controlla nome, dimensione e numero di estensioni prima di cambiare strumento.',
  'Rinominare il file non risolve: il documento va estratto dalla busta.',
];

export const faq: Faq[] = [
  {
    q: 'Perché il mio file P7M non si apre?',
    a: 'Le cause più comuni sono il programma sbagliato, un download incompleto, una firma staccata (.p7s), una firma annidata (.p7m.p7m) o una busta cifrata. Controlla anche il nome completo del file.',
  },
  {
    q: 'Rinominare il file in .pdf funziona?',
    a: 'No. Il file continua a contenere la struttura della firma e il lettore PDF non lo apre.',
  },
  {
    q: 'Il file P7M è danneggiato?',
    a: 'Può esserlo se il download si è interrotto o se pesa pochissimo. Scaricalo di nuovo e confronta la dimensione con quella indicata dal mittente.',
  },
  {
    q: 'Cosa significa che la firma è “detached”?',
    a: 'Che il file contiene solo la firma e il documento è a parte. In quel caso non c’è nulla da estrarre dal file di firma.',
  },
  {
    q: 'Come apro un P7M senza programmi?',
    a: 'Con uno strumento online che lavora nel browser: trascini il file e ottieni il documento senza installare nulla.',
  },
];

export function Content() {
  return (
    <>
      <p>
        Hai provato a fare doppio clic su un file <strong>.p7m</strong> e non è successo niente, oppure compare un
        errore? Quasi sempre il problema ha una causa semplice e una soluzione rapida. Ecco le sette cause più comuni,
        con cosa fare per ciascuna. Se vuoi la procedura base, vedi{' '}
        <Link href="/blog/come-aprire-file-p7m">Come aprire un file P7M</Link>.
      </p>

      <h2 id="prima-controlla">Prima controlla questo</h2>
      <ul>
        <li>
          il <strong>nome completo</strong> del file (con tutte le estensioni, ad esempio <code>.pdf.p7m</code>);
        </li>
        <li>
          la <strong>dimensione</strong>: un file di pochi byte è quasi certamente incompleto;
        </li>
        <li>
          dove l’hai <strong>scaricato</strong>: dal browser, da un allegato o da un’app di messaggistica.
        </li>
      </ul>

      <h2 id="cause">Le 7 cause e come risolverle</h2>

      <h3>1. Stai usando il programma sbagliato</h3>
      <p>
        Un lettore PDF, Word o l’anteprima del sistema non sanno estrarre il documento da una busta di firma. La
        soluzione è usare uno strumento adatto, come <Link href="/strumenti/apri-file-p7m">Apri file P7M</Link>, che
        lavora direttamente nel browser.
      </p>

      <h3>2. Il file è incompleto o danneggiato</h3>
      <p>
        Un download interrotto o un allegato troncato rendono il file illeggibile. Scaricalo di nuovo dalla fonte
        originale e confronta la dimensione.
      </p>

      <h3>3. La firma è “staccata” (.p7s)</h3>
      <p>
        Se il file è un <code>.p7s</code>, contiene solo la firma: il documento è un altro file. Cerca l’allegato
        originale che accompagna la firma. Per capire la differenza leggi{' '}
        <Link href="/blog/differenza-p7m-p7s-pades">P7M, P7S e PAdES</Link>.
      </p>

      <h3>4. Il documento è firmato più volte (.p7m.p7m)</h3>
      <p>
        Un nome come <code>atto.pdf.p7m.p7m</code> indica due livelli di firma: estraili uno dopo l’altro fino al
        documento finale. Lo strumento di ApriDoc.com li apre in sequenza.
      </p>

      <h3>5. Il contenuto non è un PDF</h3>
      <p>
        Il file si apre, ma il documento estratto no? Controlla l’estensione originale: un <code>.xml</code> è una fattura
        elettronica (vedi <Link href="/blog/fattura-elettronica-xml-p7m">come leggerla</Link>), non un PDF.
      </p>

      <h3>6. Hai rinominato il file o l’hai aperto con un’altra app</h3>
      <p>
        Togliere <code>.p7m</code> dal nome non estrae il documento. Rimetti il nome originale e usa uno strumento di
        estrazione.
      </p>

      <h3>7. La busta è cifrata</h3>
      <p>
        Un P7M può contenere dati <em>cifrati</em> per un destinatario specifico, e in quel caso serve la sua chiave
        privata. Se il file non si apre né con uno strumento né con un software di firma, chiedi al mittente se è un
        messaggio cifrato e in quale forma te lo può inviare.
      </p>

      <Callout>
        <strong>Non serve rinominare né “convertire” il file:</strong> nella maggior parte dei casi basta estrarre il
        documento. Per una verifica con valore legale della firma usa un software qualificato e conserva il file{' '}
        <code>.p7m</code> originale.
      </Callout>

      <h2 id="riepilogo">Riepilogo</h2>
      <ol>
        <li>Programma sbagliato → usa uno strumento di estrazione.</li>
        <li>File incompleto → scaricalo di nuovo.</li>
        <li>Firma staccata → cerca il documento originale.</li>
        <li>Firma annidata → estrai livello per livello.</li>
        <li>Contenuto XML o altro → usa il programma adatto.</li>
        <li>File rinominato → ripristina il nome originale.</li>
        <li>Busta cifrata → serve la chiave del destinatario.</li>
      </ol>

      <h2 id="conclusione">In sintesi</h2>
      <p>
        Un P7M che non si apre di solito si risolve in due minuti: controlla nome e dimensione, usa lo strumento giusto
        e ricorda che il documento si estrae, non si rinomina.{' '}
        <Link href="/strumenti/apri-file-p7m">Prova ad aprire il tuo P7M</Link>.
      </p>
    </>
  );
}
