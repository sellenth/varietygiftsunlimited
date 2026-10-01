import { buildDate, getSeasonForDate, type Season } from "./season";

export type ThemeId = "default" | Season;

export const activeTheme: Season = getSeasonForDate(buildDate);

export interface SlideContent {
  image?: { src: string; alt: string };
  headline: string;
  description?: string;
  ctaLabel: string;
  ctaLink: string;
  secondaryCtaLabel?: string;
  secondaryCtaLink?: string;
}

export interface LandingCopy {
  heroBadge?: string;
  heroHeadline: string;
  heroDescription: string;
  heroBadges?: string[];
  heroCtaLabel: string;
  featuredHeading: string;
  featuredCtaLabel: string;
  aboutParagraph: string;
  gamesHeading: string;
  gamesDescription: string;
  gamesCtaLabel: string;
  showFloatingLeaves?: boolean;
  slide1: SlideContent;
  slide2: SlideContent;
  slide3: SlideContent;
}

export const landingCopy: Record<ThemeId, LandingCopy> = {
  default: {
    heroHeadline: "DISCOVER JOYFUL SURPRISES",
    heroDescription:
      "Bringing happiness through every gift, we are your destination for playful surprises and joyous moments.",
    heroBadges: [],
    heroCtaLabel: "SHOP NOW",
    featuredHeading: "FEATURED PRODUCTS",
    featuredCtaLabel: "SHOP ALL",
    aboutParagraph:
      "Hey there! We're Halston and Matchima. We created Variety Gifts to bring a bit more joy into everyday life through fun products and digital experiences. We hope you enjoy.",
    gamesHeading: "FREE GAMES",
    gamesDescription:
      "Take a break and enjoy our collection of free browser games! We are steadily adding new titles to our lineup, with more exciting games on the way. Let us know what you'd like to play next!",
    gamesCtaLabel: "CHECK IT OUT",
    showFloatingLeaves: false,
    slide1: {
      headline: "DISCOVER JOYFUL SURPRISES",
      ctaLabel: "SHOP NOW",
      ctaLink: "/shop/category/shirts",
    },
    slide2: {
      headline: "THE PERFECT\nHANDMADE GIFT",
      description: "Thoughtful, unique, and made to be loved all year round.",
      ctaLabel: "SHOP NOW",
      ctaLink: "/crochet-bag",
    },
    slide3: {
      headline: "COFFEE FIRST.\nCOZY ALWAYS.",
      description: "Chill weather. Warm coffee. Easy layers. All-day comfort.",
      ctaLabel: "SHOP NOW",
      ctaLink: "/shop",
    },
  },
  spring: {
    heroBadge: "Fresh Finds & Bright Days",
    heroHeadline: "SPRING INTO SOMETHING FUN",
    heroDescription:
      "Welcome brighter days with cheerful tees, handmade gifts, and playful finds.",
    heroBadges: [],
    heroCtaLabel: "SHOP SPRING",
    featuredHeading: "SPRING FAVORITES",
    featuredCtaLabel: "SHOP THE SEASON",
    aboutParagraph:
      "Hey there! We're Halston and Matchima. We created Variety Gifts to bring a bit more joy into everyday life—especially as everything starts blooming. From playful presents to digital experiences, we love making bright days even brighter.",
    gamesHeading: "FRESH & FUN GAMES",
    gamesDescription:
      "Take a break and enjoy our collection of free browser games! We're steadily adding new titles to the lineup—perfect for a little friendly competition on a fresh spring day.",
    gamesCtaLabel: "PLAY NOW",
    showFloatingLeaves: false,
    slide1: {
      headline: "SPRING INTO SOMETHING FUN",
      ctaLabel: "SHOP SPRING",
      ctaLink: "/shop/category/shirts",
      secondaryCtaLabel: "BEST SELLERS",
      secondaryCtaLink: "/shop#products",
    },
    slide2: {
      headline: "THE PERFECT\nHANDMADE GIFT",
      description: "Thoughtful, unique, and made to be loved all year round.",
      ctaLabel: "SHOP NOW",
      ctaLink: "/shop/category/bags",
    },
    slide3: {
      headline: "BRIGHT DAYS.\nPLAYFUL STYLE.",
      description: "Light layers and cheerful tees for the season ahead.",
      ctaLabel: "SHOP TEES",
      ctaLink: "/shop/category/shirts",
    },
  },
  fall: {
    heroBadge: "Crisp Air, Cozy Gifts",
    heroHeadline: "FALL INTO FUN FINDS",
    heroDescription:
      "Celebrate sweater weather with playful surprises, pumpkin-spiced treasures, and other joyful moments.",
    heroBadges: [],
    heroCtaLabel: "EXPLORE FALL DROP",
    featuredHeading: "FALL FAVORITES",
    featuredCtaLabel: "SHOP THE SEASON",
    aboutParagraph:
      "Hey there! We're Halston and Matchima. We created Variety Gifts to wrap everyday life in delight—especially when the leaves change. From playful presents to digital experiences, we love making cozy days brighter.",
    gamesHeading: "COZY GAMES",
    gamesDescription:
      "Take a break and enjoy our collection of free browser games! We're steadily adding new titles to the lineup—perfect for warm drinks, fuzzy socks, and friendly competition.",
    gamesCtaLabel: "PLAY & GET COZY",
    showFloatingLeaves: false,
    slide1: {
      image: {
        src: "/pumpkin-sweater/pumpkin-sweater-black-model.webp",
        alt: "Model wearing a black Pumpkin Sweater in an autumn setting",
      },
      headline: "FALL INTO FUN FINDS",
      ctaLabel: "SHOP SWEATERS",
      ctaLink: "/shop/category/shirts",
      secondaryCtaLabel: "BEST SELLERS",
      secondaryCtaLink: "/shop#products",
    },
    slide2: {
      headline: "THE PERFECT\nHANDMADE GIFT",
      description: "Thoughtful, unique, and made to be loved all year round.",
      ctaLabel: "SHOP NOW",
      ctaLink: "/crochet-bag",
    },
    slide3: {
      image: {
        src: "/winter-collection/bear-coffee/bear-sweater-green-front.webp",
        alt: "Green Bear Coffee Sweater",
      },
      headline: "COFFEE FIRST.\nCOZY ALWAYS.",
      description: "Chill weather. Warm coffee. Easy layers. All-day comfort.",
      ctaLabel: "SHOP NOW",
      ctaLink: "/shop/product/bear-coffee-sweater",
    },
  },
  winter: {
    heroBadge: "Warmth & Wonder",
    heroHeadline: "LET THE SEASON BEGIN",
    heroDescription:
      "Embrace the chill with cozy finds and heartfelt gifts for the ones you love.",
    heroBadges: [],
    heroCtaLabel: "SHOP WINTER",
    featuredHeading: "WINTER FAVORITES",
    featuredCtaLabel: "SHOP THE SEASON",
    aboutParagraph:
      "Hey there! We're Halston and Matchima. We created Variety Gifts to wrap everyday life in delight—especially during the cozy winter months. From playful presents to digital experiences, we love making cold days warmer.",
    gamesHeading: "COZY GAMES",
    gamesDescription:
      "Take a break and enjoy our collection of free browser games! We're steadily adding new titles to the lineup—perfect for warm drinks, fuzzy socks, and friendly competition.",
    gamesCtaLabel: "PLAY & GET COZY",
    showFloatingLeaves: false,
    slide1: {
      image: {
        src: "/winter-collection/dachshund/dachshund-sweater-seafoam-front.webp",
        alt: "Seafoam Dachshund Sweater",
      },
      headline: "LET THE SEASON BEGIN",
      ctaLabel: "SHOP SWEATERS",
      ctaLink: "/shop/category/shirts",
      secondaryCtaLabel: "BEST SELLERS",
      secondaryCtaLink: "/shop#products",
    },
    slide2: {
      headline: "THE PERFECT\nHANDMADE GIFT",
      description: "Thoughtful, unique, and made to be loved all year round.",
      ctaLabel: "SHOP NOW",
      ctaLink: "/shop/category/bags",
    },
    slide3: {
      image: {
        src: "/winter-collection/bear-coffee/bear-sweater-green-front.webp",
        alt: "Green Bear Coffee Sweater",
      },
      headline: "COFFEE FIRST.\nCOZY ALWAYS.",
      description: "Chill weather. Warm coffee. Easy layers. All-day comfort.",
      ctaLabel: "SHOP NOW",
      ctaLink: "/shop/product/bear-coffee-sweater",
    },
  },
  summer: {
    heroBadge: "Sunshine & Good Vibes",
    heroHeadline: "SUMMER JUST GOT FUN",
    heroDescription:
      "Soak up the season with breezy tees, tanks, and playful finds made for sunny days.",
    heroBadges: [],
    heroCtaLabel: "SHOP SUMMER",
    featuredHeading: "SUMMER FAVORITES",
    featuredCtaLabel: "SHOP THE SEASON",
    aboutParagraph:
      "Hey there! We're Halston and Matchima. We created Variety Gifts to bring a bit more joy into everyday life—especially when the sun's out. From playful presents to digital experiences, we love making bright days even brighter.",
    gamesHeading: "SUNNY DAY GAMES",
    gamesDescription:
      "Beat the heat indoors with our collection of free browser games! We're steadily adding new titles to the lineup—perfect for cooling off with a cold drink and a little friendly competition.",
    gamesCtaLabel: "PLAY NOW",
    showFloatingLeaves: false,
    slide1: {
      headline: "SUMMER JUST GOT FUN",
      ctaLabel: "SHOP SUMMER",
      ctaLink: "/shop/category/shirts",
      secondaryCtaLabel: "BEST SELLERS",
      secondaryCtaLink: "/shop#products",
    },
    slide2: {
      headline: "PETS LOVE\nSUMMER TOO",
      description: "Bandanas and accessories for your sunshine sidekick.",
      ctaLabel: "SHOP ACCESSORIES",
      ctaLink: "/shop/product/chewbarka-bandana",
    },
    slide3: {
      headline: "BEAT THE HEAT.\nLOOK COOL.",
      description: "Breezy crops, tanks, and tees made for hot days.",
      ctaLabel: "SHOP TEES",
      ctaLink: "/shop/category/shirts",
    },
  },
};

export const themeClasses: Record<ThemeId, string> = {
  default: "theme-default",
  spring: "theme-spring",
  fall: "theme-fall",
  winter: "theme-winter",
  summer: "theme-summer",
};
