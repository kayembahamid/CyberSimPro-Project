# CyberSim Pro Marketing Website

A modern, animated marketing website built with Next.js 14, Tailwind CSS, and Framer Motion. Features a professional design inspired by Endor Labs with smooth animations and responsive layouts.

## 🚀 Features

- ⚡ **Next.js 14** - Latest App Router with Server Components
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🎭 **Framer Motion** - Smooth animations and transitions
- 📱 **Fully Responsive** - Mobile-first design approach
- 🎯 **SEO Optimized** - Meta tags and semantic HTML
- ♿ **Accessible** - WCAG compliant components
- 🎨 **Modern UI** - Professional gradient designs and glassmorphism

## 📦 Tech Stack

- **Framework**: Next.js 14.2.0
- **Language**: TypeScript 5.3.0
- **Styling**: Tailwind CSS 3.4.0
- **Animations**: Framer Motion 11.0.0
- **Icons**: Lucide React 0.344.0
- **Utilities**: clsx, tailwind-merge

## 🛠️ Installation

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3004](http://localhost:3004) in your browser

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/
│   ├── Navigation.tsx      # Sticky navigation with mobile menu
│   ├── HeroSection.tsx     # Animated hero with gradient effects
│   ├── FeaturesSection.tsx # Feature cards with hover effects
│   ├── PricingSection.tsx  # Pricing plans with FAQ
│   ├── ContactSection.tsx  # Contact form with validation
│   └── Footer.tsx          # Footer with links and social media
└── lib/
    └── utils.ts            # Utility functions (cn helper)
```

## 🎨 Color Palette

```css
Brand Colors:
- Primary: #10b981 (Emerald)
- Secondary: #86efac (Light Green)
- Accent: #059669 (Dark Green)

Background:
- Dark: #050c08
- Surface: #000d08
```

## 🚀 Build & Deploy

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

### Lint Code

```bash
npm run lint
```

## 📝 Sections

### 1. Hero Section
- Animated gradient background
- Floating icon elements
- Call-to-action buttons
- Key statistics display

### 2. Features Section
- 6 feature cards with icons
- Hover animations
- Stats banner
- Background grid pattern

### 3. Pricing Section
- 3 pricing tiers
- Highlighted recommended plan
- FAQ accordion
- Call-to-action buttons

### 4. Contact Section
- Contact form with validation
- Contact information cards
- Feature highlights

### 5. Footer
- Multi-column link sections
- Social media links
- System status indicator

## 🎯 Performance Optimizations

- Server-side rendering (SSR)
- Image optimization with Next.js Image
- Code splitting and lazy loading
- Optimized animations with Framer Motion
- Tailwind CSS purging for minimal bundle size

## 🔧 Configuration Files

- `next.config.js` - Next.js configuration
- `tailwind.config.ts` - Tailwind CSS customization
- `tsconfig.json` - TypeScript configuration
- `postcss.config.js` - PostCSS plugins

## 📱 Responsive Breakpoints

```
sm:  640px  - Mobile landscape
md:  768px  - Tablet
lg:  1024px - Desktop
xl:  1280px - Large desktop
2xl: 1536px - Extra large desktop
```

## 🎨 Animation Examples

The site uses Framer Motion for:
- Fade-in animations on scroll
- Slide-in effects for content
- Hover state animations
- Mobile menu transitions
- Floating elements
- Gradient animations

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is part of CyberSim Pro.

## 👥 Contributing

Contact the development team for contribution guidelines.

## 🐛 Known Issues

TypeScript errors for framer-motion will be resolved after running `npm install`.

## 🔗 Related Projects

- CyberSim Pro API
- CyberSim Pro Dashboard
- CyberSim Pro Database Package

## 📞 Support

For support, email support@cybersimpro.com or visit our documentation.
