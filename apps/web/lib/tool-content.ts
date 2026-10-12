export type Faq = { q: string; a: string };

export type Point = { title: string; text: string };

/** Each PDF tool gets its own layout for the explanatory section below the tool. */
export type InfoLayout = 'cards' | 'grid' | 'steps' | 'split' | 'timeline' | 'banner';

export type ToolInfo = {
  layout: InfoLayout;
  reverse?: boolean;
  title: string;
  paragraphs: string[];
  points: Point[];
  steps: Point[];
};

export type ToolContent = {
  intro: string[];
  cards?: Point[];
  info?: ToolInfo;
  faq: Faq[];
};

const privacyFaq: Faq = {
  q: 'I miei file vengono caricati su un server?',
  a: 'No. L’elaborazione avviene interamente nel tuo browser, sul tuo dispositivo. I documenti non vengono inviati né salvati da ApriDoc.com, quindi restano privati anche se contengono dati sensibili.',
};

// Two questions about what the tool itself does, per tool.
const toolFaq: Record<string, Faq[]> = {
  'unisci-pdf-online': [
    {
      q: 'Posso scegliere l’ordine dei file prima di unirli?',
      a: 'Sì. Dopo aver caricato i PDF puoi spostarli su e giù con le frecce: nel documento finale le pagine seguono lo stesso ordine dell’elenco.',
    },
    {
      q: 'Quanti PDF posso unire e quali file sono supportati?',
      a: 'Puoi unire due o più PDF, di qualsiasi numero di pagine. I file protetti da password vanno prima sbloccati, perché non possono essere letti per essere combinati.',
    },
  ],
  'dividi-pdf-online': [
    {
      q: 'Come indico le pagine da estrarre?',
      a: 'Scrivi intervalli e singole pagine separati da virgole, ad esempio “1-3, 5, 8-”. Un intervallo senza fine arriva fino all’ultima pagina.',
    },
    {
      q: 'Posso salvare ogni pagina come file separato?',
      a: 'Sì. Scegli l’opzione per dividere tutte le pagine e ottieni un archivio ZIP con un PDF per ogni pagina del documento.',
    },
  ],
  'ruota-pdf-online': [
    {
      q: 'Posso ruotare solo alcune pagine?',
      a: 'Sì. Lascia vuoto il campo per ruotare tutte le pagine, oppure indica solo quelle che ti servono, ad esempio “2, 4-6”: le altre restano invariate.',
    },
    {
      q: 'Di quanto posso ruotare le pagine?',
      a: 'Di 90° in senso orario, di 90° in senso antiorario oppure di 180°. La rotazione è permanente nel file che scarichi.',
    },
  ],
  'organizza-pdf-online': [
    {
      q: 'Cosa posso fare con le pagine del PDF?',
      a: 'Scrivi le pagine nell’ordine che vuoi: quelle che non indichi vengono eliminate e quelle ripetute vengono duplicate. Il risultato è un nuovo PDF con la sequenza scelta.',
    },
    {
      q: 'Il PDF originale viene modificato?',
      a: 'No. Il file che hai caricato resta intatto: lo strumento crea un nuovo documento con le modifiche.',
    },
  ],
  'convertire-jpg-in-pdf': [
    {
      q: 'Quali formati di immagine posso convertire?',
      a: 'JPG e PNG. Ogni immagine diventa una pagina del PDF, nell’ordine in cui le carichi.',
    },
    {
      q: 'Posso scegliere dimensione della pagina e margini?',
      a: 'Sì. Puoi usare pagine in formato A4 oppure adattate alla dimensione dell’immagine, e impostare il margine attorno ad essa.',
    },
  ],
  'convertire-pdf-in-jpg': [
    {
      q: 'Ottengo un’immagine per ogni pagina?',
      a: 'Sì. Ogni pagina del PDF viene convertita in un’immagine JPG: se il documento ha più pagine ricevi un archivio ZIP con tutte le immagini.',
    },
    {
      q: 'Che qualità hanno le immagini JPG?',
      a: 'Puoi scegliere la risoluzione (da circa 110 a 220 DPI) e la qualità JPG: con le impostazioni più alte testo e dettagli restano leggibili anche ingranditi.',
    },
  ],
  'numerare-pagine-pdf': [
    {
      q: 'Dove posso posizionare i numeri di pagina?',
      a: 'Puoi scegliere la posizione sulla pagina, ad esempio in basso al centro o in alto a destra, e il formato della numerazione.',
    },
    {
      q: 'Posso far partire la numerazione da un numero diverso da 1?',
      a: 'Puoi scegliere da quale numero far partire la numerazione, ad esempio per continuare quella di un altro documento. I numeri vengono applicati a tutte le pagine.',
    },
  ],
  'aggiungere-filigrana-pdf': [
    {
      q: 'Che tipo di filigrana posso aggiungere?',
      a: 'Puoi inserire un testo, come “BOZZA” o “RISERVATO”, e regolarne dimensione, trasparenza e inclinazione.',
    },
    {
      q: 'La filigrana viene applicata a tutte le pagine?',
      a: 'Sì, il testo viene applicato a ogni pagina del documento, in modo uniforme.',
    },
  ],
};

