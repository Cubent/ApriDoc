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
    slug: 'unisci-pdf',
    name: 'Unisci PDF',
    short: 'Unisci PDF',
    description: 'Unisci PDF e organizzali nel modo che preferisci. Rapido e facile!',
    seoTitle: 'Unisci PDF Online Gratis — Combina più PDF in uno | ApriDoc.com',
    seoDescription:
      'Unisci più file PDF in un unico documento, scegli l’ordine e scarica subito. Gratis, senza registrazione e senza caricare i file su nessun server.',
    keywords: ['unisci pdf', 'combinare pdf', 'merge pdf online', 'unire pdf gratis'],
    category: 'organizza',
    icon: 'merge',
    color: '#e5574a',
    ready: true,
  },
  {
    slug: 'dividere-pdf',
    name: 'Dividere PDF',
    short: 'Dividere PDF',
    description:
      'Estrai una o varie pagine di un PDF o converti ogni pagina del PDF in un PDF diverso.',
    seoTitle: 'Dividere PDF Online Gratis — Estrai Pagine da un PDF | ApriDoc.com',
    seoDescription:
      'Dividi un PDF ed estrai le pagine che ti servono (es. 1-3, 5, 8) oppure salva ogni pagina come file separato. Gratis e direttamente nel browser.',
    keywords: ['dividere pdf', 'separare pagine pdf', 'estrarre pagine pdf', 'split pdf'],
    category: 'organizza',
    icon: 'split',
    color: '#e5574a',
    ready: true,
  },
  {
    slug: 'ruotare-pdf',
    name: 'Ruotare PDF',
    short: 'Ruotare PDF',
    description: 'Ruota i PDF come vuoi. Ruota tutte le pagine o solo quelle che scegli.',
    seoTitle: 'Ruotare PDF Online Gratis — Ruota le Pagine di un PDF | ApriDoc.com',
    seoDescription:
      'Ruota di 90°, 180° o 270° tutte le pagine di un PDF o solo alcune, e scarica il file corretto. Gratis, nel browser, senza registrazione.',
    keywords: ['ruotare pdf', 'ruota pagina pdf', 'rotate pdf online'],
    category: 'modifica',
    icon: 'rotate',
    color: '#7c5cbf',
    ready: true,
  },
  {
    slug: 'organizza-pdf',
    name: 'Organizza PDF',
    short: 'Organizza PDF',
    description:
      'Riordina le pagine del tuo PDF, eliminane alcune o duplicale in base alle tue esigenze.',
    seoTitle: 'Organizza PDF Online — Riordina ed Elimina Pagine | ApriDoc.com',
    seoDescription:
      'Riordina, elimina o duplica le pagine di un PDF indicando il nuovo ordine (es. 3,1,2,5-7). Gratis, veloce e privato: il file non lascia il tuo dispositivo.',
    keywords: ['organizza pdf', 'riordinare pagine pdf', 'eliminare pagine pdf'],
    category: 'organizza',
    icon: 'layout',
    color: '#f08a24',
    ready: true,
  },
  {
    slug: 'jpg-in-pdf',
    name: 'JPG in PDF',
    short: 'JPG in PDF',
    description: 'Converti le tue immagini JPG e PNG in PDF. Regola orientamento e margini.',
    seoTitle: 'JPG in PDF Online Gratis — Converti Immagini in PDF | ApriDoc.com',
    seoDescription:
      'Trasforma una o più immagini JPG o PNG in un unico PDF, con formato pagina e margini a scelta. Gratis, senza registrazione e senza upload.',
    keywords: ['jpg in pdf', 'immagine in pdf', 'png in pdf', 'convertire foto in pdf'],
    category: 'convertire',
    icon: 'image-in',
    color: '#d9a400',
    ready: true,
  },
  {
    slug: 'pdf-in-jpg',
    name: 'PDF in JPG',
    short: 'PDF in JPG',
    description: 'Converti ogni pagina di un PDF in un’immagine JPG ad alta qualità.',
    seoTitle: 'PDF in JPG Online Gratis — Converti Pagine PDF in Immagini | ApriDoc.com',
    seoDescription:
      'Converti le pagine di un PDF in immagini JPG e scaricale in un file ZIP. Gratis, nel browser e senza caricare i tuoi documenti.',
    keywords: ['pdf in jpg', 'pdf in immagine', 'convertire pdf in jpg'],
    category: 'convertire',
    icon: 'image-out',
    color: '#d9a400',
    ready: true,
  },
  {
    slug: 'numero-di-pagine',
    name: 'Numero di pagine',
    short: 'Numero di pagine',
    description: 'Aggiungi numeri di pagina a un PDF. Scegli la posizione e il formato.',
    seoTitle: 'Numerare le Pagine di un PDF Online Gratis | ApriDoc.com',
    seoDescription:
      'Aggiungi la numerazione alle pagine di un PDF: posizione, formato (1, Pagina 1 di N) e numero iniziale a scelta. Gratis e senza upload.',
    keywords: ['numerare pagine pdf', 'aggiungere numeri di pagina pdf'],
    category: 'modifica',
    icon: 'hash',
    color: '#3b82c4',
    ready: true,
  },
  {
    slug: 'filigrana-pdf',
    name: 'Filigrana',
    short: 'Filigrana',
    description:
      'Inserisci un testo come filigrana sopra un PDF. Scegli dimensione, trasparenza e rotazione.',
    seoTitle: 'Aggiungere Filigrana a un PDF Online Gratis | ApriDoc.com',
    seoDescription:
      'Inserisci una filigrana di testo (es. RISERVATO, BOZZA) su tutte le pagine di un PDF. Gratis, nel browser e senza caricare il file.',
    keywords: ['filigrana pdf', 'watermark pdf', 'aggiungere scritta pdf'],
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
