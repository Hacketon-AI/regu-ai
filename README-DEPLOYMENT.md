# 🚀 ReguAI - Production Deployment Guide

Complete CI/CD setup for deploying to VPS Ubuntu with GitHub Actions + Self-Hosted Runner.

---

## 📋 Quick Links

- **[Deployment Summary](./docs/deployment-summary.md)** - Overview of all components
- **[VPS Setup Guide](./docs/vps-setup-guide.md)** - Complete server setup from scratch
- **[SSL Setup Guide](./docs/ssl-setup-guide.md)** - Let's Encrypt SSL configuration
- **[Environment Variables Guide](./docs/environment-variables-guide.md)** - Configuration management

---

## 🎯 What You Get

✅ **Automated Deployment** - Push to main → Auto deploy  
✅ **Zero Downtime** - Health checks & graceful restarts  
✅ **Secure** - SSL/TLS, secrets management, security headers  
✅ **Persistent Data** - PostgreSQL with volume persistence  
✅ **Production Ready** - Optimized Docker images, caching, compression  
✅ **Easy Maintenance** - Simple commands, comprehensive logging

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Internet                             │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTPS (443)
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    Nginx Reverse Proxy                       │
│  • SSL/TLS Termination                                       │
│  • Rate Limiting                                             │
│  • Security Headers                                          │
│  • Static File Caching                                       │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTP (3000)
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   Next.js Application                        │
│  • Docker Container                                          │
│  • Health Checks                                             │
│  • Auto Restart                                              │
└────────────────────────┬────────────────────────────────────┘
                         │ PostgreSQL Protocol
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                  PostgreSQL Database                         │
│  • Docker Container                                          │
│  • Persistent Volume                                         │
│  • Automatic Backups                                         │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    GitHub Actions Runner                     │
│  • Self-Hosted on VPS                                        │
│  • Triggers on Push to Main                                  │
│  • Automated Deployment Pipeline                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 Quick Start (5 Steps)

### Step 1: Setup VPS (30 minutes)

```bash
# SSH to your VPS
ssh root@your-vps-ip

# Follow the complete guide
# See: docs/vps-setup-guide.md

# Quick commands:
sudo apt update && sudo apt upgrade -y
# Install Docker, Docker Compose, Nginx
# Setup GitHub Actions runner
# Configure firewall
```

### Step 2: Configure GitHub Secrets (5 minutes)

Go to: **Repository → Settings → Secrets and variables → Actions**

Add these secrets:

```
POSTGRES_DB          = reguai_db
POSTGRES_USER        = reguai_user
POSTGRES_PASSWORD    = [generate: openssl rand -base64 32]
AUTH_SECRET          = [generate: openssl rand -base64 32]
AUTH_URL             = https://yourdomain.com
```

### Step 3: Setup SSL Certificate (10 minutes)

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Follow prompts and choose redirect HTTP to HTTPS
```

### Step 4: Initial Deployment (10 minutes)

```bash
# On VPS
cd /opt/reguai

# Clone repository
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git .

# Create .env file
nano .env
# Add production environment variables (see docs/environment-variables-guide.md)

# Secure .env
chmod 600 .env

# Deploy
docker compose -f docker-compose.prod.yml up -d

# Run migrations
docker compose -f docker-compose.prod.yml exec app npx prisma migrate deploy
```

### Step 5: Test Deployment (5 minutes)

```bash
# Check health
curl https://yourdomain.com/api/health

# Check containers
docker ps

# Test auto-deployment
# Make a change and push to main
git add .
git commit -m "Test deployment"
git push origin main

# Monitor in GitHub Actions tab
```

---

## 📦 Files Created

### Docker Configuration

- [`Dockerfile`](./Dockerfile) - Production-optimized multi-stage build
- [`docker-compose.prod.yml`](./docker-compose.prod.yml) - Production compose config
- [`.dockerignore`](./.dockerignore) - Build optimization

### CI/CD Pipeline

- [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml) - Automated deployment

### Server Configuration

- [`nginx/reguai.conf`](./nginx/reguai.conf) - Nginx reverse proxy config

### Application

- [`src/app/api/health/route.ts`](./src/app/api/health/route.ts) - Health check endpoint
- [`next.config.ts`](./next.config.ts) - Updated with standalone output

### Documentation

- [`docs/deployment-summary.md`](./docs/deployment-summary.md) - Complete overview
- [`docs/vps-setup-guide.md`](./docs/vps-setup-guide.md) - Server setup guide
- [`docs/ssl-setup-guide.md`](./docs/ssl-setup-guide.md) - SSL configuration
- [`docs/environment-variables-guide.md`](./docs/environment-variables-guide.md) - Config guide

---

## 🔄 Deployment Workflow

### Automatic (Recommended)

```bash
# Make changes
git add .
git commit -m "Your changes"
git push origin main

