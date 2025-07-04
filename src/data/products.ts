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

// Doge price IDs
const dogePriceIds = {
  "Green - Small": "price_1Rh1hKAp2D4XT14x5OpneG79",
  "Green - Medium": "price_1Rh1hKAp2D4XT14xIOltOpWP",
  "Green - Large": "price_1Rh1hLAp2D4XT14xyxyfLqcj",
  "Green - X-Large": "price_1Rh1hLAp2D4XT14xFZJcQTS0",
  "Pink - Small": "price_1Rh1hLAp2D4XT14xKpqNVWQ7",
  "Pink - Medium": "price_1Rh1hLAp2D4XT14xoks39b0q",
  "Pink - Large": "price_1Rh1hLAp2D4XT14xRw5cyWIM",
  "Pink - X-Large": "price_1Rh1hMAp2D4XT14xRPqTM6Nk",
  "Natural - Small": "price_1Rh1hMAp2D4XT14x36lozAfd",
  "Natural - Medium": "price_1Rh1hMAp2D4XT14xudnaYpwX",
  "Natural - Large": "price_1Rh1hMAp2D4XT14xqDzKs5xp",
  "Natural - X-Large": "price_1Rh1hMAp2D4XT14xQp1u6EHz",
  "Yellow - Small": "price_1Rh1hNAp2D4XT14xwFnN7xL4",
  "Yellow - Medium": "price_1Rh1hNAp2D4XT14xXbuM5919",
  "Yellow - Large": "price_1Rh1hNAp2D4XT14xX2fcyHJf",
  "Yellow - X-Large": "price_1Rh1hNAp2D4XT14xNlXjoGz4"
};

