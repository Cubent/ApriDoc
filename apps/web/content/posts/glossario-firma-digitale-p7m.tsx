import Link from 'next/link';
import type { Faq } from '@/lib/tool-content';

export const toc = [
  { id: 'formati', title: 'Formati e estensioni' },
  { id: 'concetti', title: 'Concetti della firma' },
  { id: 'verifica', title: 'Verifica e validità' },
  { id: 'enti', title: 'Enti e normativa' },
  { id: 'conclusione', title: 'In sintesi' },
  { id: 'domande', title: 'Domande frequenti' },
];

export const summary = [
  'Un glossario di 24 termini per orientarsi tra P7M, CAdES, PAdES, hash, certificato e marca temporale.',
  'Ogni voce rimanda alla guida di approfondimento quando esiste.',
  'Le definizioni sono sintetiche e non sostituiscono un parere legale.',
];

export const faq: Faq[] = [
  {
    q: 'Cos’è CAdES?',
    a: 'È uno standard per firme elettroniche avanzate basato su CMS (PKCS#7). I file firmati in questo formato hanno estensione .p7m (firma avvolgente) o .p7s (firma staccata).',
  },
  {
    q: 'Che differenza c’è tra firma elettronica e firma digitale?',
    a: 'La firma elettronica è un termine ampio; la firma digitale è una firma elettronica qualificata basata su certificato e chiavi crittografiche, con valore giuridico equivalente a quella autografa.',
  },
  {
    q: 'Cos’è un hash?',
    a: 'È un’impronta di lunghezza fissa calcolata a partire da un documento. Se il documento cambia, anche di poco, l’hash cambia: serve a rilevare le modifiche.',
  },
  {
    q: 'Cos’è una marca temporale?',
    a: 'È un’attestazione di un prestatore qualificato che prova che un documento esisteva in una data e un’ora precise.',
  },
  {
    q: 'Dove trovo le guide pratiche?',
    a: 'Nel blog di ApriDoc.com, a partire da “Come aprire un file P7M” e “File P7M: cosa sono”.',
  },
];

const Term = ({ id, name, children }: { id: string; name: string; children: React.ReactNode }) => (
  <div id={id} className="scroll-mt-24">
    <h3>{name}</h3>
    <p>{children}</p>
  </div>
);

