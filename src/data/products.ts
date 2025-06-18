import { bagNames } from './bagsData';

export interface Product {
  id: string;
  name: string;
  description: string;
  category: 'bags' | 'shirts' | 'bandana' | 'tote';
  images: { src: string; alt: string }[];
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

export const products: Product[] = [
  // Bags
  ...Array.from({ length: 13 }, (_, i) => ({
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
      { src: '/webpshirts/Front.webp', alt: 'Cool Aunts Club T-Shirt Front' },
      { src: '/webpshirts/Back.webp', alt: 'Cool Aunts Club T-Shirt Back' },
      { src: '/webpshirts/Folded.webp', alt: 'Cool Aunts Club T-Shirt Folded' }
    ],
    price: '$29.99',
    priceIds: coolAuntsClubPriceIds,
    sizes: Object.keys(coolAuntsClubPriceIds),
    slug: 'cool-aunts-club'
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