// Doge Moon price IDs
const dogeMoonPriceIds = {
  "Green - Small": "price_1Rh1iqAp2D4XT14xGi16xawS",
  "Green - Medium": "price_1Rh1irAp2D4XT14xlttoDp94",
  "Green - Large": "price_1Rh1irAp2D4XT14xbYDugHcx",
  "Green - X-Large": "price_1Rh1irAp2D4XT14xZAfidEWK",
  "Pink - Small": "price_1Rh1irAp2D4XT14xsC7BLi1A",
  "Pink - Medium": "price_1Rh1irAp2D4XT14xfT8bbvXR",
  "Pink - Large": "price_1Rh1isAp2D4XT14x3lWVhDD3",
  "Pink - X-Large": "price_1Rh1isAp2D4XT14xDdG3wa0F",
  "Natural - Small": "price_1Rh1isAp2D4XT14xtSe1Zz5s",
  "Natural - Medium": "price_1Rh1isAp2D4XT14xoiBkVR5e",
  "Natural - Large": "price_1Rh1isAp2D4XT14xvu0lvirm",
  "Natural - X-Large": "price_1Rh1itAp2D4XT14xqBroSG9f",
  "Yellow - Small": "price_1Rh1itAp2D4XT14x2LtmQoI9",
  "Yellow - Medium": "price_1Rh1itAp2D4XT14xiX4mjVoH",
  "Yellow - Large": "price_1Rh1itAp2D4XT14xM4OCQeBJ",
  "Yellow - X-Large": "price_1Rh1itAp2D4XT14x1ivdbGmS"
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

// Tanner price IDs
const tannerPriceIds = {
  "Green - Small": "price_1Rh1kPAp2D4XT14xa3z32GCN",
  "Green - Medium": "price_1Rh1kPAp2D4XT14xyLjFlTLM",
  "Green - Large": "price_1Rh1kQAp2D4XT14xeKHQCxNe",
  "Green - X-Large": "price_1Rh1kQAp2D4XT14xWDTcdOCL",
  "Pink - Small": "price_1Rh1kQAp2D4XT14x3dPx45Rd",
  "Pink - Medium": "price_1Rh1kQAp2D4XT14xgx5sLOz2",
  "Pink - Large": "price_1Rh1kQAp2D4XT14xMOWgSOlA",
  "Pink - X-Large": "price_1Rh1kRAp2D4XT14x2OfKFKCz",
  "Natural - Small": "price_1Rh1kRAp2D4XT14xzXEG3Apr",
  "Natural - Medium": "price_1Rh1kRAp2D4XT14x7vda2hPS",
  "Natural - Large": "price_1Rh1kRAp2D4XT14x77Nu28JL",
  "Natural - X-Large": "price_1Rh1kSAp2D4XT14xZrJvCarw",
  "Yellow - Small": "price_1Rh1kSAp2D4XT14xkePSp2Sp",
  "Yellow - Medium": "price_1Rh1kSAp2D4XT14xyISHPZgA",
  "Yellow - Large": "price_1Rh1kSAp2D4XT14xIn8xmyV1",
  "Yellow - X-Large": "price_1Rh1kSAp2D4XT14xP4amN9ID"
};

// Tong price IDs
const tongPriceIds = {
  "Green - Small": "price_1Rh1l9Ap2D4XT14xtZOtQGdz",
  "Green - Medium": "price_1Rh1lAAp2D4XT14xL2WPrPrV",
  "Green - Large": "price_1Rh1lAAp2D4XT14xWH18niLq",
  "Green - X-Large": "price_1Rh1lAAp2D4XT14xHeP1tKRa",
  "Pink - Small": "price_1Rh1lAAp2D4XT14xEyzOdKvs",
  "Pink - Medium": "price_1Rh1lAAp2D4XT14xqQxWpySY",
  "Pink - Large": "price_1Rh1lBAp2D4XT14xiymd287v",
  "Pink - X-Large": "price_1Rh1lBAp2D4XT14xoUWiBUhH",
  "Natural - Small": "price_1Rh1lBAp2D4XT14xgqtt34Xf",
  "Natural - Medium": "price_1Rh1lBAp2D4XT14xQnIxfg52",
  "Natural - Large": "price_1Rh1lBAp2D4XT14xYpuxpUvv",
  "Natural - X-Large": "price_1Rh1lCAp2D4XT14xddyV9wEL",
  "Yellow - Small": "price_1Rh1lCAp2D4XT14xMd5L3wsX",
  "Yellow - Medium": "price_1Rh1lCAp2D4XT14xyUabC1rI",
  "Yellow - Large": "price_1Rh1lCAp2D4XT14xUIv3GkFA",
  "Yellow - X-Large": "price_1Rh1lCAp2D4XT14xPDQPgvft"
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
    description: 'Show your unique style with this comfortable and eye-catching t-shirt. Available in multiple colors and sizes.',
    category: 'shirts',
    images: [
      { src: '/webpshirts/doge_front.webp', alt: 'Doge - Front' },
      { src: '/webpshirts/doge_folded.webp', alt: 'Doge - Folded' }
    ],
    colorImages: {
      'Green': [
        { src: '/webpshirts/doge_front.webp', alt: 'Doge - Front' },
        { src: '/webpshirts/doge_folded.webp', alt: 'Doge - Folded' }
      ],
      'Pink': [
        { src: '/webpshirts/doge_front.webp', alt: 'Doge - Front' },
        { src: '/webpshirts/doge_folded.webp', alt: 'Doge - Folded' }
      ],
      'Natural': [
        { src: '/webpshirts/doge_front.webp', alt: 'Doge - Front' },
        { src: '/webpshirts/doge_folded.webp', alt: 'Doge - Folded' }
      ],
      'Yellow': [
        { src: '/webpshirts/doge_front.webp', alt: 'Doge - Front' },
        { src: '/webpshirts/doge_folded.webp', alt: 'Doge - Folded' }
      ]
    },
    price: '$29.99',
    priceIds: dogePriceIds,
    sizes: Object.keys(dogePriceIds),
    slug: 'doge'
  },
  {
    id: 'doge-moon',
    name: 'Doge Moon',
    description: 'Show your unique style with this comfortable and eye-catching t-shirt. Available in multiple colors and sizes.',
    category: 'shirts',
    images: [
      { src: '/webpshirts/dogemoon_front.webp', alt: 'Doge Moon - Front' }
    ],
    colorImages: {
      'Green': [
        { src: '/webpshirts/dogemoon_front.webp', alt: 'Doge Moon - Front' }
      ],
      'Pink': [
        { src: '/webpshirts/dogemoon_front.webp', alt: 'Doge Moon - Front' }
      ],
      'Natural': [
        { src: '/webpshirts/dogemoon_front.webp', alt: 'Doge Moon - Front' }
      ],
      'Yellow': [
        { src: '/webpshirts/dogemoon_front.webp', alt: 'Doge Moon - Front' }
      ]
    },
    price: '$29.99',
    priceIds: dogeMoonPriceIds,
    sizes: Object.keys(dogeMoonPriceIds),
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
    description: 'Show your unique style with this comfortable and eye-catching t-shirt. Available in multiple colors and sizes.',
    category: 'shirts',
    images: [
      { src: '/webpshirts/tanner_front_black.webp', alt: 'Tanner - Black Front' }
    ],
    colorImages: {
      'Green': [
        { src: '/webpshirts/tanner_front_black.webp', alt: 'Tanner - Black Front' }
      ],
      'Pink': [
        { src: '/webpshirts/tanner_front_black.webp', alt: 'Tanner - Black Front' }
      ],
      'Natural': [
        { src: '/webpshirts/tanner_front_black.webp', alt: 'Tanner - Black Front' }
      ],
      'Yellow': [
        { src: '/webpshirts/tanner_front_black.webp', alt: 'Tanner - Black Front' }
      ]
    },
    price: '$29.99',
    priceIds: tannerPriceIds,
    sizes: Object.keys(tannerPriceIds),
    slug: 'tanner'
  },
  {
    id: 'tong',
    name: 'Tong',
    description: 'Show your unique style with this comfortable and eye-catching t-shirt. Available in multiple colors and sizes.',
    category: 'shirts',
    images: [
      { src: '/webpshirts/tong_front.webp', alt: 'Tong - Front' }
    ],
    colorImages: {
      'Green': [
        { src: '/webpshirts/tong_front.webp', alt: 'Tong - Front' }
      ],
      'Pink': [
        { src: '/webpshirts/tong_front.webp', alt: 'Tong - Front' }
      ],
      'Natural': [
        { src: '/webpshirts/tong_front.webp', alt: 'Tong - Front' }
      ],
      'Yellow': [
        { src: '/webpshirts/tong_front.webp', alt: 'Tong - Front' }
      ]
    },
    price: '$29.99',
    priceIds: tongPriceIds,
    sizes: Object.keys(tongPriceIds),
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