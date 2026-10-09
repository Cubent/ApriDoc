import type { Metadata } from 'next';
import Link from 'next/link';
import { FaqList } from '@/components/faq-list';
import { ToolIcon } from '@/components/tool-icon';
import P7mViewer from '@/components/p7m-viewer';
import { PRICES } from '@/lib/billing';
import type { Faq } from '@/lib/tool-content';
import { SITE, TOOLS } from '@/lib/tools';

const PATH = '/strumenti/convertire-p7m-in-pdf';
const TITLE = 'Da P7M a PDF: Converti e Scarica il Documento Firmato';
const DESCRIPTION =
  'Da .p7m a PDF in pochi clic: estrai il documento dalla busta di firma digitale o convertilo in PDF e PDF/A. Elaborazione nel browser, senza upload.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'convertire p7m in pdf',
    'da p7m a pdf',
    'p7m in pdf online',
    'estrarre pdf da p7m',
    'p7m in pdf/a',
    'trasformare p7m in pdf',
  ],
  alternates: { canonical: PATH },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PATH, siteName: SITE.name, locale: 'it_IT', type: 'website' },
};

const STEPS = [
  {
    name: 'Carica il file .p7m',
    text: 'Trascina il file nella casella oppure selezionalo dal dispositivo. Vanno bene i file .pdf.p7m, .xml.p7m e tutti gli altri .p7m.',
  },
  {
    name: 'Controlla il risultato',
    text: 'Vedi subito firmatario, data di firma, emittente del certificato e il formato del documento contenuto nella busta.',
  },
  {
    name: 'Scegli come scaricarlo',
    text: 'Premi “Scarica PDF”: ottieni subito il PDF. Dalle opzioni puoi attivare il PDF/A, i dati della firma e la numerazione delle pagine.',
  },
];

const FORMATS = [
  ['PDF', 'Si scarica identico all’originale, senza ricompressione', 'Non necessaria'],
  ['XML (fatture elettroniche)', 'Convertito in PDF a pagine di testo', 'Sì, anche in PDF/A'],
  ['Testo (.txt)', 'Convertito in PDF a pagine di testo', 'Sì, anche in PDF/A'],
  ['Immagini JPG e PNG', 'Una pagina A4 con l’immagine adattata', 'Sì, anche in PDF/A'],
  ['Altri formati (Word, Excel, ZIP…)', 'Si scarica il file originale così com’è', 'Non disponibile'],
] as const;

const FAQ: Faq[] = [
  {
    q: 'Come si trasforma un file P7M in PDF?',
    a: 'Un P7M è una busta di firma digitale che contiene il documento originale, quindi di solito non serve “convertirlo”: basta estrarre il contenuto. Se il documento nella busta è un PDF, lo scarichi uguale all’originale. Se è un XML, un testo o un’immagine, “Scarica PDF” lo trasforma direttamente in un PDF.',
  },
  {
    q: 'Posso convertire una fattura elettronica XML.P7M in PDF?',
    a: 'Sì. Il file XML contenuto nella busta viene estratto e convertito in un PDF che ne riporta il testo. Non è la versione grafica a tabelle che producono alcuni programmi di fatturazione, ma un documento con tutto il contenuto dell’XML, utile da archiviare o inviare.',
  },
  {
    q: 'Cos’è l’opzione PDF/A?',
    a: 'Il PDF/A è una variante del PDF pensata per la conservazione nel tempo: contiene i font incorporati e i metadati necessari per essere letto allo stesso modo anche tra molti anni. ApriDoc.com produce file PDF/A-2b per XML, testo e immagini PNG e JPG. Un PDF già contenuto nel P7M viene scaricato com’è e non viene riscritto in PDF/A.',
  },
  {
    q: 'Il PDF ottenuto conserva la firma digitale?',
    a: 'No. La firma digitale resta nel file .p7m originale. Il PDF estratto o convertito contiene il documento, non la firma: per dimostrare il valore legale conserva anche il file .p7m.',
  },
  {
    q: 'Il file viene caricato su un server?',
    a: 'No. La busta viene letta e il PDF viene creato interamente nel tuo browser, senza upload e senza archiviazione da parte di ApriDoc.com.',
  },
  {
    q: 'Cosa è gratuito e cosa è a pagamento?',
    a: `Caricare il file e consultare firmatario e controlli sul certificato è gratuito. Per scaricare il documento o il PDF convertito puoi acquistare un singolo download (${PRICES.single.label}) oppure l’abbonamento annuale con download illimitati (${PRICES.yearly.label}/anno).`,
  },
];

