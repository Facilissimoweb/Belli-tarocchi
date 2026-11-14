import type { ArcanaCard, BlogArticle, ConsultationService, ShopProduct } from '../types';
import { siteContent } from './siteContent';

export const LOGO_URL =
  'https://lh3.googleusercontent.com/aida/ALJJyrCRw_K7e9fZZvpuP2OT5XhDp2Cvxj_GXGke131Rz-UGQDAMf6_TPmf5piNBVpllFLFUzG2KXxwlo0aJILIRXwI1C4oSaVAMHfTZQpOd5DMVuT9qEMfcIaX4lAi83-jImLf0EGKAedzYk7wtx1cIMbYYQm6OvTwA1eTMY2OR3AlfpKtj7P7TkEKpk_zNlaYrKtVaozud0AuPiadfKlkJiOZk27Bs4ZWz5N-Biil-UjP5';

export const HERO_IMAGE_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuB_DLsgTY81R4wvQ6XvWM5TOteBJVabI127Ngk5GVSjwJHvHh7tfN9FvxtY73ilcZXJdEf1DtFr63uUsijQ3QW5pE8_ue3H4i1Cas3pmHpM_ArceCgoIsQuQWjerumxihDCiBL0VfayQApWr7Apkj-hlbdObMTXmfFrhDnyGuKnGg8T3gNehXxaBM8nueAi_TPLXx4s61I6K00DltXvWJIDa4yT17BZknyebzRK5TQ';

export const CARD_1_IMAGE_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuC7W2U_C0hEdcQvgJy2dM1Cw9p01HinodKTXGgMd0GHKKrHLeKp8eTuqlcExltXJ3tnK8h-svSnzwyMv8H0w0T-jTZDkXfiU8k1aK3fJ2_kLdSkmDtFADElG3diyw0Lli9Ksr904yugkn8yzKkuI3crpgTXjXmBGLOdPpJT3DYdi_WXj16lU8mtIb2MfJ-v38TyyLLpeKUoWxP89k8vfPgKkGePdNIOL36JcTb_jwY';

export const CARD_2_IMAGE_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuByH_pxO95Ft6gJn1LS60Kn8R3fuXbTnv0XuuVKk0ApI9YjtHetwr2Njjr2q7hXMl7tt4L3pBhZZGInI6iwuuxexjxm7L67wFXGp6WBixlmbu1uOyFMa-OolzTd5LXFfCOJG_nhZMPubZiF4Bo7P23WB5P5-vRKXJvOh_tscrWvtnufHo3pwEjj5RBi7IPQo8QN_XgVhYAhmHTaly3UizALNWwFRXYlRqX7jyQGT2A';

export const REFLECTION_HINTS: Record<string, string> = {
  'Chiarezza nelle Relazioni':
    "L'Amante ti invita a guardare ciò che rifiuti di te nell'altro. Quale confine gentile devi tracciare oggi?",
  'Blocchi nel Lavoro':
    "L'Imperatore e la Ruota indicano che la disciplina interiore precede ogni successo esterno. Su quale abitudine poggiano i tuoi obiettivi?",
  'Pace Emotiva':
    "La Stella ricorda che dopo ogni notte scura sgorga una fonte d'acqua viva. Permetti al respiro di ammorbidire le tensioni.",
};

