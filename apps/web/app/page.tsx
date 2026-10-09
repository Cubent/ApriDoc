import { FileCheck2, Lock, Zap } from 'lucide-react';
import Link from 'next/link';
import { HeroTiles } from '@/components/hero-tiles';
import { PromoSection } from '@/components/promo-section';
import { FaqList } from '@/components/faq-list';
import { ToolGrid } from '@/components/tool-grid';
import { SITE } from '@/lib/tools';

const FAQ = [
  {
    q: 'Come si apre un file .p7m?',
    a: 'Un file .p7m è un documento firmato digitalmente (formato CAdES) che racchiude il file originale, di solito un PDF. Con ApriDoc.com basta trascinarlo nello strumento “Aprire File P7M”: il documento viene estratto nel browser e puoi scaricarlo o consultarlo subito.',
  },
  {
    q: 'I miei file vengono caricati su un server?',
    a: 'No. Tutte le operazioni avvengono direttamente nel tuo browser, sul tuo dispositivo. I documenti non vengono inviati né salvati da nessuna parte, quindi anche i file riservati restano privati.',
  },
  {
    q: 'ApriDoc.com verifica la validità legale della firma digitale?',
    a: 'Lo strumento P7M estrae il contenuto e mostra i dati del firmatario e del certificato, ma non effettua la verifica legale della catena di certificazione. Per valore legale usa un software di verifica qualificato (ad esempio quello del tuo prestatore di servizi fiduciari).',
  },
  {
    q: 'Gli strumenti sono davvero gratuiti?',
    a: 'Sì: nessuna registrazione, nessun limite di file e nessuna filigrana sui documenti che elabori.',
  },
  {
    q: 'Posso aprire un P7M da telefono o tablet?',
    a: 'Sì, ApriDoc.com funziona con qualsiasi browser moderno su smartphone, tablet e computer, senza installare nessuna app.',
  },
];

export default function Home() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE.name,
      url: SITE.url,
      inLanguage: 'it-IT',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'ApriDoc.com — Aprire File P7M Online',
      url: SITE.url,
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-white">
        <div className="relative mx-auto max-w-[1300px] px-5 py-14 lg:h-[700px] lg:py-0">
          <HeroTiles />
          <div className="relative z-10 mx-auto flex max-w-[640px] flex-col items-center text-center lg:h-full lg:justify-center">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d9d3f2] bg-[#f4f5f7] px-3.5 py-1 text-xs font-semibold text-[#1f087a]">
              <Lock size={14} /> I tuoi file restano nel browser
            </p>
            <h1 className="text-4xl font-extrabold leading-[1.06] tracking-tight md:text-6xl">
              Apri file <span className="text-[#1f087a]">P7M</span> e lavora sui PDF, online
            </h1>
            <p className="mt-5 text-base leading-relaxed text-[#5b6270] md:text-lg">
              Estrai il documento da una firma digitale .p7m, unisci, dividi, ruota e converti PDF in pochi secondi.
              Senza installazioni e senza caricare nulla.
            </p>
            <Link href="/strumenti/apri-file-p7m" className="btn-primary mt-7 !px-7 !py-3.5 text-base">
              Apri un P7M →
            </Link>
            <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-semibold text-[#5b6270]">
              <span className="inline-flex items-center gap-2"><Zap size={16} className="text-[#1f087a]" /> Risultato immediato</span>
              <span className="inline-flex items-center gap-2"><Lock size={16} className="text-[#1f087a]" /> Nessun upload</span>
              <span className="inline-flex items-center gap-2"><FileCheck2 size={16} className="text-[#1f087a]" /> Senza installazioni</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tools */}
      <section id="strumenti" className="mx-auto max-w-[1400px] scroll-mt-20 px-5 pb-8 pt-4">
        <h2 className="mb-2 text-center text-3xl font-extrabold md:text-4xl">
          Tutti gli strumenti per i tuoi documenti
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-center text-[#5b6270]">
          Scegli lo strumento che ti serve: funziona direttamente nel browser, anche da smartphone.
        </p>
        <ToolGrid />
      </section>

      <PromoSection />

      {/* SEO copy */}
      <section className="mx-auto mt-16 max-w-[900px] px-5">
        <h2 className="text-3xl font-extrabold">Cos’è un file P7M e come si apre</h2>
        <div className="mt-4 space-y-4 text-lg leading-relaxed text-[#3d4452]">
          <p>
            Il formato <strong>.p7m</strong> (PKCS#7, firma CAdES) è lo standard più usato in Italia
            per la firma digitale: PEC, fatture, contratti e atti della pubblica amministrazione
            arrivano spesso come “documento.pdf.p7m”. Il file contiene sia il documento originale
            sia la firma digitale, e per questo non si apre con un normale lettore PDF.
          </p>
          <p>
            Con il <strong>P7M viewer di ApriDoc.com</strong> puoi estrarre il file originale in un
            clic, vedere chi lo ha firmato e quando, e scaricare il PDF, il Word o l’immagine
            contenuta nella busta firmata. Tutto avviene nel tuo browser: nessun software da
            installare e nessun documento inviato a server esterni.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto mt-16 max-w-[900px] scroll-mt-20 px-5">
        <h2 className="mb-6 text-3xl font-extrabold">Domande frequenti</h2>
        <FaqList items={FAQ} />
      </section>
    </>
  );
}
