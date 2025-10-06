# Database Migration Instructions

## Run Migration

```bash
# Navigate to packages/database
cd packages/database

# Generate Prisma Client
npx prisma generate

# Create and run migration
npx prisma migrate dev --name add_training_progress

# If you get errors, try:
npx prisma migrate reset --force
npx prisma migrate dev --name init_complete_schema
```

## Verify Migration

```bash
# Check database tables
npx prisma studio

# Should see new tables:
# - training_progress
# - company_training_reports
```

## Seed Data (Optional)

```bash
npx prisma db seed
```

This will add sample training progress data for testing.