export const CONSULTATIONS: ConsultationService[] = [
  {
    id: 'consulto-evolutivo',
    title: 'Consulto Evolutivo degli Arcani',
    subtitle: 'Quota Rituale',
    duration: '60 Minuti',
    modality: 'Online o Studio',
    price: 80,
    badge: 'Disponibile Oggi',
    badgeVariant: 'primary',
    image: CARD_1_IMAGE_URL,
    imageAlt:
      'Intimate top-down flat-lay of three ornate Tarot cards displayed on a deep bronze silk cloth.',
    description:
      "Un'indagine approfondita sul momento presente per sciogliere dubbi decisionali, comprendere dinamiche relazionali e fare luce sulla direzione dell'anima.",
    highlights: [
      'Lettura completa con Arcani Maggiori e Minori',
      'Analisi dei blocchi emotivi e delle risorse latenti',
      'Sintesi scritta degli spunti evolutivi emersi',
    ],
    kind: 'consulto',
  },
  {
    id: 'consulto-relazionale',
    title: 'Specchio Relazionale & Affettivo',
    subtitle: 'Quota Rituale',
    duration: '60 Minuti',
    modality: 'Online o Studio',
    price: 85,
    badge: 'Molto Richiesto',
    badgeVariant: 'primary',
    image: HERO_IMAGE_URL,
    imageAlt: 'Mazzo di tarocchi illuminato a lume di candela su lino scuro.',
    description:
      "Un dialogo simbolico dedicato ai legami significativi: per riconoscere gli schemi inconsci nella coppia, in famiglia o nelle collaborazioni e coltivare confini sani.",
    highlights: [
      'Stesa a specchio sui bisogni reciproci',
      'Individuazione delle proiezioni archetipiche',
      'Domande guida per il dialogo autentico',
    ],
    kind: 'consulto',
  },
  {
    id: 'consulto-ciclo-solare',
    title: 'Lettura del Ciclo Solare (12 Case)',
    subtitle: 'Quota Rituale',
    duration: '75 Minuti',
    modality: 'Online o Studio',
    price: 110,
    badge: 'Sessione Estesa',
    badgeVariant: 'tertiary',
    image: CARD_2_IMAGE_URL,
    imageAlt: 'Grimorio dorato e bacchetta di selenite su altare in pietra.',
    description:
      "Ideale per il compleanno o i grandi passaggi di stagione: una mappatura dei dodici ambiti di vita per orientare energia, intenzioni e progetti nei prossimi mesi.",
    highlights: [
      'Mappa delle 12 Case attraverso gli Arcani',
      'Arcano Guida dell’Anno e sua integrazione pratica',
      'Registrazione audio privata su richiesta',
    ],
    kind: 'consulto',
  },
  {
    id: 'consulto-orientamento',
    title: 'Consulto Breve di Centratura',
    subtitle: 'Quota Rituale',
    duration: '30 Minuti',
    modality: 'Solo Online',
    price: 45,
    image: CARD_1_IMAGE_URL,
    imageAlt: 'Tre carte dei tarocchi su tessuto bronzo con pendolo di cristallo.',
    description:
      'Una sessione mirata su un singolo quesito urgente per ritrovare lucidità, quiete mentale e un passo concreto immediato.',
    highlights: [
      'Focus su una sola domanda o scelta imminente',
      'Stesa a 3 o 5 carte ad alta chiarezza',
      'Ideale per chi ha già svolto un percorso',
    ],
    kind: 'consulto',
  },
];

