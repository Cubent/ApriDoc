export type Category =
  | 'organizza'
  | 'ottimizza'
  | 'convertire'
  | 'modifica'
  | 'sicurezza';

export type Tool = {
  slug: string;
  name: string;
  short: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  category: Category;
  icon: string;
  color: string;
  ready: boolean;
  featured?: boolean;
};

export const SITE = {
  name: 'ApriDoc.com',
  url: 'https://www.apridoc.com',
  tagline: 'Apri, converti e modifica documenti online',
};

// Google Business Profile rating, used in the structured data (update when it changes).
export const RATING = { value: '4.9', count: 243 };

export const AGGREGATE_RATING = {
  '@type': 'AggregateRating',
  ratingValue: RATING.value,
  bestRating: '5',
  worstRating: '1',
  ratingCount: String(RATING.count),
};

export const CATEGORIES: { id: 'tutti' | Category; label: string }[] = [
  { id: 'tutti', label: 'Tutti' },
  { id: 'organizza', label: 'Organizza PDF' },
  { id: 'ottimizza', label: 'Ottimizza PDF' },
  { id: 'convertire', label: 'Convertire' },
  { id: 'modifica', label: 'Modifica PDF' },
  { id: 'sicurezza', label: 'Sicurezza' },
];

const upcoming: [string, string, string, Category, string, string][] = [
  ['comprimi-pdf', 'Comprimi PDF', 'Ottieni un PDF meno pesante mantenendo la massima qualità possibile.', 'ottimizza', 'minimize', '#2fa05a'],
  ['pdf-in-word', 'PDF in Word', 'Converti facilmente i tuoi PDF in DOCX di Word modificabili.', 'convertire', 'file-text', '#3b6fd4'],
  ['word-in-pdf', 'Word in PDF', 'Converti i tuoi documenti Word in PDF con la massima fedeltà.', 'convertire', 'file-text', '#3b6fd4'],
  ['ocr-pdf', 'OCR PDF', 'Converti PDF scansionati in PDF selezionabili con testo ricercabile.', 'ottimizza', 'scan', '#2fa05a'],
  ['firma-pdf', 'Firma PDF', 'Firma tu stesso o richiedi firme elettroniche ad altri.', 'sicurezza', 'pen', '#3b82c4'],
  ['proteggi-pdf', 'Proteggi PDF', 'Proteggi i file PDF con una password per impedire accessi non autorizzati.', 'sicurezza', 'lock', '#3b82c4'],
  ['sbloccare-pdf', 'Sbloccare PDF', 'Rimuovi la password e sblocca i PDF per poterli usare liberamente.', 'sicurezza', 'unlock', '#3b82c4'],
  ['ripara-pdf', 'Ripara PDF', 'Ripara un PDF danneggiato e recupera i dati da un file corrotto.', 'ottimizza', 'wrench', '#2fa05a'],
  ['confronta-pdf', 'Confronta PDF', 'Visualizza i documenti fianco a fianco e individua le modifiche.', 'modifica', 'columns', '#7c5cbf'],
];

