import { bagNames } from './bagsData';

export interface Product {
  id: string;
  name: string;
  description: string;
  category: 'bags' | 'shirts' | 'bandana' | 'tote' | 'hats';
  images: { src: string; alt: string }[];
  colorImages?: { [color: string]: { src: string; alt: string }[] }; // For color variants
  price: string;
  priceId?: string; // For single price products
  priceIds?: { [size: string]: string }; // For multi-size products
  sizes?: string[];
  slug: string;
}

// Shirt price IDs
const yogaShirtPriceIds = {
  corgi: {
    S: "price_1QrEmcAp2D4XT14x0F0HqWS7",
    M: "price_1QrEmdAp2D4XT14xxwoEnIpR",
    L: "price_1QrEmeAp2D4XT14xCcysmM0x",
    XL: "price_1QrEmeAp2D4XT14xaWTzR6UK"
  },
  golden: {
    S: "price_1RhDUYAp2D4XT14xQBPFDFyR",
    M: "price_1RhDUYAp2D4XT14xCpfJPA22",
    L: "price_1RhDUYAp2D4XT14xNGDpFyBN",
    XL: "price_1RhDUZAp2D4XT14xQ2123Nfz"
  },
  greatDane: {
    S: "price_1RhDUiAp2D4XT14x3SXNGkmW",
    M: "price_1RhDUiAp2D4XT14xTDv63i8s",
    L: "price_1RhDUiAp2D4XT14xsN6YjZSn",
    XL: "price_1RhDUjAp2D4XT14x1QIfmH4w"
  },
  husky: {
    S: "price_1RhDPIAp2D4XT14xp5rGXrpd",
    M: "price_1RhDPIAp2D4XT14xzdCfgYud",
    L: "price_1RhDPIAp2D4XT14xTgms5Hi1",
    XL: "price_1RhDPJAp2D4XT14xq2CgjKI4"
  }
};

// Cool Aunts Club T-Shirt price IDs
const coolAuntsClubPriceIds = {
  "Green - Small": "price_1RbDB6Ap2D4XT14xg4Jqg4Lp",
  "Green - Medium": "price_1RbDB8Ap2D4XT14xJarRANZV",
  "Green - Large": "price_1RbDB9Ap2D4XT14xJOAGm8q7",
  "Green - X-Large": "price_1RbDBAAp2D4XT14xOOYf6QMR",
  "Pink - Small": "price_1RbDBTAp2D4XT14x1jUDzhTm",
  "Pink - Medium": "price_1RbDBVAp2D4XT14xafaUyDDP",
  "Pink - Large": "price_1RbDBWAp2D4XT14xi9vLXhPN",
  "Pink - X-Large": "price_1RbDBYAp2D4XT14xbzpaHGuq",
  "Natural - Small": "price_1RbDBpAp2D4XT14x0oGWdm5O",
  "Natural - Medium": "price_1RbDBqAp2D4XT14xTzmxEBAp",
  "Natural - Large": "price_1RbDBtAp2D4XT14xIIynnB0m",
  "Natural - X-Large": "price_1RbDBvAp2D4XT14x4NKSMhTb",
  "Yellow - Small": "price_1RbDCDAp2D4XT14xbrknYFN0",
  "Yellow - Medium": "price_1RbDCEAp2D4XT14xYH6mfseH",
  "Yellow - Large": "price_1RbDCGAp2D4XT14x5ANNDPIa",
  "Yellow - X-Large": "price_1RbDCHAp2D4XT14xEgIg5RY3"
};

