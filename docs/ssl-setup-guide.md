# SSL/TLS Setup Guide with Let's Encrypt

This guide covers setting up free SSL certificates using Let's Encrypt and Certbot for your ReguAI application.

---

## Prerequisites

- Domain name pointing to your VPS IP address
- Nginx installed and configured
- Port 80 and 443 open in firewall
- Root or sudo access

---

## Step 1: Verify DNS Configuration

Before requesting SSL certificates, ensure your domain is properly configured:

```bash
# Check if domain resolves to your VPS IP
dig yourdomain.com +short
dig www.yourdomain.com +short

# Or use nslookup
nslookup yourdomain.com
nslookup www.yourdomain.com

# Or use ping
ping -c 4 yourdomain.com
```

**Important:** Wait for DNS propagation (can take up to 48 hours, usually much faster) before proceeding.

---

## Step 2: Install Certbot

### For Ubuntu 20.04/22.04

```bash
# Update package list
sudo apt update

# Install Certbot and Nginx plugin
sudo apt install -y certbot python3-certbot-nginx

# Verify installation
certbot --version
```

### Alternative: Using Snap (Recommended by Certbot)

```bash
# Remove old certbot if installed via apt
sudo apt remove certbot

# Install snapd if not installed
sudo apt install -y snapd
sudo snap install core
sudo snap refresh core

# Install Certbot via snap
sudo snap install --classic certbot

# Create symbolic link
sudo ln -s /snap/bin/certbot /usr/bin/certbot

# Verify installation
certbot --version
```

---

## Step 3: Prepare Nginx Configuration

### 3.1 Create Initial HTTP-Only Configuration

Before obtaining SSL, create a basic HTTP configuration:

```bash
sudo nano /etc/nginx/sites-available/reguai
```

Add this minimal configuration:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name yourdomain.com www.yourdomain.com;

    # Allow Certbot challenges
    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    # Temporary proxy to application
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### 3.2 Enable Configuration and Test

```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/reguai /etc/nginx/sites-enabled/

# Remove default site if exists
sudo rm /etc/nginx/sites-enabled/default

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

### 3.3 Create Certbot Directory

```bash
# Create directory for ACME challenges
sudo mkdir -p /var/www/certbot
sudo chown -R www-data:www-data /var/www/certbot
```

---

## Step 4: Obtain SSL Certificate

### Method 1: Automatic Configuration (Recommended)

Certbot will automatically configure Nginx:

```bash
# Obtain certificate and auto-configure Nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Follow the prompts:
# 1. Enter email address (for renewal notifications)
# 2. Agree to Terms of Service (Y)
# 3. Share email with EFF (optional, Y/N)
# 4. Choose redirect option:
#    1: No redirect (not recommended)
#    2: Redirect HTTP to HTTPS (recommended)
```

### Method 2: Certificate Only (Manual Configuration)

If you prefer to configure Nginx manually:

```bash
# Obtain certificate only
sudo certbot certonly --nginx -d yourdomain.com -d www.yourdomain.com

# Or using webroot method
sudo certbot certonly --webroot -w /var/www/certbot -d yourdomain.com -d www.yourdomain.com
```

---

## Step 5: Verify SSL Installation

### 5.1 Check Certificate Files

```bash
# List certificates
sudo certbot certificates

# Check certificate files
sudo ls -la /etc/letsencrypt/live/yourdomain.com/

# You should see:
# - cert.pem (certificate)
# - chain.pem (intermediate certificates)
# - fullchain.pem (cert + chain)
# - privkey.pem (private key)
```

### 5.2 Test SSL Configuration

```bash
# Test Nginx configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx

# Test HTTPS connection
curl -I https://yourdomain.com

# Test HTTP to HTTPS redirect
curl -I http://yourdomain.com
```

### 5.3 Online SSL Testing

Visit these sites to test your SSL configuration:

1. **SSL Labs**: https://www.ssllabs.com/ssltest/analyze.html?d=yourdomain.com
2. **SSL Checker**: https://www.sslshopper.com/ssl-checker.html
3. **Security Headers**: https://securityheaders.com/?q=yourdomain.com

---

## Step 6: Configure Automatic Renewal

### 6.1 Test Renewal Process

```bash
# Dry run (test without actually renewing)
sudo certbot renew --dry-run

# If successful, you'll see:
# "Congratulations, all simulated renewals succeeded"
```

### 6.2 Check Renewal Timer

Certbot automatically sets up a systemd timer for renewal:

```bash
# Check timer status
sudo systemctl status certbot.timer

