// Product detail client-side functionality
export class ProductDetailManager {
    private buyButton: HTMLElement | null;
    private sizeSelect: HTMLSelectElement | null;
    private isColorSize: boolean;
    private hasVariants: boolean;
    private productId: string | null;
    private stripe: any = null;
    private stripeLoadError: boolean = false;

    constructor() {
        this.buyButton = document.getElementById("buy-button");
        this.sizeSelect = document.getElementById("size-select") as HTMLSelectElement;
        this.isColorSize = this.buyButton?.dataset?.isColorSize === "true";
        this.hasVariants = this.buyButton?.dataset?.hasVariants === "true";
        this.productId = this.buyButton?.dataset?.productId || null;
        
        this.init();
    }

    private async init() {
        await this.initializeStripe();
        this.setupEventListeners();
        this.initializeCarousel();
        this.makeHelperAvailable();
    }

    private async initializeStripe() {
        const isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        
        if (!isDev && this.buyButton?.dataset?.stripeKey) {
            try {
                const { loadStripe } = await import("@stripe/stripe-js");
                const stripeKey = this.buyButton.dataset.stripeKey;
                this.stripe = await loadStripe(stripeKey);
                
                if (!this.stripe) {
                    console.error("Failed to initialize Stripe.");
                    this.stripeLoadError = true;
                }
            } catch (error) {
                console.error("Error loading Stripe:", error);
                this.stripeLoadError = true;
            }
        } else {
            console.log("Stripe disabled in development mode");
            this.stripeLoadError = true;
        }
    }

    private setupEventListeners() {
        // Color selection handling
        document.querySelectorAll('.color-orb').forEach(orb => {
            orb.addEventListener('click', (e) => {
                const target = e.target as HTMLElement;
                this.handleColorSelection(target);
            });
        });

        // Buy button handling
        this.buyButton?.addEventListener("click", () => {
            this.handlePurchase();
        });
    }

    private async handleColorSelection(orb: HTMLElement) {
        // Remove active class from all orbs
        document.querySelectorAll('.color-orb').forEach(o => o.classList.remove('active'));
        // Add active class to clicked orb
        orb.classList.add('active');
        
        // Update images if we have a productId
        const color = orb.getAttribute('data-color');
        if (color && this.productId) {
            await this.updateImages(color);
        }
    }

    private async updateImages(color: string) {
        if (this.productId) {
            try {
                // Use the global helper function
                const images = (window as any).getProductImages?.(this.productId, color);
                if (images && images.length > 0) {
                    // Update carousel images
                    const carousel = document.querySelector('.carousel');
                    if (carousel) {
                        const newImagesHTML = images.map((img: any) => 
                            `<div class="carousel-item">
                                <img src="${img.src}" alt="${img.alt}" class="w-full h-full object-cover">
                            </div>`
                        ).join('');
                        carousel.innerHTML = newImagesHTML;
                        
                        // Reinitialize carousel
                        this.initializeCarousel();
                    }
                }
            } catch (error) {
                console.error('Error updating images:', error);
            }
        }
    }

    private getPriceId(): string | null {
        if (!this.hasVariants) {
            return this.buyButton?.dataset?.stripePaymentId || null;
        }

        if (this.productId && this.hasVariants) {
            const activeOrb = document.querySelector('.color-orb.active');
            const color = activeOrb?.getAttribute('data-color');
            const size = this.sizeSelect?.value;
            
            // Use the global helper function
            return (window as any).getProductPrice?.(this.productId, size, color) || null;
        }

        // Fallback to legacy method
        if (this.isColorSize && this.sizeSelect) {
            const activeOrb = document.querySelector('.color-orb.active');
            const color = activeOrb?.getAttribute('data-color') || '';
            const size = this.sizeSelect.value;
            const key = `${color} - ${size}`;
            const priceData = (window as any).priceIds || {};
            return priceData[key] || this.buyButton?.dataset?.stripePaymentId || null;
        }
        
        return this.sizeSelect?.value || this.buyButton?.dataset?.stripePaymentId || null;
    }

    private async handlePurchase() {
        if (this.stripeLoadError) {
            alert("Payment system is temporarily unavailable. Please try again later.");
            return;
        }

        const priceId = this.getPriceId();
        if (!priceId) {
            alert("Please select all options before purchasing.");
            return;
        }

        try {
            if (this.buyButton) {
                this.buyButton.textContent = "Processing...";
                (this.buyButton as HTMLButtonElement).disabled = true;
            }

            const { error } = await this.stripe.redirectToCheckout({
                lineItems: [{ price: priceId, quantity: 1 }],
                mode: 'payment',
                successUrl: `${window.location.origin}/success`,
                cancelUrl: window.location.href,
            });

            if (error) {
                console.error("Stripe error:", error);
                alert("An error occurred. Please try again.");
            }
        } catch (error) {
            console.error("Payment error:", error);
            alert("An error occurred. Please try again.");
        } finally {
            if (this.buyButton) {
                this.buyButton.textContent = "Buy Now";
                (this.buyButton as HTMLButtonElement).disabled = false;
            }
        }
    }

    private initializeCarousel() {
        const carousel = document.querySelector('.carousel');
        const items = carousel?.querySelectorAll('.carousel-item');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        if (carousel && items && prevBtn && nextBtn) {
            let currentIndex = 1;
            const maxIndex = items.length;

            if (maxIndex <= 1) {
                (prevBtn as HTMLElement).style.display = 'none';
                (nextBtn as HTMLElement).style.display = 'none';
                return;
            }

            const updateCarousel = () => {
                const offset = -currentIndex * 100;
                (carousel as HTMLElement).style.transform = `translateX(${offset}%)`;
            };

            prevBtn.addEventListener('click', () => {
                currentIndex = currentIndex > 0 ? currentIndex - 1 : maxIndex - 1;
                updateCarousel();
            });

            nextBtn.addEventListener('click', () => {
                currentIndex = currentIndex < maxIndex - 1 ? currentIndex + 1 : 0;
                updateCarousel();
            });

            updateCarousel();
        }
    }

    private makeHelperAvailable() {
        // Make helper functions available globally for the component
        (window as any).getProductPrice = (productId: string, size?: string, color?: string) => {
            // This will be populated by server-side data
            const productData = (window as any).productManagerData;
            if (productData && productData[productId]) {
                const product = productData[productId];
                if (!size && !color) {
                    return Object.values(product.priceMatrix)[0];
                }
                
                if (color && size) {
                    return product.priceMatrix[`${color} - ${size}`];
                } else if (size) {
                    return product.priceMatrix[size];
                }
            }
            return null;
        };

        (window as any).getProductImages = (productId: string, color?: string) => {
            const productData = (window as any).productManagerData;
            if (productData && productData[productId]) {
                const product = productData[productId];
                if (color && product.colorImages && product.colorImages[color]) {
                    return product.colorImages[color];
                }
                return product.images;
            }
            return [];
        };
    }
}

// Auto-initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new ProductDetailManager();
    });
} else {
    new ProductDetailManager();
}