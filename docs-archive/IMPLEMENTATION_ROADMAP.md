# 🚀 Implementation Roadmap - Missing Features

**Created:** October 4, 2025  
**Goal:** Complete remaining 35-40% of enterprise features

---

## 📋 FEATURES TO IMPLEMENT

### Priority 1: Foundation Features (Week 1-2)
1. **Settings/Profile Pages** - Essential for user management
2. **Certificate System** - Complete the existing 30% implementation
3. **Database Persistence** - Move from in-memory to database

### Priority 2: Engagement Features (Week 3-4)
4. **Team Features** - Leaderboards & competitions
5. **AI Recommendations** - Claude API integration

### Priority 3: Enterprise Features (Week 5-6)
6. **Compliance Dashboard** - Audit reports & tracking
7. **Billing System** - Stripe integration

---

## 🎯 DETAILED IMPLEMENTATION PLAN

### 1. Settings/Profile Pages (3-4 days)

#### Files to Create:
```
apps/dashboard/src/app/dashboard/settings/
├── page.tsx                    # Settings overview
├── profile/
│   └── page.tsx               # Profile editor
├── account/
│   └── page.tsx               # Account settings
├── security/
│   └── page.tsx               # Password, 2FA
└── notifications/
    └── page.tsx               # Notification preferences
```

#### Features:
- Profile information (name, email, avatar)
- Account settings (timezone, language)
- Security settings (password change, 2FA)
- Notification preferences
- Delete account option

---

### 2. Certificate System (2-3 days)

#### Files to Create/Update:
```
apps/api/src/services/certificate.service.ts    # Generate certificates
apps/api/src/utils/pdf-generator.ts             # PDF creation
apps/dashboard/src/components/certificates/
├── CertificateCard.tsx                         # Display certificate
├── CertificateModal.tsx                        # View full certificate
├── ShareButton.tsx                             # Share functionality
└── DownloadButton.tsx                          # Download PDF
```

#### Features:
- Auto-generate certificate on module completion (≥70%)
- Display certificate with badge
- Download as PDF
- Share on LinkedIn
- Certificate verification URL
- Track certificate issuance

---

### 3. Database Persistence (2-3 days)

#### Tasks:
- Complete Prisma schema for training sessions
- Add session persistence to training routes
- Update SimulationEngine to save/load state
- Add progress history tracking
- Implement resume functionality

#### Files to Update:
```
packages/database/prisma/schema.prisma          # Add TrainingSession model
apps/api/src/services/training.service.ts       # Add persistence
apps/api/src/routes/training.routes.ts          # Update endpoints
```

---

### 4. Team Features (4-5 days)

#### Files to Create:
```
apps/api/src/routes/team.routes.ts
apps/api/src/controllers/team.controller.ts
apps/api/src/services/team.service.ts

apps/dashboard/src/app/dashboard/team/
├── page.tsx                    # Team overview
├── leaderboard/
│   └── page.tsx               # Rankings
├── competitions/
│   └── page.tsx               # Active competitions
└── members/
    └── page.tsx               # Team management

apps/dashboard/src/components/team/
├── Leaderboard.tsx
├── TeamCard.tsx
├── CompetitionBanner.tsx
├── MemberList.tsx
└── InviteModal.tsx
```

#### Features:
- Create/join teams
- Team leaderboard (points, completion %)
- Individual leaderboard
- Weekly/monthly competitions
- Team achievements
- Activity feed

---

### 5. AI Recommendations (3-4 days)

#### Files to Create:
```
apps/api/src/config/claude.ts                   # Claude API config
apps/api/src/services/ai.service.ts             # AI integration
apps/api/src/routes/recommendations.routes.ts
apps/api/src/controllers/recommendation.controller.ts

apps/dashboard/src/app/dashboard/training/recommendations/
└── page.tsx                                    # AI suggestions

apps/dashboard/src/components/dashboard/
└── AIRecommendations.tsx                       # Recommendation widget
```

#### Features:
- Analyze user's training history
- Recommend next modules based on:
  - Completion rate
  - Weak areas
  - Role/interests
  - Industry trends
- Personalized learning paths
- Difficulty progression
- Gap analysis

#### AI Prompts:
```
"Based on user's completion of {modules}, performance of {scores},
and role as {role}, recommend 3 training modules to take next.
Consider weak areas and natural progression."
```

---

### 6. Compliance Dashboard (4-5 days)

#### Files to Create:
```
apps/api/src/routes/compliance.routes.ts
apps/api/src/controllers/compliance.controller.ts
apps/api/src/services/compliance.service.ts
apps/api/src/data/frameworks.json              # NIST, ISO, etc.

apps/dashboard/src/app/dashboard/compliance/
├── page.tsx                    # Compliance overview
├── reports/
│   └── page.tsx               # Generate reports
├── frameworks/
│   └── page.tsx               # Map to frameworks
└── audit/
    └── page.tsx               # Audit logs

apps/dashboard/src/components/compliance/
├── ComplianceScore.tsx
├── FrameworkCoverage.tsx
├── AuditReport.tsx
├── GapAnalysis.tsx
└── ExportButton.tsx
```

#### Features:
- Map training to compliance frameworks:
  - NIST Cybersecurity Framework
  - ISO 27001
  - SOC 2
  - GDPR requirements
