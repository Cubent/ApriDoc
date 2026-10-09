import { FileCheck2, Lock, Zap } from 'lucide-react';
import Link from 'next/link';
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
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-[#f4f5f7]">
        <div className="pointer-events-none absolute -left-40 -top-40 size-[520px] rounded-full bg-[#1f087a]/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 top-10 size-[520px] rounded-full bg-[#e5574a]/10 blur-3xl" />
        <div className="relative mx-auto max-w-[1100px] px-5 pb-20 pt-20 text-center md:pt-28">
          <p className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-[#d9d3f2] bg-[#f4f5f7] px-4 py-1.5 text-sm font-semibold text-[#1f087a]">
            <Lock size={15} /> I tuoi file restano nel browser
          </p>
          <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight md:text-7xl">
            Apri file <span className="text-[#1f087a]">P7M</span> e lavora sui PDF,
            <br className="hidden md:block" /> online e gratis
          </h1>
          <p className="mx-auto mt-7 max-w-3xl text-xl leading-relaxed text-[#5b6270] md:text-2xl">
            Estrai il documento da una firma digitale .p7m, unisci, dividi, ruota e converti PDF
            in pochi secondi. Senza installazioni, senza registrazione e senza caricare nulla.
          </p>

          <Link
            href="/strumenti/apri-file-p7m"
            className="mx-auto mt-12 block max-w-3xl rounded-3xl border-2 border-[#1f087a] bg-[#f4f5f7] p-8 text-left transition hover:-translate-y-1 md:p-10"
          >
            <div className="flex flex-col gap-6 md:flex-row md:items-center">
              <span className="inline-flex size-20 shrink-0 items-center justify-center rounded-3xl bg-[#1f087a]/10 text-[#1f087a]">
                <FileCheck2 size={44} />
              </span>
              <div className="flex-1">
                <span className="text-xs font-bold uppercase tracking-widest text-[#1f087a]">
                  Strumento in evidenza
                </span>
                <h2 className="mt-1 text-2xl font-extrabold leading-tight md:text-3xl">
                  Apri File P7M Online Gratis: Leggi il Documento in 1 Click
                </h2>
                <p className="mt-2 text-[#5b6270]">
                  Trascina il tuo file <strong>.p7m</strong> e ottieni subito il PDF originale,
                  con i dati del firmatario.
                </p>
              </div>
              <span className="btn-primary whitespace-nowrap !px-7 !py-4 text-lg">
                Apri un P7M →
              </span>
            </div>
          </Link>

          <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm font-semibold text-[#5b6270]">
            <span className="inline-flex items-center gap-2"><Zap size={16} className="text-[#1f087a]" /> Risultato immediato</span>
            <span className="inline-flex items-center gap-2"><Lock size={16} className="text-[#1f087a]" /> Nessun upload</span>
            <span className="inline-flex items-center gap-2"><FileCheck2 size={16} className="text-[#1f087a]" /> 100% gratuito</span>
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