export function Content() {
  return (
    <>
      <p>
        La firma digitale ha un linguaggio tutto suo: P7M, CAdES, hash, certificato, marca temporale. Questo glossario
        raccoglie i termini che incontri più spesso, con definizioni brevi e link alle guide. Se parti da zero, inizia
        con <Link href="/blog/file-p7m-cosa-sono">File P7M: cosa sono</Link>.
      </p>

      <h2 id="formati">Formati e estensioni</h2>
      <Term id="p7m" name="P7M">
        Estensione dei file in formato CAdES con firma <em>avvolgente</em>: il documento e la firma sono nella stessa busta.
        Vedi <Link href="/blog/come-aprire-file-p7m">come aprirlo</Link>.
      </Term>
      <Term id="p7s" name="P7S">
        Estensione della firma <em>staccata</em>: il file contiene solo la firma, il documento è a parte. Vedi{' '}
        <Link href="/blog/differenza-p7m-p7s-pades">la differenza con P7M e PAdES</Link>.
      </Term>
      <Term id="cades" name="CAdES">
        Standard di firma elettronica avanzata basato su CMS. Produce i file .p7m e .p7s.
      </Term>
      <Term id="pades" name="PAdES">
        Formato di firma incorporata nei PDF: il file resta un normale <code>.pdf</code>.
      </Term>
      <Term id="xades" name="XAdES">
        Formato di firma per i file XML, usato anche per le fatture elettroniche.
      </Term>
      <Term id="pkcs7" name="PKCS#7 / CMS">
        Standard crittografico su cui si basa CAdES. Il nome .p7m deriva da PKCS#7.
      </Term>
      <Term id="busta" name="Busta (firma avvolgente)">
        Struttura che racchiude documento e firma in un unico file. Il P7M è una busta.
      </Term>
      <Term id="annidata" name="Firma annidata">
        Documento firmato più volte, con una busta dentro l’altra (<code>.p7m</code> ripetuto). Vedi{' '}
        <Link href="/blog/doppia-firma-digitale-p7m">doppia firma P7M</Link>.
      </Term>

      <h2 id="concetti">Concetti della firma</h2>
      <Term id="firma-digitale" name="Firma digitale">
        Firma elettronica qualificata basata su un certificato e su una coppia di chiavi crittografiche, con effetto
        giuridico equivalente a quello di una firma autografa secondo la normativa europea.
      </Term>
      <Term id="firma-elettronica" name="Firma elettronica">
        Termine generale per qualsiasi dato elettronico usato come firma; esistono livelli diversi (semplice, avanzata,
        qualificata).
      </Term>
      <Term id="chiave" name="Chiave pubblica e chiave privata">
        Coppia di chiavi: la privata firma e resta al titolare, la pubblica permette a chiunque di verificare la firma.
      </Term>
      <Term id="hash" name="Hash (impronta)">
        Sequenza di lunghezza fissa calcolata dal documento. Se il documento cambia, l’hash cambia.
      </Term>
      <Term id="certificato" name="Certificato di firma">
        Documento elettronico che lega la chiave pubblica a una persona e riporta ente emittente e periodo di validità.
      </Term>
      <Term id="marca" name="Marca temporale">
        Attestazione di un prestatore qualificato che certifica la data e l’ora di un documento. Vedi{' '}
        <Link href="/blog/firma-digitale-scaduta-p7m">firma digitale scaduta</Link>.
      </Term>

      <h2 id="verifica">Verifica e validità</h2>
      <Term id="verifica-firma" name="Verifica della firma">
        Controllo di integrità, certificato, catena, revoca e data. Vedi{' '}
        <Link href="/blog/verificare-firma-p7m">come verificare la firma di un P7M</Link>.
      </Term>
      <Term id="estrazione" name="Estrazione">
        Recupero del documento contenuto nella busta. Non equivale a verificare la firma.
      </Term>
      <Term id="catena" name="Catena di certificazione">
        Sequenza di certificati che collega quello del firmatario a un ente di certificazione riconosciuto.
      </Term>
      <Term id="revoca" name="Revoca">
        Annullamento di un certificato prima della scadenza, per esempio in caso di smarrimento delle chiavi.
      </Term>
      <Term id="scadenza" name="Scadenza del certificato">
        Fine del periodo di validità del certificato. Non invalida automaticamente le firme apposte prima.
      </Term>
      <Term id="detached" name="Firma detached">
        Firma staccata dal documento (P7S): senza il documento originale non si può né leggere né verificare.
      </Term>

      <h2 id="enti">Enti e normativa</h2>
      <Term id="tsp" name="Prestatore di servizi fiduciari">
        Ente che emette certificati e marche temporali. Quelli qualificati sono presenti negli elenchi ufficiali.
      </Term>
      <Term id="agid" name="AgID">
        Agenzia per l’Italia Digitale: pubblica, tra l’altro, l’elenco dei software di verifica delle firme.
      </Term>
      <Term id="eidas" name="eIDAS">
        Regolamento europeo (UE 910/2014) sull’identità digitale e sui servizi fiduciari, che riconosce valore giuridico
        alle firme elettroniche qualificate.
      </Term>
      <Term id="sdi" name="SdI">
        Sistema di Interscambio: il sistema che riceve e inoltra le fatture elettroniche. Vedi{' '}
        <Link href="/blog/fattura-elettronica-xml-p7m">fattura XML.P7M</Link>.
      </Term>

      <h2 id="conclusione">In sintesi</h2>
      <p>
        Conoscere questi termini rende più facile capire cosa stai aprendo e cosa significa il risultato di una verifica.
        Quando devi solo leggere un documento firmato,{' '}
        <Link href="/strumenti/apri-file-p7m">apri il tuo file P7M</Link>.
      </p>
    </>
  );
}
