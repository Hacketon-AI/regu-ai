# VPS Setup Guide - Complete Production Deployment

This guide will help you set up your Ubuntu VPS from scratch for deploying the ReguAI application with CI/CD using GitHub Actions self-hosted runner.

## Prerequisites

- Ubuntu 20.04 or 22.04 VPS
- Root or sudo access
- Domain name pointed to your VPS IP
- GitHub repository access

---

## Step 1: Initial VPS Setup

### 1.1 Update System

```bash
sudo apt update && sudo apt upgrade -y
```

### 1.2 Create Deploy User

```bash
# Create a new user for deployment
sudo adduser deploy

# Add to sudo group
sudo usermod -aG sudo deploy

# Switch to deploy user
su - deploy
```

### 1.3 Setup SSH Key (Optional but Recommended)

```bash
# On your local machine, generate SSH key if you don't have one
ssh-keygen -t ed25519 -C "your_email@example.com"

# Copy public key to VPS
ssh-copy-id deploy@your_vps_ip

# Test SSH connection
ssh deploy@your_vps_ip
```

---

## Step 2: Install Docker & Docker Compose

### 2.1 Install Docker

```bash
# Remove old versions if any
sudo apt remove docker docker-engine docker.io containerd runc

# Install dependencies
sudo apt install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

# Add Docker's official GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Set up stable repository
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker Engine
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Verify installation
docker --version
docker compose version
```

### 2.2 Configure Docker for Deploy User

```bash
# Add deploy user to docker group
sudo usermod -aG docker deploy

# Apply group changes (logout and login again, or use)
newgrp docker

# Test Docker without sudo
docker run hello-world

# Enable Docker to start on boot
sudo systemctl enable docker
sudo systemctl start docker
```

---

## Step 3: Setup GitHub Actions Self-Hosted Runner

### 3.1 Create Runner Directory

```bash
# Create directory for GitHub runner
mkdir -p ~/actions-runner && cd ~/actions-runner
```

### 3.2 Download and Configure Runner

```bash
# Download the latest runner package (check GitHub for latest version)
curl -o actions-runner-linux-x64-2.311.0.tar.gz -L https://github.com/actions/runner/releases/download/v2.311.0/actions-runner-linux-x64-2.311.0.tar.gz

# Extract the installer
tar xzf ./actions-runner-linux-x64-2.311.0.tar.gz

# Go to your GitHub repository
# Navigate to: Settings > Actions > Runners > New self-hosted runner
# Copy the configuration command and token, then run:

./config.sh --url https://github.com/YOUR_USERNAME/YOUR_REPO --token YOUR_TOKEN

# When prompted:
# - Enter runner name: vps-runner (or any name you prefer)
# - Enter runner group: Default
# - Enter labels: self-hosted,Linux,X64
# - Enter work folder: _work
```

### 3.3 Install Runner as Service

```bash
# Install the service
sudo ./svc.sh install deploy

# Start the service
sudo ./svc.sh start

# Check status
sudo ./svc.sh status

# Enable auto-start on boot
sudo systemctl enable actions.runner.*
```

### 3.4 Verify Runner

- Go to your GitHub repository
- Navigate to: Settings > Actions > Runners
- You should see your runner with "Idle" status (green dot)

---

## Step 4: Setup Application Directory

### 4.1 Create Application Directory

```bash
# Create directory for the application
sudo mkdir -p /opt/reguai
sudo chown -R deploy:deploy /opt/reguai
cd /opt/reguai
```

### 4.2 Clone Repository (Initial Setup)

```bash
# Clone your repository
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git .

# Or if using SSH
git clone git@github.com:YOUR_USERNAME/YOUR_REPO.git .
```

### 4.3 Create Production Environment File

```bash
# Create .env file
nano .env
```

Add the following content (replace with your actual values):

```env
# Database Configuration
POSTGRES_DB=reguai_db
POSTGRES_USER=reguai_user
POSTGRES_PASSWORD=your_secure_password_here

# Auth Configuration
AUTH_SECRET=your_auth_secret_here_generate_with_openssl_rand_base64_32
AUTH_URL=https://yourdomain.com
```

```bash
# Secure the .env file
chmod 600 .env
```

