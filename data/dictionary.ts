export type Locale = "EN" | "UR";

export type Dictionary = {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    brand: string;
    tagline: string;
    menuLabel: string;
    home: string;
    services: string;
    showcase: string;
    about: string;
    contact: string;
    bookNow: string;
    toggleMenu: string;
  };
  hero: {
    eyebrow: string;
    titleBefore: string;
    titleEm: string;
    titleAfter: string;
    sub: string;
    services: string[];
    location: string;
    explore: string;
    book: string;
    frameLabel: string;
    scroll: string;
  };
  services: {
    heading: string;
    sub: string;
    view: string;
    items: Array<{
      num: string;
      title: string;
      desc: string;
    }>;
  };
  showcase: {
    label: string;
    eyebrow: string;
    items: Array<{
      num: string;
      label: string;
      videoKey:
        | "windowTint"
        | "polishingDetailing"
        | "smokeLights"
        | "emblemDecals"
        | "bodyDecals"
        | "plasticsRestore";
    }>;
  };
  testimonial: {
    label: string;
    prev: string;
    next: string;
    goTo: string;
    items: Array<{ quote: string; cite: string }>;
  };
  about: {
    titleLine1: string;
    titleLine2Before: string;
    titleLine2Em: string;
    titleLine2After: string;
    p1: string;
    p2: string;
    words: Array<{ num: string; title: string }>;
  };
  contact: {
    label: string;
    headingLine1: string;
    headingLine2: string;
    locationLabel: string;
    locationValue: string;
    phoneLabel: string;
    phoneValue: string;
    phoneHref: string;
    emailLabel: string;
    emailValue: string;
    emailHref: string;
    hoursLabel: string;
    hoursLines: string[];
    mapTitle: string;
    mapDirections: string;
  };
  booking: {
    line1: string;
    line2: string;
    brand: string;
    sub: string;
    book: string;
    call: string;
  };
  footer: {
    brand: string;
    tagline: string;
    blurb: string;
    navigate: string;
    contact: string;
    location: string;
    phone: string;
    phoneHref: string;
    copyright: string;
    servicesLine: string;
  };
};