// What The T-Shirt price IDs
const whatTheTShirtPriceIds = {
  "Green - Small": "price_1RbYCZAp2D4XT14xnwLXQQk5",
  "Green - Medium": "price_1RbYCdAp2D4XT14xHXxrRyOP",
  "Green - Large": "price_1RbYChAp2D4XT14xis9XlrP1",
  "Green - X-Large": "price_1RbYCnAp2D4XT14xJSHyuIOO",
  "Pink - Small": "price_1RbYCsAp2D4XT14x3DyI07Cz",
  "Pink - Medium": "price_1RbYCxAp2D4XT14xE721yRMs",
  "Pink - Large": "price_1RbYD1Ap2D4XT14xVdjACcDp",
  "Pink - X-Large": "price_1RbYD6Ap2D4XT14xyiw6HyhV",
  "Natural - Small": "price_1RbYDBAp2D4XT14xOokpUBGy",
  "Natural - Medium": "price_1RbYDGAp2D4XT14xbUIQgWW8",
  "Natural - Large": "price_1RbYDLAp2D4XT14xcDAeUAPM",
  "Natural - X-Large": "price_1RbYDQAp2D4XT14xZWaWplyE",
  "Yellow - Small": "price_1RbYDWAp2D4XT14xtfDA4KYz",
  "Yellow - Medium": "price_1RbYDcAp2D4XT14x8W6V2bOa",
  "Yellow - Large": "price_1RbYDfAp2D4XT14xIj8dIigl",
  "Yellow - X-Large": "price_1RbYDlAp2D4XT14xkQYUeisy"
};

// Freudian Tank price IDs
const freudianTankPriceIds = {
  "Black - Small": "price_1RhI2DAp2D4XT14x5IO7bbia",
  "Black - Medium": "price_1RhI2DAp2D4XT14xtNdoXmIk",
  "Black - Large": "price_1RhI2DAp2D4XT14xAzvQumRj",
  "Black - X-Large": "price_1RhI2DAp2D4XT14xzfjgGS5u"
};

// Cat Yoga price IDs
const catYogaPriceIds = {
  "Green - Small": "price_1Rh1fHAp2D4XT14xONNWIgmY",
  "Green - Medium": "price_1Rh1fHAp2D4XT14xaUwSSvfZ",
  "Green - Large": "price_1Rh1fHAp2D4XT14xemRpRpQc",
  "Green - X-Large": "price_1Rh1fIAp2D4XT14xiz0k3Iwr",
  "Pink - Small": "price_1Rh1fIAp2D4XT14xZ9NYSQRa",
  "Pink - Medium": "price_1Rh1fIAp2D4XT14xRwtKBcgu",
  "Pink - Large": "price_1Rh1fIAp2D4XT14xBxQ6XjjY",
  "Pink - X-Large": "price_1Rh1fIAp2D4XT14xpBEZZEWk",
  "Natural - Small": "price_1Rh1fJAp2D4XT14xJ12UFT9N",
  "Natural - Medium": "price_1Rh1fJAp2D4XT14x6FTXYFch",
  "Natural - Large": "price_1Rh1fJAp2D4XT14xvpsRan4X",
  "Natural - X-Large": "price_1Rh1fJAp2D4XT14xpthLSpQm",
  "Yellow - Small": "price_1Rh1fJAp2D4XT14xthKaHRtN",
  "Yellow - Medium": "price_1Rh1fKAp2D4XT14xpLh8yIYL",
  "Yellow - Large": "price_1Rh1fKAp2D4XT14xqJOgbsgf",
  "Yellow - X-Large": "price_1Rh1fKAp2D4XT14xj4Tg4KNx"
};

// Cats price IDs
const catsPriceIds = {
  "Green - Small": "price_1Rh1gHAp2D4XT14xfKI4Epb6",
  "Green - Medium": "price_1Rh1gIAp2D4XT14xQnvxTTQV",
  "Green - Large": "price_1Rh1gIAp2D4XT14xrIse9SjX",
  "Green - X-Large": "price_1Rh1gIAp2D4XT14x0steYjvi",

};

// Doge price IDs (single color)
const dogePriceIds = {
  "S": "price_1Rh25QAp2D4XT14xpb6xBZyP",
  "M": "price_1Rh25WAp2D4XT14xTZDXkBVh",
  "L": "price_1Rh25WAp2D4XT14xeo6dOVn0",
  "XL": "price_1Rh25XAp2D4XT14x1czMgrMx"
};

// Doge Moon price IDs (single color)
const dogeMoonPriceIds = {
  "S": "price_1Rh28yAp2D4XT14xEMeY5jFe",
  "M": "price_1Rh28yAp2D4XT14xWXDru9MI",
  "L": "price_1Rh28zAp2D4XT14xbJNmbsfa",
  "XL": "price_1Rh28zAp2D4XT14xxLG6OdQL"
};