---

## Step 5: Setup GitHub Secrets

Go to your GitHub repository and add the following secrets:

**Settings > Secrets and variables > Actions > New repository secret**

Add these secrets:

1. `POSTGRES_DB` = `reguai_db`
2. `POSTGRES_USER` = `reguai_user`
3. `POSTGRES_PASSWORD` = `your_secure_password_here`
4. `AUTH_SECRET` = `your_auth_secret_here`
5. `AUTH_URL` = `https://yourdomain.com`

To generate AUTH_SECRET:

```bash
openssl rand -base64 32
```

---

## Step 6: Install and Configure Nginx

### 6.1 Install Nginx

```bash
sudo apt install -y nginx
```

### 6.2 Create Nginx Configuration

```bash
sudo nano /etc/nginx/sites-available/reguai
```

Add the following configuration:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Proxy settings
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;

        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Health check endpoint
    location /api/health {
        proxy_pass http://localhost:3000/api/health;
        access_log off;
    }

    # Client max body size
    client_max_body_size 10M;
}
```

### 6.3 Enable Site and Test Configuration

```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/reguai /etc/nginx/sites-enabled/

# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Test Nginx configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx

# Enable Nginx to start on boot
sudo systemctl enable nginx
```

---

## Step 7: Setup SSL with Certbot

### 7.1 Install Certbot

```bash
sudo apt install -y certbot python3-certbot-nginx
```

### 7.2 Obtain SSL Certificate

```bash
# Make sure your domain is pointing to your VPS IP
# Then run:
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Follow the prompts:
# - Enter email address
# - Agree to terms of service
# - Choose whether to redirect HTTP to HTTPS (recommended: Yes)
```

### 7.3 Test SSL Renewal

```bash
# Test automatic renewal
sudo certbot renew --dry-run

# Certbot will automatically renew certificates before they expire
# Check renewal timer
sudo systemctl status certbot.timer
```

### 7.4 Verify SSL Configuration

After SSL setup, your Nginx config will be automatically updated. Verify it:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

---

## Step 8: Setup Firewall

### 8.1 Configure UFW

```bash
# Install UFW if not installed
sudo apt install -y ufw

# Allow SSH (IMPORTANT: Do this first!)
sudo ufw allow 22/tcp

# Allow HTTP and HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Enable firewall
sudo ufw enable

# Check status
sudo ufw status
```

---

## Step 9: Initial Deployment

### 9.1 Manual First Deployment

```bash
cd /opt/reguai

# Make sure .env file exists with correct values
cat .env

# Start the application
docker compose -f docker-compose.prod.yml up -d

# Check logs
docker compose -f docker-compose.prod.yml logs -f

# Wait for application to start, then test
curl http://localhost:3000/api/health
```

### 9.2 Run Database Migrations

```bash
# Run migrations
docker compose -f docker-compose.prod.yml exec app npx prisma migrate deploy

# Generate Prisma client
docker compose -f docker-compose.prod.yml exec app npx prisma generate
```

### 9.3 Verify Deployment

```bash
# Check running containers
docker ps

# Check application health
curl http://localhost:3000/api/health

# Check via domain (after DNS propagation)
curl https://yourdomain.com/api/health
```

---

## Step 10: Configure GitHub Actions Runner Working Directory

### 10.1 Update Runner Configuration

```bash
cd ~/actions-runner

# Stop the runner service
sudo ./svc.sh stop

# Reconfigure to use /opt/reguai as working directory
./config.sh remove --token YOUR_REMOVAL_TOKEN
./config.sh --url https://github.com/YOUR_USERNAME/YOUR_REPO --token YOUR_NEW_TOKEN --work /opt/reguai/_work

# Start the runner service
sudo ./svc.sh start
```

---

## Step 11: Test CI/CD Pipeline

### 11.1 Trigger Deployment

```bash
# Make a small change in your repository and push to main branch
# Or manually trigger the workflow from GitHub Actions tab

# Monitor deployment
cd /opt/reguai
docker compose -f docker-compose.prod.yml logs -f
```

### 11.2 Verify Deployment

```bash
# Check application status
docker ps