export default function ConvertP7mToPdfPage() {
  const url = `${SITE.url}${PATH}`;
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: TITLE,
      description: DESCRIPTION,
      url,
      inLanguage: 'it-IT',
      isPartOf: { '@type': 'WebSite', name: SITE.name, url: SITE.url },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
        { '@type': 'ListItem', position: 2, name: 'Strumenti', item: `${SITE.url}/#strumenti` },
        { '@type': 'ListItem', position: 3, name: 'Da P7M a PDF', item: url },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: 'Come trasformare un file P7M in PDF',
      inLanguage: 'it-IT',
      step: STEPS.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, name: s.name, text: s.text })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQ.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ];

  const related = TOOLS.filter((t) => t.ready && t.slug !== 'apri-file-p7m').slice(0, 6);

  return (
    <div className="mx-auto max-w-[900px] px-5 py-12">
      {jsonLd.map((d, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }} />
      ))}

      <nav className="tool-title mb-6 text-sm text-[#5b6270]" aria-label="Briciole di pane">
        <Link href="/" className="hover:underline">Home</Link> ›{' '}
        <Link href="/#strumenti" className="hover:underline">Strumenti</Link> › <span>Da P7M a PDF</span>
      </nav>

      <header className="tool-title mb-8 text-center">
        <h1 className="text-3xl font-extrabold leading-tight md:text-5xl">Da P7M a PDF</h1>
        <p className="mx-auto mt-3 max-w-2xl text-lg text-[#5b6270]">
          Estrai il documento dalla firma digitale oppure convertilo in PDF e PDF/A. Il file resta sul tuo dispositivo.
        </p>
      </header>

      <P7mViewer mode="pdf" />

      <section className="tool-extra mt-14">
        <h2 className="text-center text-3xl font-extrabold">Tre passaggi, nessuna installazione</h2>
        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <li key={s.name} className="rounded-2xl border border-[#e6e8ec] bg-[#f4f5f7] p-6">
              <span className="flex size-9 items-center justify-center rounded-full bg-[#1f087a] font-extrabold text-white">
                {i + 1}
              </span>
              <h3 className="mt-4 text-lg font-extrabold">{s.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#5b6270]">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="tool-extra mt-14">
        <h2 className="text-3xl font-extrabold">Cosa ottieni in base al contenuto del P7M</h2>
        <p className="mt-3 text-lg leading-relaxed text-[#3d4452]">
          Il risultato dipende dal documento che si trova dentro la busta. Lo si capisce di solito dal nome: in
          <em> contratto.pdf.p7m</em> c’è un PDF, in <em>fattura.xml.p7m</em> un file XML.
        </p>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-[#e6e8ec]">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="bg-[#f4f5f7] text-xs font-bold uppercase tracking-wider text-[#8a91a0]">
              <tr>
                <th className="px-4 py-3">Contenuto</th>
                <th className="px-4 py-3">Cosa scarichi</th>
                <th className="px-4 py-3">Conversione in PDF</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eef0f3]">
              {FORMATS.map(([kind, result, convert]) => (
                <tr key={kind}>
                  <td className="px-4 py-3 font-semibold">{kind}</td>
                  <td className="px-4 py-3 text-[#5b6270]">{result}</td>
                  <td className="px-4 py-3 text-[#5b6270]">{convert}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-5 text-[#3d4452]">
          Vuoi capire meglio cos’è questo formato? Leggi la guida{' '}
          <Link href="/blog/file-p7m-cosa-sono" className="font-semibold text-[#1f087a] underline">
            File P7M: cosa sono e come si aprono
          </Link>{' '}
          oppure usa lo strumento{' '}
          <Link href="/strumenti/apri-file-p7m" className="font-semibold text-[#1f087a] underline">
            Apri file P7M
          </Link>
          .
        </p>
      </section>

      <section className="tool-extra mt-14">
        <h2 className="mb-2 text-center text-3xl font-extrabold">Domande su P7M e PDF</h2>
        <p className="mb-8 text-center text-[#5b6270]">Le risposte alle domande più comuni sulla conversione.</p>
        <FaqList items={FAQ} />
      </section>

      <section className="tool-extra mt-14">
        <h2 className="mb-4 text-xl font-extrabold">Altri strumenti PDF</h2>
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {related.map((t) => (
            <Link
              key={t.slug}
              href={`/strumenti/${t.slug}`}
              className="flex items-center gap-3 rounded-xl border border-[#e6e8ec] bg-[#f4f5f7] p-4 font-semibold"
            >
              <ToolIcon name={t.icon} color={t.color} size={40} />
              {t.short}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
