import Link from 'next/link';
import type { Faq } from '@/lib/tool-content';
import { Callout } from './shared';

export const toc = [
  { id: 'cose', title: 'Cos’è un P7M viewer' },
  { id: 'cosa-mostra', title: 'Cosa mostra un viewer P7M' },
  { id: 'online-o-programma', title: 'Online o programma: cosa scegliere' },
  { id: 'privacy', title: 'Privacy: dove viene elaborato il file' },
  { id: 'come-scegliere', title: 'Come scegliere un viewer' },
  { id: 'limiti', title: 'Cosa un viewer non fa' },
  { id: 'conclusione', title: 'In sintesi' },
  { id: 'domande', title: 'Domande frequenti' },
];

export const summary = [
  'Un P7M viewer è uno strumento che legge un file .p7m e ne mostra il contenuto e i dati della firma.',
  'Un viewer online funziona dal browser, senza installare nulla; conviene sceglierne uno che elabora il file localmente.',
  'Un viewer mostra e estrae il documento, ma non sostituisce la verifica con valore legale.',
];

export const faq: Faq[] = [
  {
    q: 'Cos’è un P7M viewer?',
    a: 'È uno strumento che legge un file .p7m, ne estrae il documento e mostra le informazioni della firma digitale, come il firmatario, l’ente emittente del certificato e la data di firma.',
  },
  {
    q: 'Un P7M viewer online è sicuro?',
    a: 'Dipende da come funziona. Se elabora il file nel tuo browser, il documento non lascia il dispositivo. Se lo carica su un server, il contenuto passa da un servizio esterno: con documenti riservati è meglio evitarlo.',
  },
  {
    q: 'Serve registrarsi per usare un viewer P7M?',
    a: 'Per leggere il file e vederne il contenuto non è necessario creare un account con lo strumento di ApriDoc.com.',
  },
  {
    q: 'Il viewer verifica che la firma sia valida?',
    a: 'No. Un viewer mostra i dati della firma e permette di leggere il documento. La verifica completa, con catena di certificazione e revoca, richiede un software di verifica qualificato.',
  },
  {
    q: 'Funziona anche con le fatture elettroniche XML.P7M?',
    a: 'Sì. Il viewer estrae il file XML contenuto nella busta, che puoi leggere o scaricare e importare nel tuo gestionale.',
  },
];