const en: Dictionary = {
  meta: {
    title: "Golden Ride — Automotive Protection & Enhancement, Dubai",
    description:
      "Golden Ride is a premium automotive protection and enhancement studio in Umm Ramool, Dubai — PPF, ceramic coating, polishing, detailing, tinting and decals.",
  },
  nav: {
    brand: "GOLDEN RIDE",
    tagline: "PPF · TINT · POLISHING",
    menuLabel: "MENU",
    home: "Home",
    services: "Services",
    showcase: "Work",
    about: "About",
    contact: "Contact",
    bookNow: "Book Now",
    toggleMenu: "Toggle menu",
  },
  hero: {
    eyebrow: "GOLDEN RIDE STUDIO",
    titleBefore: "The art of",
    titleEm: "automotive",
    titleAfter: "perfection.",
    sub: "Premium automotive protection and enhancement, crafted for exceptional vehicles in Dubai.",
    services: ["PPF", "CERAMIC", "POLISHING", "DETAILING", "TINT", "DECALS"],
    location: "UMM RAMOOL · DUBAI, UAE",
    explore: "Explore Services",
    book: "Book Your Vehicle",
    frameLabel: "GOLDEN RIDE / 01",
    scroll: "SCROLL",
  },
  services: {
    heading: "Six disciplines. One standard of finish.",
    sub: "Every treatment is carried out as its own craft — considered, deliberate, and specific to your vehicle.",
    view: "View →",
    items: [
      {
        num: "01",
        title: "Paint Protection Film",
        desc: "A transparent, self-healing film that shields your paintwork from stone chips, road debris and abrasion — invisible protection, permanent peace of mind.",
      },
      {
        num: "02",
        title: "Ceramic Coating",
        desc: "A durable ceramic layer bonded to the surface for lasting gloss, hydrophobic beading and resistance to UV, chemicals and light scratching.",
      },
      {
        num: "03",
        title: "Polishing",
        desc: "Machine correction that removes swirl marks and oxidation, restoring depth and clarity to the paint before any protective layer is applied.",
      },
      {
        num: "04",
        title: "Detailing",
        desc: "A meticulous interior and exterior refinement — every surface, seam and panel attended to with the same level of care.",
      },
      {
        num: "05",
        title: "Tinting",
        desc: "Precision window film for heat rejection, UV protection and privacy, fitted cleanly to every contour of the glass.",
      },
      {
        num: "06",
        title: "Decal Stickers",
        desc: "Custom decal work for personalisation, branding or subtle accenting — applied with clean, factory-level precision.",
      },
    ],
  },
  showcase: {
    label: "WORK",
    eyebrow: "GOLDEN RIDE / WORK",
    items: [
      {
        num: "01",
        label: "Window tint and protection",
        videoKey: "windowTint",
      },
      {
        num: "02",
        label: "Polishing and detailing",
        videoKey: "polishingDetailing",
      },
      {
        num: "03",
        label: "Smoked lights finish",
        videoKey: "smokeLights",
      },
      {
        num: "04",
        label: "Emblem and sticker work",
        videoKey: "emblemDecals",
      },
      {
        num: "05",
        label: "Custom body decals",
        videoKey: "bodyDecals",
      },
      {
        num: "06",
        label: "Plastics restoration",
        videoKey: "plasticsRestore",
      },
    ],
  },
  testimonial: {
    label: "CLIENT TESTIMONIALS",
    prev: "Previous testimonial",
    next: "Next testimonial",
    goTo: "Go to testimonial",
    items: [
      {
        quote:
          '"Excellent service and amazing results! The polishing removed the imperfections, and the ceramic coating gave my car a beautiful, mirror-like shine. Professional team, great attention to detail, and worth every penny. Highly recommended!"',
        cite: "— Ahmed Bazaza",
      },
      {
        quote:
          '"I did a transparent PPF of Leopard 8, and it was great and satisfying as they are using the long-lasting material that self-heals and maintains the shine and gloss. Thanks to professional management of Mr. Ahmed as well."',
        cite: "— Sakhi Behroz",
      },
      {
        quote:
          '"I took my Nismo Nissan Patrol for tinting. They have amazingly good material and fair prices. Thanks to them!"',
        cite: "— Kumar",
      },
    ],
  },
  about: {
    titleLine1: "Built for vehicles",
    titleLine2Before: "that deserve ",
    titleLine2Em: "more",
    titleLine2After: ".",
    p1: "Golden Ride is an automotive protection and enhancement studio based in Umm Ramool, Dubai. We work across paint protection, surface enhancement, finish refinement, detailing, tinting and vehicle personalisation.",
    p2: "Every vehicle that comes through the studio is treated as its own project — assessed, prepared and finished with the same attention, whatever the make or model.",
    words: [
      { num: "01", title: "Precision" },
      { num: "02", title: "Craft" },
      { num: "03", title: "Protection" },
    ],
  },
  contact: {
    label: "CONTACT",
    headingLine1: "Visit",
    headingLine2: "Golden Ride.",
    locationLabel: "LOCATION",
    locationValue: "Marrakech St, Umm Ramool, Dubai, UAE",
    phoneLabel: "PHONE",
    phoneValue: "+971 55 141 1012",
    phoneHref: "tel:+971551411012",
    emailLabel: "EMAIL",
    emailValue: "info@goldenride.com",
    emailHref: "mailto:info@goldenride.com",
    hoursLabel: "HOURS",
    hoursLines: [
      "Mon–Thu  10:00am – 5:00pm",
      "Sat–Sun  11:30am – 4:30pm",
      "Friday  Closed",
    ],
    mapTitle: "Golden Ride location — Marrakech St, Umm Ramool, Dubai",
    mapDirections: "Get directions",
  },
  booking: {
    line1: "Your vehicle.",
    line2: "Your standard.",
    brand: "Golden Ride",
    sub: "Premium protection and enhancement, crafted in Dubai.",
    book: "Book Your Vehicle",
    call: "Call +971 55 141 1012",
  },
  footer: {
    brand: "Golden Ride",
    tagline: "PPF · TINT · POLISHING",
    blurb:
      "Automotive protection and enhancement, crafted for exceptional vehicles.",
    navigate: "NAVIGATE",
    contact: "CONTACT",
    location: "Marrakech St, Umm Ramool, Dubai, UAE",
    phone: "+971 55 141 1012",
    phoneHref: "tel:+971551411012",
    copyright: "Golden Ride. All rights reserved.",
    servicesLine: "PPF · CERAMIC · POLISHING · DETAILING · TINT · DECALS",
  },
};

