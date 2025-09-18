import { products, type Product } from "./products";

const FEATURED_PRODUCT_IDS = [
  "halloween-ghosts",
  "cats-pumpkins-t-shirt",
  "cats-pumpkins-crewneck",
  "freudian-tank",
] as const;

export const featuredProductIds = [...FEATURED_PRODUCT_IDS];

export const featuredProducts: Product[] = FEATURED_PRODUCT_IDS
  .map((id) => products.find((product) => product.id === id))
  .filter((product): product is Product => Boolean(product));

