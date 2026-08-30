/**
 * Datele paginii /ce-ti-trebuie.
 *
 * Ideea: omul nu cumpără software, cumpără scăparea de o durere. Îl punem
 * să-și numească domeniul și durerea, apoi compunem răspunsul în fața lui —
 * module concrete, timp recuperat, interval de preț, dovadă video.
 *
 * 💬 Despre preț: nicăieri în pagină nu apare o sumă. Nu din secretomanie,
 * ci pentru că un număr fix pe ecran face omul să decidă singur „e scump”
 * și să plece, fără să vorbească cu tine. În loc de cifră, punem o
 * comparație cu un cost pe care patronul îl cunoaște deja (o ofertă
 * pierdută, o zi de muncă, un client scăpat) — apoi promitem cifra exactă
 * în cele 15 minute. Așa pleacă spre discuție, nu spre concurență.
 *
 * ⚠️ ORELE recuperate de mai jos sunt estimările noastre. Verifică-le
 * înainte de lansare și ajustează-le aici, într-un singur loc — se
 * propagă în toate cele 25 de combinații.
 */

export type DomeniuId =
  | "constructii"
  | "instalatii"
  | "service"
  | "transport"
  | "altceva";

export type DurereId =
  | "hartii"
  | "teren"
  | "oferte"
  | "clienti"
  | "online";

export type Domeniu = {
  id: DomeniuId;
  eticheta: string;
  /** Cum îi spunem firmei în fraza de răspuns: „o firmă de construcții…” */
  substantiv: string;
};

export const DOMENII: Domeniu[] = [
  { id: "constructii", eticheta: "Construcții", substantiv: "firmă de construcții" },
  { id: "instalatii", eticheta: "Instalații", substantiv: "firmă de instalații" },
  { id: "service", eticheta: "Service și mentenanță", substantiv: "firmă de service" },
  { id: "transport", eticheta: "Transport", substantiv: "firmă de transport" },
  { id: "altceva", eticheta: "Altceva", substantiv: "firmă" },
];

export type Durere = {
  id: DurereId;
  /** Cum și-o spune el, la persoana întâi — pe butoane. */
  eticheta: string;
  /** Cum o povestim noi, în fraza de deasupra răspunsului. */
  descriere: string;
};

export const DURERI: Durere[] = [
  {
    id: "oferte",
    eticheta: "Ofertele îmi iau o zi întreagă",
    descriere: "unde o ofertă înseamnă o zi de muncă",
  },
  {
    id: "teren",
    eticheta: "Nu știu cine ce face pe teren",
    descriere: "care nu știe cine ce face pe teren",
  },
  {
    id: "hartii",
    eticheta: "Pierd ore cu hârtii și documente",
    descriere: "care pierde ore întregi cu hârtii și documente",
  },
  {
    id: "clienti",
    eticheta: "Mă sună clienții după aceleași lucruri",
    descriere: "pe care clienții o sună mereu pentru aceleași lucruri",
  },
  {
    id: "online",
    eticheta: "Nu mă găsește nimeni online",
    descriere: "pe care nu o găsește nimeni online",
  },
];

export type Modul = {
  nume: string;
  descriere: string;
};

export type Solutie = {
  /** Titlul răspunsului — se completează cu substantivul domeniului. */
  titlu: string;
  /** Fraza care confirmă că i-am înțeles problema. */
  oglinda: string;
  module: [Modul, Modul, Modul];
  /** Ce câștigă, exprimat în termenii lui, nu în funcții software. */
  castig: string;
  castigDetaliu: string;
  pret: string;
  pretDetaliu: string;
  /** Fișier din /public/clipuri — dovada, nu un clip generic. */
  clip?: string;
  /** Nuanță pe domeniu: exemplul concret care îl face să se recunoască. */
  exemple: Record<DomeniuId, string>;
};