export function Content() {
  return (
    <>
      <p>
        Se cerchi un <strong>P7M viewer online</strong> è perché hai un file firmato che vuoi leggere subito, senza
        comprare o installare un programma. Ecco cosa fa davvero un viewer, cosa deve mostrarti, come riconoscerne uno
        affidabile e dove si ferma. Per i passaggi pratici di apertura vedi anche{' '}
        <Link href="/blog/come-aprire-file-p7m">Come aprire un file P7M: guida passo passo</Link>.
      </p>

      <h2 id="cose">Cos’è un P7M viewer</h2>
      <p>
        Un file <code>.p7m</code> è una busta di firma digitale che contiene un documento e la firma di chi lo ha
        sottoscritto. Un <strong>viewer</strong> è lo strumento che apre quella busta: legge il file, ne estrae il
        documento e ti mostra i dati della firma. Non modifica nulla, non firma nulla: serve a vedere.
      </p>

      <h2 id="cosa-mostra">Cosa mostra un viewer P7M</h2>
      <p>Un buon viewer ti permette, in pochi secondi, di vedere:</p>
      <ul>
        <li>
          <strong>il documento contenuto</strong>, che sia un PDF, un file Word, un’immagine o un XML di fattura;
        </li>
        <li>
          <strong>il firmatario</strong>, con nome e codice del certificato;
        </li>
        <li>
          <strong>l’ente emittente</strong> del certificato di firma;
        </li>
        <li>
          <strong>la data</strong> in cui il documento è stato firmato, quando presente;
        </li>
        <li>
          <strong>il numero di firme</strong>, se il documento è stato firmato più volte.
        </li>
      </ul>

      <h2 id="online-o-programma">Online o programma: cosa scegliere</h2>
      <div className="not-prose my-6 overflow-x-auto rounded-2xl border border-[#e6e8ec]">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="bg-[#f4f5f7] text-xs font-bold uppercase tracking-wider text-[#8a91a0]">
            <tr>
              <th className="px-4 py-3"></th>
              <th className="px-4 py-3">Viewer online</th>
              <th className="px-4 py-3">Software di firma</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#eef0f3] text-[#3d4452]">
            <tr>
              <td className="px-4 py-3 font-semibold">Installazione</td>
              <td className="px-4 py-3">Nessuna</td>
              <td className="px-4 py-3">Da scaricare e installare</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-semibold">Dispositivi</td>
              <td className="px-4 py-3">Computer, tablet, smartphone</td>
              <td className="px-4 py-3">Di solito computer</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-semibold">Velocità</td>
              <td className="px-4 py-3">Immediata</td>
              <td className="px-4 py-3">Dipende dal programma</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-semibold">Verifica con valore legale</td>
              <td className="px-4 py-3">No</td>
              <td className="px-4 py-3">Sì, nei programmi di verifica qualificati</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        La regola pratica: se devi <strong>leggere o scaricare</strong> il documento, un viewer online basta e avanza. Se
        devi <strong>dimostrare la validità</strong> della firma, usa un software di verifica.
      </p>

      <h2 id="privacy">Privacy: dove viene elaborato il file</h2>
      <p>
        Un P7M può contenere contratti, fatture, atti e dati personali. Per questo la domanda più importante è dove viene
        elaborato il file. Esistono due modelli:
      </p>
      <ul>
        <li>
          <strong>Elaborazione nel browser.</strong> Il file viene letto sul tuo dispositivo e non viene inviato a nessun
          server. È il modello usato da{' '}
          <Link href="/strumenti/apri-file-p7m">Apri file P7M di ApriDoc.com</Link>.
        </li>
        <li>
          <strong>Elaborazione su server.</strong> Il file viene caricato su un servizio esterno, che lo apre e ti
          restituisce il risultato. Il contenuto passa da un sistema che non controlli.
        </li>
      </ul>
      <Callout>
        <strong>Come verificarlo:</strong> apri lo strumento, disattiva la connessione e prova a caricare un file. Se il
        viewer funziona anche offline, l’elaborazione è locale. In ogni caso leggi l’informativa sulla privacy.
      </Callout>

      <h2 id="come-scegliere">Come scegliere un viewer P7M</h2>
      <ol>
        <li>Verifica se elabora il file nel browser o lo carica su un server.</li>
        <li>Controlla che mostri il firmatario e i dati del certificato, non solo il documento.</li>
        <li>Assicurati che gestisca le firme multiple (<code>.p7m.p7m</code>) e i file XML delle fatture.</li>
        <li>Verifica che dichiari chiaramente cosa non fa, in particolare la verifica legale.</li>
        <li>Provalo da smartphone: se funziona bene lì, funziona ovunque.</li>
      </ol>

      <h2 id="limiti">Cosa un viewer non fa</h2>
      <p>
        Un viewer <strong>legge</strong> la busta, non ne <strong>certifica</strong> il valore. Non controlla la catena di
        certificazione, non interroga le liste di revoca e non attesta il momento della firma. Sono operazioni riservate a
        un software di verifica qualificato. Se il documento deve avere effetto in una pratica, in un contenzioso o con
        un ente, fai anche quella verifica e conserva il file <code>.p7m</code> originale.
      </p>

      <h2 id="conclusione">In sintesi</h2>
      <p>
        Un P7M viewer online è la soluzione più rapida per leggere un documento firmato digitalmente: nessuna
        installazione, risultato in pochi secondi, anche da smartphone. Scegli uno strumento che elabora il file nel
        browser, controlla che mostri i dati della firma e ricorda che per il valore legale serve una verifica dedicata.{' '}
        <Link href="/strumenti/apri-file-p7m">Prova il viewer P7M</Link>.
      </p>
    </>
  );
}
