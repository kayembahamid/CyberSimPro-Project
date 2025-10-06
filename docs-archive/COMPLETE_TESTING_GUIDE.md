# 🧪 Complete Testing Guide - CyberSim Pro

## 📋 Pre-Testing Setup

### Step 1: Database Migration
```bash
cd CyberSimPro-Project/packages/database

# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev --name complete_setup

# Check migration status
npx prisma migrate status
```

**Expected Output:**
```
✓ Generated Prisma Client
✓ Migration complete
Database schema is up to date
```

### Step 2: Install Dependencies
```bash
cd CyberSimPro-Project

# Install all dependencies
npm install

# Check for issues
npm run build
```

### Step 3: Start Services
```bash
# Terminal 1: Start all services
npm run dev

# Or start individually:
# Terminal 1: API
cd apps/api && npm run dev

# Terminal 2: Dashboard  
cd apps/dashboard && npm run dev

# Terminal 3: Marketing
cd apps/marketing-nextjs && npm run dev
```

**Verify Services Running:**
- ✅ API: http://localhost:3000
- ✅ Dashboard: http://localhost:3001
- ✅ Marketing: http://localhost:3004

---

## 🔍 Phase 1: API Testing

### Test 1.1: Health Check
```bash
curl http://localhost:3000/health
```

**Expected:**
```json
{
  "success": true,
  "message": "API is running"
}
```

**Status:** [ ] Pass [ ] Fail  
**Notes:** _________________

---

### Test 1.2: Training Modules List
```bash
curl http://localhost:3000/api/training/modules
```

**Expected:**
```json
{
  "success": true,
  "data": [
    {
      "id": "phishing-detective",
      "title": "Phishing Detective",
      ...
    }
  ]
}
```

**Status:** [ ] Pass [ ] Fail  
**Notes:** _________________

---

### Test 1.3: Game Content API
```bash
curl http://localhost:3000/api/training/phishing-detective/game
```

**Expected:**
```json
{
  "success": true,
  "module": {
    "id": "phishing-detective",
    "steps": [...]
  }
}
```

**Status:** [ ] Pass [ ] Fail  
**Notes:** _________________

---

### Test 1.4: Progress Tracking (POST)
```bash
curl -X POST http://localhost:3000/api/training/progress \
  -H "Content-Type: application/json" \
  -d '{
    "moduleId": "phishing-detective",
    "stepId": "pd-1",
    "completed": true,
    "score": 25,
    "timeSpent": 30
  }'
```

**Expected:**
```json
{
  "success": true,
  "progress": {...},
  "moduleStats": {
    "completionPercentage": 16,
    "badge": "BRONZE"
  }
}
```

**Status:** [ ] Pass [ ] Fail  
**Notes:** _________________

---

### Test 1.5: Admin Employee Progress
```bash
curl http://localhost:3000/api/admin/employee-progress
```

**Expected:**
```json
{
  "success": true,
  "employees": [],
  "count": 0
}
```

**Status:** [ ] Pass [ ] Fail  
**Notes:** _________________

---

### Test 1.6: Demo Booking
```bash
curl -X POST http://localhost:3000/api/demos \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@test.com",
    "company": "Test Co",
    "phone": "123-456-7890",
    "employees": "1-50"
  }'
```

**Expected:**
```json
{
  "success": true,
  "demoId": "..."
}
```

**Status:** [ ] Pass [ ] Fail  
**Notes:** _________________

---

## 🎮 Phase 2: Training Game Testing

### Test 2.1: Module Selection Page
1. Navigate to: http://localhost:3001/dashboard/training
2. Verify page loads
3. Check all elements present:
   - [ ] "Cybersecurity Training" header
   - [ ] 4 module cards displayed
   - [ ] Each card shows:
     - [ ] Icon (emoji)
     - [ ] Title
     - [ ] Duration (5 MIN)
     - [ ] Description
     - [ ] START button
   - [ ] Stats summary at bottom
   - [ ] BACK TO COURSE button

**Status:** [ ] Pass [ ] Fail  
**Issues Found:** _________________

---

### Test 2.2: Training Game - Phishing Detective
1. Click "START" on Phishing Detective
2. URL should be: `/dashboard/training/phishing-detective/play`

**Check Stats Bar:**
- [ ] WRONG TURNS: 4 skulls displayed
- [ ] WALLET: Shows $110
- [ ] CYBER COINS: Progress bar with "12/100"
- [ ] DAYS REMAINING: Calendar with days 5-14

**Status:** [ ] Pass [ ] Fail  
**Issues Found:** _________________

---

### Test 2.3: Story Step
1. Verify story displays:
   - [ ] Detective office emoji/image
   - [ ] Story text appears
   - [ ] "Accept Mission" button present