# List all timers
sudo systemctl list-timers | grep certbot

# Check renewal configuration
sudo cat /etc/systemd/system/certbot.timer
```

### 6.3 Manual Renewal (if needed)

```bash
# Renew all certificates
sudo certbot renew

# Renew specific certificate
sudo certbot renew --cert-name yourdomain.com

# Force renewal (even if not due)
sudo certbot renew --force-renewal

# Reload Nginx after renewal
sudo systemctl reload nginx
```

### 6.4 Setup Renewal Hook (Optional)

Create a script to run after successful renewal:

```bash
# Create renewal hook script
sudo nano /etc/letsencrypt/renewal-hooks/deploy/reload-nginx.sh
```

Add this content:

```bash
#!/bin/bash
systemctl reload nginx
```

Make it executable:

```bash
sudo chmod +x /etc/letsencrypt/renewal-hooks/deploy/reload-nginx.sh
```

---

## Step 7: Update Nginx with Full SSL Configuration

Now that you have SSL certificates, update your Nginx configuration with the full production config:

```bash
# Backup current configuration
sudo cp /etc/nginx/sites-available/reguai /etc/nginx/sites-available/reguai.backup

# Copy the production configuration
sudo cp nginx/reguai.conf /etc/nginx/sites-available/reguai

# Update domain name in the configuration
sudo sed -i 's/yourdomain.com/your-actual-domain.com/g' /etc/nginx/sites-available/reguai

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

---

## Step 8: Security Enhancements

### 8.1 Generate Strong DH Parameters (Optional but Recommended)

```bash
# Generate 2048-bit DH parameters (takes a few minutes)
sudo openssl dhparam -out /etc/nginx/dhparam.pem 2048

# Or 4096-bit (takes much longer, more secure)
sudo openssl dhparam -out /etc/nginx/dhparam.pem 4096
```

Add to your Nginx SSL configuration:

```nginx
ssl_dhparam /etc/nginx/dhparam.pem;
```

### 8.2 Enable OCSP Stapling

Already included in the production Nginx config:

```nginx
ssl_stapling on;
ssl_stapling_verify on;
ssl_trusted_certificate /etc/letsencrypt/live/yourdomain.com/chain.pem;
```

### 8.3 Configure HSTS

Already included in the production Nginx config:

```nginx
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
```

To add your domain to HSTS preload list:

1. Visit: https://hstspreload.org/
2. Enter your domain
3. Follow the instructions

---

## Step 9: Monitoring and Maintenance

### 9.1 Check Certificate Expiry

```bash
# Check expiry date
sudo certbot certificates

# Or using openssl
echo | openssl s_client -servername yourdomain.com -connect yourdomain.com:443 2>/dev/null | openssl x509 -noout -dates
```

### 9.2 Setup Expiry Monitoring

Create a monitoring script:

```bash
sudo nano /usr/local/bin/check-ssl-expiry.sh
```

Add this content:

```bash
#!/bin/bash

DOMAIN="yourdomain.com"
DAYS_BEFORE_EXPIRY=30

# Get expiry date
EXPIRY_DATE=$(echo | openssl s_client -servername $DOMAIN -connect $DOMAIN:443 2>/dev/null | openssl x509 -noout -enddate | cut -d= -f2)
EXPIRY_EPOCH=$(date -d "$EXPIRY_DATE" +%s)
CURRENT_EPOCH=$(date +%s)
DAYS_UNTIL_EXPIRY=$(( ($EXPIRY_EPOCH - $CURRENT_EPOCH) / 86400 ))

if [ $DAYS_UNTIL_EXPIRY -lt $DAYS_BEFORE_EXPIRY ]; then
    echo "WARNING: SSL certificate for $DOMAIN expires in $DAYS_UNTIL_EXPIRY days!"
    # Add notification logic here (email, Slack, etc.)
else
    echo "SSL certificate for $DOMAIN is valid for $DAYS_UNTIL_EXPIRY more days"
fi
```

Make it executable:

```bash
sudo chmod +x /usr/local/bin/check-ssl-expiry.sh
```

### 9.3 Setup Cron Job for Monitoring

```bash
# Edit crontab
sudo crontab -e

# Add this line to check daily at 9 AM
0 9 * * * /usr/local/bin/check-ssl-expiry.sh
```

---

