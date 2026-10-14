import Link from 'next/link';
import type { Faq } from '@/lib/tool-content';
import { Callout, Table } from './shared';

export const toc = [
  { id: 'perche-p7m-pec', title: 'Perché i P7M arrivano via PEC' },
  { id: 'come-aprirlo', title: 'Come aprire un P7M ricevuto via PEC' },
  { id: 'altri-allegati', title: 'Gli altri file di una PEC' },
  { id: 'ricevute', title: 'Le ricevute PEC' },
  { id: 'problemi', title: 'Problemi frequenti' },
  { id: 'conclusione', title: 'In sintesi' },
  { id: 'domande', title: 'Domande frequenti' },
];

export const summary = [
  'Gli atti inviati via PEC sono spesso firmati digitalmente: per questo gli allegati arrivano in formato .p7m.',
  'Per leggerli estrai il documento dalla busta; non serve il client di posta.',
  'Conserva il messaggio PEC e gli allegati originali: contengono prove di invio e consegna.',
];

export const faq: Faq[] = [
  {
    q: 'Perché un allegato PEC è in formato P7M?',
    a: 'Perché chi lo ha inviato ha firmato il documento con firma digitale in formato CAdES. Il documento è racchiuso in una busta e prende l’estensione .p7m.',
  },
  {
    q: 'Come apro un P7M ricevuto via PEC?',
    a: 'Scarica l’allegato sul dispositivo e aprilo con uno strumento che estrae il documento dalla busta di firma, online o con un software di firma digitale.',
  },
  {
    q: 'smime.p7s e postacert.eml sono P7M?',
    a: 'No. Sono file generati dal sistema PEC: contengono la firma e il messaggio originale del gestore, non il documento che ti interessa.',
  },
  {
    q: 'La PEC è la stessa cosa della firma digitale?',
    a: 'No. La PEC certifica invio e consegna di un messaggio; la firma digitale attesta l’identità di chi ha firmato il documento. Possono essere usate insieme.',
  },
  {
    q: 'Devo conservare anche il file P7M?',
    a: 'Sì. Il P7M contiene la firma: conservalo insieme al messaggio PEC e alle ricevute.',
  },
];

export function Content() {
  return (
    <>
      <p>
        Nella casella PEC arriva un allegato con estensione <strong>.p7m</strong> e non si apre: succede spesso con atti,
        diffide, comunicazioni di enti e documenti di studi professionali. Questa guida spiega perché arrivano così e
        come leggerli in pochi secondi. Per le basi del formato leggi{' '}
        <Link href="/blog/file-p7m-cosa-sono">File P7M: cosa sono</Link>.
      </p>

      <h2 id="perche-p7m-pec">Perché i P7M arrivano via PEC</h2>
      <p>
        La <strong>PEC</strong> garantisce che il messaggio è stato inviato e consegnato. La{' '}
        <strong>firma digitale</strong>, invece, garantisce chi ha firmato il documento e che non è stato modificato. Chi
        invia atti ufficiali spesso usa entrambe: il documento viene firmato (e diventa un <code>.p7m</code>) e poi
        spedito con PEC.
      </p>

      <h2 id="come-aprirlo">Come aprire un P7M ricevuto via PEC</h2>
      <ol>
        <li>
          <strong>Scarica l’allegato</strong> dalla PEC (webmail o client) sul computer o sul telefono.
        </li>
        <li>
          <strong>Apri lo strumento</strong>{' '}
          <Link href="/strumenti/apri-file-p7m">Apri file P7M</Link> dal browser.
        </li>
        <li>
          <strong>Trascina il file</strong> nella casella: vedi il documento, chi lo ha firmato e quando.
        </li>
        <li>
          <strong>Scarica il documento</strong> estratto, ad esempio il PDF dell’atto.
        </li>
      </ol>
      <p>
        L’elaborazione avviene nel browser, senza caricare il documento su un server: utile quando l’atto contiene dati
        personali o riservati.
      </p>

      <h2 id="altri-allegati">Gli altri file di una PEC</h2>
      <p>Una PEC può contenere, oltre agli allegati, file generati dal sistema. Non vanno confusi con i documenti:</p>
      <Table
        head={['File', 'Cos’è', 'Devi aprirlo?']}
        rows={[
          ['documento.pdf.p7m', 'Il documento firmato dal mittente', 'Sì, è quello che ti interessa'],
          ['smime.p7s', 'La firma del gestore sul messaggio PEC', 'No, è tecnico'],
          ['postacert.eml', 'Il messaggio originale racchiuso dal gestore', 'Di norma no'],
          ['daticert.xml', 'Dati tecnici della ricevuta PEC', 'No, serve ai sistemi'],
        ]}
      />

      <h2 id="ricevute">Le ricevute PEC</h2>
      <p>
        Le ricevute di <em>accettazione</em> e di <em>consegna</em> sono la prova dell’invio e dell’arrivo del messaggio.
        Conservale insieme alla PEC originale e agli allegati, soprattutto se il documento ha rilevanza legale o fiscale.
      </p>
      <Callout>
        <strong>Da ricordare:</strong> aprire il P7M non significa verificare la firma. Se l’atto deve produrre effetti in
        un procedimento, controlla la firma con un software di verifica qualificato e conserva il file{' '}
        <code>.p7m</code> originale.
      </Callout>

      <h2 id="problemi">Problemi frequenti</h2>
      <h3>L’allegato risulta danneggiato</h3>
      <p>
        Scaricalo di nuovo dalla PEC: a volte il download si interrompe e il file resta incompleto.
      </p>
      <h3>Dentro il P7M c’è un altro P7M</h3>
      <p>
        Il documento è stato firmato più volte (<code>.p7m.p7m</code>). Estrai un livello alla volta fino a raggiungere
        il documento finale.
      </p>
      <h3>Il file è un .p7s</h3>
      <p>
        È una firma staccata: il documento è in un altro allegato e serve insieme alla firma.
      </p>

      <h2 id="conclusione">In sintesi</h2>
      <p>
        I P7M ricevuti via PEC sono documenti firmati digitalmente: per leggerli bastano pochi secondi e uno strumento
        che estrae il contenuto. Conserva sempre il messaggio PEC, le ricevute e il file{' '}
        <code>.p7m</code> originale. <Link href="/strumenti/apri-file-p7m">Apri il tuo P7M</Link>.
      </p>
    </>
  );
}
