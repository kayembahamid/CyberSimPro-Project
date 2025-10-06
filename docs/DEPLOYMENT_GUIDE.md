# CyberSim Pro - Production Deployment Guide

## Overview
This guide covers deploying CyberSim Pro to production environments.

---

## Prerequisites

### Required Tools
- Node.js 18+ 
- Docker & Docker Compose
- PostgreSQL 15+
- Git
- Domain name with SSL certificate

### Required Accounts
- Cloud provider (AWS/GCP/Azure/Vercel)
- Database hosting (optional, can self-host)
- Monitoring service (Sentry, DataDog, etc.)
- CDN provider (Cloudflare, optional)

---

## Environment Setup

### 1. API Environment Variables

Create `apps/api/.env.production`:

```bash
# Server
NODE_ENV=production
API_PORT=3003
WS_PORT=3002

# Database
DATABASE_URL=postgresql://user:password@host:5432/cybersim_prod
DATABASE_POOL_SIZE=20

# Authentication
JWT_SECRET=your-super-secure-secret-here
JWT_EXPIRY=7d

# CORS
NEXT_PUBLIC_APP_URL=https://app.cybersimpro.com

# Redis (for session storage)
REDIS_URL=redis://user:password@host:6379

# Logging
LOG_LEVEL=info
LOG_FILE=/var/log/cybersim/api.log

# Monitoring
SENTRY_DSN=https://your-sentry-dsn
SENTRY_ENVIRONMENT=production

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000  # 15 minutes
RATE_LIMIT_MAX_REQUESTS=100
```

### 2. Dashboard Environment Variables

Create `apps/dashboard/.env.production`:

```bash
# API
NEXT_PUBLIC_API_URL=https://api.cybersimpro.com

# Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Monitoring
NEXT_PUBLIC_SENTRY_DSN=https://your-sentry-dsn
SENTRY_AUTH_TOKEN=your-auth-token

# Feature Flags
NEXT_PUBLIC_ENABLE_BETA_FEATURES=false
```

---

## Docker Production Setup

### 1. Production Dockerfile for API

Create `apps/api/Dockerfile.prod`:

```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY turbo.json ./
COPY apps/api/package*.json ./apps/api/

# Install dependencies
RUN npm ci --only=production

# Copy source
COPY apps/api ./apps/api
COPY packages ./packages

# Build
RUN npm run build --workspace=apps/api

# Production image
FROM node:18-alpine

WORKDIR /app

# Copy built app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/api/build ./build
COPY --from=builder /app/apps/api/package.json ./

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

USER nodejs

EXPOSE 3003

CMD ["node", "build/index.js"]
```

### 2. Production Dockerfile for Dashboard

Create `apps/dashboard/Dockerfile.prod`:

```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY turbo.json ./
COPY apps/dashboard/package*.json ./apps/dashboard/

RUN npm ci

COPY apps/dashboard ./apps/dashboard
COPY packages ./packages

RUN npm run build --workspace=apps/dashboard

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/apps/dashboard/.next/standalone ./
COPY --from=builder /app/apps/dashboard/.next/static ./.next/static
COPY --from=builder /app/apps/dashboard/public ./public

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

USER nodejs

EXPOSE 3000

CMD ["node", "server.js"]
```

### 3. Production Docker Compose

Create `docker-compose.prod.yml`:

