# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Variety Gifts Unlimited is an Astro-based e-commerce site that blends AI, art, games, and a small shop. It features interactive experiences like pet photo converters, fight night intro generators, and browser games, alongside an online store selling custom apparel and accessories.

**Live Site**: https://www.variety.gifts

## Common Development Commands

### Development Server
```bash
npm run start        # Start development server with --host flag
npm run astro        # Access astro CLI directly
```

### Build & Deploy
```bash
npm run build        # Build for production using astro.config-server.mjs (includes type checking)
npm run preview      # Preview production build locally
```

### Testing
```bash
npm test             # Run Vitest tests
npm run test:ui      # Launch Vitest UI
npm run test:coverage # Generate test coverage report
```

### Package Management
```bash
npm i                # Install dependencies (also runs during build)
```

## High-Level Architecture

### Framework Stack
- **Astro 5.12.3**: Static site generator with islands architecture
- **React 18.3.1**: Component library for interactive elements
- **TailwindCSS + DaisyUI**: Styling with component library
- **TypeScript**: Type safety throughout
- **Vitest**: Testing framework
- **Vercel**: Deployment platform

### Directory Structure
```
src/
├── components/        # Reusable Astro and React components
├── config/           # Theme configuration and switching logic
├── content/          # Content configuration
├── data/             # Product data, categories, and static content
├── layouts/          # Layout components (primary: Layout.astro)
├── lib/server/       # Server-side utilities (KV storage)
├── pages/            # File-based routing (Astro pages)
└── styles/           # Global styles and animations
```

### Key Architectural Patterns

#### Theme System
- **Dynamic theming** via `src/config/theme.ts`
- Currently supports "default" and "fall" themes
- Themes control landing page copy, styling, and seasonal features
- Theme switching affects CSS variables and component behavior

#### Product Management
- **Centralized product data** in `src/data/products.ts`
- **Stripe integration** with price IDs for different sizes/colors
- **Category-based organization** (bags, shirts, bandana, tote, hats)
- **Featured products** system for homepage display

#### Page Structure
- **Layout.astro** provides consistent page wrapper with SEO meta tags
- **File-based routing** with special pages:
  - `/shop` - Product catalog
  - `/pet-converter` - AI pet photo transformation
  - `/intro` - Fight night intro generator
  - `/game-browser` - Browser games hub
  - `/gifty-dodge` - Specific game implementation

#### Component Architecture
- **Astro components** (.astro) for static/server-rendered content
- **React components** for interactive features (form handling, games)
- **Shared styling** through TailwindCSS classes and CSS custom properties

### Configuration Files
- **astro.config.mjs**: Local development configuration with SSL
- **astro.config-server.mjs**: Production build configuration with Vercel adapter
- **tailwind.config.mjs**: Styling configuration with DaisyUI theme customization
- **vitest.config.ts**: Test configuration with React support and path aliases

### External Integrations
- **Stripe**: Payment processing with product-specific price IDs
- **OpenAI Realtime API**: For AI-powered features
- **Vercel Analytics**: Site analytics tracking
- **Phaser**: Game development framework for browser games
- **Three.js**: 3D graphics capabilities

### Development Notes
- **Environment-aware URLs**: Base URL switches between localhost and production
- **SSL in development**: Uses basicSsl plugin for HTTPS locally
- **Happy DOM**: Testing environment for fast DOM simulation
- **Responsive design**: Mobile-first approach with extensive breakpoint handling
- **SEO optimized**: Comprehensive meta tags, Open Graph, and Twitter Card support

### Testing Strategy
- **Coverage requirements**: 90% threshold for statements, branches, functions, and lines
- **Test setup**: Located in `src/test/setup.ts`
- **Testing tools**: React Testing Library with user-event support
- **DOM environment**: Happy DOM for fast, lightweight testing

This architecture supports rapid development of new products, seasonal theme updates, and integration of AI-powered interactive features while maintaining a performant, SEO-friendly e-commerce experience.