// Tabby price IDs
const tabbyPriceIds = {
  "Olive - Small": "price_1RhCkQAp2D4XT14x4j7KVNz7",
  "Olive - Medium": "price_1RhCkRAp2D4XT14xtICsfhEd",
  "Olive - Large": "price_1RhCkRAp2D4XT14xPxn8Yhcp",
  "Olive - X-Large": "price_1RhCkRAp2D4XT14x2gVNHGKu",
  "Brown - Small": "price_1RhCkRAp2D4XT14xfs0cRknu",
  "Brown - Medium": "price_1RhCkSAp2D4XT14xubKGGtoD",
  "Brown - Large": "price_1RhCkSAp2D4XT14xwTaErx5H",
  "Brown - X-Large": "price_1RhCkSAp2D4XT14xXu8TRr1x",
  "Tan - Small": "price_1RhCkSAp2D4XT14xfScI5zyb",
  "Tan - Medium": "price_1RhCkTAp2D4XT14x2QzmO4HA",
  "Tan - Large": "price_1RhCkTAp2D4XT14xlXMvasmY",
  "Tan - X-Large": "price_1RhCkTAp2D4XT14x5WAkBirJ"
};

// Tanner price IDs (single color)
const tannerPriceIds = {
  "S": "price_1Rh28rAp2D4XT14xZ0elSLc6",
  "M": "price_1Rh28rAp2D4XT14xmzZq3CTH",
  "L": "price_1Rh28rAp2D4XT14xfbE4Ircu",
  "XL": "price_1Rh28sAp2D4XT14xtnzr1gy2"
};

// Tong price IDs (single color)
const tongPriceIds = {
  "S": "price_1Rh28kAp2D4XT14xBeJwSf2i",
  "M": "price_1Rh28kAp2D4XT14xYVl6Q46w",
  "L": "price_1Rh28kAp2D4XT14xaDxgI7Y0",
  "XL": "price_1Rh28kAp2D4XT14xpFVb969T"
};

// Gym Brat Cropped Shirt price IDs
const gymBratCroppedShirtPriceIds = {
  "Black - Small": "price_1RiQJ7Ap2D4XT14xBTyx3ikL",
  "Black - Medium": "price_1RiQJBAp2D4XT14xmtKdHkk8",
  "Black - Large": "price_1RiQJFAp2D4XT14x8VSCMbbA",
  "Black - X-Large": "price_1RiQJIAp2D4XT14xLWViSUXx",
  "Ivory - Small": "price_1RiQJMAp2D4XT14xggJtK55W",
  "Ivory - Medium": "price_1RiQJRAp2D4XT14xSoXWX67m",
  "Ivory - Large": "price_1RiQJVAp2D4XT14x8JaB0TvK",
  "Ivory - X-Large": "price_1RiQJZAp2D4XT14xTDTWs3Qx"
};

