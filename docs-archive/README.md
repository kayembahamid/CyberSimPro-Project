# 🛡️ CyberSim Pro - Complete Cybersecurity Training Platform

A comprehensive, production-ready cybersecurity training platform with gamified learning, phishing simulations, and enterprise management tools.

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start database
docker-compose up -d postgres

# 3. Setup database
cd apps/api
npx prisma generate
npx prisma migrate deploy
npx prisma db seed

# 4. Start all services
cd ../..
npm run dev
```

**Access Points:**
- 🌐 Marketing Site: http://localhost:3004
- 📊 Dashboard: http://localhost:3001
- 🔌 API: http://localhost:3000

---

## 📋 Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    CyberSim Pro Ecosystem                    │
└─────────────────────────────────────────────────────────────┘

┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│  Marketing Site  │────▶│    Dashboard     │────▶│   Backend API    │
│   Port: 3004     │     │   Port: 3001     │     │   Port: 3000     │
│                  │     │                  │     │                  │
│ - Landing Page   │     │ - Admin Panel    │     │ - REST API       │
│ - Demo Booking   │     │ - Training Games │     │ - Database       │
│ - Features       │     │ - Employee Mgmt  │     │ - Auth           │
│ - Pricing        │     │ - Analytics      │     │ - Stripe         │
└──────────────────┘     └──────────────────┘     └──────────────────┘
         │                        │                        │
         └────────────────────────┴────────────────────────┘
                                  │
                         ┌────────▼────────┐
                         │   PostgreSQL    │
                         │   Port: 5432    │
                         └─────────────────┘
```

---

## 🎯 Features Implemented

### ✅ Marketing Website
- [x] Animated landing page with hero section
- [x] Demo booking form with validation
- [x] Features showcase
- [x] Pricing tables
- [x] Contact form
- [x] Thank you page
- [x] Responsive design

### ✅ Gamified Training (Banzai-Style)
- [x] Story-driven narrative (dragon attacking kingdom)
- [x] Lives system (4 wrong turns)
- [x] Wallet system (earn money)
- [x] Cyber Coins progress bar
- [x] Days remaining countdown
- [x] Interactive questions
- [x] Instant feedback with explanations
- [x] Progress tracking
- [x] Completion page with trophy

### ✅ Backend API
- [x] Demo booking endpoints
- [x] Employee management (CSV upload)
- [x] Billing/Stripe integration
- [x] Training content API
- [x] Progress tracking
- [x] Authentication middleware
- [x] Error handling

### ✅ Database
- [x] PostgreSQL with Prisma ORM
- [x] User management
- [x] Organization structure
- [x] Employee records
- [x] Training sessions
- [x] Phishing campaigns
- [x] Demo requests
- [x] Subscriptions

---

## 📁 Project Structure

```
CyberSimPro-Project/
├── apps/
│   ├── api/                    # Backend API (Node.js + Express)
│   │   ├── src/
│   │   │   ├── routes/        # API routes
│   │   │   │   ├── demo.routes.ts
│   │   │   │   ├── billing.routes.ts
│   │   │   │   ├── employees.routes.ts
│   │   │   │   └── training.routes.ts
│   │   │   ├── middleware/    # Auth, error handling
│   │   │   ├── config/        # Database config
│   │   │   └── app.ts         # Express app
│   │   ├── prisma/
│   │   │   └── schema.prisma  # Database schema
│   │   └── package.json
│   │
│   ├── dashboard/             # Admin & Employee Dashboard (Next.js)
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── dashboard/
│   │   │   │   │   └── training/[moduleId]/
│   │   │   │   │       ├── play/page.tsx        # Training game
│   │   │   │   │       └── complete/page.tsx    # Completion
│   │   │   │   ├── login/
│   │   │   │   └── signup/
│   │   │   └── components/    # Reusable components
│   │   └── package.json
│   │
│   └── marketing-nextjs/      # Marketing Website (Next.js)
│       ├── src/
│       │   ├── app/
│       │   │   ├── page.tsx           # Landing page
│       │   │   └── thank-you/page.tsx # Thank you
│       │   └── components/
│       │       ├── DemoBookingForm.tsx
│       │       ├── HeroSection.tsx
│       │       ├── FeaturesSection.tsx
│       │       └── PricingSection.tsx
│       └── package.json
│
├── packages/
│   ├── database/              # Shared database package
│   └── mcp-server/            # MCP integration
│
├── docker-compose.yml         # PostgreSQL + Redis
├── turbo.json                 # Monorepo config
├── package.json               # Root package
└── README.md                  # This file
```

---

## 🔧 Installation & Setup

### Prerequisites
- Node.js 18+ 
- Docker & Docker Compose
- npm or yarn

### Step 1: Clone & Install
```bash
git clone <repository-url>
cd CyberSimPro-Project
npm install
```

### Step 2: Environment Setup

Create `.env` files for each app:

**apps/api/.env**
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/cybersim_dev"
JWT_SECRET="your-super-secret-jwt-key-minimum-32-characters-required"
SESSION_SECRET="your-session-secret-key"
STRIPE_SECRET_KEY="sk_test_your_stripe_key"
STRIPE_WEBHOOK_SECRET="whsec_your_webhook_secret"
SMTP_HOST="smtp.sendgrid.net"
SMTP_PORT="587"
SMTP_USER="apikey"
SMTP_PASS="your-sendgrid-api-key"
PORT=3000
NODE_ENV="development"
```

**apps/dashboard/.env.local**
```env
NEXT_PUBLIC_API_URL="http://localhost:3000"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_your_key"
```

**apps/marketing-nextjs/.env.local**
```env
NEXT_PUBLIC_API_URL="http://localhost:3000"
NEXT_PUBLIC_DASHBOARD_URL="http://localhost:3001"
```

### Step 3: Database Setup
```bash
# Start PostgreSQL
docker-compose up -d postgres

# Setup Prisma
cd apps/api
npx prisma generate
npx prisma migrate deploy
npx prisma db seed
cd ../..
```

### Step 4: Start Development Servers

**Option A: All at once (recommended)**
```bash
npm run dev
```

**Option B: Individual services**
```bash
# Terminal 1 - API
cd apps/api && npm run dev

# Terminal 2 - Dashboard
cd apps/dashboard && npm run dev

# Terminal 3 - Marketing
cd apps/marketing-nextjs && npm run dev
```

---

## 🧪 Testing

### Quick Test
```bash
# Test API health
curl http://localhost:3000/api/health

# Test demo booking
curl -X POST http://localhost:3000/api/demos \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "company": "Test Co",
    "employeeCount": "1-50"
  }'

# Test training game content
curl http://localhost:3000/api/training/phishing-101/game
```

### Manual Testing Checklist

1. **Marketing Site** (http://localhost:3004)
   - [ ] Page loads successfully
   - [ ] Click "Book Demo" button
   - [ ] Fill and submit form
   - [ ] Redirects to thank-you page

2. **Training Game** (http://localhost:3001/dashboard/training/phishing-101/play)
   - [ ] Game loads with stats bar
   - [ ] Story introduction displays
   - [ ] Questions appear correctly
   - [ ] Answer submission works
   - [ ] Lives decrease on wrong answer
   - [ ] Score increases on correct answer
   - [ ] Completion page shows

3. **API Endpoints**
   - [ ] GET /api/demos - Lists demo requests
   - [ ] POST /api/employees/upload - CSV upload
   - [ ] GET /api/training/modules - Lists modules
   - [ ] POST /api/billing/create-checkout - Stripe

---

## 🚀 Deployment

### Production Checklist
- [ ] Update environment variables with production values
- [ ] Set up production database (Supabase/Railway)
- [ ] Add real Stripe API keys
- [ ] Configure SendGrid for emails
- [ ] Set up monitoring (Sentry)
- [ ] Configure CORS for production domains
- [ ] Set up SSL certificates
- [ ] Configure CDN for assets

### Deploy to Production

**1. Database** (Supabase recommended)
```bash
# Create database on supabase.com
# Update DATABASE_URL in production
npx prisma migrate deploy
```

**2. API Backend** (Railway recommended)
```bash
railway login
railway init
railway up
# Add environment variables in dashboard
```

**3. Frontend Apps** (Vercel recommended)
```bash
# Dashboard
cd apps/dashboard
vercel --prod

# Marketing
cd apps/marketing-nextjs
vercel --prod
```

**4. Domain Configuration**
- Marketing: `cybersimpro.com`
- Dashboard: `app.cybersimpro.com`
- API: `api.cybersimpro.com`

---

## 📚 Documentation

- [API Documentation](./docs/API_DOCUMENTATION.md)
- [Deployment Guide](./docs/DEPLOYMENT_GUIDE.md)
- [User Guide](./docs/USER_GUIDE.md)
- [Build Summary](./BUILD_COMPLETE_SUMMARY.md)

---

## 🛠️ Development

### Adding New Features

1. **Add API Route**
```typescript
// apps/api/src/routes/feature.routes.ts
import { Router } from 'express'
const router = Router()

router.get('/', (req, res) => {
  res.json({ success: true })
})

export default router
```

2. **Register in app.ts**
```typescript
import featureRouter from './routes/feature.routes'
app.use('/api/feature', featureRouter)
```

3. **Add Database Model** (if needed)
```prisma
// apps/api/prisma/schema.prisma
model Feature {
  id        String   @id @default(uuid())
  name      String
  createdAt DateTime @default(now())
}
```

4. **Run Migration**
```bash
cd apps/api
npx prisma migrate dev --name add_feature
```

### Code Style

- **TypeScript**: Strict mode enabled
- **Formatting**: Prettier with 2-space indentation
- **Linting**: ESLint with recommended rules
- **Commits**: Conventional commits format

---

## 🤝 Support

For issues or questions:
- Open an issue on GitHub
- Email: support@cybersimpro.com
- Documentation: https://docs.cybersimpro.com

---

## 📄 License

Proprietary - All Rights Reserved

---

## 🎉 Credits

Built with:
- Next.js 14
- Express.js
- Prisma ORM
- PostgreSQL
- TailwindCSS
- Framer Motion
- TypeScript

---

**Version**: 1.0.0  
**Last Updated**: October 2025  
**Status**: Production Ready 🚀
