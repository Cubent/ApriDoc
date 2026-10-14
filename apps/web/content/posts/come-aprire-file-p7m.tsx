import Link from 'next/link';
import type { Faq } from '@/lib/tool-content';
import { Callout } from './shared';

export const toc = [
  { id: 'perche-non-si-apre', title: 'Perché un P7M non si apre' },
  { id: 'online', title: 'Metodo 1: online, in 3 passaggi' },
  { id: 'software', title: 'Metodo 2: software di firma' },
  { id: 'per-tipo-di-file', title: 'Cosa apri a seconda del file' },
  { id: 'cosa-non-fare', title: 'Cosa non fare' },
  { id: 'non-funziona', title: 'Se non funziona' },
  { id: 'conclusione', title: 'In sintesi' },
  { id: 'domande', title: 'Domande frequenti' },
];

export const summary = [
  'Per aprire un file .p7m devi estrarre il documento dalla busta di firma: rinominare il file non serve.',
  'Il modo più rapido è uno strumento online che lavora nel browser: trascini il file, leggi il documento e lo scarichi.',
  'Aprire il file non equivale a verificarne la firma: per il valore legale serve un software di verifica qualificato.',
];

export const faq: Faq[] = [
  {
    q: 'Come si apre un file P7M?',
    a: 'Si estrae il documento contenuto nella busta di firma con un software di firma digitale oppure con uno strumento online. Basta trascinare il file nello strumento: il documento originale compare subito e può essere scaricato.',
  },
  {
    q: 'Posso aprire un P7M senza installare programmi?',
    a: 'Sì. Con uno strumento online che elabora il file nel browser non devi installare nulla e funziona da computer, tablet e smartphone.',
  },
  {
    q: 'Cosa faccio se il P7M contiene un file XML?',
    a: 'È il caso tipico di una fattura elettronica (fattura.xml.p7m). Dopo l’estrazione ottieni il file XML, che puoi leggere o importare nel gestionale.',
  },
  {
    q: 'Perché dopo l’estrazione il file non ha l’estensione giusta?',
    a: 'Il nome originale è nella prima parte del file: in “contratto.pdf.p7m” il documento è un PDF. Se il nome non contiene altre estensioni, l’estensione si ricava dal tipo di contenuto.',
  },
  {
    q: 'Aprire un P7M significa verificare la firma?',
    a: 'No. L’estrazione mostra il documento e i dati del firmatario, ma la verifica con valore legale (catena di certificazione, revoca, data di firma) richiede un software di verifica qualificato.',
  },
];

