export type ThemeId = "default" | "fall";

export const activeTheme: ThemeId = "fall";

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
  },
  fall: {
    heroBadge: "Crisp Air, Cozy Gifts",
    heroHeadline: "FALL INTO FUN FINDS",
    heroDescription:
      "Celebrate sweater weather with playful surprises, pumpkin-spiced treasures, and joyful moments made for leaf-peeping season.",
    heroBadges: ["Whimsical décor", "Limited-run drops", "Cozy game nights"],
    heroCtaLabel: "EXPLORE FALL DROP",
    featuredHeading: "FALL FAVORITES",
    featuredCtaLabel: "SHOP THE SEASON",
    aboutParagraph:
      "Hey there! We're Halston and Matchima. We created Variety Gifts to wrap everyday life in delight—especially when the leaves change. From playful presents to digital experiences, we love making cozy days brighter.",
    gamesHeading: "COZY GAMES",
    gamesDescription:
      "Take a break and enjoy our collection of free browser games! We’re steadily adding new titles to the lineup—perfect for warm drinks, fuzzy socks, and friendly competition.",
    gamesCtaLabel: "PLAY & GET COZY",
    showFloatingLeaves: true,
  },
};

export const themeClasses: Record<ThemeId, string> = {
  default: "theme-default",
  fall: "theme-fall",
};