export const SOLUTII: Record<DurereId, Solutie> = {
  oferte: {
    titlu: "Ofertele nu mai sunt o zi de muncă. Sunt 4 minute.",
    oglinda:
      "Stai seara după program și scrii oferte în Word, copiind prețuri dintr-un Excel pe care doar tu îl înțelegi. Iar până o trimiți, clientul a primit deja două de la alții.",
    module: [
      {
        nume: "Oferte generate cu AI",
        descriere:
          "Scrii în două rânduri ce are de făcut clientul. Primești o ofertă tehnică, structurată, cu articole și prețuri — pe care o corectezi, nu o scrii de la zero.",
      },
      {
        nume: "Devize din fotografii",
        descriere:
          "Faci 3-4 poze la fața locului. Sistemul citește ce se vede, recunoaște ce e deja executat și ofertează doar restul. Fără măsurători scrise pe cot.",
      },
      {
        nume: "Istoric și șabloane",
        descriere:
          "Fiecare ofertă trimisă rămâne. A doua oară nu mai pornești de la alb — pornești de la ce ai făcut data trecută pentru o lucrare similară.",
      },
    ],
    castig: "25–40 de ore pe lună",
    castigDetaliu:
      "Adică o săptămână de muncă recuperată. Plus ofertele care ajung primele — și de obicei prima ofertă serioasă câștigă lucrarea.",
    pret: "Mai puțin decât o singură ofertă pierdută",
    pretDetaliu:
      "Implementarea se plătește o dată, apoi un abonament lunar fix. Cât anume depinde de câți sunteți și de ce folosiți — ți-o spun cu cifra pe masă în cele 15 minute, nu prin email.",
    clip: "/clipuri/oferta-ai.mp4",
    exemple: {
      constructii:
        "O ofertă de finisaje pentru un apartament de 3 camere: din poze, în mai puțin de 5 minute, cu articole pe fiecare încăpere.",
      instalatii:
        "O ofertă de instalație sanitară completă pentru o casă P+1, cu articolele separate pe etaj și pe tip de lucrare.",
      service:
        "O ofertă de contract de mentenanță anuală, cu intervențiile programate și tarifele pe tip de deplasare.",
      transport:
        "O ofertă de transport pe rută, cu costurile pe kilometru, timp de încărcare și retur, calculate automat.",
      altceva:
        "O ofertă completă pentru o lucrare tipică din domeniul tău, generată din câteva rânduri de descriere.",
    },
  },

  teren: {
    titlu: "Vezi cine e pe șantier, în timp real, de pe telefon.",
    oglinda:
      "Suni la 9 dimineața să întrebi cine a venit. Suni la 3 să întrebi unde s-a ajuns. Iar la sfârșitul lunii faci pontajul din memorie și din ce ți-au zis alții.",
    module: [
      {
        nume: "Pontaj cu verificare GPS",
        descriere:
          "Omul apasă un buton pe telefon când ajunge. Sistemul confirmă că e efectiv la punctul de lucru, nu la 4 km de el. Fără condici, fără discuții.",
      },
      {
        nume: "Sarcini pe fiecare om",
        descriere:
          "Fiecare știe exact ce are de făcut azi și confirmă când a terminat. Tu vezi progresul fără să dai un telefon.",
      },
      {
        nume: "Tablou de bord live",
        descriere:
          "Câți au venit, pe ce proiecte, ce s-a mișcat de ieri, unde e întârziere. Într-un singur ecran, actualizat singur.",
      },
    ],
    castig: "15–25 de ore pe lună",
    castigDetaliu:
      "Plus banii pe care nu-i mai plătești pentru ore care n-au fost lucrate — de obicei recuperarea cea mai mare din tot sistemul.",
    pret: "Sub costul orelor pe care le plătești degeaba",
    pretDetaliu:
      "Implementarea o dată, apoi abonament lunar fix — primii 10 oameni sunt incluși. Suma exactă depinde de mărimea echipei; ți-o spun direct la discuție, fără ocolișuri.",
    clip: "/clipuri/pontaj-muncitor.mp4",
    exemple: {
      constructii:
        "Trei șantiere în orașe diferite, 18 oameni. Dimineața la 7:40 știi exact cine e unde, fără să suni pe nimeni.",
      instalatii:
        "Echipe împrăștiate pe 5 adrese într-o zi. Vezi în ce ordine au ajuns și cât au stat la fiecare.",
      service:
        "Tehnicienii confirmă sosirea la client direct din aplicație, iar clientul primește notificare că omul e pe drum.",
      transport:
        "Șoferii marchează plecarea și sosirea, iar orele de condus se adună singure pentru foaia de parcurs.",
      altceva:
        "Oamenii tăi confirmă prezența de pe telefon, iar tu vezi situația completă într-un singur ecran.",
    },
  },

  hartii: {
    titlu: "Documentele se fac singure. Tu doar le semnezi.",
    oglinda:
      "Facturi în Excel, bonuri de consum pe hârtie, fișe de intervenție pierdute în torpedoul mașinii. Iar la contabilitate ajungi cu un teanc pe care îl reconstitui din amintiri.",
    module: [
      {
        nume: "Facturi și e-Factura",
        descriere:
          "Factura se generează din lucrare, nu se scrie de mână. Cu numerotare corectă și trimitere în sistemul ANAF.",
      },
      {
        nume: "Bonuri de consum și materiale",
        descriere:
          "Ce a ieșit din depozit, pe ce lucrare, cine a luat. Stocul scade singur, iar când ceva se apropie de minim ești anunțat.",
      },
      {
        nume: "Fișe de intervenție digitale",
        descriere:
          "Omul completează fișa pe telefon, la client, cu semnătura acestuia. Ajunge la tine în aceeași secundă, nu peste trei zile.",
      },
    ],
    castig: "20–35 de ore pe lună",
    castigDetaliu:
      "Și, mai important, dispare categoria de probleme „nu găsesc hârtia aia” — care costă întotdeauna mai mult decât orele.",
    pret: "Cât o zi de muncă pe lună. Recuperezi douăzeci.",
    pretDetaliu:
      "Implementarea include configurarea pe firma ta — serii de facturare, articole, date fiscale, tot. Prețul se așază după ce văd cum lucrezi acum. Un sfert de oră și îl afli exact.",
    clip: "/clipuri/factura.mp4",
    exemple: {
      constructii:
        "Bonul de consum pentru cimentul luat marți se leagă automat de proiectul „Bloc Nord”, iar la final vezi consumul real față de deviz.",
      instalatii:
        "Fișa de intervenție semnată de client pe telefon devine automat baza facturii, fără să retastezi nimic.",
      service:
        "Fiecare intervenție lasă în urmă o fișă completă: ce s-a schimbat, ce piese, cât a durat, semnătura clientului.",
      transport:
        "Documentele de transport și facturile se leagă de cursă, iar dosarul lunar e gata fără nicio zi de reconstituire.",
      altceva:
        "Documentele firmei se generează din activitatea reală, nu din retastare în Excel.",
    },
  },

  clienti: {
    titlu: "Clienții au unde să se uite. Tu ai liniște.",
    oglinda:
      "Aceleași trei întrebări, de zece ori pe zi: „unde suntem?”, „când veniți?”, „cât mai durează?”. Iar tu răspunzi de pe schelă, din mașină, de la masă.",
    module: [
      {
        nume: "Evidența clienților și a discuțiilor",
        descriere:
          "Fiecare client cu istoricul lui: ce s-a discutat, ce s-a promis, ce ofertă are pe masă, când trebuie sunat înapoi. Nimic nu se mai pierde.",
      },
      {
        nume: "Stadiul lucrării, vizibil",
        descriere:
          "Progresul pe faze, actualizat de pe teren. Clientul vede unde s-a ajuns fără să te sune — iar când sună, discutați, nu raportați.",
      },
      {
        nume: "Notificări automate",
        descriere:
          "Clientul e anunțat singur când echipa pleacă spre el, când o fază s-a terminat, când e gata factura.",
      },
    ],
    castig: "12–20 de ore pe lună",
    castigDetaliu:
      "Plus efectul pe care nu-l poți măsura: firma începe să pară de două ori mai mare decât e. Asta se vede în prețurile pe care le poți cere.",
    pret: "Cât te costă un client pierdut. O dată.",
    pretDetaliu:
      "Se poate porni doar cu partea de clienți și extinde ulterior, pas cu pas — de asta nici nu există un preț unic afișat. Ți-l calculez pe al tău în 15 minute.",
    clip: "/clipuri/dashboard.mp4",
    exemple: {
      constructii:
        "Beneficiarul vede că s-a terminat structura și că se intră în închideri — fără să te sune duminică seara.",
      instalatii:
        "Clientul primește mesaj când echipa pleacă spre el, cu ora estimată de sosire.",
      service:
        "Clientul cu contract vede când e programată următoarea revizie și ce s-a făcut la ultima.",
      transport:
        "Beneficiarul e anunțat automat la încărcare și la livrare, cu documentele atașate.",
      altceva:
        "Clienții tăi sunt informați automat, iar tu răspunzi doar la ce contează cu adevărat.",
    },
  },

  online: {
    titlu: "Un site care aduce cereri, nu unul care doar există.",
    oglinda:
      "Ai o pagină de Facebook și un număr de telefon. Cine te caută pe Google găsește trei concurenți înaintea ta — și îi sună pe ei.",
    module: [
      {
        nume: "Site construit pentru cereri",
        descriere:
          "Nu o broșură digitală. O pagină gândită să transforme vizitatorul în cerere de ofertă: lucrările tale, dovezile, un formular care chiar se completează.",
      },
      {
        nume: "Găsit în Google, local",
        descriere:
          "Structură tehnică curată, viteză și paginile pe care le caută oamenii din zona ta — „firmă instalații Craiova”, nu cuvinte generale.",
      },
      {
        nume: "Cererile ajung unde trebuie",
        descriere:
          "Fiecare formular completat îți vine pe email și pe WhatsApp instant și rămâne salvat. Nicio cerere pierdută pentru că n-ai văzut mesajul la timp.",
      },
    ],
    castig: "3–8 cereri noi pe lună",
    castigDetaliu:
      "La o singură lucrare câștigată în plus, site-ul se plătește de obicei din prima lună.",
    pret: "Cât o singură lucrare din cele care nu au ajuns la tine",
    pretDetaliu:
      "Se plătește o singură dată, fără abonament obligatoriu. Cât — depinde de câte pagini și ce trebuie să facă site-ul. Îți dau cifra la discuție, după ce înțeleg ce vrei.",
    exemple: {
      constructii:
        "Galerie cu lucrările tale reale, pe categorii, plus un formular de cerere de ofertă cu poze atașate.",
      instalatii:
        "Pagini separate pe serviciile căutate în zona ta, ca să apari exact pentru ce oamenii scriu în Google.",
      service:
        "Pagină de programare a intervenției, cu tipul problemei și intervalul orar dorit.",
      transport:
        "Formular de cerere de transport cu rută, tonaj și dată — calificat înainte să răspunzi.",
      altceva:
        "Un site care spune clar ce faci, pentru cine și cu ce dovezi — și care cere acțiunea.",
    },
  },
};

/** Fraza de deasupra răspunsului: „Pentru o firmă de instalații care…” —
    folosim `descriere` (persoana a III-a), nu `eticheta` (persoana I),
    altfel ieșea „o firmă unde «nu știu cine ce face»" — dezacord. */
export function compuneIntro(domeniu: Domeniu, durere: Durere): string {
  return `Pentru o ${domeniu.substantiv} ${durere.descriere}`;
}
