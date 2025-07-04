export interface ProductVariant {
  size?: string;
  color?: string;
}

export interface ProductConfig {
  id: string;
  name: string;
  description: string;
  category: 'bags' | 'shirts' | 'bandana' | 'tote';
  basePrice: number; // in cents
  displayPrice: string;
  images: { src: string; alt: string }[];
  colorImages?: { [color: string]: { src: string; alt: string }[] };
  variants: {
    sizes?: string[];
    colors?: string[];
  };
  priceMatrix: { [key: string]: string }; // Maps variant combinations to Stripe price IDs
  slug: string;
}

export class StripeProductManager {
  private static products: Map<string, ProductConfig> = new Map();

  static registerProduct(config: ProductConfig) {
    this.products.set(config.id, config);
  }

  static getProduct(productId: string): ProductConfig | undefined {
    return this.products.get(productId);
  }

  static getAllProducts(): ProductConfig[] {
    return Array.from(this.products.values());
  }

  static getProductsByCategory(category: string): ProductConfig[] {
    return Array.from(this.products.values()).filter(p => p.category === category);
  }

  /**
   * Get Stripe price ID for a specific product variant
   */
  static getPrice(productId: string, variant: ProductVariant = {}): string | null {
    const product = this.products.get(productId);
    if (!product) return null;

    // Handle single-variant products (no colors/sizes)
    if (!product.variants.sizes && !product.variants.colors) {
      // Return the single price ID (assuming it's stored as a direct value)
      const priceIds = Object.values(product.priceMatrix);
      return priceIds[0] || null;
    }

    // Handle size-only products (like current doge, tanner, etc.)
    if (product.variants.sizes && !product.variants.colors) {
      const key = variant.size || product.variants.sizes[0];
      return product.priceMatrix[key] || null;
    }

    // Handle color+size products
    if (product.variants.colors && product.variants.sizes) {
      const color = variant.color || product.variants.colors[0];
      const size = variant.size || product.variants.sizes[0];
      const key = `${color} - ${size}`;
      return product.priceMatrix[key] || null;
    }

    return null;
  }

  /**
   * Get available variants for a product
   */
  static getVariants(productId: string): { sizes?: string[]; colors?: string[] } {
    const product = this.products.get(productId);
    return product?.variants || {};
  }

  /**
   * Get images for a specific color variant, fallback to default images
   */
  static getImages(productId: string, color?: string): { src: string; alt: string }[] {
    const product = this.products.get(productId);
    if (!product) return [];

    if (color && product.colorImages?.[color]) {
      return product.colorImages[color];
    }

    return product.images;
  }

  /**
   * Create a Stripe payment link URL
   */
  static createPaymentLink(productId: string, variant: ProductVariant = {}): string | null {
    const priceId = this.getPrice(productId, variant);
    if (!priceId) return null;

    // This would typically create a Stripe payment link
    // For now, return a placeholder that could be used with Stripe's API
    return `https://buy.stripe.com/test_${priceId}`;
  }

  /**
   * Convert legacy product format to ProductConfig
   */
  static convertLegacyProduct(legacyProduct: any): ProductConfig {
    const hasColorVariants = legacyProduct.colorImages && Object.keys(legacyProduct.colorImages).length > 0;
    const hasSizeVariants = legacyProduct.sizes && legacyProduct.sizes.length > 0;

    let variants: { sizes?: string[]; colors?: string[] } = {};
    let priceMatrix: { [key: string]: string } = {};

    if (hasColorVariants) {
      variants.colors = Object.keys(legacyProduct.colorImages);
    }

    if (hasSizeVariants) {
      variants.sizes = legacyProduct.sizes;
    }

    // Handle different price ID structures
    if (legacyProduct.priceIds) {
      if (typeof legacyProduct.priceIds === 'object') {
        priceMatrix = legacyProduct.priceIds;
      }
    } else if (legacyProduct.priceId) {
      // Single price product
      priceMatrix['default'] = legacyProduct.priceId;
    }

    // Extract base price from display price
    const basePrice = parseInt(legacyProduct.price.replace(/[$,]/g, '')) * 100;

    return {
      id: legacyProduct.id,
      name: legacyProduct.name,
      description: legacyProduct.description,
      category: legacyProduct.category,
      basePrice,
      displayPrice: legacyProduct.price,
      images: legacyProduct.images,
      colorImages: legacyProduct.colorImages,
      variants,
      priceMatrix,
      slug: legacyProduct.slug
    };
  }
}