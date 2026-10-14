import Link from 'next/link';
import type { Faq } from '@/lib/tool-content';
import { Callout } from './shared';

export const toc = [
  { id: 'perche-su-mac', title: 'Perché su Mac non si apre' },
  { id: 'online', title: 'Metodo 1: dal browser' },
  { id: 'terminale', title: 'Metodo 2: dal Terminale' },
  { id: 'software', title: 'Metodo 3: software di firma' },
  { id: 'confronto', title: 'Quale metodo scegliere' },
  { id: 'problemi', title: 'Problemi frequenti su Mac' },
  { id: 'conclusione', title: 'In sintesi' },
  { id: 'domande', title: 'Domande frequenti' },
];

export const summary = [
  'macOS non apre nativamente i file .p7m: serve estrarre il documento dalla busta di firma.',
  'Il modo più semplice è il browser (Safari, Chrome o Firefox): trascini il file e scarichi il documento.',
  'Chi preferisce il Terminale può estrarre il contenuto con il comando openssl; per la verifica legale servono software dedicati.',
];

export const faq: Faq[] = [
  {
    q: 'Come si apre un file P7M su Mac?',
    a: 'Il modo più semplice è usare uno strumento online dal browser: trascini il file, vedi il documento e lo scarichi. In alternativa puoi estrarre il contenuto dal Terminale con openssl oppure usare un software di firma digitale.',
  },
  {
    q: 'Anteprima o Quick Look aprono i file P7M?',
    a: 'In genere no: il file è una busta di firma e non un documento, quindi Anteprima non riesce a mostrarne il contenuto. Va prima estratto.',
  },
  {
    q: 'Rinominare il file P7M funziona su Mac?',
    a: 'No. Eliminare l’estensione .p7m non estrae il documento: il file resta una busta di firma e non si apre.',
  },
  {
    q: 'Funziona con Safari, Chrome e Firefox?',
    a: 'Sì, basta un browser moderno. Lo strumento di ApriDoc.com elabora il file localmente e funziona allo stesso modo con i principali browser per Mac.',
  },
  {
    q: 'Su Mac posso anche verificare la firma?',
    a: 'Con gli strumenti online puoi leggere il documento e i dati del firmatario. Per la verifica con valore legale serve un software di verifica qualificato, di cui alcuni prestatori di servizi fiduciari offrono versioni per macOS.',
  },
];