export const TOOLS: Tool[] = [
  {
    slug: 'apri-file-p7m',
    name: 'Apri File P7M Online Gratis: Leggi il Documento in 1 Click',
    short: 'Apri file P7M online',
    description:
      'Estrai il documento originale da un file firmato .p7m (CAdES) e visualizza i dati della firma digitale. Tutto nel browser, senza caricare nulla.',
    seoTitle: 'Apri File P7M Online Gratis: Leggi il Documento in 1 Click',
    seoDescription:
      'Apri e leggi un file .p7m online gratis: estrai il PDF, il Word o l’immagine contenuta nella firma digitale CAdES e consulta firmatario e certificato. Nessun upload: il file resta nel tuo browser.',
    keywords: [
      'aprire file p7m',
      'p7m viewer online',
      'estrarre pdf da p7m',
      'file p7m come aprire',
      'firma digitale CAdES',
      'leggere p7m gratis',
    ],
    category: 'sicurezza',
    icon: 'shield',
    color: '#1f087a',
    ready: true,
    featured: true,
  },
  {
    slug: 'unisci-pdf-online',
    name: 'Unisci PDF',
    short: 'Unisci PDF',
    description: 'Unisci PDF e organizzali nel modo che preferisci. Rapido e facile!',
    seoTitle: 'Unisci PDF Online Gratis: Combina più File in Uno | ApriDoc',
    seoDescription:
      'Unisci PDF online gratis: combina più file in un unico documento, scegli l’ordine delle pagine e scarica subito. Elaborazione nel browser, i tuoi file non vengono caricati su nessun server.',
    keywords: ['unisci pdf', 'unire pdf', 'unire pdf online', 'combinare pdf', 'merge pdf online', 'unire più pdf in uno', 'unire pdf gratis'],
    category: 'organizza',
    icon: 'merge',
    color: '#e5574a',
    ready: true,
  },
  {
    slug: 'dividi-pdf-online',
    name: 'Dividere PDF',
    short: 'Dividere PDF',
    description:
      'Estrai una o varie pagine di un PDF o converti ogni pagina del PDF in un PDF diverso.',
    seoTitle: 'Dividi PDF Online Gratis: Estrai e Separa le Pagine | ApriDoc',
    seoDescription:
      'Dividi un PDF online gratis: estrai le pagine che ti servono (es. 1-3, 5, 8) oppure salva ogni pagina come file separato in uno ZIP. Direttamente nel browser, senza upload.',
    keywords: ['dividere pdf', 'dividi pdf', 'separare pagine pdf', 'estrarre pagine da pdf', 'split pdf online', 'tagliare pdf', 'dividere pdf gratis'],
    category: 'organizza',
    icon: 'split',
    color: '#e5574a',
    ready: true,
  },
  {
    slug: 'ruota-pdf-online',
    name: 'Ruotare PDF',
    short: 'Ruotare PDF',
    description: 'Ruota i PDF come vuoi. Ruota tutte le pagine o solo quelle che scegli.',
    seoTitle: 'Ruota PDF Online Gratis: Gira le Pagine di 90° o 180° | ApriDoc',
    seoDescription:
      'Ruota PDF online gratis: gira tutte le pagine o solo alcune di 90°, 180° o 270° e salva la rotazione nel file. Funziona nel browser, senza installare programmi e senza upload.',
    keywords: ['ruotare pdf', 'ruota pdf', 'ruotare pagina pdf', 'girare pagine pdf', 'rotate pdf online', 'ruotare pdf in modo permanente', 'ruotare pdf gratis'],
    category: 'modifica',
    icon: 'rotate',
    color: '#7c5cbf',
    ready: true,
  },
  {
    slug: 'organizza-pdf-online',
    name: 'Organizza PDF',
    short: 'Organizza PDF',
    description:
      'Riordina le pagine del tuo PDF, eliminane alcune o duplicale in base alle tue esigenze.',
    seoTitle: 'Organizza PDF Online Gratis: Riordina ed Elimina Pagine | ApriDoc',
    seoDescription:
      'Organizza un PDF online gratis: riordina, elimina o duplica le pagine indicando il nuovo ordine (es. 3,1,2,5-7). Veloce e privato: il file non lascia il tuo dispositivo.',
    keywords: ['organizza pdf', 'riordinare pagine pdf', 'eliminare pagine pdf', 'cambiare ordine pagine pdf', 'spostare pagine pdf', 'cancellare pagine da pdf'],
    category: 'organizza',
    icon: 'layout',
    color: '#f08a24',
    ready: true,
  },
  {
    slug: 'convertire-jpg-in-pdf',
    name: 'JPG in PDF',
    short: 'JPG in PDF',
    description: 'Converti le tue immagini JPG e PNG in PDF. Regola orientamento e margini.',
    seoTitle: 'JPG in PDF Online Gratis: Converti Foto e Immagini | ApriDoc',
    seoDescription:
      'Converti JPG e PNG in PDF online gratis: unisci una o più immagini in un solo documento, con formato pagina A4 o su misura e margini a scelta. Nel browser, senza upload.',
    keywords: ['jpg in pdf', 'convertire jpg in pdf', 'immagine in pdf', 'png in pdf', 'foto in pdf', 'trasformare foto in pdf', 'jpg in pdf gratis'],
    category: 'convertire',
    icon: 'image-in',
    color: '#d9a400',
    ready: true,
  },
  {
    slug: 'convertire-pdf-in-jpg',
    name: 'PDF in JPG',
    short: 'PDF in JPG',
    description: 'Converti ogni pagina di un PDF in un’immagine JPG ad alta qualità.',
    seoTitle: 'PDF in JPG Online Gratis: Converti Pagine in Immagini | ApriDoc',
    seoDescription:
      'Converti PDF in JPG online gratis: ogni pagina diventa un’immagine ad alta qualità, con risoluzione a scelta, scaricabile in un archivio ZIP. Nel browser, senza upload.',
    keywords: ['pdf in jpg', 'convertire pdf in jpg', 'pdf in immagine', 'pdf in foto', 'pagina pdf in jpg', 'estrarre immagini da pdf', 'pdf in jpg gratis'],
    category: 'convertire',
    icon: 'image-out',
    color: '#d9a400',
    ready: true,
  },
  {
    slug: 'numerare-pagine-pdf',
    name: 'Numero di pagine',
    short: 'Numero di pagine',
    description: 'Aggiungi numeri di pagina a un PDF. Scegli la posizione e il formato.',
    seoTitle: 'Numerare Pagine PDF Online Gratis: Aggiungi i Numeri | ApriDoc',
    seoDescription:
      'Numera le pagine di un PDF online gratis: scegli posizione, formato (1, Pagina 1 di N) e numero iniziale. Elaborazione nel browser, senza caricare il file.',
    keywords: ['numerare pagine pdf', 'aggiungere numeri di pagina pdf', 'numero di pagina pdf', 'impaginare pdf', 'numerazione pagine pdf', 'inserire numeri pagina pdf'],
    category: 'modifica',
    icon: 'hash',
    color: '#3b82c4',
    ready: true,
  },
  {
    slug: 'aggiungere-filigrana-pdf',
    name: 'Filigrana',
    short: 'Filigrana',
    description:
      'Inserisci un testo come filigrana sopra un PDF. Scegli dimensione, trasparenza e rotazione.',
    seoTitle: 'Filigrana PDF Online Gratis: Aggiungi Testo al PDF | ApriDoc',
    seoDescription:
      'Aggiungi una filigrana al PDF online gratis: inserisci un testo (es. RISERVATO, BOZZA) su tutte le pagine, con dimensione, trasparenza e rotazione a scelta. Senza upload.',
    keywords: ['filigrana pdf', 'aggiungere filigrana pdf', 'watermark pdf', 'mettere scritta su pdf', 'timbro pdf', 'filigrana pdf online', 'filigrana pdf gratis'],
    category: 'modifica',
    icon: 'droplet',
    color: '#7c5cbf',
    ready: true,
  },
  ...upcoming.map(
    ([slug, name, description, category, icon, color]): Tool => ({
      slug,
      name,
      short: name,
      description,
      seoTitle: `${name} | ApriDoc.com`,
      seoDescription: description,
      keywords: [name.toLowerCase()],
      category,
      icon,
      color,
      ready: false,
    })
  ),
];

export const getTool = (slug: string) => TOOLS.find((t) => t.slug === slug);
