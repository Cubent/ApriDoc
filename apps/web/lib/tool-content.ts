export type Faq = { q: string; a: string };

export type ToolContent = {
  intro: string[];
  cards?: { title: string; text: string }[];
  faq: Faq[];
};

const privacyFaq: Faq[] = [
  {
    q: 'I miei file vengono caricati su un server?',
    a: 'No. L’elaborazione avviene interamente nel tuo browser, sul tuo dispositivo. I documenti non vengono inviati né salvati da ApriDoc.com, quindi restano privati anche se contengono dati sensibili.',
  },
  {
    q: 'Lo strumento è gratuito?',
    a: 'Sì. Non serve registrarsi, non ci sono limiti sul numero di file e non viene aggiunta nessuna filigrana al risultato.',
  },
  {
    q: 'Funziona da smartphone?',
    a: 'Sì, funziona con i browser moderni su Windows, macOS, Linux, iPhone e Android, senza installare nessuna app.',
  },
];

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

export function getContent(slug: string, description: string): ToolContent {
  if (slug === 'apri-file-p7m') return p7m;
  return { intro: [description], faq: privacyFaq };
}
