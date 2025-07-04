import { bagNames } from './bagsData';

export interface Product {
  id: string;
  name: string;
  description: string;
  category: 'bags' | 'shirts' | 'bandana' | 'tote';
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
    S: "price_1QrEmgAp2D4XT14xBWnCN8hN",
    M: "price_1QrEmhAp2D4XT14x5CvzJIIT",
    L: "price_1QrEmiAp2D4XT14xJDUNI4hG",
    XL: "price_1QrEmjAp2D4XT14xBxyLdCDF"
  },
  greatDane: {
    S: "price_1QrEmjAp2D4XT14x0LKzSNKi",
    M: "price_1QrEmkAp2D4XT14xfBaLjhhw",
    L: "price_1QrEmkAp2D4XT14xK8OSBV9W",
    XL: "price_1QrEmlAp2D4XT14x80BCQWrU"
  },
  husky: {
    S: "price_1QrEmnAp2D4XT14x5LJBGhhE",
    M: "price_1QrEmnAp2D4XT14x8b1BgxLV",
    L: "price_1QrEmoAp2D4XT14xilKhihLZ",
    XL: "price_1QrEmpAp2D4XT14xzZS3PU5B"
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
  "Black - Small": "price_1Rf628Ap2D4XT14xcynwN9k0",
  "Black - Medium": "price_1Rf628Ap2D4XT14x2YwO9h13",
  "Black - Large": "price_1Rf628Ap2D4XT14xoWhwVJKb",
  "Black - X-Large": "price_1Rf629Ap2D4XT14xnRkc53ul"
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
  "Pink - Small": "price_1Rh1gIAp2D4XT14xeYFXJGY0",
  "Pink - Medium": "price_1Rh1gIAp2D4XT14xJ04NAYN4",
  "Pink - Large": "price_1Rh1gJAp2D4XT14x7wvQ3Rbb",
  "Pink - X-Large": "price_1Rh1gJAp2D4XT14xfn3eRiTX",
  "Natural - Small": "price_1Rh1gJAp2D4XT14xNBBHO0oy",
  "Natural - Medium": "price_1Rh1gJAp2D4XT14xMvz3rXaa",
  "Natural - Large": "price_1Rh1gKAp2D4XT14x0fsw9YRY",
  "Natural - X-Large": "price_1Rh1gKAp2D4XT14xNDslIdPi",
  "Yellow - Small": "price_1Rh1gKAp2D4XT14xhST0OTGR",
  "Yellow - Medium": "price_1Rh1gKAp2D4XT14xJWg70Rij",
  "Yellow - Large": "price_1Rh1gKAp2D4XT14xcqPNrWPi",
  "Yellow - X-Large": "price_1Rh1gLAp2D4XT14xowikCWeW"
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
  "Green - Small": "price_1Rh1jcAp2D4XT14xiJsCMaa9",
  "Green - Medium": "price_1Rh1jcAp2D4XT14xMwbonX13",
  "Green - Large": "price_1Rh1jdAp2D4XT14xJZzsgvex",
  "Green - X-Large": "price_1Rh1jdAp2D4XT14xbQ1pf5cl",
  "Pink - Small": "price_1Rh1jdAp2D4XT14xXLVH1TPh",
  "Pink - Medium": "price_1Rh1jdAp2D4XT14xdwKDylVV",
  "Pink - Large": "price_1Rh1jdAp2D4XT14xo7C6xiDN",
  "Pink - X-Large": "price_1Rh1jeAp2D4XT14x5cqwRLmU",
  "Natural - Small": "price_1Rh1jeAp2D4XT14xbBLSvowg",
  "Natural - Medium": "price_1Rh1jeAp2D4XT14xae4CvFEr",
  "Natural - Large": "price_1Rh1jeAp2D4XT14xPpqPDtMt",
  "Natural - X-Large": "price_1Rh1jfAp2D4XT14x7m2hDSY3",
  "Yellow - Small": "price_1Rh1jfAp2D4XT14xC4hm4EOP",
  "Yellow - Medium": "price_1Rh1jfAp2D4XT14xBJipav05",
  "Yellow - Large": "price_1Rh1jfAp2D4XT14xJRffzG1U",
  "Yellow - X-Large": "price_1Rh1jfAp2D4XT14xlmUixWdl"
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
    price: '$30',
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
      'Pink': [
        { src: '/webpshirts/cat_yoga_front.webp', alt: 'Cat Yoga - Front' },
        { src: '/webpshirts/cat_yoga_folded.webp', alt: 'Cat Yoga - Folded' }
      ],
      'Natural': [
        { src: '/webpshirts/cat_yoga_front.webp', alt: 'Cat Yoga - Front' },
        { src: '/webpshirts/cat_yoga_folded.webp', alt: 'Cat Yoga - Folded' }
      ],
      'Yellow': [
        { src: '/webpshirts/cat_yoga_front.webp', alt: 'Cat Yoga - Front' },
        { src: '/webpshirts/cat_yoga_folded.webp', alt: 'Cat Yoga - Folded' }
      ]
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
      'Green': [
        { src: '/webpshirts/tabby_front_olive.webp', alt: 'Tabby - Olive Front' },
        { src: '/webpshirts/tabby_folded_grey.webp', alt: 'Tabby - Grey Folded' }
      ],
      'Pink': [
        { src: '/webpshirts/tabby_front_brown.webp', alt: 'Tabby - Brown Front' },
        { src: '/webpshirts/tabby_folded_brown.webp', alt: 'Tabby - Brown Folded' }
      ],
      'Natural': [
        { src: '/webpshirts/tabby_front_brown.webp', alt: 'Tabby - Brown Front' },
        { src: '/webpshirts/tabby_folded.webp', alt: 'Tabby - Folded' }
      ],
      'Yellow': [
        { src: '/webpshirts/tabby_front_olive.webp', alt: 'Tabby - Olive Front' },
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
    priceId: 'price_1QDqJLAp2D4XT14xONZm2HgC',
    slug: 'chewbarka-bandana'
  },
];