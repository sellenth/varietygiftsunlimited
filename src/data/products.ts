import { StripeProductManager } from './products-config';

// For backward compatibility, export products in the legacy format
export interface Product {
  id: string;
  name: string;
  description: string;
  category: 'bags' | 'shirts' | 'bandana' | 'tote';
  images: { src: string; alt: string }[];
  colorImages?: { [color: string]: { src: string; alt: string }[] };
  price: string;
  priceId?: string;
  priceIds?: { [size: string]: string };
  sizes?: string[];
  slug: string;
}

// Convert new format back to legacy format for existing components
function convertToLegacyFormat(): Product[] {
  return StripeProductManager.getAllProducts().map(config => {
    const hasColorVariants = config.colorImages && Object.keys(config.colorImages).length > 0;
    const hasSizeVariants = config.variants.sizes && config.variants.sizes.length > 0;
    
    let legacyProduct: Product = {
      id: config.id,
      name: config.name,
      description: config.description,
      category: config.category,
      images: config.images,
      price: config.displayPrice,
      slug: config.slug
    };

    // Add colorImages if they exist
    if (config.colorImages) {
      legacyProduct.colorImages = config.colorImages;
    }

    // Handle pricing structure
    if (hasSizeVariants || hasColorVariants) {
      legacyProduct.priceIds = config.priceMatrix;
      legacyProduct.sizes = Object.keys(config.priceMatrix);
    } else {
      // Single price product
      legacyProduct.priceId = Object.values(config.priceMatrix)[0];
    }

    return legacyProduct;
  });
}

export const products = convertToLegacyFormat();

// Export the new manager for modern usage
export { StripeProductManager };

// Helper functions for components to use the new abstraction
export const ProductHelper = {
  getPrice: (productId: string, size?: string, color?: string) => {
    return StripeProductManager.getPrice(productId, { size, color });
  },
  
  getVariants: (productId: string) => {
    return StripeProductManager.getVariants(productId);
  },
  
  getImages: (productId: string, color?: string) => {
    return StripeProductManager.getImages(productId, color);
  },
  
  createPaymentLink: (productId: string, size?: string, color?: string) => {
    return StripeProductManager.createPaymentLink(productId, { size, color });
  },

  getProductsByCategory: (category: string) => {
    return StripeProductManager.getProductsByCategory(category);
  }
};