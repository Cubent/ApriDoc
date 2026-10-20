import Link from 'next/link';
import type { Faq } from '@/lib/tool-content';
import { Callout } from './shared';

export const toc = [
  { id: 'risposta-breve', title: 'La risposta breve' },
  { id: 'cosa-dice-la-legge', title: 'Cosa dice la legge' },
  { id: 'quando-vale', title: 'Quando un P7M è davvero valido' },
  { id: 'aprire-non-basta', title: 'Aprire non significa verificare' },
  { id: 'cosa-conservare', title: 'Cosa conservare' },
  { id: 'conclusione', title: 'In sintesi' },
  { id: 'domande', title: 'Domande frequenti' },
];

export const summary = [
  'Un P7M ha valore legale quando contiene una firma digitale qualificata valida: equivale a una firma autografa.',
  'Il file in sé non basta: contano certificato, integrità del documento e, se serve, la marca temporale.',
  'Il PDF estratto non ha valore di firma: conserva sempre il .p7m originale.',
];

export const faq: Faq[] = [
  {
    q: 'Un file P7M ha valore legale?',
    a: 'Sì, se la firma digitale al suo interno è qualificata e valida. In quel caso ha lo stesso effetto di una firma autografa. Un P7M con firma non valida o non verificabile non offre la stessa garanzia.',
  },
  {
    q: 'Il PDF estratto da un P7M ha valore legale?',
    a: 'Il PDF estratto è una copia leggibile del documento, ma non contiene la firma: quella resta nel file .p7m. Per dimostrare chi ha firmato serve il P7M originale.',
  },
  {
    q: 'Un P7M con certificato scaduto è ancora valido?',
    a: 'Dipende da quando è stato firmato: se la firma è anteriore alla scadenza, o è presente una marca temporale, il documento può restare valido. Leggi la guida dedicata sulla firma scaduta.',
  },
  {
    q: 'Devo avere una firma digitale per aprire un P7M?',
    a: 'No. Per leggere il documento non serve alcuna firma: serve solo uno strumento che apra la busta CAdES.',
  },
  {
    q: 'Questa guida è una consulenza legale?',
    a: 'No, è un’informazione generale. Per un caso specifico, ad esempio un contratto o un contenzioso, rivolgiti a un professionista.',
  },
];

export function Content() {
  return (
    <>
      <p>
        Ti hanno inviato un <strong>file P7M</strong> e vuoi sapere se vale davvero come un documento firmato a mano? È
        una domanda sensata, perché un file con estensione <code>.p7m</code> non è valido per il solo fatto di esistere:
        dipende da cosa c’è dentro. Se vuoi prima le basi leggi{' '}
        <Link href="/blog/file-p7m-cosa-sono">File P7M: cosa sono</Link>.
      </p>

      <h2 id="risposta-breve">La risposta breve</h2>
      <p>
        <strong>Sì, un P7M può avere pieno valore legale</strong>, a una condizione: la firma digitale che contiene deve
        essere qualificata e risultare valida. In quel caso il documento ha lo stesso peso di uno firmato con penna.
      </p>

      <h2 id="cosa-dice-la-legge">Cosa dice la legge</h2>
      <p>
        La firma digitale è una forma di <strong>firma elettronica qualificata</strong>. Il regolamento europeo eIDAS le
        attribuisce un effetto giuridico equivalente a quello della firma autografa e, in Italia, il Codice
        dell’Amministrazione Digitale (D.Lgs. 82/2005) le riconosce l’efficacia di una scrittura privata. Il formato
        P7M, o CAdES, è solo uno dei modi tecnici per racchiudere documento e firma.
      </p>
      <Callout>
        Questa è un’informazione generale, non una consulenza legale. Per contratti importanti o contestazioni, chiedi
        a un professionista.
      </Callout>

      <h2 id="quando-vale">Quando un P7M è davvero valido</h2>
      <ul>
        <li>la firma è <strong>qualificata</strong>, emessa da un prestatore di servizi fiduciari riconosciuto;</li>
        <li>il documento <strong>non è stato modificato</strong> dopo la firma;</li>
        <li>il certificato era <strong>valido al momento della firma</strong>, non revocato né sospeso;</li>
        <li>se serve certezza sulla data, c’è una <strong>marca temporale</strong>.</li>
      </ul>
      <p>
        Se il certificato è scaduto non è automaticamente un problema: leggi{' '}
        <Link href="/blog/firma-digitale-scaduta-p7m">Firma scaduta: il P7M è ancora valido?</Link>
      </p>

      <h2 id="aprire-non-basta">Aprire non significa verificare</h2>
      <p>
        Aprire un P7M ti mostra il contenuto, ma non dice se la firma è valida. Sono due operazioni diverse: la
        seconda richiede un controllo del certificato. Approfondisci in{' '}
        <Link href="/blog/verificare-firma-p7m">Come verificare la firma di un P7M</Link>. Per leggere il documento e
        vedere chi lo ha firmato usa <Link href="/strumenti/apri-file-p7m">Apri file P7M</Link>.
      </p>

      <h2 id="cosa-conservare">Cosa conservare</h2>
      <ul>
        <li>il file <code>.p7m</code> originale, senza rinominarlo né modificarlo;</li>
        <li>il PDF estratto, solo come copia di lettura;</li>
        <li>il risultato della verifica, se la firma serve come prova.</li>
      </ul>

      <h2 id="conclusione">In sintesi</h2>
      <p>
        Un P7M vale quanto la firma che contiene. Aprilo per leggerlo, verificalo quando conta e conserva sempre
        l’originale. <Link href="/strumenti/apri-file-p7m">Apri subito il tuo file P7M</Link>.
      </p>
    </>
  );
}
