import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalPage, type LegalSection } from '@/components/legal-page';
import { LEGAL } from '@/lib/legal';

export const metadata: Metadata = {
  title: 'Termini e Condizioni d’Uso | ApriDoc.com',
  description:
    'Termini e condizioni di utilizzo di ApriDoc.com: descrizione del servizio gratuito, uso consentito, limiti di responsabilità, valore degli strumenti di lettura dei file firmati .p7m, legge applicabile.',
  alternates: { canonical: '/termini-e-condizioni' },
};

const sections: LegalSection[] = [
  {
    id: 'oggetto',
    title: 'Oggetto e accettazione',
    body: (
      <>
        <p>
          I presenti Termini e Condizioni (“Termini”) disciplinano l’utilizzo del sito <strong>apridoc.com</strong> (il
          “Sito”) e degli strumenti online messi a disposizione (il “Servizio”), gestiti dal titolare del Sito
          (il “Titolare”).
        </p>
        <p>
          Utilizzando il Servizio l’utente dichiara di aver letto e accettato i presenti Termini e l’
          <Link href="/privacy-policy">Informativa sulla Privacy</Link>. Se non li accetta, deve interrompere
          l’utilizzo del Sito.
        </p>
      </>
    ),
  },
  {
    id: 'servizio',
    title: 'Descrizione del Servizio',
    body: (
      <>
        <p>
          ApriDoc.com offre strumenti gratuiti per lavorare con documenti digitali, tra cui: apertura ed estrazione del
          contenuto di file firmati in formato .p7m (CAdES/PKCS#7), unione, divisione, rotazione e riordino di file
          PDF, conversione tra PDF e immagini, numerazione delle pagine e inserimento di filigrane.
        </p>
        <p>
          Le elaborazioni sono eseguite localmente nel browser dell’utente: i file non vengono caricati sui server
          del Titolare. Il Servizio non richiede registrazione e non prevede alcun corrispettivo.
        </p>
      </>
    ),
  },
  {
    id: 'p7m',
    title: 'Natura degli strumenti per file firmati (.p7m)',
    body: (
      <>
        <p>
          Lo strumento di apertura dei file .p7m <strong>estrae il documento contenuto nella busta firmata</strong> e
          mostra informazioni di carattere indicativo sul certificato del firmatario, sulle sue date di validità e
          sull’emittente, confrontato con gli elenchi pubblici dei prestatori di servizi fiduciari qualificati di Italia e
          Romania incorporati nel Sito.
        </p>
        <p>
          Tali informazioni <strong>non costituiscono una verifica di firma qualificata</strong> ai sensi del
          Regolamento (UE) 910/2014 (eIDAS) e del Codice dell’Amministrazione Digitale. In particolare, il Servizio non
          verifica la validità crittografica della firma, lo stato di revoca del certificato né l’intera catena di
          certificazione, e gli elenchi utilizzati sono una copia statica, non aggiornata in tempo reale.
        </p>
        <p>
          Per ogni uso che richieda certezza sul valore legale di un documento firmato (ad esempio procedimenti
          giudiziari, atti notarili, appalti pubblici, adempimenti fiscali) l’utente deve utilizzare un software di
          verifica qualificato o rivolgersi al prestatore di servizi fiduciari competente.
        </p>
      </>
    ),
  },
  {
    id: 'uso',
    title: 'Uso consentito',
    body: (
      <>
        <p>L’utente si impegna a utilizzare il Servizio nel rispetto della legge e dei presenti Termini. È vietato:</p>
        <ul>
          <li>elaborare documenti di cui non si ha il diritto di disporre o la cui elaborazione violi diritti di terzi;</li>
          <li>utilizzare il Servizio per attività illecite, fraudolente o per contraffare documenti o firme;</li>
          <li>tentare di compromettere la sicurezza o il funzionamento del Sito, o sovraccaricarlo con accessi automatizzati abusivi;</li>
          <li>effettuare ingegneria inversa o copiare il Sito, o parti di esso, in violazione dei diritti del Titolare.</li>
        </ul>
        <p>
          L’utente è l’unico responsabile dei file che elabora e dell’uso che fa dei risultati ottenuti.
        </p>
      </>
    ),
  },
  {
    id: 'contenuti',
    title: 'Contenuti dell’utente',
    body: (
      <p>
        Poiché i file non vengono trasmessi al Titolare, l’utente conserva tutti i diritti sui propri documenti e il
        Titolare non acquisisce su di essi alcuna licenza né ne ha conoscenza. L’utente è tenuto a conservare copia
        dei propri file originali: il Servizio produce nuovi file senza modificare gli originali, ma non ne garantisce
        la conservazione.
      </p>
    ),
  },
  {
    id: 'proprieta',
    title: 'Proprietà intellettuale',
    body: (
      <p>
        Il Sito, il suo design, i testi, i loghi e il software che lo compone sono di titolarità del Titolare o dei
        rispettivi licenzianti e sono protetti dalle norme in materia di diritto d’autore e proprietà industriale.
        Il nome, il logo e i segni distintivi non possono essere utilizzati senza autorizzazione scritta. Alcune
        componenti software di terze parti sono utilizzate nel rispetto delle rispettive licenze open source.
      </p>
    ),
  },
  {
    id: 'garanzie',
    title: 'Esclusione di garanzie',
    body: (
      <>
        <p>
          Il Servizio è fornito “così com’è” e “come disponibile”. Pur ponendo ogni cura nella realizzazione degli
          strumenti, il Titolare non garantisce che il Servizio sia privo di errori, ininterrotto, compatibile con
          ogni file o dispositivo, né che i risultati siano esatti, completi o idonei a uno scopo particolare.
        </p>
        <p>
          Alcuni file possono non essere elaborabili, ad esempio perché danneggiati, protetti da password, con firme
          “detached” o in formati non supportati.
        </p>
      </>
    ),
  },
  {
    id: 'responsabilita',
    title: 'Limitazione di responsabilità',
    body: (
      <>
        <p>
          Nei limiti consentiti dalla legge, il Titolare non risponde dei danni diretti o indiretti derivanti
          dall’uso o dall’impossibilità di usare il Servizio, inclusi perdita di dati, perdita di profitto o danni
          derivanti dall’affidamento sui risultati degli strumenti, salvo i casi di dolo o colpa grave.
        </p>
        <p>
          Nulla nei presenti Termini esclude o limita la responsabilità che non può essere esclusa o limitata per
          legge, né i diritti inderogabili riconosciuti al consumatore dal Codice del Consumo (D.Lgs. 206/2005).
        </p>
      </>
    ),
  },
  {
    id: 'disponibilita',
    title: 'Disponibilità e modifiche del Servizio',
    body: (
      <p>
        Il Titolare può modificare, sospendere o interrompere in tutto o in parte il Servizio, anche senza preavviso,
        per ragioni tecniche, di sicurezza o organizzative. Gli strumenti indicati come “Presto” sono annunciati ma non
        ancora disponibili e la loro pubblicazione non è garantita.
      </p>
    ),
  },
  {
    id: 'link',
    title: 'Link a siti di terzi',
    body: (
      <p>
        Il Sito può contenere collegamenti a siti di terzi sui cui contenuti e sulle cui politiche il Titolare non ha
        alcun controllo e dei quali non risponde.
      </p>
    ),
  },
  {
    id: 'modifiche',
    title: 'Modifiche ai Termini',
    body: (
      <p>
        Il Titolare può aggiornare i presenti Termini. La versione aggiornata è pubblicata su questa pagina con la
        data di ultimo aggiornamento e si applica dall’aggiornamento stesso. L’uso continuato del Servizio dopo la
        pubblicazione costituisce accettazione delle modifiche.
      </p>
    ),
  },
  {
    id: 'legge',
    title: 'Legge applicabile e foro competente',
    body: (
      <p>
        I presenti Termini sono regolati dalla legge italiana. Per qualsiasi controversia è competente in via
        esclusiva il Foro del luogo di sede del Titolare, salvo che l’utente sia un consumatore: in tal caso resta
        competente il giudice del luogo di residenza o domicilio del consumatore, ai sensi dell’art. 66-bis del
        Codice del Consumo. Per le controversie con i consumatori è inoltre possibile ricorrere agli organismi di
        risoluzione alternativa delle controversie.
      </p>
    ),
  },
  {
    id: 'contatti',
    title: 'Contatti',
    body: (
      <p>
        Per domande sui presenti Termini o sul Servizio è possibile contattare il Titolare attraverso il Sito.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Termini e Condizioni d’Uso"
      intro="Le regole per usare ApriDoc.com: cosa offre il servizio, come puoi usarlo e quali sono i suoi limiti."
      sections={sections}
    />
  );
}