# Check health endpoint
curl https://yourdomain.com/api/health

# Check application logs
docker compose -f docker-compose.prod.yml logs app --tail=100
```

---

## Maintenance Commands

### View Logs

```bash
# Application logs
docker compose -f docker-compose.prod.yml logs -f app

# Database logs
docker compose -f docker-compose.prod.yml logs -f postgres

# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### Restart Services

```bash
# Restart application
docker compose -f docker-compose.prod.yml restart app

# Restart all services
docker compose -f docker-compose.prod.yml restart

# Restart Nginx
sudo systemctl restart nginx
```

### Database Backup

```bash
# Create backup directory
mkdir -p ~/backups

# Backup database
docker compose -f docker-compose.prod.yml exec -T postgres pg_dump -U reguai_user reguai_db > ~/backups/backup_$(date +%Y%m%d_%H%M%S).sql

# Restore database
docker compose -f docker-compose.prod.yml exec -T postgres psql -U reguai_user reguai_db < ~/backups/backup_20240101_120000.sql
```

### Cleanup Docker Resources

```bash
# Remove unused images
docker image prune -a

# Remove unused volumes (CAREFUL!)
docker volume prune

# Remove unused containers
docker container prune

# Full cleanup (CAREFUL!)
docker system prune -a --volumes
```

### Update Application

```bash
# Pull latest changes
cd /opt/reguai
git pull origin main

# Rebuild and restart
docker compose -f docker-compose.prod.yml up -d --build

# Run migrations if needed
docker compose -f docker-compose.prod.yml exec app npx prisma migrate deploy
```

---

## Monitoring and Troubleshooting

### Check Application Health

```bash
# Health check
curl http://localhost:3000/api/health

# Check if port is listening
sudo netstat -tlnp | grep 3000

# Check Docker container status
docker ps
docker compose -f docker-compose.prod.yml ps
```

### Common Issues

#### Issue: Port 3000 already in use

```bash
# Find process using port 3000
sudo lsof -i :3000

# Kill the process
sudo kill -9 <PID>
```

#### Issue: Database connection failed

```bash
# Check database container
docker compose -f docker-compose.prod.yml logs postgres

# Restart database
docker compose -f docker-compose.prod.yml restart postgres

# Check database connection
docker compose -f docker-compose.prod.yml exec postgres psql -U reguai_user -d reguai_db -c "SELECT 1"
```

#### Issue: Nginx not serving the site

```bash
# Check Nginx status
sudo systemctl status nginx

# Test Nginx configuration
sudo nginx -t

# Check Nginx error logs
sudo tail -f /var/log/nginx/error.log
```

#### Issue: SSL certificate issues

```bash
# Check certificate status
sudo certbot certificates

# Renew certificate manually
sudo certbot renew

# Restart Nginx after renewal
sudo systemctl restart nginx
```

---

## Security Best Practices

1. **Keep system updated**

   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

2. **Use strong passwords**
   - Generate secure passwords: `openssl rand -base64 32`

3. **Regular backups**
   - Set up automated database backups
   - Store backups off-site

4. **Monitor logs**
   - Regularly check application and system logs
   - Set up log rotation

5. **Firewall rules**
   - Only open necessary ports
   - Regularly review UFW rules

6. **SSL/TLS**
   - Keep certificates up to date
   - Use strong cipher suites

7. **Docker security**
   - Regularly update Docker images
   - Scan images for vulnerabilities

---

## Useful Resources

- [Docker Documentation](https://docs.docker.com/)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [Certbot Documentation](https://certbot.eff.org/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Prisma Deployment](https://www.prisma.io/docs/guides/deployment)

---

## Support

If you encounter any issues:

1. Check application logs
2. Check Docker container status
3. Check Nginx logs
4. Check GitHub Actions workflow logs
5. Verify environment variables
6. Check firewall rules
7. Verify DNS settings

---

**Setup Complete! 🎉**

Your application should now be:

- ✅ Running on your VPS
- ✅ Accessible via your domain with HTTPS
- ✅ Auto-deploying on push to main branch
- ✅ Backed by a persistent PostgreSQL database
- ✅ Protected by Nginx reverse proxy
- ✅ Secured with SSL certificate