export const PATHWAYS: ConsultationService[] = [
  {
    id: 'viaggio-matto',
    title: 'Il Viaggio del Matto: Percorso di Rinascita',
    subtitle: 'Ciclo Completo',
    duration: '4 Sessioni',
    modality: 'Tutoraggio Diretto',
    price: 290,
    badge: 'Posti Limitati',
    badgeVariant: 'tertiary',
    image: CARD_2_IMAGE_URL,
    imageAlt:
      'An ethereal still life composition featuring a closed golden leatherbound grimoire, a selenite wand, and sacred geometry brass plates.',
    description:
      'Un percorso a moduli personalizzato per attraversare fasi di transizione, ritrovare autostima e allineare le scelte quotidiane ai tuoi valori più profondi.',
    highlights: [
      '4 incontri individuali da 60 minuti nell’arco di 6 settimane',
      'Esercizi di scrittura riflessiva tra una sessione e l’altra',
      'Supporto scritto settimanale via canale riservato',
    ],
    modules: [
      'Modulo I — La Soglia del Matto: lasciare il superfluo e nominare la chiamata',
      'Modulo II — La Voce della Papessa: ascolto intuitivo e riconoscimento delle ombre',
      'Modulo III — La Forza Gentile: trasformare la vulnerabilità in radicamento',
      'Modulo IV — Il Mondo: sintesi simbolica e piano d’azione quotidiano',
    ],
    kind: 'percorso',
  },
  {
    id: 'archetipi-trasformazione',
    title: 'I 22 Archetipi: Cammino Transpersonale',
    subtitle: 'Ciclo Avanzato',
    duration: '6 Sessioni',
    modality: 'Online o Studio',
    price: 420,
    badge: 'Tutoraggio Intensivo',
    badgeVariant: 'primary',
    image: HERO_IMAGE_URL,
    imageAlt: 'Tavolo olistico con tarocchi antichi, quarzi e campana tibetana.',
    description:
      'Un laboratorio intimo di esplorazione degli Arcani Maggiori applicati alla propria storia personale, ai talenti inespressi e alla vocazione.',
    highlights: [
      '6 sessioni individuali personalizzate',
      'Mappa natale tarologica e studio dell’Arcano di Nascita',
      'Dispense rituali ed esercizi di centratura olistica',
    ],
    modules: [
      'Sessioni 1-2 — Radici, famiglia d’origine e condizionamenti inconsci',
      'Sessioni 3-4 — Il cuore, i confini e la creatività autentica',
      'Sessioni 5-6 — Visione, vocazione e integrazione nel presente',
    ],
    kind: 'percorso',
  },
  {
    id: 'armonia-confini',
    title: 'Armonia & Confini Evolutivi',
    subtitle: 'Ciclo Mirato',
    duration: '3 Sessioni',
    modality: 'Online',
    price: 215,
    image: CARD_1_IMAGE_URL,
    imageAlt: 'Carte dei tarocchi su seta bronzo con specchio di ossidiana.',
    description:
      'Dedicato a chi attraversa stanchezza emotiva o sovraccarico relazionale e desidera ricostruire spazi interiori chiari e protetti.',
    highlights: [
      '3 sessioni settimanali da 55 minuti',
      'Pratiche di radicamento energetico e respiro consapevole',
      'Diario guidato dei confini gentili',
    ],
    modules: [
      'Incontro 1 — Dove disperdo energia vitale?',
      'Incontro 2 — L’Imperatore e la Temperanza: struttura e misura',
      'Incontro 3 — Nuovo patto con sé stessi',
    ],
    kind: 'percorso',
  },
];