```yaml
version: '3.8'

services:
  # PostgreSQL Database
  postgres:
    image: postgres:15-alpine
    restart: always
    environment:
      POSTGRES_DB: cybersim_prod
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./backups:/backups
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${DB_USER}"]
      interval: 10s
      timeout: 5s
      retries: 5

  # Redis (Session Storage)
  redis:
    image: redis:7-alpine
    restart: always
    command: redis-server --requirepass ${REDIS_PASSWORD}
    volumes:
      - redis_data:/data

  # API Service
  api:
    build:
      context: .
      dockerfile: apps/api/Dockerfile.prod
    restart: always
    ports:
      - "3003:3003"
    environment:
      NODE_ENV: production
      DATABASE_URL: postgresql://${DB_USER}:${DB_PASSWORD}@postgres:5432/cybersim_prod
      REDIS_URL: redis://:${REDIS_PASSWORD}@redis:6379
      JWT_SECRET: ${JWT_SECRET}
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_started
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3003/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  # Dashboard Service
  dashboard:
    build:
      context: .
      dockerfile: apps/dashboard/Dockerfile.prod
    restart: always
    ports:
      - "3000:3000"
    environment:
      NEXT_PUBLIC_API_URL: http://api:3003
    depends_on:
      - api

  # Nginx Reverse Proxy
  nginx:
    image: nginx:alpine
    restart: always
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./nginx/ssl:/etc/nginx/ssl:ro
    depends_on:
      - api
      - dashboard

volumes:
  postgres_data:
  redis_data:
```

---

## Nginx Configuration

Create `nginx/nginx.conf`:

```nginx
events {
    worker_connections 1024;
}

http {
    upstream api {
        server api:3003;
    }

    upstream dashboard {
        server dashboard:3000;
    }

    # Redirect HTTP to HTTPS
    server {
        listen 80;
        server_name cybersimpro.com www.cybersimpro.com;
        return 301 https://$server_name$request_uri;
    }

    # API Server
    server {
        listen 443 ssl http2;
        server_name api.cybersimpro.com;

        ssl_certificate /etc/nginx/ssl/cert.pem;
        ssl_certificate_key /etc/nginx/ssl/key.pem;
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers HIGH:!aNULL:!MD5;

        location / {
            proxy_pass http://api;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;
        }
    }

    # Dashboard Server
    server {
        listen 443 ssl http2;
        server_name cybersimpro.com www.cybersimpro.com;

        ssl_certificate /etc/nginx/ssl/cert.pem;
        ssl_certificate_key /etc/nginx/ssl/key.pem;
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers HIGH:!aNULL:!MD5;

        location / {
            proxy_pass http://dashboard;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
    }
}
```

---

## Database Setup

### 1. Initialize Database

```bash
# Run migrations
cd apps/api
npx prisma migrate deploy

# Seed initial data
npx prisma db seed
```

### 2. Backup Script

Create `scripts/backup-db.sh`:

```bash
#!/bin/bash

# Database backup script
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups"
DB_NAME="cybersim_prod"
DB_USER="postgres"

# Create backup
pg_dump -U $DB_USER -Fc $DB_NAME > $BACKUP_DIR/backup_$TIMESTAMP.dump

# Keep only last 7 days of backups
find $BACKUP_DIR -name "backup_*.dump" -mtime +7 -delete

echo "Backup completed: backup_$TIMESTAMP.dump"
```

### 3. Setup Cron Job

```bash
# Add to crontab
0 2 * * * /path/to/scripts/backup-db.sh
```

---

## SSL Certificate Setup

### Option 1: Let's Encrypt (Free)

```bash
# Install certbot
sudo apt-get update
sudo apt-get install certbot

# Get certificate
sudo certbot certonly --standalone \
  -d cybersimpro.com \
  -d www.cybersimpro.com \
  -d api.cybersimpro.com

# Copy to nginx directory
sudo cp /etc/letsencrypt/live/cybersimpro.com/fullchain.pem nginx/ssl/cert.pem
sudo cp /etc/letsencrypt/live/cybersimpro.com/privkey.pem nginx/ssl/key.pem

# Setup auto-renewal
sudo certbot renew --dry-run
```

### Option 2: Commercial Certificate

1. Purchase SSL certificate
2. Generate CSR
3. Download certificate files
4. Place in `nginx/ssl/` directory

---

## Deployment Steps

### 1. Build and Deploy