const ur: Dictionary = {
  meta: {
    title: "گولڈن رائڈ — آٹوموٹو پروٹیکشن اینڈ اینہانسمنٹ، دبئی",
    description:
      "گولڈن رائڈ ام رمول، دبئی میں ایک پریمیم آٹوموٹو پروٹیکشن اور اینہانسمنٹ اسٹوڈیو ہے — پی پی ایف، سیرامک کوٹنگ، پالش، ڈیٹیلنگ، ٹنٹ اور ڈیکالز۔",
  },
  nav: {
    brand: "GOLDEN RIDE",
    tagline: "PPF · TINT · POLISHING",
    menuLabel: "مینو",
    home: "ہوم",
    services: "سروسز",
    showcase: "کام",
    about: "ہمارے بارے میں",
    contact: "رابطہ",
    bookNow: "اب بک کریں",
    toggleMenu: "مینو کھولیں",
  },
  hero: {
    eyebrow: "GOLDEN RIDE STUDIO",
    titleBefore: "آٹوموٹو کمال کا",
    titleEm: "فن",
    titleAfter: "۔",
    sub: "دبئی میں غیر معمولی گاڑیوں کے لیے تیار کردہ پریمیم آٹوموٹو پروٹیکشن اور اینہانسمنٹ۔",
    services: ["PPF", "CERAMIC", "POLISHING", "DETAILING", "TINT", "DECALS"],
    location: "ام رمول · دبئی، یو اے ای",
    explore: "سروسز دیکھیں",
    book: "اپنی گاڑی بک کریں",
    frameLabel: "GOLDEN RIDE / 01",
    scroll: "سکرول",
  },
  services: {
    heading: "چھ شعبے۔ ایک معیارِ تکمیل۔",
    sub: "ہر علاج اپنی الگ دستکاری کے طور پر کیا جاتا ہے — سوچا سمجھا، محتاط، اور آپ کی گاڑی کے مطابق۔",
    view: "دیکھیں →",
    items: [
      {
        num: "01",
        title: "پینٹ پروٹیکشن فلم",
        desc: "ایک شفاف، خود مرمت کرنے والی فلم جو پتھر کے چِپس، سڑک کے ملبے اور رگڑ سے آپ کے پینٹ کو بچاتی ہے — پوشیدہ تحفظ، مستقل اطمینان۔",
      },
      {
        num: "02",
        title: "سیرامک کوٹنگ",
        desc: "سطح سے جڑی پائیدار سیرامک تہہ جو چمک، ہائیڈروفوبک بیدنگ اور یو وی، کیمیکلز اور ہلکی خراش کے خلاف مزاحمت دیتی ہے۔",
      },
      {
        num: "03",
        title: "پالشنگ",
        desc: "مشین کریکشن جو سوِرل مارکس اور آکسیڈیشن ہٹا کر پینٹ کی گہرائی اور صفائی بحال کرتی ہے، کسی بھی حفاظتی تہہ سے پہلے۔",
      },
      {
        num: "04",
        title: "ڈیٹیلنگ",
        desc: "اندرونی اور بیرونی سطحوں کی باریک صفائی — ہر سطح، سیون اور پینل ایک ہی سطح کی توجہ کے ساتھ۔",
      },
      {
        num: "05",
        title: "ٹنٹنگ",
        desc: "حرارت کی مزاحمت، یو وی تحفظ اور پرائیویسی کے لیے درست ونڈو فلم، شیشے کے ہر کونٹور پر صاف فٹ۔",
      },
      {
        num: "06",
        title: "ڈیکال اسٹکرز",
        desc: "شخصی سازی، برانڈنگ یا ہلکے ایکسنٹ کے لیے کسٹم ڈیکال — فیکٹری سطح کی درستگی کے ساتھ۔",
      },
    ],
  },
  showcase: {
    label: "کام",
    eyebrow: "GOLDEN RIDE / کام",
    items: [
      {
        num: "01",
        label: "ونڈو ٹنٹ اور پروٹیکشن",
        videoKey: "windowTint",
      },
      {
        num: "02",
        label: "پالشنگ اور ڈیٹیلنگ",
        videoKey: "polishingDetailing",
      },
      {
        num: "03",
        label: "سموکڈ لائٹس فنش",
        videoKey: "smokeLights",
      },
      {
        num: "04",
        label: "ایمبلم اور اسٹکر ورک",
        videoKey: "emblemDecals",
      },
      {
        num: "05",
        label: "کسٹم باڈی ڈیکالز",
        videoKey: "bodyDecals",
      },
      {
        num: "06",
        label: "پلاسٹک بحالی",
        videoKey: "plasticsRestore",
      },
    ],
  },
  testimonial: {
    label: "کلائنٹ ٹیسٹیمونیلز",
    prev: "پچھلا تبصرہ",
    next: "اگلا تبصرہ",
    goTo: "تبصرے پر جائیں",
    items: [
      {
        quote:
          '"شاندار سروس اور حیرت انگیز نتائج! پالشنگ نے نقائص دور کیے، اور سیرامک کوٹنگ نے میری گاڑی کو خوبصورت، آئینے جیسی چمک دی۔ پروفیشنل ٹیم، تفصیل پر زبردست توجہ، اور ہر پیسے کے قابل۔ انتہائی سفارش!"',
        cite: "— Ahmed Bazaza",
      },
      {
        quote:
          '"میں نے لیپرڈ 8 کا شفاف پی پی ایف کروایا، اور یہ بہت اچھا اور اطمینان بخش تھا کیونکہ وہ دیرپا مواد استعمال کرتے ہیں جو خود ٹھیک ہوتا ہے اور چمک و گلاس برقرار رکھتا ہے۔ مسٹر احمد کے پروفیشنل مینجمنٹ کا بھی شکریہ۔"',
        cite: "— Sakhi Behroz",
      },
      {
        quote:
          '"میں نے اپنی نِسمو نسان پیٹرول ٹنٹنگ کے لیے لائی۔ ان کے پاس حیرت انگیز مواد اور مناسب قیمتیں ہیں۔ ان کا شکریہ!"',
        cite: "— Kumar",
      },
    ],
  },
  about: {
    titleLine1: "ان گاڑیوں کے لیے",
    titleLine2Before: "جنہیں ",
    titleLine2Em: "زیادہ",
    titleLine2After: " چاہیے۔",
    p1: "گولڈن رائڈ ام رمول، دبئی میں واقع ایک آٹوموٹو پروٹیکشن اور اینہانسمنٹ اسٹوڈیو ہے۔ ہم پینٹ پروٹیکشن، سطح کی بہتری، فنش ریفائنمنٹ، ڈیٹیلنگ، ٹنٹنگ اور گاڑی کی شخصی سازی پر کام کرتے ہیں۔",
    p2: "اسٹوڈیو میں آنے والی ہر گاڑی کو الگ پروجیکٹ سمجھا جاتا ہے — میک یا ماڈل کچھ بھی ہو، اسی توجہ سے جانچا، تیار اور مکمل کیا جاتا ہے۔",
    words: [
      { num: "01", title: "درستگی" },
      { num: "02", title: "دستکاری" },
      { num: "03", title: "تحفظ" },
    ],
  },
  contact: {
    label: "رابطہ",
    headingLine1: "آئیں",
    headingLine2: "گولڈن رائڈ۔",
    locationLabel: "مقام",
    locationValue: "مراکش سٹریٹ، ام رمول، دبئی، یو اے ای",
    phoneLabel: "فون",
    phoneValue: "+971 55 141 1012",
    phoneHref: "tel:+971551411012",
    emailLabel: "ای میل",
    emailValue: "info@goldenride.com",
    emailHref: "mailto:info@goldenride.com",
    hoursLabel: "اوقات",
    hoursLines: [
      "پیر–جمعرات  10:00 صبح – 5:00 شام",
      "ہفتہ–اتوار  11:30 صبح – 4:30 شام",
      "جمعہ  بند",
    ],
    mapTitle: "گولڈن رائڈ مقام — مراکش سٹریٹ، ام رمول، دبئی",
    mapDirections: "راستہ حاصل کریں",
  },
  booking: {
    line1: "آپ کی گاڑی۔",
    line2: "آپ کا معیار۔",
    brand: "Golden Ride",
    sub: "دبئی میں تیار کردہ پریمیم پروٹیکشن اور اینہانسمنٹ۔",
    book: "اپنی گاڑی بک کریں",
    call: "کال +971 55 141 1012",
  },
  footer: {
    brand: "Golden Ride",
    tagline: "PPF · TINT · POLISHING",
    blurb: "غیر معمولی گاڑیوں کے لیے تیار کردہ آٹوموٹو پروٹیکشن اور اینہانسمنٹ۔",
    navigate: "نیویگیشن",
    contact: "رابطہ",
    location: "مراکش سٹریٹ، ام رمول، دبئی، یو اے ای",
    phone: "+971 55 141 1012",
    phoneHref: "tel:+971551411012",
    copyright: "گولڈن رائڈ۔ جملہ حقوق محفوظ۔",
    servicesLine: "PPF · CERAMIC · POLISHING · DETAILING · TINT · DECALS",
  },
};

export const dictionaries: Record<Locale, Dictionary> = {
  EN: en,
  UR: ur,
};

export const getDictionary = (locale: Locale = "EN"): Dictionary =>
  dictionaries[locale];