export const products: Product[] = [
  // Bags
  ...Array.from({ length: 11 }, (_, i) => ({
    id: `bag-${i + 1}`,
    name: bagNames[i],
    description: "A beautiful, handmade crochet bag. Perfect for carrying your essentials.",
    category: 'bags' as const,
    images: [{ src: `/bags/bags/${i + 1}.webp`, alt: bagNames[i] }],
    price: "$29.99",
    priceId: "price_1R88KsAp2D4XT14xnjBjFhmd",
    slug: `bag-${i + 1}`
  })),
  
  // Shirts
  {
    id: 'corgi-yoga',
    name: 'Corgi Yoga T-Shirt',
    description: 'Comfortable and stylish t-shirt featuring our adorable Corgi Yoga design.',
    category: 'shirts',
    images: [
      { src: '/yoga/corgi1.jpg', alt: 'Corgi Yoga T-Shirt view 1' },
      { src: '/yoga/corgi2.jpg', alt: 'Corgi Yoga T-Shirt view 2' },
      { src: '/yoga/corgi3.jpg', alt: 'Corgi Yoga T-Shirt view 3' }
    ],
    price: '$19.99',
    priceIds: yogaShirtPriceIds.corgi,
    sizes: ['S', 'M', 'L', 'XL'],
    slug: 'corgi-yoga'
  },
  {
    id: 'golden-yoga',
    name: 'Golden Yoga T-Shirt',
    description: 'Comfortable and stylish t-shirt featuring our adorable Golden Retriever Yoga design.',
    category: 'shirts',
    images: [
      { src: '/yoga/golden1.jpg', alt: 'Golden Yoga T-Shirt view 1' },
      { src: '/yoga/golden2.jpg', alt: 'Golden Yoga T-Shirt view 2' },
      { src: '/yoga/golden3.jpg', alt: 'Golden Yoga T-Shirt view 3' }
    ],
    price: '$19.99',
    priceIds: yogaShirtPriceIds.golden,
    sizes: ['S', 'M', 'L', 'XL'],
    slug: 'golden-yoga'
  },
  {
    id: 'great-dane-yoga',
    name: 'Great Dane Yoga T-Shirt',
    description: 'Comfortable and stylish t-shirt featuring our adorable Great Dane Yoga design.',
    category: 'shirts',
    images: [
      { src: '/yoga/dane1.jpg', alt: 'Great Dane Yoga T-Shirt view 1' },
      { src: '/yoga/dane2.jpg', alt: 'Great Dane Yoga T-Shirt view 2' },
      { src: '/yoga/dane3.jpg', alt: 'Great Dane Yoga T-Shirt view 3' }
    ],
    price: '$19.99',
    priceIds: yogaShirtPriceIds.greatDane,
    sizes: ['S', 'M', 'L', 'XL'],
    slug: 'great-dane-yoga'
  },
  {
    id: 'husky-yoga',
    name: 'Husky Yoga T-Shirt',
    description: 'Comfortable and stylish t-shirt featuring our adorable Husky Yoga design.',
    category: 'shirts',
    images: [
      { src: '/yoga/husky1.jpg', alt: 'Husky Yoga T-Shirt view 1' },
      { src: '/yoga/husky2.jpg', alt: 'Husky Yoga T-Shirt view 2' },
      { src: '/yoga/husky3.jpg', alt: 'Husky Yoga T-Shirt view 3' }
    ],
    price: '$19.99',
    priceIds: yogaShirtPriceIds.husky,
    sizes: ['S', 'M', 'L', 'XL'],
    slug: 'husky-yoga'
  },
  {
    id: 'cool-aunts-club',
    name: 'Cool Aunts Club T-Shirt',
    description: 'Show your aunt pride with this stylish and comfortable t-shirt. Available in multiple colors and sizes.',
    category: 'shirts',
    images: [
      { src: '/webpshirts/aunts_club_front_green.webp', alt: 'Cool Aunts Club T-Shirt - Green Front' },
      { src: '/webpshirts/aunts_club_back_green.webp', alt: 'Cool Aunts Club T-Shirt - Green Back' },
      { src: '/webpshirts/aunts_club_folded_green.webp', alt: 'Cool Aunts Club T-Shirt - Green Folded' }
    ],
    colorImages: {
      'Green': [
        { src: '/webpshirts/aunts_club_front_green.webp', alt: 'Cool Aunts Club T-Shirt - Green Front' },
        { src: '/webpshirts/aunts_club_back_green.webp', alt: 'Cool Aunts Club T-Shirt - Green Back' },
        { src: '/webpshirts/aunts_club_folded_green.webp', alt: 'Cool Aunts Club T-Shirt - Green Folded' }
      ],
      'Pink': [
        { src: '/webpshirts/aunts_club_front_pink.webp', alt: 'Cool Aunts Club T-Shirt - Pink Front' },
        { src: '/webpshirts/aunts_club_back_pink.webp', alt: 'Cool Aunts Club T-Shirt - Pink Back' },
        { src: '/webpshirts/aunts_club_folded_pink.webp', alt: 'Cool Aunts Club T-Shirt - Pink Folded' }
      ],
      'Natural': [
        { src: '/webpshirts/aunts_club_front_natural.webp', alt: 'Cool Aunts Club T-Shirt - Natural Front' },
        { src: '/webpshirts/aunts_club_back_natural.webp', alt: 'Cool Aunts Club T-Shirt - Natural Back' },
        { src: '/webpshirts/aunts_club_folded_natural.webp', alt: 'Cool Aunts Club T-Shirt - Natural Folded' }
      ],
      'Yellow': [
        { src: '/webpshirts/aunts_club_front_yellow.webp', alt: 'Cool Aunts Club T-Shirt - Yellow Front' },
        { src: '/webpshirts/aunts_club_back_yellow.webp', alt: 'Cool Aunts Club T-Shirt - Yellow Back' },
        { src: '/webpshirts/aunts_club_folded_yellow.webp', alt: 'Cool Aunts Club T-Shirt - Yellow Folded' }
      ]
    },
    price: '$29.99',
    priceIds: coolAuntsClubPriceIds,
    sizes: Object.keys(coolAuntsClubPriceIds),
    slug: 'cool-aunts-club'
  },
  {
    id: 'what-the',
    name: 'What The T-Shirt',
    description: 'Show your unique style with this comfortable and eye-catching t-shirt. Available in multiple colors and sizes.',
    category: 'shirts',
    images: [
        { src: '/webpshirts/what_the_front_natural.webp', alt: 'What The T-Shirt - Natural Front' },
        { src: '/webpshirts/what_the_hanging_natural.webp', alt: 'What The T-Shirt - Natural Hanging' },
    ],
    colorImages: {
      /*
      'Green': [
        { src: '/webpshirts/what_the_front_green.webp', alt: 'What The T-Shirt - Green Front' },
        { src: '/webpshirts/what_the_back_green.webp', alt: 'What The T-Shirt - Green Back' },
        { src: '/webpshirts/what_the_folded_green.webp', alt: 'What The T-Shirt - Green Folded' }
      ],
      'Pink': [
        { src: '/webpshirts/what_the_front_pink.webp', alt: 'What The T-Shirt - Pink Front' },
        { src: '/webpshirts/what_the_back_pink.webp', alt: 'What The T-Shirt - Pink Back' },
        { src: '/webpshirts/what_the_folded_pink.webp', alt: 'What The T-Shirt - Pink Folded' }
      ],
      'Yellow': [
        { src: '/webpshirts/what_the_front_yellow.webp', alt: 'What The T-Shirt - Yellow Front' },
        { src: '/webpshirts/what_the_back_yellow.webp', alt: 'What The T-Shirt - Yellow Back' },
        { src: '/webpshirts/what_the_folded_yellow.webp', alt: 'What The T-Shirt - Yellow Folded' }
      ],*/
      'Natural': [
        { src: '/webpshirts/what_the_front_natural.webp', alt: 'What The T-Shirt - Natural Front' },
        { src: '/webpshirts/what_the_hanging_natural.webp', alt: 'What The T-Shirt - Natural Hanging' },
      ],
    },
    price: '$29.99',
    priceIds: whatTheTShirtPriceIds,
    sizes: Object.keys(whatTheTShirtPriceIds),
    slug: 'what-the'
  },
  {
    id: 'freudian-tank',
    name: 'Freudian Tank',
    description: 'Show your V.G. x Freudian French support with this tank top. Available in black.',
    category: 'shirts',
    images: [
      { src: '/webpshirts/swole_tank_front.webp', alt: 'Freudian Tank - Black Front' },
      { src: '/webpshirts/swole_tank_back.webp', alt: 'Freudian Tank - Black Back' }
    ],
    colorImages: {
      'Black': [
        { src: '/webpshirts/swole_tank_front.webp', alt: 'Freudian Tank - Black Front' },
        { src: '/webpshirts/swole_tank_back.webp', alt: 'Freudian Tank - Black Back' }
      ]
    },
    price: '$29.99',
    priceIds: freudianTankPriceIds,
    sizes: Object.keys(freudianTankPriceIds),
    slug: 'freudian-tank'
  },
  {
    id: 'cat-yoga',
    name: 'Cat Yoga',
    description: 'Show your unique style with this comfortable and eye-catching t-shirt. Available in multiple colors and sizes.',
    category: 'shirts',
    images: [
      { src: '/webpshirts/cat_yoga_front_green.webp', alt: 'Cat Yoga - Green Front' },
      { src: '/webpshirts/cat_yoga_folded.webp', alt: 'Cat Yoga - Folded' }
    ],
    colorImages: {
      'Green': [
        { src: '/webpshirts/cat_yoga_front_green.webp', alt: 'Cat Yoga - Green Front' },
        { src: '/webpshirts/cat_yoga_folded.webp', alt: 'Cat Yoga - Folded' }
      ],
      'Natural': [
        { src: '/webpshirts/cat_yoga_front.webp', alt: 'Cat Yoga - Front' },
      ],
    },
    price: '$29.99',
    priceIds: catYogaPriceIds,
    sizes: Object.keys(catYogaPriceIds),
    slug: 'cat-yoga'
  },
  {
    id: 'cats',
    name: 'Cats',
    description: 'Show your unique style with this comfortable and eye-catching t-shirt. Available in multiple colors and sizes.',
    category: 'shirts',
    images: [
      { src: '/webpshirts/cats_front.webp', alt: 'Cats - Front' },
      { src: '/webpshirts/cats_folded.webp', alt: 'Cats - Folded' }
    ],
    colorImages: {
      'Green': [
        { src: '/webpshirts/cats_front.webp', alt: 'Cats - Front' },
        { src: '/webpshirts/cats_folded.webp', alt: 'Cats - Folded' }
      ],
      /*
      'Pink': [
        { src: '/webpshirts/cats_front.webp', alt: 'Cats - Front' },
        { src: '/webpshirts/cats_folded.webp', alt: 'Cats - Folded' }
      ],
      'Natural': [
        { src: '/webpshirts/cats_front.webp', alt: 'Cats - Front' },
        { src: '/webpshirts/cats_folded.webp', alt: 'Cats - Folded' }
      ],
      'Yellow': [
        { src: '/webpshirts/cats_front.webp', alt: 'Cats - Front' },
        { src: '/webpshirts/cats_folded.webp', alt: 'Cats - Folded' }
      ]
    */
    },
    price: '$29.99',
    priceIds: catsPriceIds,
    sizes: Object.keys(catsPriceIds),
    slug: 'cats'
  },
  {
    id: 'doge',
    name: 'Doge',
    description: 'Show your unique style with this comfortable and eye-catching t-shirt.',
    category: 'shirts',
    images: [
      { src: '/webpshirts/doge_front.webp', alt: 'Doge - Front' },
      { src: '/webpshirts/doge_folded.webp', alt: 'Doge - Folded' }
    ],
    price: '$29.99',
    priceIds: dogePriceIds,
    sizes: ['S', 'M', 'L', 'XL'],
    slug: 'doge'
  },
  {
    id: 'doge-moon',
    name: 'Doge Moon',
    description: 'Show your unique style with this comfortable and eye-catching t-shirt.',
    category: 'shirts',
    images: [
      { src: '/webpshirts/dogemoon_front.webp', alt: 'Doge Moon - Front' }
    ],
    price: '$29.99',
    priceIds: dogeMoonPriceIds,
    sizes: ['S', 'M', 'L', 'XL'],
    slug: 'doge-moon'
  },
  {
    id: 'tabby',
    name: 'Tabby',
    description: 'Show your unique style with this comfortable and eye-catching t-shirt. Available in multiple colors and sizes.',
    category: 'shirts',
    images: [
      { src: '/webpshirts/tabby_front_brown.webp', alt: 'Tabby - Brown Front' },
      { src: '/webpshirts/tabby_folded.webp', alt: 'Tabby - Folded' }
    ],
    colorImages: {
      'Olive': [
        { src: '/webpshirts/tabby_front_olive.webp', alt: 'Tabby - Olive Front' },
        { src: '/webpshirts/tabby_folded.webp', alt: 'Tabby - Olive Folded' }
      ],
      'Brown': [
        { src: '/webpshirts/tabby_front_brown.webp', alt: 'Tabby - Brown Front' },
        { src: '/webpshirts/tabby_folded_brown.webp', alt: 'Tabby - Brown Folded' }
      ],
      'Tan': [
        { src: '/webpshirts/tabby_front_grey.webp', alt: 'Tabby - Grey Front' },
        { src: '/webpshirts/tabby_folded_grey.webp', alt: 'Tabby - Grey Folded' }
      ]
    },
    price: '$29.99',
    priceIds: tabbyPriceIds,
    sizes: Object.keys(tabbyPriceIds),
    slug: 'tabby'
  },
  {
    id: 'tanner',
    name: 'Tanner',
    description: 'Show your unique style with this comfortable and eye-catching t-shirt.',
    category: 'shirts',
    images: [
      { src: '/webpshirts/tanner_front_black.webp', alt: 'Tanner - Black Front' }
    ],
    price: '$29.99',
    priceIds: tannerPriceIds,
    sizes: ['S', 'M', 'L', 'XL'],
    slug: 'tanner'
  },
  {
    id: 'tong',
    name: 'Tong',
    description: 'Show your unique style with this comfortable and eye-catching t-shirt.',
    category: 'shirts',
    images: [
      { src: '/webpshirts/tong_front.webp', alt: 'Tong - Front' }
    ],
    price: '$29.99',
    priceIds: tongPriceIds,
    sizes: ['S', 'M', 'L', 'XL'],
    slug: 'tong'
  },
  
  // Bandana
  {
    id: 'chewbarka-bandana',
    name: 'Chewbarka Bandana',
    description: 'The perfect accessory for your furry friend. Stylish and comfortable pet bandana.',
    category: 'bandana',
    images: [
      { src: '/chewbarka/item.webp', alt: 'Chewbarka Bandana' },
      { src: '/chewbarka/dog.webp', alt: 'Dog wearing Chewbarka Bandana' }
    ],
    price: '$22.99',
    priceId: 'price_1Rh2HtAp2D4XT14x51zjcjnJ',
    slug: 'chewbarka-bandana'
  },
  
  // Gym Brat Collection
  {
    id: 'gym-brat-cropped-shirt',
    name: 'Gym Brat Cropped Shirt',
    description: 'Show off your fitness lifestyle with this stylish cropped shirt. Perfect for the gym or casual wear. Available in black and ivory.',
    category: 'shirts',
    images: [
      { src: '/gym-brat-croptop/brat_crop_front_ivory.webp', alt: 'Gym Brat Cropped Shirt - Black Front' },
      { src: '/gym-brat-croptop/brat_crop_back_ivory.webp', alt: 'Gym Brat Cropped Shirt - Black Back' }
    ],
    colorImages: {
      'Ivory': [
        { src: '/gym-brat-croptop/brat_crop_front_ivory.webp', alt: 'Gym Brat Cropped Shirt - Ivory Front' },
        { src: '/gym-brat-croptop/brat_crop_back_ivory.webp', alt: 'Gym Brat Cropped Shirt - Ivory Back' },
      ],
      'Black': [
        { src: '/gym-brat-croptop/brat_crop_front_black.webp', alt: 'Gym Brat Cropped Shirt - Black Front' },
        { src: '/gym-brat-croptop/brat_crop_back_black.webp', alt: 'Gym Brat Cropped Shirt - Black Back' },
      ]
    },
    price: '$30.00',
    priceIds: gymBratCroppedShirtPriceIds,
    sizes: Object.keys(gymBratCroppedShirtPriceIds),
    slug: 'gym-brat-cropped-shirt'
  },
  {
    id: 'gym-brat-hat',
    name: 'Gym Brat Hat',
    description: 'Complete your gym look with this stylish Gym Brat hat. Premium quality, comfortable fit, available in tan.',
    category: 'hats',
    images: [
      { src: '/gym-brat-hat/brat_hat_product.webp', alt: 'Gym Brat Hat - Tan Front' },
      { src: '/gym-brat-hat/brat_hat_model.webp', alt: 'Gym Brat Hat - Tan Side' }
    ],
    price: '$32.99',
    priceId: 'price_1RiQK9Ap2D4XT14xFDTIxfPM',
    slug: 'gym-brat-hat'
  },
];