2. Click button
3. Verify moves to next step

**Status:** [ ] Pass [ ] Fail  
**Issues Found:** _________________

---

### Test 2.4: Question Step  
1. Verify question displays:
   - [ ] Question text clear
   - [ ] 4 answer options shown
   - [ ] Options are clickable
2. Click CORRECT answer
3. Verify:
   - [ ] Feedback screen shows
   - [ ] Green background
   - [ ] "Correct!" message
   - [ ] Points earned displayed
   - [ ] Continue button appears

**Status:** [ ] Pass [ ] Fail  
**Issues Found:** _________________

---

### Test 2.5: Wrong Answer
1. Click WRONG answer
2. Verify:
   - [ ] Feedback screen shows
   - [ ] Red background
   - [ ] "Not quite!" message
   - [ ] Explanation shown
   - [ ] Continue button appears
3. Check stats bar:
   - [ ] One skull crossed out/red
   - [ ] No points added

**Status:** [ ] Pass [ ] Fail  
**Issues Found:** _________________

---

### Test 2.6: Email Scenario
1. Proceed to email scenario step
2. Verify:
   - [ ] Email display box shows
   - [ ] From/Subject headers
   - [ ] Email body text
   - [ ] Link highlighted (if present)
   - [ ] Helper tip box (if present)
   - [ ] Question below email
   - [ ] Answer options

**Status:** [ ] Pass [ ] Fail  
**Issues Found:** _________________

---

### Test 2.7: Progress Bar
Throughout game:
- [ ] Progress bar at bottom updates
- [ ] "Step X of Y" updates
- [ ] Score displays correctly
- [ ] Bar fills appropriately

**Status:** [ ] Pass [ ] Fail  
**Issues Found:** _________________

---

### Test 2.8: Completion Page
1. Complete all steps
2. Verify redirect to completion page
3. Check elements:
   - [ ] Trophy emoji (🏆) displays
   - [ ] "Training Complete!" header
   - [ ] Score displays prominently
   - [ ] Performance badge shows (Gold/Silver/Bronze)
   - [ ] Stats grid (Level Up, +XP, Badge)
   - [ ] Key Learnings section
   - [ ] "More Training" button
   - [ ] "Back to Dashboard" button

**Status:** [ ] Pass [ ] Fail  
**Issues Found:** _________________

---

## 👨‍💼 Phase 3: Admin Dashboard Testing

### Test 3.1: Admin Page Access
1. Navigate to: http://localhost:3001/dashboard/admin/employees
2. Verify page loads
3. Check header:
   - [ ] "Employee Training Dashboard" title
   - [ ] "Send Reminders" button
   - [ ] "Export CSV" button

**Status:** [ ] Pass [ ] Fail  
**Issues Found:** _________________

---

### Test 3.2: Summary Cards
Check 4 summary cards display:
- [ ] Gold Badges count
- [ ] Silver Badges count
- [ ] Bronze Badges count
- [ ] Not Started count

**Status:** [ ] Pass [ ] Fail  
**Issues Found:** _________________

---

### Test 3.3: Search & Filters
1. Test search box:
   - [ ] Type employee name
   - [ ] Results filter instantly
2. Test department filter:
   - [ ] Dropdown works
   - [ ] Options: All, Engineering, Sales, HR, Finance, Operations
3. Test status filter:
   - [ ] Dropdown works
   - [ ] Options: All, Completed, In Progress, Not Started

**Status:** [ ] Pass [ ] Fail  
**Issues Found:** _________________

---

### Test 3.4: Employee Table
Check table displays:
- [ ] Headers: Employee, Department, 4 Modules, Overall, Badge, Actions
- [ ] If no employees: "No employees found" message
- [ ] If employees exist: Each row shows progress

**Status:** [ ] Pass [ ] Fail  
**Issues Found:** _________________

---

### Test 3.5: CSV Export
1. Click "Export CSV" button
2. Verify:
   - [ ] File downloads
   - [ ] File name: `training-report-YYYY-MM-DD.csv`
   - [ ] File opens in Excel/Numbers
   - [ ] Columns match table

**Status:** [ ] Pass [ ] Fail  
**Issues Found:** _________________

---

### Test 3.6: Send Reminders
1. Click "Send Reminders" button
2. Verify:
   - [ ] Confirmation dialog appears
   - [ ] If confirmed: Success message
   - [ ] Console shows email logs

**Status:** [ ] Pass [ ] Fail  
**Issues Found:** _________________

---

## 🌐 Phase 4: Marketing Site Testing

