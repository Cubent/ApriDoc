import Link from 'next/link';
import type { Faq } from '@/lib/tool-content';
import { Callout, Table } from './shared';

export const toc = [
  { id: 'in-breve', title: 'La risposta breve' },
  { id: 'cosa-conta', title: 'Cosa conta: la data della firma' },
  { id: 'marca-temporale', title: 'Il ruolo della marca temporale' },
  { id: 'casi', title: 'I casi più comuni' },
  { id: 'come-controllare', title: 'Come controllare' },
  { id: 'cosa-fare', title: 'Cosa fare se il certificato è scaduto' },
  { id: 'conclusione', title: 'In sintesi' },
  { id: 'domande', title: 'Domande frequenti' },
];

export const summary = [
  'Un certificato scaduto non rende automaticamente invalido un documento firmato quando era in vigore.',
  'Conta il momento della firma: serve un riferimento temporale affidabile, come una marca temporale.',
  'Senza prova della data, un verificatore può segnalare la firma come non valida: in questi casi conviene chiedere conferma a un professionista.',
];

export const faq: Faq[] = [
  {
    q: 'Un documento firmato con un certificato poi scaduto è ancora valido?',
    a: 'Può esserlo, se la firma è stata apposta quando il certificato era valido e se esiste un riferimento temporale affidabile che lo dimostri. La scadenza successiva non cancella da sola il valore della firma.',
  },
  {
    q: 'Cos’è la marca temporale?',
    a: 'È un’attestazione, emessa da un prestatore di servizi fiduciari, che prova che il documento esisteva in una data e un’ora precise. Serve a collocare la firma nel tempo.',
  },
  {
    q: 'Come capisco se il certificato era scaduto?',
    a: 'Un software di verifica mostra il periodo di validità del certificato e la data di firma, quando presente. Confrontando le due date si capisce se la firma è stata apposta in tempo.',
  },
  {
    q: 'Devo far rifirmare un documento se il certificato è scaduto?',
    a: 'Non sempre. Se esiste una marca temporale valida o un altro riferimento riconosciuto, la rifirma può non essere necessaria. Per casi concreti, per esempio con un notaio o un ente, chiedi quali requisiti applicano.',
  },
  {
    q: 'Lo strumento di ApriDoc.com verifica la validità della firma?',
    a: 'No. Estrae il documento e mostra i dati del certificato e del firmatario, ma non esegue la verifica legale: per quella serve un software qualificato.',
  },
];

export function Content() {
  return (
    <>
      <p>
        Hai aperto un file <strong>.p7m</strong> e il certificato di firma risulta scaduto: il documento è ancora
        valido? È una delle domande più frequenti su questo formato, e la risposta non è né “sempre sì” né “sempre no”.
        Questa guida spiega da cosa dipende, in modo pratico, senza sostituirsi a un parere legale. Per le basi leggi{' '}
        <Link href="/blog/file-p7m-cosa-sono">File P7M: cosa sono</Link>.
      </p>

      <h2 id="in-breve">La risposta breve</h2>
      <p>
        La scadenza del certificato <strong>non cancella automaticamente</strong> una firma apposta quando il certificato
        era valido. Il punto è poterlo dimostrare: serve sapere <em>quando</em> è stata fatta la firma.
      </p>

      <h2 id="cosa-conta">Cosa conta: la data della firma</h2>
      <p>
        Un certificato di firma ha un periodo di validità. Ciò che interessa non è se è scaduto <em>oggi</em>, ma se era
        valido <em>nel momento in cui</em> hai firmato. Se la firma è stata apposta nel periodo di validità, la scadenza
        successiva non dovrebbe incidere, a condizione che questo momento sia documentato in modo affidabile.
      </p>

      <h2 id="marca-temporale">Il ruolo della marca temporale</h2>
      <p>
        La <strong>marca temporale</strong> è un’attestazione di un prestatore di servizi fiduciari che fissa la data e
        l’ora di un documento firmato. Se il file ha una marca valida, apposta prima della scadenza del certificato, è
        questa a provare che la firma risale a quando il certificato era in vigore. Senza marca, o senza altro
        riferimento riconosciuto, la data indicata dentro la firma può non bastare per un verificatore rigoroso.
      </p>

      <h2 id="casi">I casi più comuni</h2>
      <Table
        head={['Situazione', 'Esito probabile']}
        rows={[
          ['Firma apposta con certificato valido + marca temporale prima della scadenza', 'La firma risulta valida nel tempo'],
          ['Firma apposta con certificato valido, nessuna marca temporale', 'Dipende dal verificatore e dal contesto: la prova della data può essere debole'],
          ['Certificato già scaduto al momento della firma', 'La firma non è valida'],
          ['Certificato revocato prima della firma', 'La firma non è valida'],
        ]}
      />

      <h2 id="come-controllare">Come controllare</h2>
      <ol>
        <li>
          Apri il file e leggi i dati del certificato e la data di firma, quando presente. Con{' '}
          <Link href="/strumenti/apri-file-p7m">Apri file P7M</Link> vedi firmatario, ente emittente e data.
        </li>
        <li>
          Per una <strong>verifica con valore legale</strong> usa un software di verifica qualificato, che controlla
          catena di certificazione, revoca e marca temporale. L’elenco dei software è pubblicato da AgID.
        </li>
        <li>Conserva il file <code>.p7m</code> originale e l’eventuale report di verifica.</li>
      </ol>

      <Callout>
        <strong>Nota:</strong> questa è una guida informativa, non una consulenza legale. I requisiti dipendono dal
        contesto (pratica con un ente, atto notarile, fattura, contenzioso). Nei casi dubbi chiedi conferma al
        destinatario o a un professionista.
      </Callout>

      <h2 id="cosa-fare">Cosa fare se il certificato è scaduto</h2>
      <ul>
        <li>Verifica se il documento ha una marca temporale.</li>
        <li>Chiedi al mittente se può inviare una versione con marca o un report di verifica.</li>
        <li>Se il documento deve essere ancora firmato, rinnova il certificato prima di apporre la firma.</li>
        <li>Per documenti importanti, conserva anche una prova della data di firma.</li>
      </ul>

      <h2 id="conclusione">In sintesi</h2>
      <p>
        Un certificato scaduto non rende automaticamente nullo un documento firmato in tempo, ma serve poter provare la
        data della firma, di solito con una marca temporale. Aprire il file è semplice; verificarlo con valore legale
        richiede un software qualificato.{' '}
        <Link href="/strumenti/apri-file-p7m">Apri il tuo P7M e controlla i dati del certificato</Link>.
      </p>
    </>
  );
}
