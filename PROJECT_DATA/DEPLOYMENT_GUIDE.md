# Deployment Guide

## Prerequisites

- Node.js 18.x or higher
- npm or yarn
- Git
- Supabase project
- CloudFlare account (for deployment)

## Environment Setup

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/rapid-stores-platform.git
cd rapid-stores-platform
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
```bash
cp .env.example .env.local
cp .env.production .env.production
```

Edit `.env.local` and `.env.production` with your actual values:
```
VITE_APP_ENV=development
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_API_BASE_URL=your-api-url
```

### 4. Setup Supabase

1. Create Supabase project
2. Run migrations:
   ```sql
   -- Create tables (see schema in PROJECT_DATA)
   ```
3. Enable RLS on sensitive tables
4. Create storage bucket 'uploads'

## Development

### Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5176`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Testing

### Run Unit Tests (To Be Implemented)
```bash
npm run test
```

### Run E2E Tests (To Be Implemented)
```bash
npm run test:e2e
```

### Run Linting
```bash
npm run lint
```

### Fix Linting Issues
```bash
npm run lint:fix
```

## Deployment Options

### Option 1: CloudFlare Pages

1. **Connect Repository**
   ```bash
   npm install -g wrangler
   wrangler auth
   ```

2. **Build Settings**
   - Build command: `npm run build`
   - Build output: `dist`
   - Root directory: `/`

3. **Environment Variables**
   - Set all VITE_* variables in CloudFlare dashboard

4. **Deploy**
   ```bash
   npm run deploy
   ```

### Option 2: Vercel

1. **Connect GitHub Repository**
   - Go to https://vercel.com/new
   - Select your repository
   - Configure build settings

2. **Build Settings**
   - Framework: Vite
   - Build command: `npm run build`
   - Output directory: `dist`

3. **Environment Variables**
   - Add all environment variables in Vercel dashboard

4. **Deploy**
   - Push to main branch
   - Vercel auto-deploys

### Option 3: Docker

1. **Create Dockerfile**
   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY package.json .
   RUN npm install
   COPY . .
   RUN npm run build
   
   FROM node:18-alpine
   WORKDIR /app
   COPY --from=0 /app/dist .
   EXPOSE 3000
   CMD ["npm", "preview"]
   ```

2. **Build Image**
   ```bash
   docker build -t rapid-stores .
   ```

3. **Run Container**
   ```bash
   docker run -p 3000:3000 rapid-stores
   ```

## Database Setup

### 1. Initial Setup
- Supabase automatically handles PostgreSQL setup
- Run migrations through Supabase UI or CLI

### 2. Backups
```bash
# Backup database
pg_dump <connection-string> > backup.sql

# Restore database
psql <connection-string> < backup.sql
```

### 3. Replication
- Enable replication in Supabase dashboard
- Configure read replicas for scaling

## SSL/TLS Certificate

### CloudFlare
- Automatic SSL through CloudFlare
- Use Full SSL (strict) mode

### Self-Hosted
```bash
# Using Let's Encrypt
certbot certonly --standalone -d yourdomain.com
```

## Performance Optimization

### 1. CDN Setup
- Use CloudFlare for global CDN
- Configure cache rules
- Enable Gzip compression

### 2. Database Optimization
```sql
-- Create indexes on frequently queried fields
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_users_email ON users(email);
```

### 3. Asset Optimization
- Minify JavaScript and CSS
- Compress images
- Use WebP format where possible

### 4. Caching Headers
```
# .htaccess or server config
Cache-Control: public, max-age=31536000 (for versioned assets)
Cache-Control: public, max-age=3600 (for HTML)
Cache-Control: no-cache (for API responses)
```

## Monitoring & Maintenance

### 1. Error Tracking
- Set up Sentry
- Configure error alerts
- Review error logs daily

### 2. Performance Monitoring
- Use Vercel Analytics or similar
- Monitor Core Web Vitals
- Review API response times

### 3. Uptime Monitoring
```bash
# Use Healthchecks.io or similar
# Set up health check endpoint
GET /health
```

### 4. Log Aggregation
- CloudFlare logs in CloudFlare dashboard
- Application logs in Supabase
- Error logs in Sentry

## Security Hardening

### 1. Enable HTTPS
- Force HTTPS redirect
- Enable HSTS header

### 2. Security Headers
```
Strict-Transport-Security: max-age=31536000
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Content-Security-Policy: default-src 'self'
```

### 3. Rate Limiting
- Enable in CloudFlare
- Configure thresholds
- Set up alerts

### 4. DDoS Protection
- Enable CloudFlare DDoS protection
- Configure firewall rules
- Monitor attack patterns

### 5. Database Security
- Enable RLS policies
- Rotate credentials regularly
- Use strong passwords
- Enable 2FA for admin access

## Rollback Plan

### Manual Rollback
```bash
# Revert to previous version
git reset --hard <commit-hash>
git push origin main --force
```

### Database Rollback
```bash
# Restore from backup
psql <connection-string> < backup.sql
```

### Gradual Rollout
- Use feature flags
- Deploy to staging first
- Use canary deployments

## Maintenance

### Daily Tasks
- Monitor error rates
- Check system health
- Review security logs

### Weekly Tasks
- Review analytics
- Check backup status
- Update dependencies (security patches)
- Review performance metrics

### Monthly Tasks
- Security audit
- Capacity planning
- Performance review
- Disaster recovery testing

### Quarterly Tasks
- Full system audit
- Security penetration testing
- Scalability assessment
- Cost optimization review

## Troubleshooting

### Deploy Fails
1. Check build logs
2. Verify environment variables
3. Check Node version compatibility
4. Run `npm install` again

### Application Won't Start
1. Check error logs
2. Verify database connection
3. Check Supabase URL and keys
4. Review environment variables

### High Error Rate
1. Check error tracking service
2. Review recent deployments
3. Check database performance
4. Review API response times
5. Check user reports

### Performance Issues
1. Check Core Web Vitals
2. Review database queries
3. Check API response times
4. Monitor server resources
5. Review cache settings

## Support

- Documentation: See PROJECT_DATA/ folder
- Issues: GitHub Issues
- Email: support@rapidstores.com