- Track compliance coverage
- Generate audit reports (PDF)
- Show training gaps
- Compliance dashboard with scores
- Historical tracking

---

### 7. Billing System (5-6 days)

#### Files to Create:
```
apps/api/src/config/stripe.ts                   # Stripe config
apps/api/src/services/billing.service.ts        # Billing logic
apps/api/src/routes/billing.routes.ts
apps/api/src/controllers/billing.controller.ts
apps/api/src/middleware/quota.middleware.ts     # Plan limits

apps/dashboard/src/app/dashboard/settings/billing/
└── page.tsx                                    # Billing portal

apps/dashboard/src/components/billing/
├── PricingCards.tsx
├── PaymentMethodForm.tsx
├── InvoiceList.tsx
├── UsageMetrics.tsx
└── UpgradeModal.tsx
```

#### Features:
- Subscription plans:
  - Free: 3 modules/month, 1 user
  - Pro: Unlimited modules, 5 users, $29/mo
  - Team: Unlimited, 25 users, $99/mo
  - Enterprise: Custom pricing
- Stripe Checkout integration
- Payment method management
- Invoice history
- Usage tracking
- Upgrade/downgrade flows
- Webhook handling (payment success/failed)

---

## 📊 IMPLEMENTATION ORDER

### Week 1-2: Foundation
```
Day 1-2:   Settings & Profile pages
Day 3-4:   Certificate generation system
Day 5-7:   Database persistence
Day 8-10:  Testing & bug fixes
```

### Week 3-4: Engagement
```
Day 11-13: Team features & leaderboards
Day 14-16: AI recommendations
Day 17-18: Integration testing
Day 19-20: Polish & optimization
```

### Week 5-6: Enterprise
```
Day 21-24: Compliance dashboard
Day 25-29: Billing system (Stripe)
Day 30:    Final testing & deployment
```

---

## 🔧 TECHNICAL REQUIREMENTS

### New Dependencies to Install:

#### Backend:
```bash
npm install --workspace=@cybersim/api \
  @stripe/stripe-js \
  stripe \
  @anthropic-ai/sdk \
  bull \
  ioredis \
  pdfkit \
  sharp \
  nodemailer
```

#### Frontend:
```bash
npm install --workspace=dashboard \
  @stripe/stripe-js \
  @stripe/react-stripe-js \
  recharts \
  date-fns \
  react-pdf
```

### Environment Variables Needed:
```env
# AI
CLAUDE_API_KEY=

# Billing
STRIPE_PUBLIC_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# Email
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=

# Redis (for Bull queue)
REDIS_URL=
```

---

## 🎯 SUCCESS CRITERIA

### Settings/Profile ✅
- [ ] User can update profile
- [ ] Avatar upload works
- [ ] Password change functional
- [ ] Preferences saved

### Certificates ✅
- [ ] Auto-generated on completion
- [ ] PDF downloadable
- [ ] Shareable on LinkedIn
- [ ] Verification URL works

### Team Features ✅
- [ ] Create/join teams
- [ ] Leaderboard updates real-time
- [ ] Competitions run automatically
- [ ] Activity feed shows updates

### AI Recommendations ✅
- [ ] Recommendations personalized
- [ ] Based on actual performance
- [ ] Updates after each module
- [ ] 80%+ relevance rate

### Compliance ✅
- [ ] Maps to 3+ frameworks
- [ ] Reports generate correctly
- [ ] Gap analysis accurate
- [ ] Export works (PDF/CSV)

### Billing ✅
- [ ] Checkout flow works
- [ ] Webhooks process correctly
- [ ] Quotas enforced
- [ ] Invoices accessible

---

## 📈 ESTIMATED TIMELINE

- **Minimum:** 30 days (6 weeks) with focused work
- **Realistic:** 45 days (9 weeks) with normal pace
- **Conservative:** 60 days (12 weeks) with thorough testing

**Total Effort:** ~200-250 hours of development

---

## 🚦 RISK ASSESSMENT

### Low Risk (Easy to implement):
- Settings/Profile pages
- Certificate display
- Basic team features

### Medium Risk (Some complexity):
- Database persistence
- Leaderboards
- AI recommendations

### High Risk (Significant complexity):
- Compliance mapping
- Billing system integration
- Real-time features

---

## 💡 RECOMMENDATIONS

### MVP+ Approach (Recommended):
**Build in this order:**
1. Settings/Profile (essential)
2. Certificates (user value)
3. Database persistence (foundation)
4. Stop here and validate with users

**Then add based on demand:**
5. Team features (if users request)
6. AI recommendations (if users want)
7. Compliance (if enterprise needs)
8. Billing (when monetizing)

### All-at-Once Approach:
**Build everything in 6-12 weeks**
- Higher risk
- Longer validation cycle
- More complex testing
- Delayed user feedback

---

## 📋 NEXT STEPS

### Option A: Start Building (Toggle to ACT MODE)
1. Choose which feature to build first
2. I'll implement it step-by-step
3. Test and verify
4. Move to next feature

### Option B: Modify Plan
1. Adjust priorities
2. Add/remove features
3. Change timeline
4. Re-sequence implementation

### Option C: Validate First
1. Demo current MVP to users
2. Collect feedback
3. Build only requested features
4. Iterate based on actual needs

**Which approach would you like to take?**