const p7m: ToolContent = {
  intro: [
    'ApriDoc.com ti permette di aprire un file .p7m direttamente online: lo trascini nella casella qui sopra e in pochi secondi vedi il documento originale, chi lo ha firmato e quando. È pensato per chi riceve un “documento.pdf.p7m” e non riesce ad aprirlo con il normale lettore PDF. Funziona con Windows, macOS, Linux, iPhone e Android, senza installare programmi.',
    'Lo strumento è utile con le fatture elettroniche in formato XML.P7M, gli allegati ricevuti via PEC, i contratti e gli atti firmati con firma digitale qualificata. Se ti serve soltanto il documento, con un clic estrai il PDF dalla busta firmata e lo scarichi: è il modo più veloce per passare da P7M a PDF senza caricare nulla su un server.',
  ],
  cards: [
    {
      title: 'Cos’è un file P7M',
      text: 'È una “busta” digitale in formato CAdES (PKCS#7) che racchiude insieme il documento originale e la firma elettronica di chi lo ha sottoscritto.',
    },
    {
      title: 'Dove si usa',
      text: 'Molto diffuso in Italia per fatture elettroniche, PEC, atti notarili, pratiche con la pubblica amministrazione e contratti con valore legale.',
    },
    {
      title: 'Resta sul tuo dispositivo',
      text: 'Il file viene letto dal browser e non lascia mai il tuo computer o telefono: nessun upload, nessun archivio, massima riservatezza.',
    },
  ],
  faq: [
    {
      q: 'Come si apre un file P7M?',
      a: 'Un P7M non si apre con un normale lettore PDF perché contiene il documento dentro una firma digitale. Con ApriDoc.com basta trascinare il file nello strumento: il documento originale viene estratto e mostrato nella pagina, pronto da scaricare.',
    },
    {
      q: 'Come converto un P7M in PDF?',
      a: 'Apri il file con lo strumento e premi “Scarica”: se la busta contiene un PDF, ottieni il PDF originale senza alterazioni. Non si tratta di una vera conversione, ma dell’estrazione del documento contenuto.',
    },
    {
      q: 'Posso aprire le fatture elettroniche XML.P7M?',
      a: 'Sì. Lo strumento estrae il file XML della fattura e ne mostra il contenuto testuale. Puoi anche scaricarlo per importarlo nel tuo gestionale.',
    },
    {
      q: 'Lo strumento verifica la validità legale della firma?',
      a: 'No. ApriDoc.com legge ed estrae il contenuto e mostra i dati del firmatario e del certificato, ma non controlla la catena di certificazione né la revoca. Se ti serve una verifica con valore legale, usa un software di verifica qualificato.',
    },
    {
      q: 'Il mio documento viene caricato online?',
      a: 'No. Tutto avviene nel browser: il file non viene inviato a nessun server. Puoi usarlo in sicurezza anche con documenti riservati.',
    },
    {
      q: 'Perché il file mi dice che la firma è “detached”?',
      a: 'Una firma detached (file .p7s o simili) non contiene il documento, che si trova in un file separato. In questo caso non c’è nulla da estrarre dalla busta: ti serve il documento originale che accompagna la firma.',
    },
    {
      q: 'Funziona con più firme sullo stesso documento?',
      a: 'Sì. Se il file è stato firmato più volte (firme annidate), ApriDoc.com le apre tutte in sequenza e ti restituisce il documento finale, elencando i firmatari trovati.',
    },
    {
      q: 'Funziona da iPhone e Android?',
      a: 'Sì, basta un browser moderno. Seleziona il file dal telefono oppure dalla posta e lo strumento lo apre allo stesso modo che su computer.',
    },
  ],
};

