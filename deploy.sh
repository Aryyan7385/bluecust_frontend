#!/bin/bash

# BlueCust Frontend - Quick Deploy Script

echo "🚀 BlueCust Frontend Deployment"
echo "================================"
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "📦 Initializing git repository..."
    git init
    git add .
    git commit -m "Initial commit - BlueCust frontend"
    git branch -M main
    echo "✅ Git initialized"
else
    echo "✅ Git already initialized"
fi

echo ""
echo "📋 Next steps:"
echo ""
echo "1. Create a GitHub repository at: https://github.com/new"
echo "   - Name: bluecust-frontend"
echo "   - Make it Private"
echo ""
echo "2. Run these commands (replace YOUR_USERNAME):"
echo "   git remote add origin https://github.com/YOUR_USERNAME/bluecust-frontend.git"
echo "   git push -u origin main"
echo ""
echo "3. Deploy on Vercel:"
echo "   - Go to https://vercel.com"
echo "   - Click 'Add New Project'"
echo "   - Import your GitHub repository"
echo "   - Add environment variable:"
echo "     REACT_APP_BACKEND_URL = https://bluecast-api-vw9o.onrender.com"
echo "   - Click Deploy"
echo ""
echo "OR use Vercel CLI:"
echo "   npm install -g vercel"
echo "   vercel"
echo "   vercel env add REACT_APP_BACKEND_URL"
echo "   vercel --prod"
echo ""
echo "📖 For detailed instructions, see DEPLOYMENT_GUIDE.md"
