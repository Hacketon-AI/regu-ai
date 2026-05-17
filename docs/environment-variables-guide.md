# Environment Variables Guide

Complete guide for managing environment variables in development and production environments.

---

## Overview

The ReguAI application uses environment variables for configuration. This guide covers:

- Required variables
- Optional variables
- Security best practices
- Setup for different environments

---

## Required Environment Variables

### Database Configuration

```env
# PostgreSQL Database URL
DATABASE_URL="postgresql://username:password@host:port/database?schema=public"
```

**Format Breakdown:**

- `username`: Database user (e.g., `reguai_user`)
- `password`: Database password (use strong password)
- `host`: Database host (`localhost` for local, `postgres` for Docker)
- `port`: Database port (default: `5432`)
- `database`: Database name (e.g., `reguai_db`)
- `schema`: Database schema (default: `public`)

**Examples:**

```env
# Local development
DATABASE_URL="postgresql://reguai_user:reguai_password@localhost:5432/reguai_db?schema=public"

# Docker Compose
DATABASE_URL="postgresql://reguai_user:reguai_password@postgres:5432/reguai_db?schema=public"

# Production (external database)
DATABASE_URL="postgresql://prod_user:secure_password@db.example.com:5432/reguai_prod?schema=public"
```

### Authentication Configuration

```env
# Auth.js Secret (REQUIRED)
# Generate with: openssl rand -base64 32
AUTH_SECRET="your-secret-key-here-minimum-32-characters"

# Auth.js URL (REQUIRED)
# Must match your application URL
AUTH_URL="http://localhost:3000"
```

**Production Example:**

```env
AUTH_SECRET="Kx9mP2vL8nQ4wR7tY6uI3oP5aS1dF0gH2jK4lZ8xC9vB3nM6qW1eR5tY8uI0oP2a"
AUTH_URL="https://yourdomain.com"
```

---

## Optional Environment Variables

### Node.js Configuration

```env
# Node environment
NODE_ENV="development"  # or "production"

# Application port
PORT=3000

# Hostname
HOSTNAME="0.0.0.0"
```

### Next.js Configuration

```env
# Disable telemetry
NEXT_TELEMETRY_DISABLED=1

# Public URL (for client-side)
NEXT_PUBLIC_APP_URL="https://yourdomain.com"
```

### Logging Configuration

```env
# Log level
LOG_LEVEL="info"  # debug, info, warn, error

# Enable debug mode
DEBUG="false"
```

---

## Environment Setup by Stage

### 1. Local Development

Create `.env.local` file:

```env
# Database (using Docker Compose)
DATABASE_URL="postgresql://reguai_user:reguai_password@localhost:5432/reguai_db?schema=public"

# Auth Configuration
AUTH_SECRET="dev-secret-key-change-in-production-minimum-32-chars"
AUTH_URL="http://localhost:3000"

# Node Environment
NODE_ENV="development"

# Optional: Enable debug logging
LOG_LEVEL="debug"
DEBUG="true"
```

**Setup Commands:**

```bash
# Copy example file
cp .env.example .env.local

# Edit with your values
nano .env.local

# Start database
npm run docker:up

# Run migrations
npm run db:migrate

# Start development server
npm run dev
```

### 2. Docker Compose (Local)

The `docker-compose.yml` file uses environment variables from `.env` file:

Create `.env` file:

```env
# Database Configuration
POSTGRES_DB=reguai_db
POSTGRES_USER=reguai_user
POSTGRES_PASSWORD=reguai_password

# Auth Configuration
AUTH_SECRET=dev-secret-key-change-in-production-minimum-32-chars
AUTH_URL=http://localhost:3000
```

**Setup Commands:**

```bash
# Create .env file
cp .env.example .env

# Edit values
nano .env

# Start services
docker compose up -d

# Check logs
docker compose logs -f
```

### 3. Production (VPS)

Create `.env` file on VPS at `/opt/reguai/.env`:

```env
# Database Configuration
POSTGRES_DB=reguai_db
POSTGRES_USER=reguai_user
POSTGRES_PASSWORD=CHANGE_THIS_TO_SECURE_PASSWORD

# Auth Configuration (IMPORTANT: Generate new secret!)
AUTH_SECRET=GENERATE_NEW_SECRET_WITH_OPENSSL_RAND_BASE64_32
AUTH_URL=https://yourdomain.com

# Node Environment
NODE_ENV=production
```