export const MAJOR_ARCANA: ArcanaCard[] = [
  {
    number: '0',
    name: 'Il Matto',
    archetype: 'L’Inizio Puro & La Fiducia',
    keywords: ['Libertà', 'Salto nel nuovo', 'Innocenza lucida'],
    meaning:
      'Il Matto ti ricorda che ogni vera trasformazione nasce quando smetti di pretendere tutte le risposte prima di muovere il primo passo.',
    reflectionQuestion:
      'Quale peso o aspettativa altrui sei pronto a posare oggi per camminare più leggero?',
    symbolIcon: 'air',
  },
  {
    number: 'I',
    name: 'Il Bagatto (Il Mago)',
    archetype: 'La Volontà Creatrice',
    keywords: ['Risorse', 'Iniziativa', 'Presenza'],
    meaning:
      'Sul tuo tavolo ci sono già tutti gli strumenti necessari: acqua, fuoco, terra e aria. È il tempo di trasformare l’intenzione in gesto concreto.',
    reflectionQuestion:
      'Quale talento stai rimandando di mettere in pratica per timore di non essere pronto?',
    symbolIcon: 'auto_fix_high',
  },
  {
    number: 'II',
    name: 'La Papessa',
    archetype: 'La Saggezza Silenziosa',
    keywords: ['Intuizione', 'Attesa fertile', 'Verità interiore'],
    meaning:
      'Non tutto va risolto con l’urgenza della mente razionale. La Papessa custodisce ciò che sta maturando nel silenzio sotto la superficie.',
    reflectionQuestion:
      'Cosa ti sta sussurrando la tua intuizione nei momenti in cui spegni il rumore esterno?',
    symbolIcon: 'nights_stay',
  },
  {
    number: 'III',
    name: 'L’Imperatrice',
    archetype: 'Abbondanza & Creatività',
    keywords: ['Fioritura', 'Nutrimento', 'Bellezza'],
    meaning:
      'L’energia vitale chiede espressione, piacere e cura del corpo. Coltiva ciò che ami con la stessa tenerezza che riservi agli altri.',
    reflectionQuestion:
      'Cosa nutre davvero il tuo spirito in questa fase della vita?',
    symbolIcon: 'spa',
  },
  {
    number: 'IV',
    name: 'L’Imperatore',
    archetype: 'Ordine & Radicamento',
    keywords: ['Struttura', 'Confini', 'Stabilità'],
    meaning:
      'La libertà fiorisce dentro argini sicuri. L’Imperatore invita a dare forma concreta, ritmo e responsabilità ai tuoi progetti.',
    reflectionQuestion:
      'Su quale abitudine quotidiana puoi poggiare la tua serenità da oggi?',
    symbolIcon: 'shield',
  },
  {
    number: 'VI',
    name: 'Gli Amanti (L’Innamorato)',
    archetype: 'Scelta del Cuore & Specchio',
    keywords: ['Allineamento', 'Relazione', 'Scelta autentica'],
    meaning:
      'Ogni incontro riflette una parte di noi. L’Arcano VI chiede di scegliere per amore e verità interiore, non per paura della solitudine.',
    reflectionQuestion:
      'In quale scelta stai cercando approvazione esterna invece di ascoltare la tua verità?',
    symbolIcon: 'favorite',
  },
  {
    number: 'IX',
    name: 'L’Eremita',
    archetype: 'La Lanterna Interiore',
    keywords: ['Raccolta', 'Discernimento', 'Luce propria'],
    meaning:
      'Ritirarsi per un momento non è fuggire: è ritrovare la propria bussola al riparo dalle interferenze. La lanterna illumina solo il passo successivo.',
    reflectionQuestion:
      'Di quale spazio di solitudine rigenerante hai bisogno questa settimana?',
    symbolIcon: 'wb_twilight',
  },
  {
    number: 'X',
    name: 'La Ruota della Fortuna',
    archetype: 'Il Ritmo dei Cicli',
    keywords: ['Mutamento', 'Sincronicità', 'Flessibilità'],
    meaning:
      'Nulla resta immobile. Quando accetti la ciclicità della vita senza aggrapparti al passato, ritrovi il centro immobile della ruota.',
    reflectionQuestion:
      'Quale cambiamento in corso stai cercando di controllare invece di accompagnare?',
    symbolIcon: 'cyclone',
  },
  {
    number: 'XI',
    name: 'La Forza',
    archetype: 'Coraggio Gentile',
    keywords: ['Padronanza', 'Dolcezza', 'Resilienza'],
    meaning:
      'La vera forza non forza mai: abbraccia le proprie ombre e gli istinti con calma presenza, trasformandoli in energia vitale.',
    reflectionQuestion:
      'Come puoi trattare oggi una tua fragilità con più compassione e fermezza?',
    symbolIcon: 'flare',
  },
  {
    number: 'XIV',
    name: 'La Temperanza',
    archetype: 'Alchimia & Equilibrio',
    keywords: ['Armonia', 'Guarigione', 'Misura'],
    meaning:
      'Due flussi opposti trovano sintesi. È il tempo dell’integrazione paziente, dove le ferite recenti diventano esperienza quieta.',
    reflectionQuestion:
      'Quali aspetti opposti della tua vita chiedono di essere riconciliati oggi?',
    symbolIcon: 'balance',
  },
  {
    number: 'XVII',
    name: 'La Stella',
    archetype: 'Speranza & Guarigione',
    keywords: ['Rinnovo', 'Chiarezza', 'Fede nella vita'],
    meaning:
      'Dopo ogni notte attraversata con onestà, l’acqua viva torna a scorrere. La Stella porta fiducia serena e autentica trasparenza.',
    reflectionQuestion:
      'Quale piccola sorgente di bellezza e speranza puoi riconoscere già presente intorno a te?',
    symbolIcon: 'auto_awesome',
  },
  {
    number: 'XXI',
    name: 'Il Mondo',
    archetype: 'Compimento & Interezza',
    keywords: ['Sintesi', 'Celebrazione', 'Apertura'],
    meaning:
      'Un ciclo giunge a maturazione. Riconosci la strada percorsa prima di aprire la porta a una nuova spirale evolutiva.',
    reflectionQuestion:
      'Cosa merita di essere ringraziato e celebrato nel tuo percorso fin qui?',
    symbolIcon: 'public',
  },
];

