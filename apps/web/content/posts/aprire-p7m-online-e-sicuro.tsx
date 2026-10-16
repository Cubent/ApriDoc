import Link from 'next/link';
import type { Faq } from '@/lib/tool-content';
import { Callout, Table } from './shared';

export const toc = [
  { id: 'cosa-c-e-nel-file', title: 'Cosa c’è in un file P7M' },
  { id: 'due-modelli', title: 'Due modi di funzionare' },
  { id: 'come-capire', title: 'Come capire se il file resta sul tuo dispositivo' },
  { id: 'checklist', title: 'Checklist prima di caricare un file' },
  { id: 'quando-evitare', title: 'Quando evitare gli strumenti online' },
  { id: 'apridoc', title: 'Come funziona ApriDoc.com' },
  { id: 'conclusione', title: 'In sintesi' },
  { id: 'domande', title: 'Domande frequenti' },
];

export const summary = [
  'Un P7M può contenere dati personali, fiscali o riservati: conta dove viene elaborato.',
  'Uno strumento che lavora nel browser non invia il documento a un server; uno che lo carica sì.',
  'Puoi verificarlo con una prova semplice: provare lo strumento senza connessione.',
];

export const faq: Faq[] = [
  {
    q: 'Aprire un P7M online è sicuro?',
    a: 'Dipende dallo strumento. Se il file è elaborato nel browser, il documento non lascia il tuo dispositivo; se viene caricato su un server, passa da un servizio esterno. Con documenti riservati preferisci la prima soluzione.',
  },
  {
    q: 'Come faccio a sapere se lo strumento carica il mio file?',
    a: 'Leggi l’informativa sulla privacy e fai una prova: carica la pagina, disattiva la connessione e prova ad aprire un file. Se funziona, l’elaborazione è locale.',
  },
  {
    q: 'Posso aprire in sicurezza una fattura elettronica?',
    a: 'Una fattura contiene dati fiscali e personali: usa uno strumento che lavora nel browser o un software installato sul tuo computer.',
  },
  {
    q: 'ApriDoc.com salva i miei documenti?',
    a: 'No: i documenti sono elaborati nel browser e non vengono salvati sui nostri server. Per verificare se il download è sbloccato viene usata soltanto un’impronta (hash) del file, non il suo contenuto.',
  },
  {
    q: 'Posso fidarmi di un sito che chiede di caricare il file?',
    a: 'Solo se ne conosci il gestore e hai letto come tratta i dati. Per documenti riservati è più prudente evitare il caricamento.',
  },
];

export function Content() {
  return (
    <>
      <p>
        Un file <strong>.p7m</strong> è spesso un contratto, un atto o una fattura: documenti che non vorresti mai finire
        nelle mani sbagliate. Prima di caricarlo su un sito per aprirlo, conviene capire dove viene davvero elaborato. Ecco
        come fare una scelta consapevole. Per aprire un file passo passo vedi{' '}
        <Link href="/blog/come-aprire-file-p7m">Come aprire un file P7M</Link>.
      </p>

      <h2 id="cosa-c-e-nel-file">Cosa c’è in un file P7M</h2>
      <p>
        Il P7M racchiude il documento <strong>per intero</strong>, non solo la firma. Può quindi contenere nomi, codici
        fiscali, importi, indirizzi e qualsiasi altro dato del documento. Anche i metadati della firma (firmatario,
        certificato) sono informazioni personali.
      </p>

      <h2 id="due-modelli">Due modi di funzionare</h2>
      <Table
        head={['', 'Elaborazione nel browser', 'Elaborazione su server']}
        rows={[
          ['Dove va il file', 'Resta sul tuo dispositivo', 'Viene caricato su un servizio esterno'],
          ['Chi può vederlo', 'Solo tu', 'Il gestore del servizio, secondo la sua informativa'],
          ['Funziona offline', 'Sì, dopo aver caricato la pagina', 'No'],
          ['Adatto a dati riservati', 'Sì', 'Dipende dal servizio'],
        ]}
      />

      <h2 id="come-capire">Come capire se il file resta sul tuo dispositivo</h2>
      <ol>
        <li>
          <strong>Leggi l’informativa privacy</strong> e cerca frasi come “i file non vengono caricati su server”.
        </li>
        <li>
          <strong>Fai la prova offline.</strong> Apri la pagina, disattiva Wi-Fi o rete e prova a caricare un file. Se
          viene aperto, l’elaborazione è locale.
        </li>
        <li>
          <strong>Guarda la barra del browser.</strong> Il sito deve usare HTTPS (lucchetto).
        </li>
      </ol>

      <h2 id="checklist">Checklist prima di caricare un file</h2>
      <ul>
        <li>so chi gestisce il servizio e dove ha sede?</li>
        <li>il file è elaborato nel browser o inviato a un server?</li>
        <li>il servizio dichiara quanto tempo conserva i file?</li>
        <li>il documento è riservato o contiene dati sensibili?</li>
        <li>sono su una rete affidabile (non Wi-Fi pubblico)?</li>
      </ul>

      <h2 id="quando-evitare">Quando evitare gli strumenti online</h2>
      <Callout>
        <strong>Documenti molto sensibili.</strong> Per atti riservati, dati sanitari o documenti soggetti a vincoli
        stringenti, usa un software di firma installato sul tuo computer, che non invia nulla in rete, oppure segui le
        regole interne della tua organizzazione.
      </Callout>

      <h2 id="apridoc">Come funziona ApriDoc.com</h2>
      <p>
        <Link href="/strumenti/apri-file-p7m">Apri file P7M</Link> legge il file nel tuo browser: il contenuto del
        documento non viene inviato né salvato sui server di ApriDoc.com. Quando serve controllare se il download è
        sbloccato, il sito usa solo un’impronta (hash) del file, che non permette di ricostruirne il contenuto. Lo
        strumento mostra il documento e i dati del firmatario, ma non esegue la verifica legale della firma: vedi{' '}
        <Link href="/blog/verificare-firma-p7m">come verificare la firma di un P7M</Link>.
      </p>

      <h2 id="conclusione">In sintesi</h2>
      <p>
        Aprire un P7M online è sicuro quando l’elaborazione avviene nel browser. Verifica sempre l’informativa, fai la
        prova offline e, per i documenti più sensibili, scegli un software installato.{' '}
        <Link href="/strumenti/apri-file-p7m">Apri il tuo P7M in locale</Link>.
      </p>
    </>
  );
}
