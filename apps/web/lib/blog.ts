export type Cta = {
  href: string;
  /** Headline of the banner and of the closing box. */
  title: string;
  /** Short text for the banner and the sidebar card. */
  text: string;
  /** Longer text for the closing box. */
  longText: string;
  /** Label of the main button. */
  button: string;
  /** Title of the sidebar card. */
  label: string;
  /** Link text of the sidebar card. */
  more: string;
};

export const CTA_P7M: Cta = {
  href: '/strumenti/apri-file-p7m',
  title: 'Hai un file .p7m da aprire?',
  text: 'Leggi il documento e il firmatario in pochi secondi, nel browser.',
  longText:
    'Trascinalo nello strumento: vedi il documento e chi lo ha firmato, direttamente nel browser, senza caricare nulla.',
  button: 'Apri file P7M',
  label: 'Apri file P7M',
  more: 'Apri il file',
};

export const CTA_PDF_JPG: Cta = {
  href: '/strumenti/convertire-pdf-in-jpg',
  title: 'Devi convertire un PDF in JPG?',
  text: 'Ogni pagina diventa un’immagine, direttamente nel browser.',
  longText:
    'Carica il PDF, scegli la risoluzione e scarica le immagini: il file non viene caricato su nessun server.',
  button: 'PDF in JPG',
  label: 'PDF in JPG',
  more: 'Converti ora',
};

export const CTA_JPG_PDF: Cta = {
  href: '/strumenti/convertire-jpg-in-pdf',
  title: 'Hai delle foto da trasformare in PDF?',
  text: 'Unisci una o più immagini in un unico documento, nel browser.',
  longText:
    'Carica le immagini, scegli formato pagina e margini e scarica il PDF: nessun upload, nessuna registrazione.',
  button: 'JPG in PDF',
  label: 'JPG in PDF',
  more: 'Crea il PDF',
};

export const CTA_MERGE: Cta = {
  href: '/strumenti/unisci-pdf-online',
  title: 'Devi unire più PDF?',
  text: 'Combina i file in un unico documento, nell’ordine che vuoi.',
  longText:
    'Aggiungi i PDF, scegli l’ordine e scarica il file unico: tutto nel browser, senza caricare nulla.',
  button: 'Unisci PDF',
  label: 'Unisci PDF',
  more: 'Unisci ora',
};

export const CTA_ROTATE: Cta = {
  href: '/strumenti/ruota-pdf-online',
  title: 'Hai pagine storte da girare?',
  text: 'Ruota tutte le pagine o solo alcune e salva la rotazione nel file.',
  longText:
    'Scegli 90°, 180° o 270° e scarica il PDF corretto: elaborazione nel browser, senza upload.',
  button: 'Ruota PDF',
  label: 'Ruota PDF',
  more: 'Ruota ora',
};

export const CTA_ORGANIZE: Cta = {
  href: '/strumenti/organizza-pdf-online',
  title: 'Devi riordinare o eliminare pagine?',
  text: 'Scrivi l’ordine che vuoi e scarica il nuovo PDF.',
  longText:
    'Riordina, elimina o duplica le pagine in un minuto: il file non lascia il tuo dispositivo.',
  button: 'Organizza PDF',
  label: 'Organizza PDF',
  more: 'Inizia ora',
};

export const CTA_SPLIT: Cta = {
  href: '/strumenti/dividi-pdf-online',
  title: 'Ti serve solo qualche pagina?',
  text: 'Estrai le pagine che ti servono o separa ogni pagina in un file.',
  longText:
    'Indica le pagine (per esempio 1-3, 5, 8) e scarica il risultato: tutto nel browser, senza upload.',
  button: 'Dividi PDF',
  label: 'Dividi PDF',
  more: 'Estrai le pagine',
};

export type PostMeta = {
  slug: string;
  title: string;
  /** Meta description and card summary. */
  description: string;
  category: string;
  /** ISO dates, used for display and structured data. */
  published: string;
  updated: string;
  readingMinutes: number;
  keywords: string[];
  /** Call to action shown on the page; defaults to the P7M tool. */
  cta?: Cta;
};