const toolInfo: Record<string, ToolInfo> = {
  'unisci-pdf-online': {
    layout: 'grid',
    title: 'Unire PDF online: perché usare ApriDoc.com',
    paragraphs: [
      'Con lo strumento Unisci PDF di ApriDoc.com combini due o più file PDF in un unico documento in pochi secondi. Carichi i file, li riordini con le frecce e scarichi il PDF unito: niente programmi da installare e nessun account per elaborare i file.',
      'È il modo più veloce per mettere insieme contratti, fatture, allegati e scansioni in un solo file, invece di allegare dieci PDF diversi alla stessa email o alla stessa pratica.',
    ],
    points: [
      { title: 'Ordine a tua scelta', text: 'Sposta i file su e giù prima di unirli: le pagine del documento finale seguono esattamente l’ordine dell’elenco.' },
      { title: 'Nessun upload', text: 'L’unione avviene nel tuo browser: i documenti non vengono inviati a nessun server, anche se contengono dati sensibili.' },
      { title: 'Pagine invariate', text: 'Le pagine vengono copiate così come sono, senza ricompressione: testo e immagini restano identici all’originale.' },
      { title: 'Su ogni dispositivo', text: 'Funziona su computer, tablet e smartphone con un normale browser, senza app né plugin.' },
    ],
    steps: [],
  },
  'dividi-pdf-online': {
    layout: 'steps',
    title: 'Dividere un PDF online: estrai solo le pagine che ti servono',
    paragraphs: [
      'Lo strumento Dividi PDF di ApriDoc.com separa un documento in più parti oppure estrae soltanto le pagine che ti interessano. Indichi un intervallo come “1-3, 5, 8-” e ottieni subito un nuovo PDF, oppure salvi ogni pagina come file a sé in un archivio ZIP.',
      'È utile quando devi inviare solo alcune pagine di un contratto, isolare una singola fattura da un file di scansioni, togliere la copertina o condividere un capitolo senza mandare l’intero documento.',
    ],
    steps: [
      { title: 'Carica il PDF', text: 'Trascina il file o selezionalo dal dispositivo: vedi subito quante pagine contiene.' },
      { title: 'Scegli come dividere', text: 'Estrai un intervallo di pagine oppure crea un PDF separato per ogni pagina.' },
      { title: 'Scarica il risultato', text: 'Ottieni il nuovo PDF, o uno ZIP con tutte le pagine, pronto da condividere.' },
    ],
    points: [
      { title: 'Intervalli flessibili', text: 'Combina pagine singole e intervalli, ad esempio “1-3, 5, 8-”: l’ultimo intervallo arriva fino alla fine del documento.' },
      { title: 'Una pagina per file', text: 'Salva ogni pagina come PDF separato e scaricale tutte insieme in un unico archivio ZIP.' },
      { title: 'Originale intatto', text: 'Il file che carichi non viene modificato: ricevi sempre un nuovo documento.' },
      { title: 'Privato per natura', text: 'Tutto avviene nel browser: il PDF non viene caricato su nessun server.' },
    ],
  },
  'ruota-pdf-online': {
    layout: 'split',
    title: 'Ruotare un PDF online in modo permanente',
    paragraphs: [
      'Hai scansionato un documento al contrario o ricevuto un PDF con le pagine in orizzontale? Con Ruota PDF di ApriDoc.com giri tutte le pagine, o solo quelle che indichi, di 90° in senso orario, 90° in senso antiorario o 180°.',
      'La rotazione viene salvata nel file: quando lo riapri o lo invii, le pagine sono già nella posizione giusta, a differenza della rotazione temporanea che applicano molti visualizzatori PDF.',
      'Perfetto per documenti scansionati con lo smartphone, fotocopie capovolte e allegati ricevuti con il verso sbagliato.',
    ],
    points: [
      { title: 'Tutte le pagine o solo alcune', text: 'Lascia vuoto il campo per ruotare l’intero documento, oppure scrivi ad esempio “2, 4-6”.' },
      { title: '90°, 180° o 270°', text: 'Scegli la rotazione che serve: oraria, antioraria o a testa in giù.' },
      { title: 'Rotazione salvata nel file', text: 'Il PDF che scarichi si apre già dritto su qualsiasi dispositivo.' },
      { title: 'Nessun upload', text: 'Il documento resta sul tuo dispositivo e non viene inviato a nessun server.' },
    ],
    steps: [],
  },
  'organizza-pdf-online': {
    layout: 'timeline',
    title: 'Organizzare un PDF: riordina, elimina e duplica le pagine',
    paragraphs: [
      'Organizza PDF ti permette di sistemare le pagine di un documento senza programmi di editing: scrivi l’ordine che vuoi (ad esempio “3,1,2,5-7”) e ottieni un nuovo PDF con le pagine riordinate.',
      'Le pagine che non indichi vengono eliminate, quelle ripetute vengono duplicate: con un solo passaggio riordini un documento, togli le pagine inutili o ripeti un modulo più volte.',
    ],
    steps: [
      { title: 'Carica il PDF', text: 'Seleziona il file: ApriDoc.com legge il numero di pagine e te lo mostra.' },
      { title: 'Scrivi il nuovo ordine', text: 'Elenca le pagine nella sequenza desiderata, separate da virgole o intervalli.' },
      { title: 'Scarica il PDF organizzato', text: 'Ricevi un nuovo documento con la sequenza scelta; l’originale non viene toccato.' },
    ],
    points: [
      { title: 'Riordina' , text: 'Sposta una pagina in un’altra posizione con una semplice sequenza numerica.' },
      { title: 'Elimina', text: 'Le pagine non indicate vengono rimosse dal nuovo file.' },
      { title: 'Duplica', text: 'Una pagina scritta due volte compare due volte nel risultato.' },
      { title: 'Privato', text: 'Tutto avviene nel browser, senza caricare il PDF online.' },
    ],
  },
  'convertire-jpg-in-pdf': {
    layout: 'banner',
    title: 'JPG in PDF: trasforma foto e immagini in un documento',
    paragraphs: [
      'Con lo strumento JPG in PDF di ApriDoc.com converti una o più immagini JPG e PNG in un unico PDF, nell’ordine in cui le carichi. Ogni immagine diventa una pagina del documento.',
      'È ideale per trasformare foto di documenti, ricevute, scontrini e scansioni fatte con lo smartphone in un PDF pronto da inviare per email, allegare a una pratica o archiviare.',
    ],
    steps: [],
    points: [
      { title: 'JPG e PNG', text: 'Supporta i formati immagine più comuni.' },
      { title: 'Pagina A4 o su misura', text: 'Scegli una pagina A4 oppure adattata alla dimensione dell’immagine.' },
      { title: 'Margini regolabili', text: 'Imposta il margine attorno all’immagine.' },
      { title: 'Più immagini, un solo PDF', text: 'Unisci tutte le foto in un unico file.' },
      { title: 'Nessun upload', text: 'Le immagini restano sul tuo dispositivo.' },
    ],
  },
  'convertire-pdf-in-jpg': {
    layout: 'cards',
    title: 'PDF in JPG: converti le pagine in immagini',
    paragraphs: [
      'PDF in JPG di ApriDoc.com trasforma ogni pagina di un documento PDF in un’immagine JPG. Se il PDF ha più pagine ricevi un archivio ZIP con tutte le immagini, già numerate nell’ordine del documento.',
      'È la soluzione giusta quando ti serve una pagina da inserire in una presentazione, da pubblicare sul web, da condividere su un social o da inviare come immagine tramite chat.',
    ],
    steps: [],
    points: [
      { title: 'Qualità a scelta', text: 'Imposta la risoluzione (da circa 110 a 220 DPI) e la qualità JPG: con i valori più alti testo e dettagli restano leggibili anche ingranditi.' },
      { title: 'Un’immagine per pagina', text: 'Ogni pagina diventa un file JPG; con più pagine scarichi tutto in un solo ZIP.' },
      { title: 'Elaborazione locale', text: 'La conversione avviene nel browser: il PDF non viene caricato su nessun server.' },
    ],
  },
  'numerare-pagine-pdf': {
    layout: 'split',
    reverse: true,
    title: 'Numerare le pagine di un PDF online',
    paragraphs: [
      'Con lo strumento Numera pagine di ApriDoc.com aggiungi la numerazione a un PDF che ne è privo: scegli dove posizionare i numeri, il formato e da quale numero partire.',
      'Serve per ordinare dispense, relazioni, tesi, fascicoli e allegati, oppure per proseguire la numerazione di un altro documento. Il risultato è un nuovo PDF con i numeri applicati a tutte le pagine.',
    ],
    points: [
      { title: 'Posizione a scelta', text: 'Metti i numeri in basso al centro, in alto a destra e nelle altre posizioni disponibili.' },
      { title: 'Formato personalizzabile', text: 'Usa un semplice “1” oppure “Pagina 1 di N”.' },
      { title: 'Numero iniziale libero', text: 'Parti da 1 o da qualsiasi altro numero per continuare un altro documento.' },
      { title: 'Senza caricare il file', text: 'L’elaborazione avviene nel tuo browser.' },
    ],
    steps: [],
  },
  'aggiungere-filigrana-pdf': {
    layout: 'cards',
    title: 'Aggiungere una filigrana al PDF: proteggi i tuoi documenti',
    paragraphs: [
      'Con Filigrana PDF di ApriDoc.com inserisci un testo come “RISERVATO”, “BOZZA” o “COPIA” su tutte le pagine di un documento. Regoli dimensione, trasparenza e inclinazione per ottenere una scritta ben visibile ma che non copre il contenuto.',
      'È utile per distinguere una bozza da una versione definitiva, indicare che un documento è riservato o segnalare che un file è una copia, prima di condividerlo con clienti, colleghi o enti.',
    ],
    steps: [],
    points: [
      { title: 'Testo personalizzato', text: 'Scrivi la dicitura che vuoi: bozza, riservato, copia conforme o il nome dell’azienda.' },
      { title: 'Stile regolabile', text: 'Imposta dimensione, trasparenza e rotazione della filigrana.' },
      { title: 'Su tutte le pagine', text: 'La scritta viene applicata in modo uniforme a ogni pagina del PDF.' },
    ],
  },
};

export function getContent(slug: string, description: string): ToolContent {
  if (slug === 'apri-file-p7m') return p7m;
  return { intro: [description], info: toolInfo[slug], faq: [privacyFaq, ...(toolFaq[slug] ?? [])] };
}
