# 🚀 CyberSim Pro - Complete Project Documentation

## 📋 Table of Contents
- [Project Overview](#project-overview)
- [Current Status](#current-status)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [Services & Ports](#services--ports)
- [Architecture](#architecture)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

---

## 🎯 Project Overview

**CyberSim Pro** is a comprehensive cybersecurity training platform featuring:
- 🎮 Gamified training modules (Banzai-style)
- 🛡️ Phishing simulation campaigns
- 📊 Analytics & reporting dashboard
- 🏢 Enterprise admin panel
- 💳 Stripe payment integration
- 📧 Email notifications system
- 🔗 MCP (Model Context Protocol) integration

### Tech Stack
- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Express.js, Node.js, TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT (simplified for development)
- **Payments**: Stripe
- **Email**: SMTP/SendGrid ready
- **Monorepo**: Turborepo

---

## ✅ Current Status

### Working Services (Verified)

| Service | Port | Status | Description |
|---------|------|--------|-------------|
| API Server | 3000 | ✅ Running | All endpoints functional |
| Marketing Site | 3004 | ✅ Running | Full landing page with sections |
| Dashboard | 3001 | ⚠️ Running | Needs route fixes (shows default page) |
| Database | 5432 | ✅ Connected | PostgreSQL with migrations applied |

### Features Status

| Feature | Status | Details |
|---------|--------|---------|
| Training Modules | ✅ Complete | 4 modules with full content |
| API Endpoints | ✅ Working | Health, training, demos, billing |
| Database Schema | ✅ Migrated | All tables created |
| Marketing Site | ✅ Complete | Hero, Features, Pricing, Contact |
| Dashboard UI | ⚠️ Partial | Pages exist, needs routing |
| Email Templates | ✅ Complete | All templates created |
| Payment Integration | 🔧 Ready | Stripe routes configured |
| MCP Integration | 🔧 Ready | Server structure in place |

---

## 📁 Project Structure

```
CyberSimPro-Project/
│
├── 📂 apps/                      # Application packages
│   ├── api/                      # Backend API (Express.js)
│   │   ├── src/
│   │   │   ├── routes/          # API endpoints
│   │   │   │   ├── health.routes.ts
│   │   │   │   ├── auth.routes.ts
│   │   │   │   ├── training.routes.ts
│   │   │   │   ├── demo.routes.ts
│   │   │   │   ├── billing.routes.ts
│   │   │   │   ├── employees.routes.ts
│   │   │   │   └── admin.routes.ts
│   │   │   ├── middleware/      # Express middleware
│   │   │   ├── utils/           # Utility functions
│   │   │   ├── config/          # Configuration
│   │   │   ├── app.ts           # Express app setup
│   │   │   └── index.ts         # Server entry point
│   │   └── package.json
│   │
│   ├── dashboard/                # Admin/Employee Dashboard (Next.js)
│   │   ├── src/
│   │   │   └── app/
│   │   │       ├── dashboard/
│   │   │       │   ├── training/     # Training modules UI
│   │   │       │   ├── campaigns/    # Phishing campaigns
│   │   │       │   ├── analytics/    # Analytics dashboard
│   │   │       │   └── employees/    # Employee management
│   │   │       └── page.tsx         # Homepage (redirects)
│   │   └── package.json
│   │
│   └── marketing-nextjs/         # Marketing Website (Next.js)
│       ├── src/
│       │   ├── components/       # React components
│       │   │   ├── HeroSection.tsx
│       │   │   ├── FeaturesSection.tsx
│       │   │   ├── PricingSection.tsx
│       │   │   └── ContactSection.tsx
│       │   └── app/
│       │       └── page.tsx      # Landing page
│       └── package.json
│
├── 📂 packages/                  # Shared packages
│   ├── database/                 # Prisma schema & migrations
│   │   ├── prisma/
│   │   │   ├── schema.prisma    # Database schema
│   │   │   └── migrations/      # Migration files
│   │   └── package.json
│   │
│   └── mcp-server/              # MCP integration
│       ├── src/
│       └── package.json
│
├── 📂 data/                     # Static data
│   └── training-modules/        # Training content (JSON)
│       ├── phishing-detection-101.json
│       ├── ransomware-response.json
│       ├── network-security-basics.json
│       └── password-security-basics.json
│
├── 📂 docs/                     # Documentation
├── 📂 docs-archive/             # Archived documentation
│
├── 📝 Configuration Files
├── .env.example                 # Environment template
├── .gitignore
├── docker-compose.yml           # Docker setup
├── package.json                 # Root package.json
├── turbo.json                   # Turborepo config
└── README.md                    # This file
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL 14+
- npm or yarn

### 1. Clone & Install

```bash
# Clone repository
git clone <repository-url>
cd CyberSimPro-Project

# Install dependencies
npm install
```

### 2. Environment Setup

Create `.env` files:

**apps/api/.env**
```env
DATABASE_URL="postgresql://macbook@localhost:5432/cybersim_dev"
JWT_SECRET="cybersim-jwt-secret-key-minimum-32-characters-required-for-security"
SESSION_SECRET="cybersim-session-secret-key-for-express-sessions"
PORT=3000
NODE_ENV="development"
DASHBOARD_URL="http://localhost:3001"
MARKETING_URL="http://localhost:3004"
```

**apps/dashboard/.env.local**
```env
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

**apps/marketing-nextjs/.env.local**
```env
NEXT_PUBLIC_API_URL="http://localhost:3000"
NEXT_PUBLIC_DASHBOARD_URL="http://localhost:3001"
```

### 3. Database Setup

```bash
# Create database
createdb cybersim_dev

# Run migrations
cd packages/database
npx prisma migrate dev --name init
npx prisma generate
```

### 4. Start Services

**Option A: Individual terminals**
```bash
# Terminal 1: API
cd apps/api && npm run dev

# Terminal 2: Dashboard
cd apps/dashboard && PORT=3001 npm run dev

# Terminal 3: Marketing
cd apps/marketing-nextjs && PORT=3004 npm run dev
```

**Option B: Turbo (all at once)**
```bash
npm run dev
```

### 5. Access Applications

- 🌐 Marketing Site: http://localhost:3004
- 📊 Dashboard: http://localhost:3001
- 🔌 API: http://localhost:3000
- ❤️ Health Check: http://localhost:3000/health

---

## 🔌 Services & Ports

### Development Ports
| Service | Port | URL |
|---------|------|-----|
| API Server | 3000 | http://localhost:3000 |
| Dashboard | 3001 | http://localhost:3001 |
| Marketing | 3004 | http://localhost:3004 |
| PostgreSQL | 5432 | postgresql://localhost:5432/cybersim_dev |

### Production URLs
| Service | URL |
|---------|-----|
| Marketing | https://cybersimpro.com |
| Dashboard | https://app.cybersimpro.com |
| API | https://api.cybersimpro.com |

---

## 🏗️ Architecture

### System Architecture
```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Marketing Site │     │    Dashboard    │     │  Email Service  │
│   (Next.js)     │     │    (Next.js)    │     │   (SendGrid)    │
│                 │     │                 │     │                 │
└────────┬────────┘     └────────┬────────┘     └────────┬────────┘
         │                       │                       │
         └───────────┬───────────┴───────────────────────┘
                     │
                     ▼
         ┌───────────────────────┐
         │                       │
         │      API Server       │
         │     (Express.js)      │
         │                       │
         └───────────┬───────────┘
                     │
         ┌───────────┴───────────┐
         │                       │
         ▼                       ▼
┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │
│   PostgreSQL    │     │     Stripe      │
│    Database     │     │    Payments     │
│                 │     │                 │
└─────────────────┘     └─────────────────┘
```

### Data Flow
1. **User Registration** → Marketing → API → Database
2. **Training Access** → Dashboard → API → Training Modules
3. **Phishing Campaign** → Admin → API → Email Service → Employees
4. **Analytics** → Dashboard → API → Database → Reports

---

## 📡 API Endpoints

### Core Endpoints

#### Health & Status
```
GET /health
Response: { success: true, message: "API is healthy", database: "connected" }
```

#### Training Modules
```
GET /api/training/modules
GET /api/training/modules/:id
GET /api/training/modules/:id/content
POST /api/training/progress
POST /api/training/complete
```

#### Demo Booking
```
POST /api/demos
Body: { name, email, company, phone, employees }
```

#### Authentication
```
POST /api/auth/signup
POST /api/auth/login
POST /api/auth/logout
GET /api/auth/me
```

#### Admin
```
GET /api/admin/demos
GET /api/admin/employees
GET /api/admin/campaigns
GET /api/admin/analytics
```

#### Billing
```
POST /api/billing/create-checkout
POST /api/billing/webhook
GET /api/billing/subscription
```

---

## 💾 Database Schema

### Main Tables

```sql
-- Organizations
CREATE TABLE Organization (
  id          UUID PRIMARY KEY,
  name        VARCHAR(255),
  email       VARCHAR(255) UNIQUE,
  plan        ENUM('trial','growth','enterprise','regulated'),
  createdAt   TIMESTAMP
)

-- Users (Admins)
CREATE TABLE User (
  id             UUID PRIMARY KEY,
  email          VARCHAR(255) UNIQUE,
  password       VARCHAR(255),
  organizationId UUID REFERENCES Organization(id),
  role           ENUM('admin','manager','viewer')
)

-- Employees
CREATE TABLE Employee (
  id             UUID PRIMARY KEY,
  email          VARCHAR(255),
  firstName      VARCHAR(255),
  lastName       VARCHAR(255),
  organizationId UUID REFERENCES Organization(id)
)

-- Training Progress
CREATE TABLE TrainingProgress (
  id         UUID PRIMARY KEY,
  employeeId UUID REFERENCES Employee(id),
  moduleId   VARCHAR(255),
  progress   JSON,
  score      INTEGER,
  completed  BOOLEAN,
  completedAt TIMESTAMP
)

-- Phishing Campaigns
CREATE TABLE PhishingCampaign (
  id             UUID PRIMARY KEY,
  organizationId UUID REFERENCES Organization(id),
  name           VARCHAR(255),
  status         ENUM('draft','active','completed'),
  template       JSON,
  results        JSON
)
```

---

## 🚀 Deployment

### Option 1: Vercel + Railway

**Frontend (Vercel)**
```bash
# Deploy marketing site
cd apps/marketing-nextjs
vercel --prod

# Deploy dashboard
cd apps/dashboard
vercel --prod
```

**Backend (Railway)**
```bash
cd apps/api
railway up
```

### Option 2: Docker

```bash
# Build and run all services
docker-compose up --build

# Or individual services
docker-compose up api
docker-compose up dashboard
docker-compose up marketing
```

### Environment Variables (Production)

Add to hosting platform:
- `DATABASE_URL` - Production PostgreSQL URL
- `JWT_SECRET` - Strong secret key
- `STRIPE_SECRET_KEY` - Production Stripe key
- `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS` - Email service
- `NEXT_PUBLIC_API_URL` - Production API URL

---

## 🔧 Troubleshooting

### Common Issues

#### Database Connection Error
```bash
# Fix: Update DATABASE_URL to use your system user
DATABASE_URL="postgresql://[YOUR_USERNAME]@localhost:5432/cybersim_dev"
```

#### Port Already in Use
```bash
# Find process on port
lsof -i :3000

# Kill process
kill -9 [PID]
```

#### Dashboard Shows Default Next.js Page
```bash
# The dashboard routes need to be accessed directly:
http://localhost:3001/dashboard/training
```

#### API Returns 404
```bash
# Ensure API is running on port 3000
curl http://localhost:3000/health
```

---

## 📚 Additional Resources

### Training Modules Available
1. **Phishing Detection 101** - 15 min, 65 points, 8 steps
2. **Ransomware Response** - 12 min, 60 points, 7 steps  
3. **Network Security Basics** - 15 min, 65 points, 8 steps
4. **Password Security** - 15 min, 70 points, 9 steps

### Test Commands
```bash
# Test API
curl http://localhost:3000/health
curl http://localhost:3000/api/training/modules

# Open sites
open http://localhost:3004  # Marketing
open http://localhost:3001  # Dashboard
```

---

## 📝 License & Support

**Status**: Development Ready
**Version**: 1.0.0
**Last Updated**: October 2025

For issues or questions, check the `docs-archive/` folder for additional documentation.

---

### Quick Links
- [API Documentation](docs/API_DOCUMENTATION.md)
- [Deployment Guide](docs/DEPLOYMENT_GUIDE.md)
- [User Guide](docs/USER_GUIDE.md)

---

**Built with ❤️ for cybersecurity training**