# GitHub Actions automatically:
# ✅ Pulls latest code
# ✅ Builds Docker image
# ✅ Runs migrations
# ✅ Restarts app
# ✅ Verifies health
# ✅ Cleans up old images
```

### Manual (If Needed)

```bash
ssh deploy@your-vps-ip
cd /opt/reguai
git pull origin main
docker compose -f docker-compose.prod.yml up -d --build
docker compose -f docker-compose.prod.yml exec app npx prisma migrate deploy
```

---

## 🛠️ Common Commands

### Check Status

```bash
# Container status
docker compose -f docker-compose.prod.yml ps

# Application logs
docker compose -f docker-compose.prod.yml logs -f app

# Health check
curl https://yourdomain.com/api/health
```

### Restart Services

```bash
# Restart app
docker compose -f docker-compose.prod.yml restart app

# Restart all
docker compose -f docker-compose.prod.yml restart

# Restart Nginx
sudo systemctl restart nginx
```

### Database Operations

```bash
# Backup
docker compose -f docker-compose.prod.yml exec -T postgres \
  pg_dump -U reguai_user reguai_db > backup_$(date +%Y%m%d).sql

# Restore
docker compose -f docker-compose.prod.yml exec -T postgres \
  psql -U reguai_user reguai_db < backup_20240101.sql

# Access database
docker compose -f docker-compose.prod.yml exec postgres \
  psql -U reguai_user -d reguai_db
```

---

## 🔒 Security Features

- ✅ SSL/TLS encryption (Let's Encrypt)
- ✅ HSTS enabled
- ✅ Security headers (CSP, X-Frame-Options, etc.)
- ✅ Rate limiting
- ✅ Environment variables via GitHub Secrets
- ✅ No secrets in repository
- ✅ Non-root Docker user
- ✅ Firewall configured
- ✅ Automatic SSL renewal

---

## 📊 Monitoring

### Health Checks

```bash
# Application
curl https://yourdomain.com/api/health

# Database
docker compose -f docker-compose.prod.yml exec postgres pg_isready

# SSL Certificate
sudo certbot certificates

# Nginx
sudo systemctl status nginx
```

### Logs

```bash
# Application logs
docker compose -f docker-compose.prod.yml logs -f app

# Nginx access logs
sudo tail -f /var/log/nginx/reguai_access.log

# Nginx error logs
sudo tail -f /var/log/nginx/reguai_error.log
```

---

## 🆘 Troubleshooting

### Deployment Failed

1. Check GitHub Actions logs
2. Check application logs: `docker compose -f docker-compose.prod.yml logs app`
3. Check runner status: `sudo ./svc.sh status`

### Application Not Accessible

1. Check containers: `docker ps`
2. Check Nginx: `sudo systemctl status nginx`
3. Check firewall: `sudo ufw status`
4. Test locally: `curl http://localhost:3000/api/health`

### Database Issues

1. Check logs: `docker compose -f docker-compose.prod.yml logs postgres`
2. Test connection: `docker compose -f docker-compose.prod.yml exec postgres psql -U reguai_user -d reguai_db -c "SELECT 1"`
3. Verify DATABASE_URL in `.env`

---

## 📚 Documentation

| Guide                                                          | Description                                       |
| -------------------------------------------------------------- | ------------------------------------------------- |
| [Deployment Summary](./docs/deployment-summary.md)             | Complete overview of all components               |
| [VPS Setup Guide](./docs/vps-setup-guide.md)                   | Step-by-step server setup (Docker, Nginx, Runner) |
| [SSL Setup Guide](./docs/ssl-setup-guide.md)                   | Let's Encrypt SSL certificate configuration       |
| [Environment Variables](./docs/environment-variables-guide.md) | Configuration and secrets management              |

---

## 🎯 Stack

- **Frontend**: Next.js 16 (React 19)
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL 16
- **ORM**: Prisma
- **Auth**: NextAuth.js v5
- **Deployment**: Docker + Docker Compose
- **CI/CD**: GitHub Actions (Self-Hosted)
- **Web Server**: Nginx
- **SSL**: Let's Encrypt (Certbot)
- **OS**: Ubuntu 20.04/22.04

---

## ✅ Success Checklist

- [ ] VPS setup completed
- [ ] Docker & Docker Compose installed
- [ ] GitHub Actions runner configured
- [ ] GitHub Secrets added
- [ ] Nginx installed and configured
- [ ] SSL certificate obtained
- [ ] Firewall configured
- [ ] Initial deployment successful
- [ ] Health check returns 200 OK
- [ ] Auto-deployment tested
- [ ] Database persistent across restarts
- [ ] Logs accessible
- [ ] Backups configured

---

## 🎉 You're Done!

Your application is now:

- 🚀 Auto-deploying on every push
- 🔒 Secured with SSL/TLS
- 🐳 Running in Docker
- 💾 Using persistent database
- 🔄 Zero-downtime deployments
- 📊 Health monitored
- 🛡️ Production-ready

---

## 📞 Need Help?

1. Check the [Troubleshooting](#-troubleshooting) section
2. Review the detailed guides in [`docs/`](./docs/)
3. Check application logs
4. Verify environment variables
5. Test health check endpoint

---

**Happy Deploying! 🚀**
