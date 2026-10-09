import Link from 'next/link';
import type { Faq } from '@/lib/tool-content';

export const toc = [
  { id: 'cos-e', title: 'Cos’è un file P7M' },
  { id: 'cosa-contiene', title: 'Cosa contiene la busta' },
  { id: 'p7m-p7s-pades', title: 'P7M, P7S, PAdES e XAdES' },
  { id: 'dove-si-usa', title: 'Dove si usa' },
  { id: 'valore-legale', title: 'Valore legale della firma' },
  { id: 'come-aprirlo', title: 'Come aprire un file P7M' },
  { id: 'errori-comuni', title: 'Problemi frequenti' },
  { id: 'conclusione', title: 'In sintesi' },
  { id: 'domande', title: 'Domande frequenti' },
];

export const summary = [
  'Un file .p7m è una “busta” di firma digitale in formato CAdES (PKCS#7): contiene insieme il documento originale e la firma.',
  'Si apre estraendo il contenuto con un software dedicato o con uno strumento online: rinominare il file non basta.',
  'Aprire un P7M non significa verificarne la firma: sono due operazioni diverse.',
];

export const faq: Faq[] = [
  {
    q: 'Cos’è un file P7M?',
    a: 'È un file con estensione .p7m che racchiude un documento e la firma digitale di chi lo ha sottoscritto, secondo lo standard CAdES basato su PKCS#7. Il documento originale è dentro la busta e va estratto per poterlo leggere.',
  },
  {
    q: 'Come si apre un file P7M?',
    a: 'Con un software di firma digitale (come quelli forniti dai prestatori di servizi fiduciari) oppure con uno strumento online che estrae il contenuto dalla busta. Il file va letto come busta firmata: cambiargli l’estensione non funziona.',
  },
  {
    q: 'Qual è la differenza tra P7M e P7S?',
    a: 'Nel P7M il documento e la firma sono nello stesso file (firma “avvolgente”). Nel P7S la firma è in un file separato, da conservare insieme al documento originale (firma “staccata”).',
  },
  {
    q: 'Un file P7M ha valore legale?',
    a: 'Se la firma è una firma elettronica qualificata (firma digitale), il Regolamento eIDAS le attribuisce effetto giuridico equivalente a quello di una firma autografa. Il valore dipende dal tipo di firma e dal certificato usato, non dall’estensione del file.',
  },
  {
    q: 'Posso convertire un P7M in PDF?',
    a: 'Se il documento contenuto nella busta è un PDF, basta estrarlo. Se è un altro formato, come un XML o un’immagine, può essere convertito in PDF dopo l’estrazione. La firma digitale resta nel file .p7m originale.',
  },
  {
    q: 'Perché il file P7M ha più estensioni, come .pdf.p7m?',
    a: 'Il nome originale del documento viene mantenuto e a esso si aggiunge .p7m. Un file “contratto.pdf.p7m” contiene quindi un PDF, mentre “fattura.xml.p7m” contiene un file XML.',
  },
];

const Callout = ({ children }: { children: React.ReactNode }) => (
  <aside className="my-8 rounded-2xl border border-[#d9d3f2] bg-[#f6f4ff] p-5 text-[15px] leading-7 text-[#3d4452]">
    {children}
  </aside>
);

