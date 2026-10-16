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
    slug: 'doppia-firma-digitale-p7m',
    title: 'Doppia firma P7M: come aprire un file firmato due volte',
    description:
      'Un file con due estensioni .p7m è firmato due volte: cosa significa, come aprirlo livello per livello e come leggere l’elenco dei firmatari.',
    category: 'Firma digitale',
    published: '2026-10-15',
    updated: '2026-10-15',
    readingMinutes: 5,
    keywords: ['p7m.p7m', 'doppia estensione p7m', 'doppia firma p7m', 'firma multipla p7m', 'p7m annidato', 'aprire p7m doppia estensione'],
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
    slug: 'aprire-file-p7m-su-linux',
    title: 'Come aprire un file P7M su Linux',
    description:
      'Come aprire un file .p7m su Linux: dal browser o da terminale con OpenSSL, anche per molti file. Passaggi chiari, differenze tra i metodi e problemi frequenti.',
    category: 'Guide P7M',
    published: '2026-10-16',
    updated: '2026-10-16',
    readingMinutes: 5,
    keywords: ['p7m linux', 'aprire p7m su linux', 'estrarre p7m linux', 'openssl p7m', 'aprire file p7m ubuntu', 'leggere p7m da terminale'],
  },
  {
    slug: 'aprire-docx-xlsx-p7m',
    title: 'Word ed Excel firmati: come aprire un file DOCX o XLSX in formato P7M',
    description:
      'Come aprire un Word o un Excel firmato in formato P7M: estrai il documento dalla busta, aprilo con Office e scopri cosa succede se lo modifichi.',
    category: 'Guide P7M',
    published: '2026-10-16',
    updated: '2026-10-16',
    readingMinutes: 5,
    keywords: ['docx p7m', 'xlsx p7m', 'aprire word p7m', 'aprire excel p7m', 'file word firmato digitalmente', 'aprire documento word firmato p7m'],
  },
  {
    slug: 'convertire-p7m-in-word',
    title: 'Convertire P7M in Word: si può fare? Guida pratica',
    description:
      'Un P7M non si converte in Word: si estrae il documento. Cosa fare se dentro c’è un Word, un PDF o un XML, e come ottenere un file modificabile.',
    category: 'Guide P7M',
    published: '2026-10-16',
    updated: '2026-10-16',
    readingMinutes: 5,
    keywords: ['p7m in word', 'convertire p7m in word', 'da p7m a word', 'p7m in docx', 'trasformare p7m in word', 'modificare file p7m'],
  },
  {
    slug: 'perche-file-p7m-pesa-di-piu',
    title: 'Perché un file P7M pesa più del documento originale',
    description:
      'Perché il file P7M è più grande del PDF originale: cosa aggiunge la busta di firma, l’effetto della codifica Base64 e come gestire il peso degli allegati.',
    category: 'Guide P7M',
    published: '2026-10-16',
    updated: '2026-10-16',
    readingMinutes: 4,
    keywords: ['peso file p7m', 'file p7m più grande', 'p7m dimensione', 'perché p7m è più pesante', 'ridurre peso p7m', 'p7m base64'],
  },
  {
    slug: 'aprire-p7m-online-e-sicuro',
    title: 'Aprire un P7M online è sicuro? Cosa controllare prima di caricarlo',
    description:
      'Aprire un file P7M online è sicuro? Differenza tra elaborazione nel browser e su server, prova offline e checklist per proteggere documenti riservati.',
    category: 'Firma digitale',
    published: '2026-10-16',
    updated: '2026-10-16',
    readingMinutes: 5,
    keywords: ['aprire p7m online sicuro', 'p7m privacy', 'p7m viewer sicuro', 'caricare file firmato online', 'aprire p7m senza caricare', 'p7m online privacy'],
  },
  {
    slug: 'glossario-firma-digitale-p7m',
    title: 'Glossario della firma digitale: P7M, CAdES, PAdES, hash e certificato',
    description:
      'Glossario con le definizioni dei termini della firma digitale: P7M, P7S, CAdES, PAdES, XAdES, hash, certificato, marca temporale, eIDAS e altro.',
    category: 'Firma digitale',
    published: '2026-10-16',
    updated: '2026-10-16',
    readingMinutes: 6,
    keywords: ['glossario firma digitale', 'cos’è cades', 'cos’è pades', 'cos’è un hash', 'marca temporale cos’è', 'firma elettronica qualificata cos’è'],
  },
];

export const getPost = (slug: string) => POSTS.find((p) => p.slug === slug);

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('it-IT', { dateStyle: 'long', timeZone: 'UTC' });