export function Content() {
  return (
    <>
      <p>
        Su un Mac un allegato <strong>.p7m</strong> non si apre con un doppio clic: Anteprima non lo riconosce e il file
        resta un allegato da salvare. La buona notizia è che non servono programmi particolari. Qui trovi tre modi per
        aprire un file P7M su macOS, dal più semplice al più tecnico. Per capire meglio il formato leggi{' '}
        <Link href="/blog/file-p7m-cosa-sono">File P7M: cosa sono e come funzionano</Link>.
      </p>

      <h2 id="perche-su-mac">Perché su Mac non si apre</h2>
      <p>
        Il file P7M è una busta di firma digitale (CAdES) che racchiude il documento originale. macOS non ha
        un’applicazione predefinita che sappia leggere questa busta, e quindi non trova il PDF o il Word al suo interno.
        Il contenuto va estratto: una volta fatto, il documento si apre normalmente con Anteprima, Pages o Word.
      </p>

      <h2 id="online">Metodo 1: dal browser (il più semplice)</h2>
      <p>
        Funziona con Safari, Chrome e Firefox e non richiede installazioni. Con{' '}
        <Link href="/strumenti/apri-file-p7m">Apri file P7M di ApriDoc.com</Link>:
      </p>
      <ol>
        <li>Apri lo strumento dal browser del Mac.</li>
        <li>
          Trascina il file <code>.p7m</code> dal Finder alla casella, oppure clicca e selezionalo.
        </li>
        <li>Controlla documento, firmatario e data di firma.</li>
        <li>Scarica il documento: lo trovi nella cartella Download e si apre con Anteprima o con l’app corretta.</li>
      </ol>
      <p>
        Il file viene letto nel browser e non è caricato su nessun server. Se ti serve un PDF a partire dal contenuto,
        vedi anche <Link href="/strumenti/convertire-p7m-in-pdf">da P7M a PDF</Link>.
      </p>

      <h2 id="terminale">Metodo 2: dal Terminale con openssl</h2>
      <p>
        Se ti trovi a tuo agio con la riga di comando, macOS include <code>openssl</code>. Questo comando estrae il
        documento dalla busta senza verificare la catena di certificazione:
      </p>
      <p>
        <code>openssl smime -verify -noverify -in documento.pdf.p7m -inform DER -out documento.pdf</code>
      </p>
      <ul>
        <li>
          Sostituisci i nomi con quelli del tuo file. Il parametro <code>-out</code> è il documento che vuoi ottenere.
        </li>
        <li>
          Se il file è in formato testuale (Base64), cambia <code>-inform DER</code> in <code>-inform PEM</code>.
        </li>
        <li>
          Il parametro <code>-noverify</code> salta il controllo della catena di certificati: il comando estrae il
          contenuto, non verifica la firma.
        </li>
        <li>
          Nei file annidati (<code>.p7m.p7m</code>) ripeti il comando sul file ottenuto.
        </li>
      </ul>
      <Callout>
        <strong>Attenzione:</strong> questo metodo estrae soltanto il documento. Non dà alcuna garanzia sulla validità
        della firma. Se ti serve una verifica con valore legale, usa un software dedicato.
      </Callout>

      <h2 id="software">Metodo 3: software di firma digitale</h2>
      <p>
        Alcuni prestatori di servizi fiduciari offrono applicazioni per macOS che estraggono il documento e verificano la
        firma. Sono la scelta giusta quando devi dimostrare la validità del documento. Verifica sul sito del prestatore
        quale versione è compatibile con la tua versione di macOS e con eventuali dispositivi di firma, come una smart
        card o una chiavetta.
      </p>

      <h2 id="confronto">Quale metodo scegliere</h2>
      <div className="not-prose my-6 overflow-x-auto rounded-2xl border border-[#e6e8ec]">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="bg-[#f4f5f7] text-xs font-bold uppercase tracking-wider text-[#8a91a0]">
            <tr>
              <th className="px-4 py-3">Metodo</th>
              <th className="px-4 py-3">Difficoltà</th>
              <th className="px-4 py-3">Quando usarlo</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#eef0f3] text-[#3d4452]">
            <tr>
              <td className="px-4 py-3 font-semibold">Browser</td>
              <td className="px-4 py-3">Facile</td>
              <td className="px-4 py-3">Vuoi solo leggere o scaricare il documento</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-semibold">Terminale (openssl)</td>
              <td className="px-4 py-3">Media</td>
              <td className="px-4 py-3">Hai molti file o preferisci la riga di comando</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-semibold">Software di firma</td>
              <td className="px-4 py-3">Media</td>
              <td className="px-4 py-3">Ti serve la verifica con valore legale</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="problemi">Problemi frequenti su Mac</h2>
      <h3>Il file si chiama “smime.p7m”</h3>
      <p>
        Un allegato con questo nome arriva spesso da un messaggio di posta firmato o cifrato. Il suo trattamento dipende
        dal contenuto: se contiene un documento firmato si apre come un normale P7M, mentre un messaggio cifrato richiede
        il certificato del destinatario.
      </p>
      <h3>Il browser scarica ma non mostra nulla</h3>
      <p>
        Lo strumento mostra il risultato direttamente nella pagina: assicurati di caricare il file dalla pagina e non di
        aprirlo dalla cartella Download.
      </p>
      <h3>Il documento estratto non si apre</h3>
      <p>
        Controlla l’estensione nel nome originale: <code>.xml</code> è una fattura elettronica e non si apre con
        Anteprima. Serve un visualizzatore di fatture o il gestionale.
      </p>

      <h2 id="conclusione">In sintesi</h2>
      <p>
        Su Mac un file P7M si apre estraendone il documento. Dal browser è questione di pochi secondi, dal Terminale
        bastano un comando e il nome del file, e con un software di firma ottieni anche la verifica legale. Qualunque
        metodo usi, conserva il file <code>.p7m</code> originale.{' '}
        <Link href="/strumenti/apri-file-p7m">Apri subito il tuo file P7M</Link>.
      </p>
    </>
  );
}