export function Content() {
  return (
    <>
      <p>
        Hai ricevuto un allegato che finisce con <strong>.p7m</strong> e il tuo computer non sa cosa farne? È normale:
        un file P7M non è un documento come un PDF o un Word, ma una busta di firma digitale che lo contiene. Questa
        guida ti porta, passo dopo passo, dal file ricevuto al documento leggibile. Se vuoi prima capire cos’è
        esattamente, trovi la spiegazione completa in{' '}
        <Link href="/blog/file-p7m-cosa-sono">File P7M: cosa sono e come funzionano</Link>.
      </p>

      <h2 id="perche-non-si-apre">Perché un P7M non si apre con un doppio clic</h2>
      <p>
        Un file P7M racchiude il documento originale insieme alla firma digitale. Un lettore PDF, un editor di testo o un
        visualizzatore di immagini non riconoscono la struttura della busta e quindi non trovano il documento. Il
        contenuto va <strong>estratto</strong>: è un’operazione semplice, ma serve il programma giusto.
      </p>

      <h2 id="online">Metodo 1: aprire un P7M online in 3 passaggi</h2>
      <p>
        È il modo più veloce e non richiede installazioni. Con{' '}
        <Link href="/strumenti/apri-file-p7m">lo strumento Apri file P7M di ApriDoc.com</Link> funziona così:
      </p>
      <ol>
        <li>
          <strong>Carica il file.</strong> Trascina il <code>.p7m</code> nella casella oppure selezionalo dal dispositivo.
          Vanno bene <code>.pdf.p7m</code>, <code>.xml.p7m</code> e gli altri formati.
        </li>
        <li>
          <strong>Controlla il risultato.</strong> Vedi il documento contenuto, il nome del firmatario, la data di firma e
          l’ente che ha emesso il certificato.
        </li>
        <li>
          <strong>Scarica il documento.</strong> Ottieni il file originale, ad esempio il PDF. Se ti serve proprio un PDF
          a partire da altri formati, vedi la pagina{' '}
          <Link href="/strumenti/convertire-p7m-in-pdf">da P7M a PDF</Link>.
        </li>
      </ol>
      <p>
        L’elaborazione avviene nel browser: il file non viene inviato a nessun server, e questo conta se il documento
        contiene dati personali, fiscali o riservati.
      </p>

      <Callout>
        <strong>Consiglio:</strong> controlla sempre il nome completo del file. In <code>contratto.pdf.p7m</code> il
        documento è un PDF, in <code>fattura.xml.p7m</code> è un XML: sai così in anticipo cosa otterrai.
      </Callout>

      <h2 id="software">Metodo 2: con un software di firma digitale</h2>
      <p>
        I prestatori di servizi fiduciari (gli stessi che rilasciano i dispositivi di firma) mettono a disposizione
        programmi gratuiti per estrarre il documento e verificare la firma. Vanno scelti quando ti serve una{' '}
        <strong>verifica con valore legale</strong>, per esempio per una pratica, un contenzioso o un controllo formale.
        Il procedimento è simile: apri il file nel programma, controlli l’esito della verifica ed esporti il documento.
      </p>

      <h2 id="per-tipo-di-file">Cosa apri a seconda del file</h2>
      <div className="not-prose my-6 overflow-x-auto rounded-2xl border border-[#e6e8ec]">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="bg-[#f4f5f7] text-xs font-bold uppercase tracking-wider text-[#8a91a0]">
            <tr>
              <th className="px-4 py-3">Nome del file</th>
              <th className="px-4 py-3">Cosa contiene</th>
              <th className="px-4 py-3">Come lo leggi dopo l’estrazione</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#eef0f3] text-[#3d4452]">
            <tr>
              <td className="px-4 py-3 font-semibold">documento.pdf.p7m</td>
              <td className="px-4 py-3">Un PDF firmato</td>
              <td className="px-4 py-3">Con qualsiasi lettore PDF</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-semibold">fattura.xml.p7m</td>
              <td className="px-4 py-3">Una fattura elettronica</td>
              <td className="px-4 py-3">Con un visualizzatore di fatture o dal gestionale</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-semibold">documento.docx.p7m</td>
              <td className="px-4 py-3">Un file Word</td>
              <td className="px-4 py-3">Con Word o un programma compatibile</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-semibold">documento.pdf.p7m.p7m</td>
              <td className="px-4 py-3">Un PDF firmato due volte</td>
              <td className="px-4 py-3">Estrai due livelli, uno dopo l’altro</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="cosa-non-fare">Cosa non fare</h2>
      <ul>
        <li>
          <strong>Non rinominare il file</strong> togliendo <code>.p7m</code>: il contenuto resta una busta di firma e non
          si apre. Va estratto.
        </li>
        <li>
          <strong>Non aprire P7M da mittenti sconosciuti</strong> se non te li aspetti, come per qualsiasi allegato.
        </li>
        <li>
          <strong>Non eliminare il file .p7m originale</strong> dopo aver salvato il documento: è l’unico che contiene la
          firma.
        </li>
        <li>
          <strong>Non considerare valida la firma</strong> solo perché il documento si è aperto: aprire non significa
          verificare.
        </li>
      </ul>

      <h2 id="non-funziona">Se non funziona</h2>
      <h3>Il file sembra vuoto o dà errore</h3>
      <p>
        Può essere danneggiato durante il download o l’invio. Scaricalo di nuovo dalla posta o dalla PEC e riprova.
      </p>
      <h3>Il programma dice che la firma è “detached”</h3>
      <p>
        Il file contiene solo la firma e il documento è a parte (di solito un <code>.p7s</code>). In quel caso non c’è
        nulla da estrarre: ti serve il documento originale che accompagna la firma.
      </p>
      <h3>Il documento estratto non si apre</h3>
      <p>
        Controlla l’estensione nel nome originale e usa il programma adatto: un XML non si apre con un lettore PDF. Se hai
        un file che ti sembra danneggiato, prova a scaricarlo di nuovo prima di cambiare strumento.
      </p>

      <h2 id="conclusione">In sintesi</h2>
      <p>
        Per aprire un file P7M devi estrarre il documento dalla busta di firma. Online lo fai in tre passaggi senza
        installare nulla; con un software di firma ottieni anche la verifica con valore legale. Conserva sempre il file{' '}
        <code>.p7m</code> originale e ricorda che aprirlo non vuol dire verificarlo. Se vuoi farlo ora,{' '}
        <Link href="/strumenti/apri-file-p7m">apri il tuo file P7M</Link>.
      </p>
    </>
  );
}
