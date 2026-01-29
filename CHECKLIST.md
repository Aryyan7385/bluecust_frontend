# 📋 BlueCust Deployment Checklist

## Pre-Deployment Checklist

- [x] Backend deployed to Render
- [x] Backend URL: `https://bluecast-api-vw9o.onrender.com`
- [x] MongoDB database configured
- [ ] Frontend files prepared
- [ ] Environment variables ready

---

## Vercel Deployment Steps

### Step 1: Prepare Repository
- [ ] Create GitHub account (if not already)
- [ ] Create new repository `bluecust-frontend`
- [ ] Set repository to Private

### Step 2: Push Code
- [ ] Initialize git: `git init`
- [ ] Add files: `git add .`
- [ ] Commit: `git commit -m "Initial commit"`
- [ ] Add remote: `git remote add origin YOUR_REPO_URL`
- [ ] Push: `git push -u origin main`

### Step 3: Deploy on Vercel
- [ ] Sign up/login to Vercel (https://vercel.com)
- [ ] Click "Add New Project"
- [ ] Import GitHub repository
- [ ] Verify settings:
  - [ ] Framework: Create React App
  - [ ] Build Command: `npm run build`
  - [ ] Output Directory: `build`
- [ ] Add environment variable:
  - [ ] Key: `REACT_APP_BACKEND_URL`
  - [ ] Value: `https://bluecast-api-vw9o.onrender.com`
  - [ ] Environments: All (Production, Preview, Development)
- [ ] Click "Deploy"
- [ ] Wait for deployment (2-3 minutes)

### Step 4: Post-Deployment Testing
- [ ] Visit Vercel URL
- [ ] Test landing page loads
- [ ] Test registration form
- [ ] Test login functionality
- [ ] Test customer dashboard
- [ ] Test admin dashboard (if admin user exists)
- [ ] Verify API connection works
- [ ] Test on mobile device
- [ ] Check browser console for errors

---

## Environment Variables

Make sure these are set on Vercel:

| Variable | Value | Required |
|----------|-------|----------|
| REACT_APP_BACKEND_URL | https://bluecast-api-vw9o.onrender.com | ✅ Yes |

---

## Troubleshooting

### If deployment fails:
1. Check build logs in Vercel dashboard
2. Verify all dependencies in package.json
3. Ensure Node version is >= 18
4. Check environment variables are set

### If app shows blank page:
1. Open browser console (F12)
2. Check for JavaScript errors
3. Verify API URL is correct
4. Clear browser cache

### If API calls fail:
1. Verify backend is running
2. Check CORS settings on backend
3. Verify environment variable is set
4. Check Network tab in browser

---

## Success Criteria

✅ Frontend deploys successfully
✅ All pages load without errors
✅ Users can register
✅ Users can login
✅ Dashboard displays correctly
✅ API calls work
✅ Mobile responsive

---

## Your Deployment URLs

**Backend:**
```
https://bluecast-api-vw9o.onrender.com
```

**Frontend (after deployment):**
```
https://bluecust-frontend.vercel.app (or your custom URL)
```

---

## Quick Commands Reference

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Add environment variable
vercel env add REACT_APP_BACKEND_URL

# Deploy to production
vercel --prod

# View deployment logs
vercel logs
```

---

## Next Steps After Deployment

1. Share URL with team
2. Add custom domain (optional)
3. Set up monitoring/analytics
4. Create backup/rollback plan
5. Document any issues found

---

**Need help?** Check DEPLOYMENT_GUIDE.md for detailed instructions!