export function Content() {
  return (
    <>
      <p>
        Se ti è capitato di ricevere un allegato che finisce con <strong>.p7m</strong> e di non riuscire ad aprirlo, non
        sei il solo: è uno dei formati più diffusi in Italia per documenti firmati digitalmente, ma anche uno dei più
        misteriosi per chi lo incontra per la prima volta. In questa guida spieghiamo cos’è un file P7M, cosa c’è
        dentro, in cosa si differenzia da altri formati di firma e come si apre.
      </p>

      <h2 id="cos-e">Cos’è un file P7M</h2>
      <p>
        Un file P7M è una <strong>busta di firma digitale</strong>. Quando un documento viene firmato nel formato CAdES
        (<em>CMS Advanced Electronic Signatures</em>), il software di firma crea un nuovo file che contiene il
        documento originale insieme alla firma e ai dati che la accompagnano. Quel nuovo file prende l’estensione{' '}
        <code>.p7m</code>, dal nome dello standard su cui si basa, PKCS#7, oggi descritto come CMS (<em>Cryptographic
        Message Syntax</em>).
      </p>
      <p>
        Il nome del documento originale viene conservato e a esso si aggiunge l’estensione della busta. Per questo si
        incontrano file come <code>contratto.pdf.p7m</code> o <code>fattura.xml.p7m</code>: la prima parte indica il
        formato del documento contenuto, <code>.p7m</code> indica che è racchiuso in una firma.
      </p>
      <p>
        Il punto che crea più confusione è questo: <strong>il documento non è “nascosto” o cifrato</strong>, ma è
        incorporato nella struttura della firma. Un lettore PDF che riceve il file non trova un PDF, trova una
        struttura di firma, e per questo non riesce ad aprirlo. Va prima estratto il contenuto.
      </p>

      <Callout>
        <strong>In breve:</strong> il P7M non è un formato di documento come il PDF o il Word. È un contenitore che
        avvolge un documento qualsiasi e lo lega a una firma.
      </Callout>

      <h2 id="cosa-contiene">Cosa contiene la busta</h2>
      <p>All’interno di un file P7M si trovano, in una struttura binaria codificata in ASN.1 (spesso in formato DER):</p>
      <ul>
        <li>
          <strong>il documento originale</strong>, byte per byte, senza modifiche;
        </li>
        <li>
          <strong>la firma</strong>, cioè l’impronta (hash) del documento cifrata con la chiave privata del firmatario;
        </li>
        <li>
          <strong>il certificato del firmatario</strong>, con nome, ente emittente, numero seriale e periodo di
          validità;
        </li>
        <li>
          <strong>attributi firmati</strong>, come l’algoritmo di hash usato (ad esempio SHA-256) e, se presente, la
          data e l’ora di firma.
        </li>
      </ul>
      <p>
        Spesso nella busta sono inclusi anche i certificati degli enti che hanno emesso quello del firmatario, la
        cosiddetta catena di certificazione. Una busta può inoltre contenere più firme, oppure essere annidata: un
        documento firmato da una persona e poi controfirmato da un’altra dà origine a file come{' '}
        <code>documento.pdf.p7m.p7m</code>.
      </p>
      <p>
        Per via di questi dati aggiuntivi il file P7M è sempre un po’ più grande dell’originale. Alcuni file sono
        salvati in formato testuale (PEM o base64): in quel caso la dimensione cresce di circa un terzo.
      </p>

      <h2 id="p7m-p7s-pades">P7M, P7S, PAdES e XAdES: le differenze</h2>
      <p>
        Esistono più modi di firmare digitalmente un documento. Quelli che si incontrano più spesso sono questi:
      </p>
      <div className="not-prose my-6 overflow-x-auto rounded-2xl border border-[#e6e8ec]">
        <table className="w-full min-w-[620px] text-left text-sm">
          <thead className="bg-[#f4f5f7] text-xs font-bold uppercase tracking-wider text-[#8a91a0]">
            <tr>
              <th className="px-4 py-3">Formato</th>
              <th className="px-4 py-3">Estensione</th>
              <th className="px-4 py-3">Come è fatta la firma</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#eef0f3] text-[#3d4452]">
            <tr>
              <td className="px-4 py-3 font-semibold">CAdES (avvolgente)</td>
              <td className="px-4 py-3">.p7m</td>
              <td className="px-4 py-3">Documento e firma nello stesso file, dentro una busta.</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-semibold">CAdES (staccata)</td>
              <td className="px-4 py-3">.p7s</td>
              <td className="px-4 py-3">Firma in un file separato, da tenere insieme al documento originale.</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-semibold">PAdES</td>
              <td className="px-4 py-3">.pdf</td>
              <td className="px-4 py-3">Firma incorporata nel PDF, che si apre normalmente con un lettore PDF.</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-semibold">XAdES</td>
              <td className="px-4 py-3">.xml</td>
              <td className="px-4 py-3">Firma inserita dentro il file XML, usata anche per le fatture elettroniche.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        La differenza pratica è comoda da ricordare: con <strong>PAdES</strong> il file resta un normale PDF che puoi
        aprire subito, con il <strong>P7M</strong> serve un passaggio in più per estrarre il documento. Per un file{' '}
        <strong>P7S</strong>, invece, il documento è un altro file: se non hai entrambi, non puoi né leggerlo né
        verificare la firma.
      </p>

      <h2 id="dove-si-usa">Dove si usa</h2>
      <p>Il formato P7M è molto diffuso in ambito professionale e nella pubblica amministrazione italiana. I casi più comuni:</p>
      <ul>
        <li>
          <strong>Fatture elettroniche.</strong> Le fatture in formato XML possono essere firmate e prendono il nome{' '}
          <code>.xml.p7m</code>. Per le fatture verso la pubblica amministrazione la firma è prevista, mentre tra
          privati non è obbligatoria.
        </li>
        <li>
          <strong>PEC.</strong> Allegati ricevuti via posta elettronica certificata, come atti, diffide e
          comunicazioni ufficiali.
        </li>
        <li>
          <strong>Atti notarili e pratiche professionali.</strong> Documenti sottoscritti da notai, commercialisti,
          avvocati e altri professionisti.
        </li>
        <li>
          <strong>Pubblica amministrazione.</strong> Pratiche, gare d’appalto, delibere e documentazione scambiata con
          gli enti.
        </li>
        <li>
          <strong>Contratti.</strong> Accordi sottoscritti con firma digitale qualificata.
        </li>
      </ul>

      <h2 id="valore-legale">Valore legale della firma</h2>
      <p>
        Il valore di un documento firmato non dipende dall’estensione del file, ma dal <strong>tipo di firma</strong> e
        dal <strong>certificato</strong> usato. Una firma digitale, cioè una firma elettronica qualificata emessa da un
        prestatore di servizi fiduciari qualificato, ha secondo il Regolamento eIDAS (UE 910/2014) effetto giuridico
        equivalente a quello di una firma autografa.
      </p>
      <p>Perché una firma sia considerata valida, devono risultare verificate alcune condizioni:</p>
      <ul>
        <li>il documento non è stato modificato dopo la firma (l’impronta corrisponde);</li>
        <li>il certificato era valido nel momento in cui è stato firmato, cioè non scaduto;</li>
        <li>il certificato non risulta revocato;</li>
        <li>
          chi ha emesso il certificato è un prestatore di servizi fiduciari qualificato, presente negli elenchi ufficiali
          (in Italia, la lista tenuta da AgID).
        </li>
      </ul>

      <Callout>
        <strong>Aprire non è verificare.</strong> Estrarre un documento da un P7M e controllarne la firma sono due
        operazioni diverse. Per usare il documento in un procedimento con valore legale serve una verifica completa con
        un software qualificato. Conserva sempre anche il file .p7m originale: è quello che contiene la firma.
      </Callout>

      <h2 id="come-aprirlo">Come aprire un file P7M</h2>
      <p>Hai tre strade principali:</p>
      <ol>
        <li>
          <strong>Un software di firma digitale.</strong> I prestatori di servizi fiduciari mettono a disposizione
          programmi gratuiti che estraggono il documento e verificano la firma. È la scelta giusta quando ti serve la
          verifica con valore legale.
        </li>
        <li>
          <strong>Uno strumento online.</strong> Trascini il file in una pagina e ottieni il documento, senza
          installare nulla. Funziona anche da smartphone. Conviene scegliere uno strumento che elabora il file nel
          browser, senza caricarlo su un server, soprattutto se il documento è riservato.
        </li>
        <li>
          <strong>Un’app del tuo sistema o gestionale</strong>, quando il formato è già supportato.
        </li>
      </ol>
      <p>
        Con{' '}
        <Link href="/strumenti/apri-file-p7m">lo strumento Apri file P7M di ApriDoc.com</Link> il file viene letto nel
        tuo browser: vedi il documento, chi lo ha firmato e quando, e puoi scaricarlo. Se ti serve un PDF, trovi la
        procedura nella pagina{' '}
        <Link href="/strumenti/convertire-p7m-in-pdf">da P7M a PDF</Link>.
      </p>

      <h2 id="errori-comuni">Problemi frequenti</h2>
      <h3>Rinominare il file non funziona</h3>
      <p>
        È un consiglio che circola spesso: togliere <code>.p7m</code> dal nome per ottenere il PDF. In realtà il file
        continua a contenere la struttura della firma e il lettore non riesce ad aprirlo. Il documento va estratto, non
        rinominato.
      </p>
      <h3>Il file ha più firme o più livelli</h3>
      <p>
        Un P7M può contenere più firmatari oppure essere stato firmato di nuovo (<code>.p7m.p7m</code>). Il documento
        si raggiunge estraendo il contenuto livello dopo livello.
      </p>
      <h3>La firma è “staccata”</h3>
      <p>
        Se il file è un <code>.p7s</code>, o una busta che non include il documento, il contenuto non è nel file: serve
        anche il documento originale a cui la firma si riferisce.
      </p>
      <h3>Il certificato risulta scaduto</h3>
      <p>
        La scadenza del certificato non rende automaticamente non valida una firma apposta quando il certificato era in
        vigore. Conta la data di firma, verificata con una marca temporale o un riferimento affidabile. Per questo
        conviene un software che esegua la verifica completa.
      </p>

      <h2 id="conclusione">In sintesi</h2>
      <p>
        Un file P7M è una busta CAdES che racchiude un documento e la sua firma digitale. Si apre estraendo il
        contenuto, non rinominando il file, e questa operazione è diversa dalla verifica della firma. Se devi solo
        leggere o scaricare il documento puoi usare uno strumento online che lavora nel browser; se devi dimostrarne il
        valore legale, usa un software di verifica qualificato e conserva il file originale.
      </p>
    </>
  );
}
