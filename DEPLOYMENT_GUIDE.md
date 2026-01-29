# 🚀 BlueCust Vercel Deployment Guide

## Step-by-Step Instructions for Deploying to Vercel

### Prerequisites
- A Vercel account (sign up at vercel.com)
- Git installed on your computer
- A GitHub account (recommended for easiest deployment)

---

## Option A: Deploy via GitHub (Easiest Method)

### Step 1: Create GitHub Repository

1. Go to https://github.com and sign in
2. Click the "+" icon in top-right corner → "New repository"
3. Name it: `bluecust-frontend`
4. Make it Private (recommended for production apps)
5. Click "Create repository"

### Step 2: Push Code to GitHub

Open terminal/command prompt in the `bluecust-frontend` folder and run:

```bash
git init
git add .
git commit -m "Initial commit - BlueCust frontend"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/bluecust-frontend.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

### Step 3: Deploy on Vercel

1. Go to https://vercel.com and sign in
2. Click "Add New..." → "Project"
3. Click "Import" next to your `bluecust-frontend` repository
4. Configure the project:
   - **Framework Preset**: Create React App (should auto-detect)
   - **Root Directory**: `./` (leave as is)
   - **Build Command**: `npm run build` (should auto-fill)
   - **Output Directory**: `build` (should auto-fill)

5. **Add Environment Variable**:
   - Click "Environment Variables"
   - Add variable:
     - Name: `REACT_APP_BACKEND_URL`
     - Value: `https://bluecast-api-vw9o.onrender.com`
   - Select all environments (Production, Preview, Development)

6. Click "Deploy"
7. Wait 2-3 minutes for deployment
8. You'll get a URL like: `https://bluecust-frontend.vercel.app`

### Step 4: Test Your Deployment

1. Visit your Vercel URL
2. Test all pages:
   - Landing page should load
   - Click "Get Started" → should go to registration
   - Try logging in (if you have test accounts)
   - Verify API connection works

---

## Option B: Deploy via Vercel CLI

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

Follow the prompts to authenticate.

### Step 3: Deploy

Navigate to your `bluecust-frontend` folder:

```bash
cd bluecust-frontend
vercel
```

Answer the prompts:
- **Set up and deploy?** Y
- **Which scope?** (Select your account)
- **Link to existing project?** N
- **Project name:** bluecust-frontend
- **In which directory is your code located?** ./
- **Want to override the settings?** N

### Step 4: Add Environment Variable

```bash
vercel env add REACT_APP_BACKEND_URL
```

When prompted:
- **Value:** `https://bluecast-api-vw9o.onrender.com`
- **Add to environments:** Select all (Production, Preview, Development)

### Step 5: Deploy to Production

```bash
vercel --prod
```

You'll get your production URL!

---

## Important Settings on Vercel

After deployment, in your Vercel project dashboard:

### 1. Environment Variables
Make sure this is set:
```
REACT_APP_BACKEND_URL = https://bluecast-api-vw9o.onrender.com
```

### 2. Build Settings
These should be auto-configured:
- **Build Command:** `npm run build`
- **Output Directory:** `build`
- **Install Command:** `npm install`

### 3. Domain Settings (Optional)
- You can add a custom domain later
- Or use the provided vercel.app subdomain

---

## Updating Your Deployment

### If using GitHub method:
```bash
git add .
git commit -m "Your update message"
git push
```
Vercel will automatically redeploy!

### If using CLI method:
```bash
vercel --prod
```

---

## Common Issues & Solutions

### Issue 1: Build Fails - "Module not found"
**Solution:** Ensure all dependencies are installed
```bash
rm -rf node_modules package-lock.json
npm install
```
Then commit and redeploy.

### Issue 2: API Connection Error
**Solution:** 
- Check environment variable is set correctly
- Verify backend URL is accessible
- Check browser console for CORS errors

### Issue 3: Blank Page After Deployment
**Solution:**
- Check browser console for errors
- Verify all paths use `/` not `./`
- Ensure `homepage` field in package.json is not set incorrectly

### Issue 4: Environment Variable Not Working
**Solution:**
- Environment variables must start with `REACT_APP_`
- Redeploy after adding variables
- Clear browser cache

---

## Testing Checklist

After deployment, test these features:

- [ ] Landing page loads correctly
- [ ] Images display properly
- [ ] Navigation works (all routes)
- [ ] Registration form submits
- [ ] Login works
- [ ] Dashboard loads for logged-in users
- [ ] API calls work (check Network tab)
- [ ] Responsive design on mobile

---

## Next Steps

1. ✅ Deploy frontend to Vercel
2. ✅ Test all functionality
3. ✅ Add custom domain (optional)
4. ✅ Set up analytics (optional)
5. ✅ Configure redirects if needed

---

## Support Resources

- Vercel Docs: https://vercel.com/docs
- React Deployment: https://create-react-app.dev/docs/deployment/
- GitHub Help: https://docs.github.com/

---

## Your URLs

**Backend (already deployed):**
```
https://bluecast-api-vw9o.onrender.com
```

**Frontend (after Vercel deployment):**
```
https://your-project-name.vercel.app
```

---

Good luck with your deployment! 🎉

If you need any changes or have issues, you can always:
1. Check Vercel deployment logs
2. Review build logs for errors
3. Test locally first with `npm start`