export const POSTS: PostMeta[] = [
  {
    slug: 'file-p7m-cosa-sono',
    title: 'File P7M: cosa sono, come funzionano e come si aprono',
    description:
      'Cos’è un file .p7m, cosa contiene la busta di firma digitale CAdES, che differenza c’è con .p7s e PAdES, che valore legale ha e come aprirlo senza software.',
    category: 'Firma digitale',
    published: '2026-10-09',
    updated: '2026-10-09',
    readingMinutes: 9,
    keywords: ['file p7m', 'cos’è un file p7m', 'p7m cosa sono', 'firma digitale cades', 'aprire file p7m', 'differenza p7m p7s'],
  },
  {
    slug: 'come-aprire-file-p7m',
    title: 'Come aprire un file P7M: guida passo passo',
    description:
      'Come aprire un file .p7m in 3 passaggi, senza installare programmi: estrai il documento dalla busta di firma, scaricalo e scopri cosa fare se non si apre.',
    category: 'Guide P7M',
    published: '2026-10-14',
    updated: '2026-10-14',
    readingMinutes: 6,
    keywords: ['aprire file p7m', 'come aprire file p7m', 'file p7m come aprire', 'aprire p7m online', 'estrarre pdf da p7m', 'p7m non si apre'],
  },
  {
    slug: 'p7m-viewer-online',
    title: 'P7M viewer online: come leggere un file firmato senza software',
    description:
      'Cos’è un P7M viewer, cosa mostra, come scegliere uno strumento affidabile e perché conviene elaborare il file nel browser. Online, senza installare nulla.',
    category: 'Guide P7M',
    published: '2026-10-14',
    updated: '2026-10-14',
    readingMinutes: 5,
    keywords: ['p7m viewer', 'p7m viewer online', 'leggere file p7m', 'visualizzare p7m', 'aprire p7m senza software', 'lettore p7m'],
  },
  {
    slug: 'aprire-file-p7m-su-mac',
    title: 'Come aprire un file P7M su Mac',
    description:
      'Tre modi per aprire un file .p7m su macOS: dal browser, dal Terminale con openssl o con un software di firma. Passaggi chiari e problemi frequenti.',
    category: 'Guide P7M',
    published: '2026-10-14',
    updated: '2026-10-14',
    readingMinutes: 6,
    keywords: ['p7m mac', 'aprire p7m su mac', 'aprire file p7m mac', 'p7m macos', 'estrarre p7m mac', 'leggere p7m su mac'],
  },
  {
    slug: 'come-convertire-p7m-in-pdf',
    title: 'Come convertire un P7M in PDF',
    description:
      'Come convertire un file P7M in PDF: quando basta estrarre il documento, quando serve convertirlo, cosa cambia con PDF/A e perché conservare il P7M originale.',
    category: 'Guide P7M',
    published: '2026-10-14',
    updated: '2026-10-14',
    readingMinutes: 6,
    keywords: ['convertire p7m in pdf', 'da p7m a pdf', 'p7m in pdf', 'trasformare p7m in pdf', 'p7m in pdf/a', 'estrarre pdf da p7m'],
  },
  {
    slug: 'fattura-elettronica-xml-p7m',
    title: 'Fattura elettronica XML.P7M: come aprirla e leggerla',
    description:
      'Come aprire e leggere una fattura elettronica XML.P7M: cos’è, perché è firmata, come estrarre l’XML, se si può avere in PDF e cosa conservare.',
    category: 'Fatture elettroniche',
    published: '2026-10-14',
    updated: '2026-10-14',
    readingMinutes: 7,
    keywords: ['fattura p7m', 'fattura elettronica p7m', 'xml.p7m', 'aprire fattura xml p7m', 'leggere fattura elettronica p7m', 'fattura xml p7m come aprirla'],
  },
  {
    slug: 'file-p7m-pec',
    title: 'File P7M ricevuto via PEC: come aprirlo',
    description:
      'Hai ricevuto un allegato .p7m via PEC? Ecco perché arriva così, come aprirlo in pochi secondi e quali altri file della PEC puoi ignorare.',
    category: 'Guide P7M',
    published: '2026-10-14',
    updated: '2026-10-14',
    readingMinutes: 6,
    keywords: ['p7m pec', 'allegato p7m pec', 'aprire p7m pec', 'file p7m posta certificata', 'p7m ricevuto via pec', 'pec p7m come aprire'],
  },
  {
    slug: 'aprire-file-p7m-su-windows',
    title: 'Come aprire un file P7M su Windows (senza Dike)',
    description:
      'Tre modi per aprire un file .p7m su Windows 10 e 11: dal browser, con un software di firma o con OpenSSL. Passaggi chiari e problemi frequenti.',
    category: 'Guide P7M',
    published: '2026-10-14',
    updated: '2026-10-14',
    readingMinutes: 6,
    keywords: ['p7m windows', 'aprire p7m su windows', 'aprire file p7m windows 10', 'p7m senza dike', 'estrarre p7m windows', 'leggere p7m su pc'],
  },
  {
    slug: 'aprire-file-p7m-da-iphone-android',
    title: 'Come aprire un P7M da iPhone e Android',
    description:
      'Come aprire un file P7M dal telefono, da iPhone e da Android, senza app: salva l’allegato, aprilo dal browser e leggi il documento in pochi secondi.',
    category: 'Guide P7M',
    published: '2026-10-14',
    updated: '2026-10-14',
    readingMinutes: 5,
    keywords: ['p7m iphone', 'p7m android', 'aprire p7m da cellulare', 'aprire p7m da telefono', 'p7m smartphone', 'leggere p7m da iphone'],
  },
  {
    slug: 'differenza-p7m-p7s-pades',
    title: 'Differenza tra P7M, P7S e PDF firmato (PAdES)',
    description:
      'Qual è la differenza tra P7M, P7S e PAdES? Dove si trova la firma, come si apre ciascun formato e come capire quale hai ricevuto.',
    category: 'Firma digitale',
    published: '2026-10-14',
    updated: '2026-10-14',
    readingMinutes: 6,
    keywords: ['differenza p7m p7s', 'p7m p7s pades', 'differenza cades pades', 'p7m o pades', 'firma staccata p7s', 'pdf firmato pades'],
  },
  {
    slug: 'p7m-non-si-apre',
    title: 'Il P7M non si apre: 7 cause e soluzioni',
    description:
      'Il file .p7m non si apre? Ecco le 7 cause più comuni, dal programma sbagliato alla firma staccata o annidata, con la soluzione per ciascuna.',
    category: 'Guide P7M',
    published: '2026-10-14',
    updated: '2026-10-14',
    readingMinutes: 5,
    keywords: ['p7m non si apre', 'file p7m non si apre', 'p7m errore', 'p7m danneggiato', 'impossibile aprire p7m', 'p7m non funziona'],
  },
  {
    slug: 'file-p7m-p7m-doppia-firma',
    title: 'File .p7m.p7m: cosa significa la doppia firma e come aprirlo',
    description:
      'Un file con due estensioni .p7m è firmato due volte: cosa significa, come aprirlo livello per livello e come leggere l’elenco dei firmatari.',
    category: 'Firma digitale',
    published: '2026-10-15',
    updated: '2026-10-15',
    readingMinutes: 5,
    keywords: ['p7m.p7m', 'file p7m p7m', 'doppia firma p7m', 'firma multipla p7m', 'p7m annidato', 'aprire p7m doppia estensione'],
  },
  {
    slug: 'firma-digitale-scaduta-p7m',
    title: 'Firma digitale scaduta: il documento P7M è ancora valido?',
    description:
      'Il certificato di firma è scaduto: il documento firmato è ancora valido? Cosa conta, il ruolo della marca temporale e come controllare, in modo chiaro.',
    category: 'Firma digitale',
    published: '2026-10-15',
    updated: '2026-10-15',
    readingMinutes: 6,
    keywords: ['firma digitale scaduta', 'certificato firma scaduto', 'p7m firma scaduta', 'marca temporale firma digitale', 'documento firmato certificato scaduto', 'validità firma digitale'],
  },
  {
    slug: 'alternative-a-dike-aprire-p7m',
    title: 'Alternative a DiKe: come aprire un P7M gratis, senza installare nulla',
    description:
      'Non vuoi installare DiKe? Ecco le alternative gratuite per aprire un file P7M: strumenti nel browser, servizi di verifica, software e app, con un confronto.',
    category: 'Guide P7M',
    published: '2026-10-15',
    updated: '2026-10-15',
    readingMinutes: 5,
    keywords: ['alternative a dike', 'aprire p7m senza dike', 'dike alternativa', 'aprire p7m gratis', 'p7m senza installare programmi', 'programmi per aprire p7m'],
  },
  {
    slug: 'verificare-firma-p7m',
    title: 'Come verificare la firma di un file P7M (e perché aprirlo non basta)',
    description:
      'Aprire un P7M non significa verificarne la firma. Cosa controlla una verifica, come farla con strumenti qualificati e come leggere l’esito.',
    category: 'Firma digitale',
    published: '2026-10-15',
    updated: '2026-10-15',
    readingMinutes: 6,
    keywords: ['verificare firma p7m', 'verifica firma digitale p7m', 'verificare firma digitale online', 'controllare firma p7m', 'p7m firma valida', 'verifica p7m'],
  },
  {
    slug: 'estrarre-pdf-da-p7m',
    title: 'Come estrarre un PDF da un file P7M',
    description:
      'Come estrarre il PDF da un file .p7m in 3 passaggi: il documento resta identico all’originale, ma senza firma. Cosa conservare e problemi frequenti.',
    category: 'Guide P7M',
    published: '2026-10-15',
    updated: '2026-10-15',
    readingMinutes: 5,
    keywords: ['estrarre pdf da p7m', 'estrarre pdf da file p7m', 'p7m in pdf', 'scaricare pdf da p7m', 'pdf.p7m come aprire', 'recuperare pdf da p7m'],
  },
  {
    slug: 'file-p7m-valore-legale',
    title: 'Il file P7M ha valore legale?',
    description:
      'Un file P7M ha valore legale se contiene una firma digitale qualificata valida. Cosa dice la legge, cosa conta davvero e cosa conservare.',
    category: 'Firma digitale',
    published: '2026-10-20',
    updated: '2026-10-20',
    readingMinutes: 4,
    keywords: ['p7m valore legale', 'file p7m ha valore legale', 'firma digitale valore legale', 'p7m valido', 'p7m firma qualificata', 'validità file p7m'],
  },
  {
    slug: 'aprire-p7m-online-e-sicuro',
    title: 'È sicuro aprire un P7M online?',
    description:
      'Prima di caricare un file firmato su un sito, scopri dove viene elaborato. Come riconoscere uno strumento che lavora nel browser e una checklist di sicurezza.',
    category: 'Guide P7M',
    published: '2026-10-20',
    updated: '2026-10-20',
    readingMinutes: 4,
    keywords: ['p7m online sicuro', 'aprire p7m online', 'p7m privacy', 'aprire p7m senza upload', 'p7m viewer sicuro', 'file p7m caricato su server'],
  },
  {
    slug: 'p7m-o-pdf-quale-formato',
    title: 'P7M o PDF: quale formato scegliere?',
    description:
      'Differenza tra P7M (CAdES) e PDF firmato (PAdES): come si aprono, quando usare l’uno o l’altro e cosa succede quando passi da un formato all’altro.',
    category: 'Firma digitale',
    published: '2026-10-20',
    updated: '2026-10-20',
    readingMinutes: 4,
    keywords: ['p7m o pdf', 'p7m vs pdf', 'pdf firmato o p7m', 'differenza p7m pdf', 'cades o pades', 'quale formato firma digitale'],
  },
  {
    slug: 'come-convertire-pdf-in-jpg',
    title: 'Come convertire un PDF in JPG',
    description:
      'Come convertire un PDF in JPG in 3 passaggi, gratis e senza installare nulla: ogni pagina diventa un’immagine, scaricabile in un archivio ZIP.',
    category: 'Guide PDF',
    published: '2026-10-20',
    updated: '2026-10-20',
    readingMinutes: 4,
    keywords: ['convertire pdf in jpg', 'pdf in jpg', 'pdf in jpg gratis', 'pdf in immagine', 'trasformare pdf in jpg', 'pdf to jpg'],
    cta: CTA_PDF_JPG,
  },
  {
    slug: 'pdf-in-jpg-qualita-dpi',
    title: 'PDF in JPG: quale risoluzione scegliere?',
    description:
      'Quanti DPI servono per convertire un PDF in immagine? Una guida semplice per scegliere la risoluzione giusta per schermo, chat e stampa.',
    category: 'Guide PDF',
    published: '2026-10-20',
    updated: '2026-10-20',
    readingMinutes: 4,
    keywords: ['pdf in jpg qualità', 'pdf in jpg alta risoluzione', 'dpi pdf in jpg', 'risoluzione immagine pdf', 'pdf in jpg sfocato', 'pdf in jpg per stampa'],
    cta: CTA_PDF_JPG,
  },
  {
    slug: 'salvare-pagina-pdf-come-immagine',
    title: 'Come salvare una pagina di un PDF come immagine',
    description:
      'Ti serve una sola pagina di un PDF come immagine? Estraila e convertila in JPG in due passaggi, senza programmi e senza caricare il file.',
    category: 'Guide PDF',
    published: '2026-10-20',
    updated: '2026-10-20',
    readingMinutes: 3,
    keywords: ['salvare pagina pdf come immagine', 'pagina pdf in jpg', 'estrarre pagina da pdf', 'pdf una pagina in jpg', 'screenshot pagina pdf', 'estrarre immagini da pdf'],
    cta: CTA_SPLIT,
  },
  {
    slug: 'come-trasformare-foto-in-pdf',
    title: 'Come trasformare foto e immagini in PDF',
    description:
      'Come trasformare una o più foto JPG e PNG in un unico PDF: formato pagina A4 o su misura, margini e consigli per fotografare bene i documenti.',
    category: 'Guide PDF',
    published: '2026-10-20',
    updated: '2026-10-20',
    readingMinutes: 4,
    keywords: ['foto in pdf', 'jpg in pdf', 'trasformare foto in pdf', 'immagine in pdf', 'png in pdf', 'unire foto in un pdf'],
    cta: CTA_JPG_PDF,
  },
  {
    slug: 'come-unire-pdf',
    title: 'Come unire più PDF in un unico file',
    description:
      'Come unire più PDF in un solo documento in 3 passaggi, scegliendo l’ordine. Cosa fare prima di unire e perché i PDF firmati vanno trattati con cura.',
    category: 'Guide PDF',
    published: '2026-10-20',
    updated: '2026-10-20',
    readingMinutes: 4,
    keywords: ['unire pdf', 'unire pdf gratis', 'unire più pdf in uno', 'combinare pdf', 'unire pdf online', 'merge pdf'],
    cta: CTA_MERGE,
  },
  {
    slug: 'ruotare-pdf-in-modo-permanente',
    title: 'Come ruotare un PDF e salvare la rotazione',
    description:
      'Perché la rotazione di un PDF non resta e come salvarla nel file: ruota tutte le pagine o solo alcune di 90°, 180° o 270°, nel browser.',
    category: 'Guide PDF',
    published: '2026-10-20',
    updated: '2026-10-20',
    readingMinutes: 3,
    keywords: ['ruotare pdf', 'ruotare pdf in modo permanente', 'girare pagina pdf', 'ruotare una pagina pdf', 'salvare pdf ruotato', 'pdf capovolto'],
    cta: CTA_ROTATE,
  },
  {
    slug: 'eliminare-pagine-da-pdf',
    title: 'Come eliminare o riordinare le pagine di un PDF',
    description:
      'Elimina, sposta o duplica le pagine di un PDF scrivendo il nuovo ordine, per esempio 3,1,2,5-7. Esempi pratici, senza programmi e senza upload.',
    category: 'Guide PDF',
    published: '2026-10-20',
    updated: '2026-10-20',
    readingMinutes: 3,
    keywords: ['eliminare pagine pdf', 'cancellare pagina pdf', 'riordinare pagine pdf', 'spostare pagine pdf', 'togliere pagina da pdf', 'duplicare pagina pdf'],
    cta: CTA_ORGANIZE,
  },
];

export const getPost = (slug: string) => POSTS.find((p) => p.slug === slug);

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('it-IT', { dateStyle: 'long', timeZone: 'UTC' });