**Setup Commands:**

```bash
# SSH to VPS
ssh deploy@your-vps-ip

# Navigate to application directory
cd /opt/reguai

# Create .env file
nano .env

# Paste production values (see above)
# Save and exit (Ctrl+X, Y, Enter)

# Secure the file
chmod 600 .env

# Verify file permissions
ls -la .env
# Should show: -rw------- (only owner can read/write)

# Verify content (without showing sensitive values)
cat .env | sed 's/=.*/=***HIDDEN***/g'
```

---

## GitHub Secrets Configuration

For CI/CD with GitHub Actions, add these secrets to your repository:

**Navigate to:** Repository → Settings → Secrets and variables → Actions → New repository secret

### Required Secrets

| Secret Name         | Description        | Example Value               |
| ------------------- | ------------------ | --------------------------- |
| `POSTGRES_DB`       | Database name      | `reguai_db`                 |
| `POSTGRES_USER`     | Database user      | `reguai_user`               |
| `POSTGRES_PASSWORD` | Database password  | `secure_password_123`       |
| `AUTH_SECRET`       | Auth.js secret key | `Kx9mP2vL8n...` (32+ chars) |
| `AUTH_URL`          | Application URL    | `https://yourdomain.com`    |

### Adding Secrets via GitHub UI

1. Go to your repository on GitHub
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Enter **Name** and **Secret** value
5. Click **Add secret**
6. Repeat for all required secrets

### Adding Secrets via GitHub CLI

```bash
# Install GitHub CLI if not installed
# https://cli.github.com/

# Login to GitHub
gh auth login

# Add secrets
gh secret set POSTGRES_DB -b "reguai_db"
gh secret set POSTGRES_USER -b "reguai_user"
gh secret set POSTGRES_PASSWORD -b "your_secure_password"
gh secret set AUTH_SECRET -b "$(openssl rand -base64 32)"
gh secret set AUTH_URL -b "https://yourdomain.com"

# List secrets (values are hidden)
gh secret list
```

---

## Generating Secure Values

### Generate AUTH_SECRET

**Method 1: Using OpenSSL (Recommended)**

```bash
openssl rand -base64 32
```

**Method 2: Using Node.js**

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**Method 3: Using Python**

```bash
python3 -c "import secrets; print(secrets.token_urlsafe(32))"
```

### Generate Database Password

**Method 1: Using OpenSSL**

```bash
openssl rand -base64 24
```

**Method 2: Using pwgen**

```bash
# Install pwgen
sudo apt install pwgen

# Generate password
pwgen -s 32 1
```

---

## Security Best Practices

### 1. Never Commit Secrets to Git

```bash
# Ensure .env files are in .gitignore
echo ".env" >> .gitignore
echo ".env.local" >> .gitignore
echo ".env.production" >> .gitignore

# Check if any .env files are tracked
git ls-files | grep .env

# If found, remove from git (but keep local file)
git rm --cached .env
git commit -m "Remove .env from git"
```

### 2. Use Different Secrets for Each Environment

```
Development  → Use simple secrets for easy debugging
Staging      → Use production-like secrets
Production   → Use strong, unique secrets
```

### 3. Rotate Secrets Regularly

```bash
# Generate new AUTH_SECRET
NEW_SECRET=$(openssl rand -base64 32)

# Update .env file
sed -i "s/AUTH_SECRET=.*/AUTH_SECRET=$NEW_SECRET/" .env

# Update GitHub Secrets
gh secret set AUTH_SECRET -b "$NEW_SECRET"

# Restart application
docker compose -f docker-compose.prod.yml restart app
```

### 4. Secure File Permissions

```bash
# Set restrictive permissions on .env files
chmod 600 .env

# Verify permissions
ls -la .env
# Should show: -rw------- (only owner can read/write)

# Set ownership to deploy user
sudo chown deploy:deploy .env
```

### 5. Use Environment-Specific Files

```
.env.local       → Local development (gitignored)
.env.development → Development environment (gitignored)
.env.test        → Testing environment (gitignored)
.env.production  → Production environment (gitignored)
.env.example     → Template file (committed to git)
```