export const SHOP_PRODUCTS: ShopProduct[] = [
  {
    id: 'mazzo-luce-interiore',
    title: 'I Tarocchi della Luce Interiore — Edizione Oro',
    category: 'Mazzi & Diari',
    price: 38,
    image: HERO_IMAGE_URL,
    description:
      'Mazzo da 78 carte con dettagli in lamina oro anticato e libretto guida all’approccio evolutivo scritto da Maria Teresa Rogani.',
    details: 'Cartoncino 350gsm finitura lino opaco • Cofanetto rigido in tela nera e oro.',
    inStock: true,
  },
  {
    id: 'diario-evolutivo',
    title: 'Diario Evolutivo degli Arcani',
    category: 'Mazzi & Diari',
    price: 24,
    image: CARD_2_IMAGE_URL,
    description:
      'Taccuino rilegato a mano con 120 pagine strutturate per annotare stese quotidiane, sogni, intenzioni lunari e riflessioni.',
    details: 'Carta avorio 120gsm • Copertina rigida goffrata con segnalibro in raso.',
    inStock: true,
  },
  {
    id: 'kit-rituale-quarzo',
    title: 'Kit Rituale: Quarzo Ialino, Selenite & Lavanda',
    category: 'Cristalli & Rituali',
    price: 32,
    image: CARD_1_IMAGE_URL,
    description:
      'Set di purificazione e preparazione dello spazio sacro prima della lettura o della meditazione personale.',
    details: 'Include punta di quarzo naturale, bacchetta di selenite e fascetto di lavanda.',
    inStock: true,
  },
  {
    id: 'buono-regalo-consulto',
    title: 'Buono Regalo — Consulto Evolutivo (60 min)',
    category: 'Buoni Regalo',
    price: 80,
    image: CARD_1_IMAGE_URL,
    description:
      'Dona un momento di ascolto profondo e chiarezza simbolica a una persona cara. Consegna digitale personalizzata entro 24h.',
    details: 'Validità 6 mesi • Utilizzabile per sessione Online o in Studio.',
    inStock: true,
  },
];

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 'oltre-la-predizione',
    title: 'Oltre la Predizione: I Tarocchi come Specchio dell’Anima',
    category: 'Metodo Olistico',
    readTime: '5 min',
    date: '10 Novembre 2026',
    excerpt:
      'Perché la tarologia evolutiva non imprigiona il futuro in sentenze fisse, ma restituisce potere di scelta e lucidità nel presente.',
    image: HERO_IMAGE_URL,
    content: [
      'Quando ci avviciniamo ai Tarocchi con il desiderio di sapere "cosa accadrà", rischiamo di consegnare la nostra responsabilità a un destino immobile. L’approccio evolutivo nasce invece da una premessa opposta: il futuro non è scolpito nella pietra, ma si plasma attraverso la consapevolezza con cui abitiamo il presente.',
      'In seduta, ogni Arcano diventa un linguaggio simbolico universale — vicino alla psicologia analitica di Carl Gustav Jung — capace di dare voce a emozioni che spesso la mente razionale tende a censurare o razionalizzare.',
      'Osservare una carta non significa subire un verdetto, bensì riconoscere una dinamica interiore già in atto: un confine che esitiamo a tracciare, una risorsa che attende fiducia, o un ciclo pronto a chiudersi con gratitudine.',
    ],
    meditationPrompt:
      'Se oggi non cercassi certezze fuori da te, quale verità silenziosa riconosceresti già dentro il tuo cuore?',
  },
  {
    id: 'archetipo-stella',
    title: 'Arcano XVII — La Stella: Ritrovare l’Acqua Viva dopo la Tempesta',
    category: 'Arcani Maggiori',
    readTime: '4 min',
    date: '28 Ottobre 2026',
    excerpt:
      'Dopo l’intensità della Torre, La Stella apre uno spazio di nuda autenticità, fiducia silenziosa e guarigione emotiva.',
    image: CARD_1_IMAGE_URL,
    content: [
      'Nel cammino dei 22 Arcani Maggiori, La Stella giunge subito dopo La Torre: quando le vecchie strutture cadono, resta l’essenziale. La figura si inginocchia nuda vicino alla riva, senza più maschere né armature.',
      'Le due anfore versano acqua sia nella terra sia nel ruscello: un gesto di scambio continuo tra mondo interiore e realtà quotidiana. Non c’è trattenimento né paura della scarsità.',
      'Quando La Stella emerge in un consulto, invita a rallentare e a fidarsi dei piccoli segni di rinascita, ricordandoci che la guarigione avviene sempre nella verità e nella semplicità.',
    ],
    meditationPrompt:
      'Dove puoi deporre oggi un’armatura che non ti serve più e concederti un gesto di semplice cura?',
  },
  {
    id: 'viaggio-del-matto',
    title: 'Il Viaggio del Matto: Abitare il Passaggio tra Ciò che Era e Ciò che Sarà',
    category: 'Percorsi Interiori',
    readTime: '6 min',
    date: '14 Ottobre 2026',
    excerpt:
      'Le fasi di transizione lavorativa o affettiva spaventano la mente, ma sono la terra fertile in cui nasce la nostra direzione autentica.',
    image: CARD_2_IMAGE_URL,
    content: [
      'L’Arcano Zero porta un numero che è insieme nulla e infinito potenziale. Il Matto non è incosciente: è colui che riconosce quando un abito vecchio è diventato troppo stretto per l’anima.',
      'Attraversare il "non ancora" richiede coraggio gentile: accettare di non avere subito tutte le etichette pronte, ma restare vigili ai segnali del corpo e delle sincronicità.',
      'Nel percorso individuale dedicato al Viaggio del Matto, lavoriamo proprio su questo spazio intermedio, trasformando l’incertezza in presenza creativa.',
    ],
    meditationPrompt:
      'Quale capitolo della tua vita chiede di essere salutato con rispetto per far spazio al prossimo inizio?',
  },
];

const waDigits = siteContent.brand.whatsapp.replace(/\D/g, '');

/** Contatti ufficiali — allineati a siteContent (niente dati demo). */
export const CONTACT_INFO = {
  whatsappNumber: siteContent.brand.whatsapp,
  whatsappLink: `https://wa.me/${waDigits}`,
  telegramHandle: siteContent.brand.whatsapp,
  telegramLink: `https://t.me/+${waDigits}`,
  phoneDisplay: siteContent.brand.whatsapp,
  phoneHref: `tel:+${waDigits}`,
  email: siteContent.brand.email,
  emailHref: `mailto:${siteContent.brand.email}`,
  studioAddress: siteContent.pages.contatti.sede,
  hours: siteContent.pages.contatti.appuntamento,
};