### Test 4.1: Homepage
1. Navigate to: http://localhost:3004
2. Verify elements:
   - [ ] Hero section loads
   - [ ] Animations work
   - [ ] "Book Demo" button present
   - [ ] Navigation menu works

**Status:** [ ] Pass [ ] Fail  
**Issues Found:** _________________

---

### Test 4.2: Demo Booking Form
1. Click "Book Demo"
2. Verify modal opens:
   - [ ] Form displays
   - [ ] All fields present (Name, Email, Company, Phone, Employees)
   - [ ] Fields are required
3. Fill out form
4. Click submit
5. Verify:
   - [ ] Loading state shows
   - [ ] Success message appears
   - [ ] Modal closes or redirects

**Status:** [ ] Pass [ ] Fail  
**Issues Found:** _________________

---

### Test 4.3: Training Showcase (if added)
1. Check for TrainingShowcase component
2. Verify:
   - [ ] 4 module cards display
   - [ ] Each card has "Try Free" button
   - [ ] Pricing section shows
   - [ ] CTAs link correctly

**Status:** [ ] Pass [ ] Fail  
**Issues Found:** _________________

---

## 🔗 Phase 5: Integration Testing

### Test 5.1: Training Progress Persistence
1. Start training module
2. Answer 2 questions
3. Check database:
```bash
# In database console or Prisma Studio
npx prisma studio
# Navigate to TrainingProgress table
# Verify 2 records exist
```
4. Refresh page
5. Verify progress maintained

**Status:** [ ] Pass [ ] Fail  
**Issues Found:** _________________

---

### Test 5.2: Cross-Service Links
1. Marketing → Dashboard:
   - [ ] Click login link
   - [ ] Redirects to dashboard
2. Dashboard → Training:
   - [ ] Click training link
   - [ ] Loads training page
3. Training → Completion:
   - [ ] Complete module
   - [ ] Redirects to completion
4. Completion → Training List:
   - [ ] Click "More Training"
   - [ ] Returns to module list

**Status:** [ ] Pass [ ] Fail  
**Issues Found:** _________________

---

### Test 5.3: API ↔ Database
1. Submit demo booking
2. Check database:
```bash
npx prisma studio
# Navigate to DemoRequest table
# Verify new record
```
3. Verify all fields saved correctly

**Status:** [ ] Pass [ ] Fail  
**Issues Found:** _________________

---

## 🐛 Phase 6: Bug Hunting

### Known Issues to Check

#### TypeScript Errors
- [ ] Check `apps/api/src/routes/training.routes.ts`
  - Issue: Property 'user' does not exist on Request
  - Status: Expected (resolves after migration)
  
- [ ] Check `apps/api/src/routes/admin.routes.ts`  
  - Issue: Prisma type mismatches
  - Status: Expected (resolves after migration)

#### UI Issues
- [ ] Training game stats bar alignment
- [ ] Mobile responsiveness
- [ ] Button hover states
- [ ] Progress bar animation

#### API Issues
- [ ] CORS configuration
- [ ] Error handling
- [ ] Response formats
- [ ] Authentication (if implemented)

#### Database Issues
- [ ] Migration conflicts
- [ ] Seed data
- [ ] Foreign key constraints
- [ ] Index performance

**Document All Bugs:**
Bug #: ___
Location: ___
Description: ___
Severity: [ ] Critical [ ] High [ ] Medium [ ] Low
Status: [ ] Open [ ] Fixed [ ] Won't Fix

---

## 📊 Test Results Summary

### API Tests
- Total Tests: 6
- Passed: ___
- Failed: ___
- Pass Rate: ___%

### UI Tests  
- Total Tests: 15
- Passed: ___
- Failed: ___
- Pass Rate: ___%

### Integration Tests
- Total Tests: 3
- Passed: ___
- Failed: ___
- Pass Rate: ___%

### Overall
- **Total Tests:** 24
- **Passed:** ___
- **Failed:** ___
- **Pass Rate:** ___%

---

## ✅ Sign-Off Checklist

Before marking as production-ready:

- [ ] All critical bugs fixed
- [ ] Database migrations successful
- [ ] All API endpoints functional
- [ ] Training game works end-to-end
- [ ] Admin dashboard operational
- [ ] Marketing site functional
- [ ] Cross-service links work
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Performance acceptable
- [ ] Security reviewed
- [ ] Documentation complete

**Tested By:** _________________  
**Date:** _________________  
**Status:** [ ] Ready for Production [ ] Needs Work

---

## 📝 Notes & Observations

**Positive Findings:**
1. ___________________
2. ___________________
3. ___________________

**Issues Found:**
1. ___________________
2. ___________________
3. ___________________

**Recommendations:**
1. ___________________
2. ___________________
3. ___________________

---

**Testing Complete!** 🎉
