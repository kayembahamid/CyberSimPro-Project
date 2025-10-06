# Fix Database Permissions

## The Problem
Error: `P1010: User postgres was denied access on the database cybersim_dev.public`

## Solution

Run these commands:

```bash
# Connect to PostgreSQL
psql -U postgres

# Grant all privileges
GRANT ALL PRIVILEGES ON DATABASE cybersim_dev TO postgres;

# Connect to the database
\c cybersim_dev

# Grant schema permissions
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO postgres;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO postgres;

# Exit
\q
```

## Or Delete and Recreate Database

```bash
# Drop and recreate
dropdb cybersim_dev
createdb cybersim_dev

# Then run migrations
cd CyberSimPro-Project/packages/database
npx prisma migrate dev --name init
```

## Update Environment File

Make sure `apps/api/.env` has:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/cybersim_dev"
```

NOT:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/cybersim_dev.public"
```

The `.public` should NOT be in the database name!
