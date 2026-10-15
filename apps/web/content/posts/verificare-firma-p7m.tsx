import Link from 'next/link';
import type { Faq } from '@/lib/tool-content';
import { Callout, Table } from './shared';

export const toc = [
  { id: 'aprire-o-verificare', title: 'Aprire o verificare?' },
  { id: 'cosa-controlla', title: 'Cosa controlla una verifica' },
  { id: 'come-verificare', title: 'Come verificare la firma di un P7M' },
  { id: 'esiti', title: 'Come leggere l’esito' },
  { id: 'e-apridoc', title: 'Cosa fa (e non fa) ApriDoc.com' },
  { id: 'conclusione', title: 'In sintesi' },
  { id: 'domande', title: 'Domande frequenti' },
];

export const summary = [
  'Aprire un P7M ed estrarne il documento è diverso dal verificarne la firma.',
  'Una verifica completa controlla integrità, certificato, catena di certificazione, revoca e data di firma.',
  'Per la verifica con valore legale usa un software o un servizio di un prestatore qualificato.',
];

export const faq: Faq[] = [
  {
    q: 'Come si verifica la firma di un file P7M?',
    a: 'Con un software di verifica o un servizio online di un prestatore qualificato: apri il file, avvia la verifica e leggi l’esito, che indica se la firma è integra e se il certificato era valido.',
  },
  {
    q: 'Qual è la differenza tra aprire e verificare un P7M?',
    a: 'Aprire significa estrarre il documento dalla busta; verificare significa controllare che la firma sia autentica, che il documento non sia stato modificato e che il certificato fosse valido.',
  },
  {
    q: 'Cosa significa “firma non valida”?',
    a: 'Che almeno uno dei controlli non è andato a buon fine: per esempio il documento risulta modificato, il certificato era revocato o scaduto al momento della firma, oppure l’emittente non è tra quelli qualificati.',
  },
  {
    q: 'Dove trovo i software di verifica ufficiali?',
    a: 'AgID pubblica l’elenco dei software di verifica delle firme digitali. È il riferimento da usare per una verifica formale.',
  },
  {
    q: 'Lo strumento di ApriDoc.com verifica la firma?',
    a: 'No. Estrae il documento e mostra firmatario, ente emittente e data, ma non esegue la verifica con valore legale.',
  },
];

export function Content() {
  return (
    <>
      <p>
        Dopo aver aperto un file <strong>.p7m</strong> arriva la domanda successiva: “ma la firma è valida?”. Sono due
        cose diverse, e confonderle è l’errore più comune. Questa guida spiega cosa controlla davvero una verifica, come
        farla e come leggerne il risultato. Per aprire il file vedi{' '}
        <Link href="/blog/come-aprire-file-p7m">Come aprire un file P7M</Link>.
      </p>

      <h2 id="aprire-o-verificare">Aprire o verificare?</h2>
      <Table
        head={['', 'Aprire', 'Verificare']}
        rows={[
          ['Obiettivo', 'Leggere o scaricare il documento', 'Accertare che la firma sia valida'],
          ['Cosa fa', 'Estrae il contenuto dalla busta', 'Controlla firma, certificato, catena, revoca e data'],
          ['Serve a', 'Consultare il documento', 'Usarlo in una pratica, un contenzioso, un controllo'],
          ['Strumento', 'Anche online, nel browser', 'Software o servizio di un prestatore qualificato'],
        ]}
      />

      <h2 id="cosa-controlla">Cosa controlla una verifica</h2>
      <ul>
        <li>
          <strong>Integrità.</strong> Il documento non è stato modificato dopo la firma (l’impronta corrisponde).
        </li>
        <li>
          <strong>Certificato.</strong> Era in corso di validità al momento della firma; vedi anche{' '}
          <Link href="/blog/firma-digitale-scaduta-p7m">firma digitale scaduta</Link>.
        </li>
        <li>
          <strong>Revoca.</strong> Il certificato non risulta revocato o sospeso.
        </li>
        <li>
          <strong>Catena di certificazione.</strong> Chi ha emesso il certificato è un prestatore qualificato presente
          negli elenchi ufficiali.
        </li>
        <li>
          <strong>Data della firma.</strong> Quando presente, una marca temporale conferma il momento della firma.
        </li>
      </ul>

      <h2 id="come-verificare">Come verificare la firma di un P7M</h2>
      <ol>
        <li>
          Scegli un <strong>software di verifica</strong> o un servizio online di un prestatore qualificato. AgID
          pubblica l’elenco dei software.
        </li>
        <li>Seleziona il file <code>.p7m</code> senza rinominarlo.</li>
        <li>Avvia la verifica e attendi l’esito.</li>
        <li>Se serve, scarica il report e conservalo insieme al file originale.</li>
      </ol>
      <Callout>
        <strong>Privacy:</strong> alcuni servizi online caricano il file su un server per verificarlo. Con documenti
        riservati preferisci un software da installare o leggi l’informativa del servizio.
      </Callout>

      <h2 id="esiti">Come leggere l’esito</h2>
      <Table
        head={['Esito', 'Cosa significa di solito']}
        rows={[
          ['Firma valida', 'Tutti i controlli sono andati a buon fine'],
          ['Documento modificato', 'Il contenuto non corrisponde più alla firma'],
          ['Certificato scaduto o revocato', 'Dipende dalla data della firma e dall’eventuale marca temporale'],
          ['Emittente non attendibile', 'Il certificato non risale a un prestatore qualificato riconosciuto'],
        ]}
      />

      <h2 id="e-apridoc">Cosa fa (e non fa) ApriDoc.com</h2>
      <p>
        <Link href="/strumenti/apri-file-p7m">Apri file P7M</Link> estrae il documento dalla busta e mostra il
        firmatario, l’ente emittente del certificato e la data, direttamente nel browser. <strong>Non</strong> esegue la
        verifica con valore legale: non controlla la catena di certificazione né la revoca. È lo strumento giusto per
        leggere e scaricare, non per dimostrare la validità di una firma.
      </p>

      <h2 id="conclusione">In sintesi</h2>
      <p>
        Aprire un P7M ed estrarne il documento è rapido; verificarne la firma richiede un software o un servizio
        qualificato. Fai le due cose in due momenti diversi e conserva sempre il file originale.{' '}
        <Link href="/strumenti/apri-file-p7m">Apri il tuo P7M</Link>.
      </p>
    </>
  );
}
