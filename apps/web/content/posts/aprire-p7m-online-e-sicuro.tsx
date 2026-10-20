import Link from 'next/link';
import type { Faq } from '@/lib/tool-content';
import { Callout } from './shared';

export const toc = [
  { id: 'perche-conta', title: 'Perché la domanda conta' },
  { id: 'due-tipi', title: 'Due tipi di strumenti online' },
  { id: 'come-controllare', title: 'Come controllare in 30 secondi' },
  { id: 'checklist', title: 'Checklist di sicurezza' },
  { id: 'conclusione', title: 'In sintesi' },
  { id: 'domande', title: 'Domande frequenti' },
];

export const summary = [
  'Un P7M contiene spesso contratti, fatture o atti: conviene sapere dove viene elaborato.',
  'Alcuni strumenti caricano il file su un server, altri lo aprono nel tuo browser senza inviarlo.',
  'Puoi verificarlo da solo: carica la pagina, scollega la rete e prova ad aprire il file.',
];

export const faq: Faq[] = [
  {
    q: 'È sicuro aprire un file P7M online?',
    a: 'È sicuro se lo strumento elabora il file nel browser, senza inviarlo a un server. Se invece lo carica, il documento passa da un servizio esterno e conviene leggerne l’informativa.',
  },
  {
    q: 'Come capisco se il file viene caricato?',
    a: 'Carica la pagina, disattiva la connessione e prova ad aprire il file: se funziona, l’elaborazione è locale. In alternativa guarda la scheda Rete degli strumenti per sviluppatori del browser.',
  },
  {
    q: 'Un P7M può contenere virus?',
    a: 'La busta di firma in sé non esegue nulla, ma il documento al suo interno è un normale file e va trattato come tale. Apri solo allegati di mittenti che conosci.',
  },
  {
    q: 'Devo fidarmi di un servizio che chiede la registrazione?',
    a: 'Per aprire un P7M non serve un account. Se un servizio lo richiede senza motivo, valuta un’alternativa.',
  },
];

export function Content() {
  return (
    <>
      <p>
        Prima di trascinare un file in un sito sconosciuto, è giusto chiedersi dove va a finire. Un{' '}
        <strong>file P7M</strong> può contenere un contratto, una fattura o un atto ricevuto via PEC: non è un
        documento qualunque. Ecco come capire se <strong>aprire un P7M online è sicuro</strong>.
      </p>

      <h2 id="perche-conta">Perché la domanda conta</h2>
      <p>
        Il contenuto di un P7M è spesso riservato: dati personali, importi, firme. Se lo strumento che usi lo copia su
        un server, quel documento esce dal tuo dispositivo e resta nelle mani di un terzo, anche se solo per pochi
        minuti.
      </p>

      <h2 id="due-tipi">Due tipi di strumenti online</h2>
      <ul>
        <li>
          <strong>Elaborazione sul server.</strong> Il file viene caricato, aperto da un programma remoto e restituito.
          Funziona, ma il documento viaggia in rete.
        </li>
        <li>
          <strong>Elaborazione nel browser.</strong> La pagina contiene il codice che apre la busta: il file resta sul
          tuo dispositivo e non viene inviato a nessuno.
        </li>
      </ul>
      <p>
        <Link href="/strumenti/apri-file-p7m">Apri file P7M</Link> di ApriDoc appartiene al secondo gruppo.
      </p>

      <h2 id="come-controllare">Come controllare in 30 secondi</h2>
      <ol>
        <li>Apri la pagina dello strumento e aspetta che sia caricata.</li>
        <li>Disattiva il Wi-Fi o attiva la modalità aereo.</li>
        <li>Trascina il file <code>.p7m</code> nella casella.</li>
      </ol>
      <p>
        Se il documento si apre lo stesso, l’elaborazione è locale. Se compare un errore di rete, il file veniva
        inviato a un server.
      </p>
      <Callout>
        Il trucco funziona per gli strumenti che elaborano nel browser. Non prova nulla sulla correttezza della firma:
        per quella serve una <Link href="/blog/verificare-firma-p7m">verifica</Link>.
      </Callout>

      <h2 id="checklist">Checklist di sicurezza</h2>
      <ul>
        <li>nessuna registrazione obbligatoria per leggere un file;</li>
        <li>la pagina dichiara dove avviene l’elaborazione;</li>
        <li>connessione sicura (https) e informativa privacy leggibile;</li>
        <li>mittente dell’allegato conosciuto, soprattutto se il P7M arriva via email.</li>
      </ul>

      <h2 id="conclusione">In sintesi</h2>
      <p>
        Aprire un P7M online è sicuro quando il file non lascia il tuo dispositivo. Verificalo in mezzo minuto e
        scegli lo strumento di conseguenza. Se vuoi confrontare le opzioni leggi{' '}
        <Link href="/blog/alternative-a-dike-aprire-p7m">Alternative a DiKe</Link>.
      </p>
    </>
  );
}
