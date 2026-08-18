import { products, type Product } from "./products";
import { orderProductsForBuild } from "./productSeasonality";

const FEATURED_PRODUCT_IDS = [
  "freudian-tank",
  "chewbarka-bandana",
  "gym-brat-cropped-shirt",
  "bag-5",
] as const;

export const featuredProductIds = [...FEATURED_PRODUCT_IDS];

export const featuredProducts: Product[] = orderProductsForBuild(
  FEATURED_PRODUCT_IDS
    .map((id) => products.find((product) => product.id === id))
    .filter((product): product is Product => Boolean(product)),
);
