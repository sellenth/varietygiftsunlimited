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
  {
    id: 'accessories',
    name: 'Accessories',
    description: 'Pet accessories including bandanas, bow ties, and more',
    image: '/chewbarka/item.webp', // Featured accessory image
    slug: 'accessories'
  },
  {
    id: 'hats',
    name: 'Hats',
    description: 'Stylish hats to complete your look',
    image: '/gym-brat-hat/brat_hat_product.webp', // Featured hat image
    slug: 'hats'
  },
];