export type ThemeId = "default" | "fall" | "winter";

export const activeTheme: ThemeId = "winter";

export interface SlideContent {
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
      ctaLink: "/shop/shirts",
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
      ctaLink: "/shop/shop",
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
      headline: "FALL INTO FUN FINDS",
      ctaLabel: "SHOP SWEATERS",
      ctaLink: "/shop/product/cats-pumpkins-crewneck",
      secondaryCtaLabel: "BEST SELLERS",
      secondaryCtaLink: "/shop/shop",
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
      ctaLink: "/shop/product/coffee-first-sweater",
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
      headline: "LET THE SEASON BEGIN",
      ctaLabel: "SHOP SWEATERS",
      ctaLink: "/shop/category/shirts",
      secondaryCtaLabel: "BEST SELLERS",
      secondaryCtaLink: "/shop",
    },
    slide2: {
      headline: "THE PERFECT\nHANDMADE GIFT",
      description: "Thoughtful, unique, and made to be loved all year round.",
      ctaLabel: "SHOP NOW",
      ctaLink: "/shop/category/bags",
    },
    slide3: {
      headline: "COFFEE FIRST.\nCOZY ALWAYS.",
      description: "Chill weather. Warm coffee. Easy layers. All-day comfort.",
      ctaLabel: "SHOP NOW",
      ctaLink: "/shop/product/bear-coffee-sweater",
    },
  },
};

export const themeClasses: Record<ThemeId, string> = {
  default: "theme-default",
  fall: "theme-fall",
  winter: "theme-winter",
};
