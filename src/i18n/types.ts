export type Language = 'fr' | 'en';

export interface Translations {
  // Nav
  nav: {
    home: string;
    about: string;
    ecosystem: string;
    formations: string;
    blog: string;
    guide: string;
    media: string;
    book: string;
    contact: string;
    discoverFormations: string;
  };
  // Hero
  hero: {
    badge: string;
    titleLine1: string;
    titleLine2: string;
    titleLine3: string;
    description: string;
    ctaFormations: string;
    ctaParcours: string;
    subscribers: string;
    trained: string;
    trainings: string;
  };
  // Stats
  stats: {
    subscribers: string;
    studentsTrained: string;
    trainingsCreated: string;
    countries: string;
    yearsExp: string;
    views: string;
  };
  // Formations
  formationsSection: {
    badge: string;
    title: string;
    titleHighlight: string;
    description: string;
    allFormations: string;
    discover: string;
    students: string;
    buyNow: string;
    accessFormation: string;
    needHelp: string;
    needHelpDesc: string;
    bookCall: string;
    whatYouLearn: string;
    detailedProgram: string;
    modules: string;
    lessons: string;
    studentTestimonials: string;
    faq: string;
    otherFormations: string;
    save: string;
    securePayment: string;
    instantAccess: string;
    guarantee: string;
    bestSeller: string;
    popular: string;
    premium: string;
  };
  // Formation names & details
  formationDetails: {
    protocoleVideoIa: {
      name: string;
      tagline: string;
      description: string;
      longDescription: string;
    };
    cerveauAugmente: {
      name: string;
      tagline: string;
      description: string;
      longDescription: string;
    };
    offshoreEmpire: {
      name: string;
      tagline: string;
      description: string;
      longDescription: string;
    };
  };
  // About
  about: {
    badge: string;
    title: string;
    titleHighlight: string;
    description: string;
    location: string;
    specialty: string;
    brands: string;
    community: string;
    contactMe: string;
    bio1: string;
    bio2: string;
    bio3: string;
    bio4: string;
    bio5: string;
    myJourney: string;
    myValues: string;
    timeline: {
      title: string;
      desc: string;
      year: string;
    }[];
    values: {
      title: string;
      desc: string;
    }[];
  };
  // Ecosystem
  ecosystemSection: {
    badge: string;
    title: string;
    titleHighlight: string;
    description: string;
    visit: string;
    whatDifferentiates: string;
    differentiators: {
      title: string;
      desc: string;
    }[];
    wendooka: {
      tagline: string;
      description: string;
      services: string[];
      serviceDescs: string[];
      highlights: string[];
    };
    sandaVibeCode: {
      tagline: string;
      description: string;
      services: string[];
      serviceDescs: string[];
      highlights: string[];
    };
  };
  // Blog
  blogSection: {
    badge: string;
    title: string;
    titleHighlight: string;
    description: string;
    allArticles: string;
    latestArticles: string;
    read: string;
    newsletter: string;
    newsletterDesc: string;
    subscribe: string;
    subscribersCount: string;
    noSpam: string;
    freeResources: string;
    goToAction: string;
    goToActionDesc: string;
    seeFormations: string;
    categories: string[];
    pillarContent: string;
    tutorial: string;
    guide: string;
    essay: string;
  };
  // Media
  mediaSection: {
    badge: string;
    title: string;
    titleHighlight: string;
    description: string;
    subscribeYoutube: string;
    findMe: string;
    followersLabel: string;
  };
  // Book
  bookSection: {
    badge: string;
    title: string;
    titleHighlight: string;
    description: string;
    synopsis: string;
    quote: string;
    quoteAuthor: string;
    preorder: string;
    comingSoon: string;
    beFirstNotified: string;
    beFirstNotifiedDesc: string;
    preRegister: string;
    chapterPreview: string;
    byAuthor: string;
  };
  // Contact
  contactSection: {
    badge: string;
    title: string;
    titleHighlight: string;
    description: string;
    sendMessage: string;
    question: string;
    partnership: string;
    conference: string;
    press: string;
    fullName: string;
    email: string;
    subject: string;
    message: string;
    send: string;
    messageSent: string;
    messageSentDesc: string;
    newMessage: string;
    mediaKit: string;
    mediaKitDesc: string;
    downloadKit: string;
    collaborations: string;
    collaborationTypes: string[];
    location: string;
    response: string;
    responseTime: string;
  };
  // Testimonials
  testimonials: {
    title: string;
    titleHighlight: string;
  };
  // CTA
  cta: {
    title: string;
    titleHighlight: string;
    description: string;
    startNow: string;
    discussProject: string;
  };
  // Footer
  footer: {
    description: string;
    ecosystem: string;
    formations: string;
    usefulLinks: string;
    freeResources: string;
    rights: string;
    madeWith: string;
  };
  // Chat
  chat: {
    title: string;
    online: string;
    greeting: string;
    greeting2: string;
    placeholder: string;
    quickReplies: string[];
    defaultReply: string;
    formationReply: string;
    wendookaReply: string;
    contactReply: string;
  };
  // 404
  notFound: {
    title: string;
    description: string;
    goHome: string;
    goBack: string;
  };
  // Common
  common: {
    home: string;
    learnMore: string;
    readMore: string;
    previous: string;
    next: string;
    share: string;
    byAuthor: string;
    emailPlaceholder: string;
  };
}
