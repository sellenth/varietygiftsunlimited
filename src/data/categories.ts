export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  slug: string;
}

export const categories: Category[] = [
  {
    id: 'bags',
    name: 'Crochet Bags',
    description: 'Handmade crochet bags for every occasion',
    image: '/bags/bags/1.webp', // Featured bag image
    slug: 'bags'
  },
  {
    id: 'shirts',
    name: 'Shirts',
    description: 'Comfortable and stylish t-shirts with unique designs',
    image: '/yoga/corgi1.jpg', // Featured shirt image
    slug: 'shirts'
  },
];