```bash
# Clone repository
git clone https://github.com/yourusername/cybersim-pro.git
cd cybersim-pro

# Setup environment variables
cp apps/api/.env.example apps/api/.env.production
cp apps/dashboard/.env.example apps/dashboard/.env.production
# Edit files with production values

# Build and start
docker-compose -f docker-compose.prod.yml up -d --build

# Check status
docker-compose -f docker-compose.prod.yml ps

# View logs
docker-compose -f docker-compose.prod.yml logs -f
```

### 2. Database Migration

```bash
# Run migrations
docker-compose -f docker-compose.prod.yml exec api npm run migrate

# Seed database (if needed)
docker-compose -f docker-compose.prod.yml exec api npm run seed
```

### 3. Health Checks

```bash
# Check API health
curl https://api.cybersimpro.com/health

# Check dashboard
curl https://cybersimpro.com
```

---

## Monitoring Setup

### 1. Sentry Integration

```bash
# Install Sentry SDK
npm install @sentry/node @sentry/react

# Configure in API
# apps/api/src/config/sentry.ts
import * as Sentry from '@sentry/node'

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
})
```

### 2. Health Check Endpoint

Already implemented in `apps/api/src/routes/health.routes.ts`

### 3. Logging

```typescript
// apps/api/src/utils/logger.ts
import winston from 'winston'

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
})
```

---

## Scaling Considerations

### Horizontal Scaling

```yaml
# docker-compose.prod.yml
services:
  api:
    deploy:
      replicas: 3
      resources:
        limits:
          cpus: '1.0'
          memory: 1G
```

### Load Balancer

Use Nginx upstream with multiple API instances:

```nginx
upstream api {
    least_conn;
    server api1:3003;
    server api2:3003;
    server api3:3003;
}
```

---

## Security Checklist

- [ ] Environment variables stored securely
- [ ] SSL/TLS enabled (HTTPS only)
- [ ] Database credentials rotated
- [ ] JWT secrets strong and unique
- [ ] Rate limiting enabled
- [ ] CORS configured correctly
- [ ] Security headers set
- [ ] SQL injection protection (using Prisma)
- [ ] XSS protection enabled
- [ ] CSRF tokens implemented
- [ ] Regular security audits
- [ ] Dependency updates automated

---

## Rollback Procedure

```bash
# Stop current deployment
docker-compose -f docker-compose.prod.yml down

# Restore database backup
pg_restore -U postgres -d cybersim_prod /backups/backup_TIMESTAMP.dump

# Checkout previous version
git checkout <previous-commit>

# Rebuild and deploy
docker-compose -f docker-compose.prod.yml up -d --build
```

---

## Monitoring & Alerts

### Setup Alerts

1. **Uptime Monitoring:** UptimeRobot, Pingdom
2. **Error Tracking:** Sentry
3. **Performance:** New Relic, DataDog
4. **Logs:** ELK Stack, CloudWatch

### Key Metrics to Monitor

- API response times
- Error rates
- Database connections
- Memory usage
- CPU usage
- Disk space
- Active users
- Training completion rates

---

## Maintenance

### Regular Tasks

**Daily:**
- Check error logs
- Monitor performance metrics
- Review security alerts

**Weekly:**
- Database backups verification
- Security updates
- Performance analysis

**Monthly:**
- Full system audit
- Dependency updates
- Capacity planning
- Cost optimization

---

## Troubleshooting

### Common Issues

**API Not Responding:**
```bash
# Check container status
docker-compose ps

# View logs
docker-compose logs api

# Restart service
docker-compose restart api
```

**Database Connection Issues:**
```bash
# Check PostgreSQL
docker-compose exec postgres pg_isready

# Check connections
docker-compose exec postgres psql -U postgres -c "SELECT * FROM pg_stat_activity;"
```

**High Memory Usage:**
```bash
# Check container stats
docker stats

# Restart with limited resources
docker-compose up -d --scale api=2
```

---

## Support Contacts

- **Technical Issues:** tech@cybersimpro.com
- **Security Issues:** security@cybersimpro.com
- **On-Call:** +1-555-CYBER-911

---

**Last Updated:** October 2025  
**Version:** 1.0.0
