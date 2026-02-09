# CyberSim Pro - Cybersecurity Training Platform

Enterprise cybersecurity training platform with gamified learning modules, phishing simulations, and comprehensive analytics.

##  Overview

CyberSim Pro is a comprehensive cybersecurity training platform designed for organizations to train employees on cybersecurity best practices through:
- Gamified training modules (Banzai-style interactive learning)
- Phishing simulation campaigns
- Analytics & reporting dashboard  
- Enterprise admin panel
- Stripe payment integration

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Express.js, Node.js, TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT
- **Payments**: Stripe
- **Monorepo**: Turborepo

## Project Structure

```
CyberSimPro-Project/
├── apps/
│   ├── api/                 # Express.js backend API (port 3000)
│   ├── dashboard/           # Admin/Employee dashboard (Next.js, port 3001)
│   └── marketing-nextjs/    # Marketing website (Next.js, port 3004)
├── packages/
│   ├── database/           # Prisma database schema & migrations
│   └── mcp-server/         # MCP integration
└── docs/                   # Documentation
```

## Setup Instructions

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### 1. Clone & Install

```bash
git clone https://github.com/kayembahamid/CyberSimPro-Project.git
cd CyberSimPro-Project
npm install
```

### 2. Environment Setup

Create `.env` file in the root:

```env
DATABASE_URL="postgresql://username@localhost:5432/cybersim_dev"
JWT_SECRET="your-jwt-secret-min-32-characters-required"
SESSION_SECRET="your-session-secret"
PORT=3000
NODE_ENV="development"
```

### 3. Database Setup

```bash
# Create database
createdb cybersim_dev

# Run migrations
cd packages/database
npx prisma migrate dev
npx prisma generate
```

### 4. Start Development

**Option A: Start all services with Turbo**
```bash
npm run dev
```

**Option B: Start services individually**
```bash
# Terminal 1: API (port 3000)
cd apps/api && npm run dev

# Terminal 2: Dashboard (port 3001)
cd apps/dashboard && npm run dev

# Terminal 3: Marketing (port 3004)
cd apps/marketing-nextjs && npm run dev
```

### 5. Access Applications

- 🌐 Marketing Site: http://localhost:3004
- 📊 Dashboard: http://localhost:3001
- 🔌 API: http://localhost:3000
- ❤️ Health Check: http://localhost:3000/health

## Features

### Training Modules
- **Phishing Detection 101** - 15 min, 8 steps, 65 points
- **Ransomware Response** - 12 min, 7 steps, 60 points
- **Network Security Basics** - 15 min, 8 steps, 65 points
- **Password Security** - 15 min, 9 steps, 70 points

### Admin Features
- Employee management
- Phishing campaign creation
- Analytics dashboard
- Organization settings
- Billing & subscriptions

### Pricing Plans
- **Growth**: $49/month - Up to 100 employees
- **Enterprise**: $149/month - Up to 500 employees
- **Regulated**: Custom pricing - Unlimited employees + compliance features

## Development

### Available Scripts

```bash
npm run dev          # Start all services
npm run build        # Build all packages
npm run lint         # Lint all packages
npm run test         # Run tests
```

### API Endpoints

#### Health & Status
```
GET /health
GET /api/training/modules
GET /api/training/modules/:id
POST /api/demos
```

#### Authentication
```
POST /api/auth/signup
POST /api/auth/login
GET /api/auth/me
```

## Deployment

### Recommended Stack
- **Frontend**: Vercel
- **Backend**: Railway or Heroku
- **Database**: Supabase or Railway PostgreSQL
- **File Storage**: AWS S3 or Cloudflare R2

### Environment Variables

Ensure these are set in production:
- `DATABASE_URL` - Production PostgreSQL connection
- `JWT_SECRET` - Strong secret key (32+ chars)
- `STRIPE_SECRET_KEY` - Production Stripe key
- `STRIPE_WEBHOOK_SECRET` - Stripe webhook secret
- `SMTP_*` - Email service credentials (optional)

## Documentation

- [API Documentation](docs/API_DOCUMENTATION.md)
- [Deployment Guide](docs/DEPLOYMENT_GUIDE.md)
- [User Guide](docs/USER_GUIDE.md)
- [Detailed README](README_DETAILED.md)

## Testing

```bash
# Run API tests
cd apps/api
npm test

# Run with coverage
npm test -- --coverage
```

## License

Private - All rights reserved

## 🤝 Contributing

This is a private project. For questions or issues, please contact the development team.

## 📧 Support

For support and questions, please reach out to the development team.

---

**Built with ❤️ for cybersecurity training**