---

## Troubleshooting

### Issue: Environment Variables Not Loading

**Check 1: File exists and is readable**

```bash
ls -la .env
cat .env
```

**Check 2: File format is correct**

```bash
# No spaces around =
# Correct:
DATABASE_URL="postgresql://..."

# Incorrect:
DATABASE_URL = "postgresql://..."
```

**Check 3: Restart application**

```bash
# For Docker
docker compose restart app

# For development
# Stop (Ctrl+C) and restart: npm run dev
```

### Issue: Database Connection Failed

**Check DATABASE_URL format:**

```bash
# Verify URL format
echo $DATABASE_URL

# Test database connection
docker compose exec postgres psql -U reguai_user -d reguai_db -c "SELECT 1"
```

**Common mistakes:**

```env
# Wrong: Missing schema
DATABASE_URL="postgresql://user:pass@host:5432/db"

# Correct: With schema
DATABASE_URL="postgresql://user:pass@host:5432/db?schema=public"

# Wrong: Wrong host in Docker
DATABASE_URL="postgresql://user:pass@localhost:5432/db"

# Correct: Use service name in Docker
DATABASE_URL="postgresql://user:pass@postgres:5432/db"
```

### Issue: AUTH_SECRET Too Short

**Error:** "AUTH_SECRET must be at least 32 characters"

**Solution:**

```bash
# Generate new secret (32+ characters)
openssl rand -base64 32

# Update .env file
nano .env
# Replace AUTH_SECRET value

# Restart application
docker compose restart app
```

### Issue: AUTH_URL Mismatch

**Error:** "Redirect URI mismatch" or authentication fails

**Solution:**

```bash
# Ensure AUTH_URL matches your actual URL

# Development:
AUTH_URL="http://localhost:3000"

# Production:
AUTH_URL="https://yourdomain.com"

# NOT:
AUTH_URL="https://yourdomain.com/"  # Remove trailing slash
```

---

## Environment Variables Checklist

### Development Setup

- [ ] Copy `.env.example` to `.env.local`
- [ ] Set `DATABASE_URL` for local database
- [ ] Generate `AUTH_SECRET` (can be simple for dev)
- [ ] Set `AUTH_URL` to `http://localhost:3000`
- [ ] Start database: `npm run docker:up`
- [ ] Run migrations: `npm run db:migrate`
- [ ] Test: `npm run dev`

### Production Setup

- [ ] Create `.env` file on VPS
- [ ] Generate strong `POSTGRES_PASSWORD`
- [ ] Generate strong `AUTH_SECRET` (32+ chars)
- [ ] Set `AUTH_URL` to production domain
- [ ] Set file permissions: `chmod 600 .env`
- [ ] Add all secrets to GitHub Secrets
- [ ] Test deployment
- [ ] Verify health check: `curl https://yourdomain.com/api/health`

---

## Quick Reference

### Essential Commands

```bash
# Generate AUTH_SECRET
openssl rand -base64 32

# Generate database password
openssl rand -base64 24

# Check environment variables (Docker)
docker compose exec app env | grep -E "DATABASE_URL|AUTH_SECRET|AUTH_URL"

# Secure .env file
chmod 600 .env

# Test database connection
docker compose exec postgres psql -U reguai_user -d reguai_db -c "SELECT 1"

# Restart application
docker compose restart app
```

### File Locations

```
Local Development:
  .env.local              → d:/Hackathon/regu-ai/.env.local

Production VPS:
  .env                    → /opt/reguai/.env

GitHub Secrets:
  Repository Settings     → Settings > Secrets and variables > Actions
```

---

## Additional Resources

- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Prisma Connection URLs](https://www.prisma.io/docs/reference/database-reference/connection-urls)
- [Auth.js Configuration](https://authjs.dev/getting-started/deployment)
- [Docker Compose Environment Variables](https://docs.docker.com/compose/environment-variables/)

---

**Environment Configuration Complete! ⚙️**

Your application is now configured with:

- ✅ Secure environment variables
- ✅ Proper file permissions
- ✅ GitHub Secrets configured
- ✅ Environment-specific settings
- ✅ Security best practices applied