## Troubleshooting

### Issue: Certificate Request Failed

**Error:** "Failed authorization procedure"

**Solutions:**

1. Check DNS configuration:

   ```bash
   dig yourdomain.com +short
   ```

2. Verify port 80 is accessible:

   ```bash
   sudo netstat -tlnp | grep :80
   curl -I http://yourdomain.com
   ```

3. Check firewall:

   ```bash
   sudo ufw status
   sudo ufw allow 80/tcp
   sudo ufw allow 443/tcp
   ```

4. Check Nginx is running:
   ```bash
   sudo systemctl status nginx
   ```

### Issue: Rate Limit Exceeded

**Error:** "too many certificates already issued"

**Solutions:**

1. Wait for rate limit to reset (usually 1 week)
2. Use staging environment for testing:

   ```bash
   sudo certbot --nginx --staging -d yourdomain.com
   ```

3. Check rate limits: https://letsencrypt.org/docs/rate-limits/

### Issue: Certificate Not Trusted

**Solutions:**

1. Ensure you're using fullchain.pem:

   ```nginx
   ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
   ```

2. Check certificate chain:
   ```bash
   openssl s_client -connect yourdomain.com:443 -showcerts
   ```

### Issue: Automatic Renewal Not Working

**Solutions:**

1. Check timer status:

   ```bash
   sudo systemctl status certbot.timer
   ```

2. Enable timer if disabled:

   ```bash
   sudo systemctl enable certbot.timer
   sudo systemctl start certbot.timer
   ```

3. Check renewal logs:

   ```bash
   sudo journalctl -u certbot.service
   ```

4. Test renewal manually:
   ```bash
   sudo certbot renew --dry-run
   ```

### Issue: Mixed Content Warnings

**Solutions:**

1. Update all HTTP links to HTTPS in your application
2. Add Content-Security-Policy header (already in Nginx config)
3. Check browser console for specific mixed content issues

---

## Certificate Management Commands

### View Certificates

```bash
# List all certificates
sudo certbot certificates

# Show certificate details
sudo openssl x509 -in /etc/letsencrypt/live/yourdomain.com/cert.pem -text -noout
```

### Revoke Certificate

```bash
# Revoke certificate
sudo certbot revoke --cert-path /etc/letsencrypt/live/yourdomain.com/cert.pem

# Revoke and delete
sudo certbot revoke --cert-path /etc/letsencrypt/live/yourdomain.com/cert.pem --delete-after-revoke
```

### Delete Certificate

```bash
# Delete certificate
sudo certbot delete --cert-name yourdomain.com
```

### Expand Certificate (Add Domains)

```bash
# Add www subdomain to existing certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com --expand
```

---

## Best Practices

1. **Always use fullchain.pem** for the certificate file
2. **Keep private keys secure** (never commit to git)
3. **Monitor certificate expiry** (set up alerts)
4. **Test renewals regularly** using `--dry-run`
5. **Use strong SSL protocols** (TLS 1.2+)
6. **Enable HSTS** for better security
7. **Regular security audits** using SSL Labs
8. **Keep Certbot updated**:
   ```bash
   sudo apt update && sudo apt upgrade certbot
   ```

---

## Additional Resources

- [Let's Encrypt Documentation](https://letsencrypt.org/docs/)
- [Certbot Documentation](https://certbot.eff.org/docs/)
- [Mozilla SSL Configuration Generator](https://ssl-config.mozilla.org/)
- [SSL Labs Testing](https://www.ssllabs.com/ssltest/)
- [Let's Encrypt Rate Limits](https://letsencrypt.org/docs/rate-limits/)

---

## Quick Reference

### Common Commands

```bash
# Obtain certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Renew all certificates
sudo certbot renew

# Test renewal
sudo certbot renew --dry-run

# List certificates
sudo certbot certificates

# Revoke certificate
sudo certbot revoke --cert-name yourdomain.com

# Delete certificate
sudo certbot delete --cert-name yourdomain.com

# Check timer
sudo systemctl status certbot.timer

# View logs
sudo journalctl -u certbot.service
```

---

**SSL Setup Complete! 🔒**

Your application is now secured with:

- ✅ Free SSL/TLS certificate from Let's Encrypt
- ✅ Automatic certificate renewal
- ✅ Strong encryption (TLS 1.2+)
- ✅ Security headers configured
- ✅ HTTP to HTTPS redirect
- ✅ HSTS enabled
