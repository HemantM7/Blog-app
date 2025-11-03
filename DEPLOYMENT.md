# 🚀 Deployment Guide

This guide covers various deployment options for Simple Blog UI.

## 📋 Prerequisites

- Node.js 18+ installed
- Git repository set up
- Production build tested locally

## 🌐 GitHub Pages (Recommended)

### Automatic Deployment

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "feat: initial commit"
   git push origin main
   ```

2. **Enable GitHub Pages**
   - Go to repository Settings
   - Navigate to Pages section
   - Select "GitHub Actions" as source
   - The workflow will automatically deploy on push to main

3. **Access your site**
   ```
   https://yourusername.github.io/simple-blog-ui/
   ```

### Manual Deployment

```bash
# Build and deploy
npm run build:prod
npm run deploy
```

## ⚡ Vercel

1. **Connect Repository**
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository

2. **Configure Build Settings**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Deploy**
   - Automatic deployment on every push
   - Preview deployments for pull requests

## 🌍 Netlify

### Option 1: Git Integration

1. **Connect Repository**
   - Visit [netlify.com](https://netlify.com)
   - Connect your GitHub repository

2. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`

### Option 2: Manual Deploy

1. **Build locally**
   ```bash
   npm run build:prod
   ```

2. **Deploy**
   - Drag and drop the `dist` folder to Netlify

## 🔥 Firebase Hosting

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Initialize Firebase**
   ```bash
   firebase init hosting
   ```

3. **Configure firebase.json**
   ```json
   {
     "hosting": {
       "public": "dist",
       "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
       "rewrites": [
         {
           "source": "**",
           "destination": "/index.html"
         }
       ]
     }
   }
   ```

4. **Deploy**
   ```bash
   npm run build:prod
   firebase deploy
   ```

## 🐳 Docker Deployment

1. **Create Dockerfile**
   ```dockerfile
   # Build stage
   FROM node:18-alpine as build
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --only=production
   COPY . .
   RUN npm run build:prod

   # Production stage
   FROM nginx:alpine
   COPY --from=build /app/dist /usr/share/nginx/html
   COPY nginx.conf /etc/nginx/nginx.conf
   EXPOSE 80
   CMD ["nginx", "-g", "daemon off;"]
   ```

2. **Create nginx.conf**
   ```nginx
   events {
     worker_connections 1024;
   }

   http {
     include /etc/nginx/mime.types;
     default_type application/octet-stream;

     server {
       listen 80;
       server_name localhost;
       root /usr/share/nginx/html;
       index index.html;

       location / {
         try_files $uri $uri/ /index.html;
       }
     }
   }
   ```

3. **Build and run**
   ```bash
   docker build -t simple-blog-ui .
   docker run -p 80:80 simple-blog-ui
   ```

## ☁️ AWS S3 + CloudFront

1. **Build the project**
   ```bash
   npm run build:prod
   ```

2. **Create S3 bucket**
   - Enable static website hosting
   - Upload `dist` folder contents

3. **Configure CloudFront**
   - Create distribution
   - Set S3 bucket as origin
   - Configure error pages for SPA routing

## 🔧 Environment Configuration

### Production Environment Variables

Create `.env.production`:
```env
VITE_APP_TITLE=Simple Blog UI
VITE_APP_VERSION=1.0.0
VITE_APP_DESCRIPTION=A modern blog application
```

### Build Optimization

The production build includes:
- Code splitting for better performance
- Minification with Terser
- Tree shaking to remove unused code
- Asset optimization
- Source map generation (disabled for security)

## 📊 Performance Monitoring

### Bundle Analysis

```bash
npm run analyze
```

### Lighthouse Audit

Run Lighthouse on your deployed site to check:
- Performance
- Accessibility
- Best Practices
- SEO

## 🔒 Security Considerations

### Content Security Policy

Add CSP headers to your hosting platform:
```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src 'self' fonts.gstatic.com; img-src 'self' data: https:;
```

### HTTPS

Ensure your site is served over HTTPS:
- GitHub Pages: Automatic HTTPS
- Vercel/Netlify: Automatic HTTPS
- Custom domains: Configure SSL certificates

## 🚨 Troubleshooting

### Common Issues

1. **Blank page after deployment**
   - Check browser console for errors
   - Verify base URL in vite.config.ts
   - Ensure all assets are loading correctly

2. **404 errors on refresh**
   - Configure server for SPA routing
   - Add rewrite rules for single-page applications

3. **Build failures**
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Run `npm run type-check` locally

### Debug Commands

```bash
# Check build locally
npm run build:prod
npm run preview

# Verify dependencies
npm audit
npm outdated

# Clean install
rm -rf node_modules package-lock.json
npm install
```

## 📈 Monitoring

### Analytics

Add analytics to track usage:
- Google Analytics
- Plausible Analytics
- Simple Analytics

### Error Monitoring

Consider adding error tracking:
- Sentry
- LogRocket
- Bugsnag

## 🔄 CI/CD Pipeline

The included GitHub Actions workflow:
1. Runs on push to main branch
2. Installs dependencies
3. Runs type checking
4. Builds the project
5. Deploys to GitHub Pages

Customize the workflow in `.github/workflows/deploy.yml` for your needs.

---

Need help with deployment? Open an issue or check the documentation!