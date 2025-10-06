# Getting Started with CyberSim Pro Marketing Website

## 🎉 Quick Start

The marketing website is now ready to use! Follow these simple steps:

### 1. Start the Development Server

```bash
cd CyberSimPro-Project/apps/marketing-nextjs
npm run dev
```

The site will be available at: **http://localhost:3004**

### 2. Build for Production

```bash
npm run build
npm start
```

## 📋 What's Included

### ✅ Complete Sections
- **Hero Section** - Animated hero with gradient effects, floating icons, and CTAs
- **Features Section** - 6 feature cards with icons and animations
- **Pricing Section** - 3 pricing tiers with FAQ accordion
- **Contact Section** - Contact form with validation
- **Footer** - Multi-column links and social media

### ✅ Key Features
- ⚡ Next.js 14 with App Router
- 🎨 Tailwind CSS for styling
- 🎭 Framer Motion for animations
- 📱 Fully responsive design
- 🎯 SEO optimized
- ♿ Accessible components

### ✅ Animations
- Fade-in on scroll
- Slide-in effects
- Hover animations
- Mobile menu transitions
- Floating elements
- Gradient animations

## 🎨 Design Highlights

- **Modern UI** - Professional gradient designs inspired by Endor Labs
- **Glassmorphism** - Backdrop blur effects
- **Dark Theme** - Emerald green color palette (#10b981)
- **Smooth Animations** - Powered by Framer Motion
- **Responsive** - Mobile-first approach

## 📱 Port Configuration

The marketing site runs on **port 3004** to avoid conflicts with:
- API (port 3003)
- Dashboard (port 3000)
- Old marketing site (port varies)

## 🔧 Customization

### Colors
Edit `tailwind.config.ts` to modify the brand colors

### Content
- Hero text: `src/components/HeroSection.tsx`
- Features: `src/components/FeaturesSection.tsx`
- Pricing: `src/components/PricingSection.tsx`
- Contact: `src/components/ContactSection.tsx`

### Animations
Adjust Framer Motion settings in each component file

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
# Deploy to Vercel
```

### Docker
```bash
docker build -t cybersim-marketing .
docker run -p 3004:3004 cybersim-marketing
```

### Static Export
```bash
# Add to next.config.js: output: 'export'
npm run build
# Deploy the 'out' folder to any static host
```

## 🔗 Navigation Links

The site includes these main sections:
- `#features` - Features section
- `#workflows` - Workflows (optional to add)
- `#pricing` - Pricing section
- `#resources` - Resources (optional to add)
- `#about` - About (optional to add)
- `#contact` - Contact section

## 🎯 Next Steps

### Optional Enhancements
1. **Add Blog Section** - Create blog post pages
2. **Add About Page** - Team and company information
3. **Add Resources Section** - Documentation and guides
4. **Add Workflows Section** - Detailed workflow explanations
5. **Connect Contact Form** - Integrate with backend API
6. **Add Analytics** - Google Analytics or similar
7. **Add More Animations** - Additional Framer Motion effects

### Integration
- Connect contact form to API endpoint
- Add newsletter signup functionality
- Integrate with CMS for blog posts
- Add authentication for gated content

## 📞 Support

For questions or issues:
- Email: support@cybersimpro.com
- Check README.md for detailed documentation
- Review component files for inline comments

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)

---

**Built with ❤️ for CyberSim Pro**
