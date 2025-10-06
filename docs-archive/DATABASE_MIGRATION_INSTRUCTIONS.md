# Database Migration Instructions

## ⚠️ IMPORTANT: Run These Commands

After updating the Prisma schema, you must run these commands:

### 1. Generate Prisma Client
```bash
cd CyberSimPro-Project/apps/api
npx prisma generate
```

This regenerates the TypeScript types for the new TrainingSession and TrainingProgress models.

### 2. Create and Apply Migration
```bash
npx prisma migrate dev --name add_training_sessions
```

This creates the database tables for:
- `TrainingSession` - Stores user training sessions
- `TrainingProgress` - Tracks progress for each step

### 3. (Optional) Reset Database with Seed Data
```bash
npx prisma migrate reset
```

This will:
- Drop the database
- Re-create all tables
- Run seed data

---

## What Was Added

### New Models

#### TrainingSession
Stores training session metadata:
- `userId` - Who is training
- `moduleId` - Which module
- `moduleName` - Module name
- `status` - in_progress, completed, abandoned
- `currentStep` - Progress tracking
- `totalSteps` - Total questions/steps
- `score` - Final score (when completed)
- `timeSpent` - Total time in seconds
- `completedAt` - When finished
- `lastAccessedAt` - For resuming sessions

#### TrainingProgress
Tracks individual step completion:
- `sessionId` - Links to TrainingSession
- `stepIndex` - Which step (0-based)
- `stepType` - question, scenario, info
- `question` - The question asked
- `userAnswer` - What user answered
- `correctAnswer` - What was correct
- `isCorrect` - Boolean result
- `pointsEarned` - Score for this step
- `attempts` - Number of tries
- `timeSpent` - Time on this step
- `completedAt` - When answered

---

## Features Enabled

Once migrations are applied, you'll have:

✅ **Session Persistence**
- Training progress saved to database
- Can close browser and resume later
- Progress tracked per-step

✅ **Progress History**
- View all past training sessions
- See scores and completion dates
- Track time spent learning

✅ **Statistics**
- Total sessions completed
- Average scores
- Time spent training
- Module completion rates

✅ **Resume Functionality**
- Pick up where you left off
- See completed steps
- Continue from current step

---

## After Migration

Run these commands to verify:

```bash
# Check tables were created
npx prisma studio

# Verify TypeScript types
npm run build
```

Then restart your API server:
```bash
npm run dev
