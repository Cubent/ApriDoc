import type { Metadata } from 'next';
import { LegalPage, type LegalSection } from '@/components/legal-page';
import { LEGAL } from '@/lib/legal';

export const metadata: Metadata = {
  title: 'Informativa sulla Privacy | ApriDoc.com',
  description:
    'Informativa sul trattamento dei dati personali di ApriDoc.com ai sensi degli artt. 13 e 14 del Regolamento (UE) 2016/679 (GDPR): quali dati trattiamo, perché, per quanto tempo e quali sono i tuoi diritti.',
  alternates: { canonical: '/privacy-policy' },
};

const sections: LegalSection[] = [
  {
    id: 'titolare',
    title: 'Titolare del trattamento',
    body: (
      <>
        <p>
          Il titolare del trattamento dei dati personali raccolti tramite il sito <strong>apridoc.com</strong> (di
          seguito, il “Sito”) è il gestore del Sito (il “Titolare”). In sintesi:
        </p>
        <ul>
          <li><strong>Sito:</strong> apridoc.com</li>
          <li><strong>Servizio:</strong> strumenti online per aprire file P7M e lavorare con i PDF</li>
          <li><strong>Documenti:</strong> elaborati nel browser dell’utente, senza essere caricati sui nostri server</li>
        </ul>
        <p>
          La presente informativa è resa ai sensi degli artt. 13 e 14 del Regolamento (UE) 2016/679 (“GDPR”) e del
          D.Lgs. 196/2003 (“Codice Privacy”), come modificato dal D.Lgs. 101/2018.
        </p>
      </>
    ),
  },
  {
    id: 'file',
    title: 'File e documenti elaborati con gli strumenti',
    body: (
      <>
        <p>
          Gli strumenti del Sito (tra cui l’apertura di file .p7m e le funzioni su file PDF e immagini) vengono eseguiti{' '}
          <strong>interamente nel browser dell’utente</strong>. I file selezionati non vengono caricati, trasmessi né
          archiviati sui nostri server o su server di terzi.
        </p>
        <p>
          Di conseguenza il Titolare non ha accesso al contenuto dei documenti, ai dati personali eventualmente
          contenuti al loro interno, né alle informazioni sulla firma digitale (nome del firmatario, certificato,
          emittente). Tali informazioni sono lette localmente dal dispositivo e mostrate soltanto all’utente. I
          documenti rimangono sul dispositivo e scompaiono alla chiusura o al ricaricamento della pagina, salvo il file
          che l’utente sceglie di scaricare.
        </p>
        <p>
          Per questo motivo, rispetto ai contenuti dei file, il Titolare non agisce né come titolare né come
          responsabile del trattamento.
        </p>
      </>
    ),
  },
  {
    id: 'dati',
    title: 'Dati personali trattati',
    body: (
      <>
        <p><strong>Dati di navigazione.</strong> I sistemi informatici che gestiscono il Sito acquisiscono, nel
          normale funzionamento, alcuni dati la cui trasmissione è implicita nell’uso dei protocolli di comunicazione
          di Internet: indirizzo IP, data e ora della richiesta, indirizzo (URL) della risorsa richiesta, metodo
          utilizzato, codice di risposta del server, dimensione della risposta, tipo di browser e sistema operativo.
        </p>
        <p><strong>Comunicazioni dell’utente.</strong> Se l’utente scrive al contatto indicato nel Sito, il Titolare
          tratta l’indirizzo email e le informazioni contenute nel messaggio al solo scopo di rispondere.
        </p>
        <p>
          Il Sito <strong>non richiede registrazione</strong>, non utilizza moduli di raccolta dati e non tratta
          categorie particolari di dati (art. 9 GDPR).
        </p>
      </>
    ),
  },
  {
    id: 'finalita',
    title: 'Finalità e basi giuridiche',
    body: (
      <>
        <ol>
          <li>
            <strong>Erogazione e sicurezza del Sito</strong> (consegna delle pagine, prevenzione di abusi e attacchi,
            diagnosi di malfunzionamenti). Base giuridica: legittimo interesse del Titolare a garantire il corretto e
            sicuro funzionamento del servizio (art. 6, par. 1, lett. f GDPR).
          </li>
          <li>
            <strong>Riscontro alle richieste dell’utente</strong>. Base giuridica: esecuzione di misure precontrattuali
            o richieste dell’interessato (art. 6, par. 1, lett. b GDPR).
          </li>
          <li>
            <strong>Adempimento di obblighi di legge</strong> e difesa di un diritto in sede giudiziaria. Base
            giuridica: art. 6, par. 1, lett. c ed f GDPR.
          </li>
        </ol>
        <p>
          Il conferimento dei dati di navigazione è necessario per il funzionamento tecnico del Sito. I dati non sono
          utilizzati per profilazione né per decisioni automatizzate.
        </p>
      </>
    ),
  },
  {
    id: 'cookie',
    title: 'Cookie e tecnologie simili',
    body: (
      <>
        <p>
          Il Sito <strong>non utilizza cookie di profilazione</strong>, né cookie di terze parti per finalità
          pubblicitarie o di analisi statistica. Non sono presenti strumenti di tracciamento come pixel di
          social network o servizi di analytics.
        </p>
        <p>
          I font del Sito sono serviti direttamente dal Sito stesso: la visita non comporta quindi richieste a server
          di terzi per il loro caricamento.
        </p>
        <p>
          Poiché non vengono installati cookie o strumenti non strettamente necessari, non è richiesto il consenso
          preventivo ai sensi dell’art. 122 del Codice Privacy. Qualora in futuro venissero introdotti strumenti
          di analisi o marketing, questa informativa sarà aggiornata e, ove necessario, sarà richiesto il consenso.
        </p>
      </>
    ),
  },
  {
    id: 'destinatari',
    title: 'Destinatari dei dati',
    body: (
      <>
        <p>I dati di navigazione possono essere trattati, in qualità di responsabili del trattamento ai sensi
          dell’art. 28 GDPR, dal fornitore dei servizi di hosting e di infrastruttura del Sito
          e da soggetti che prestano assistenza tecnica e manutenzione dei sistemi.
        </p>
        <p>I dati possono inoltre essere comunicati ad autorità giudiziarie o amministrative quando previsto
          dalla legge. I dati non sono oggetto di diffusione né di vendita.</p>
      </>
    ),
  },
  {
    id: 'trasferimenti',
    title: 'Trasferimenti verso Paesi extra UE',
    body: (
      <p>
        Il Titolare non trasferisce intenzionalmente dati personali verso Paesi al di fuori dello Spazio Economico
        Europeo. Qualora il fornitore di hosting effettuasse tali trasferimenti, essi avverrebbero solo sulla base di
        una decisione di adeguatezza della Commissione europea o di garanzie adeguate, quali le clausole contrattuali
        standard (artt. 45 e 46 GDPR).
      </p>
    ),
  },
  {
    id: 'conservazione',
    title: 'Periodo di conservazione',
    body: (
      <ul>
        <li>
          <strong>Log di navigazione:</strong> conservati per il tempo strettamente necessario alle finalità di
          sicurezza e, in ogni caso, per un periodo non superiore a 30 giorni, salvo necessità di accertamento di
          reati o di difesa di un diritto.
        </li>
        <li>
          <strong>Comunicazioni email:</strong> conservate per il tempo necessario a gestire la richiesta e,
          successivamente, per il periodo previsto dalla legge a fini di tutela dei diritti del Titolare.
        </li>
        <li>
          <strong>File elaborati nel browser:</strong> non conservati dal Titolare.
        </li>
      </ul>
    ),
  },
  {
    id: 'sicurezza',
    title: 'Misure di sicurezza',
    body: (
      <p>
        Il Sito è servito tramite connessione cifrata (HTTPS). Il Titolare adotta misure tecniche e organizzative
        adeguate a proteggere i dati dall’accesso non autorizzato, dalla perdita e dalla divulgazione. Il fatto che
        l’elaborazione dei file avvenga nel browser riduce in modo sostanziale l’esposizione dei documenti, che non
        transitano sui nostri sistemi.
      </p>
    ),
  },
  {
    id: 'diritti',
    title: 'Diritti dell’interessato',
    body: (
      <>
        <p>Nei limiti previsti dal GDPR, l’utente ha il diritto di:</p>
        <ul>
          <li>ottenere conferma dell’esistenza di dati che lo riguardano e accedervi (art. 15);</li>
          <li>ottenerne la rettifica (art. 16) o la cancellazione (art. 17);</li>
          <li>ottenere la limitazione del trattamento (art. 18);</li>
          <li>ricevere i dati in formato strutturato e leggibile da dispositivo automatico (art. 20);</li>
          <li>opporsi al trattamento fondato sul legittimo interesse (art. 21).</li>
        </ul>
        <p>
          Le richieste possono essere presentate al Titolare attraverso il Sito. Il Titolare risponde senza ingiustificato ritardo e, in
          ogni caso, entro un mese dal ricevimento, prorogabile di due mesi in caso di particolare complessità.
          Poiché i dati di navigazione non consentono, di regola, di identificare direttamente l’utente, il Titolare
          può richiedere informazioni aggiuntive per verificarne l’identità.
        </p>
      </>
    ),
  },
  {
    id: 'reclamo',
    title: 'Diritto di reclamo',
    body: (
      <p>
        Se ritiene che il trattamento dei suoi dati violi il GDPR, l’utente ha il diritto di proporre reclamo al
        Garante per la protezione dei dati personali (<a href="https://www.garanteprivacy.it" rel="noopener noreferrer" target="_blank">www.garanteprivacy.it</a>)
        o all’autorità di controllo dello Stato membro in cui risiede abitualmente, lavora, o in cui si è verificata la
        presunta violazione (art. 77 GDPR).
      </p>
    ),
  },
  {
    id: 'minori',
    title: 'Minori',
    body: (
      <p>
        Il Sito non è rivolto ai minori di 14 anni e non raccoglie consapevolmente dati personali riferiti a minori.
      </p>
    ),
  },
  {
    id: 'modifiche',
    title: 'Modifiche all’informativa',
    body: (
      <p>
        Il Titolare può modificare la presente informativa, ad esempio per adeguarla a novità normative o a nuove
        funzionalità del Sito. La versione vigente è sempre pubblicata a questo indirizzo, con indicazione della data
        di ultimo aggiornamento.
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Informativa sulla Privacy"
      intro="Come ApriDoc.com tratta i dati personali. In sintesi: i tuoi documenti vengono elaborati solo nel tuo browser e non vengono caricati sui nostri server."
      sections={sections}
    />
  );
}
