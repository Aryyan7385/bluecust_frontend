# BlueCust Frontend

Custom branded water bottles platform frontend built with React.

## 🚀 Quick Deploy to Vercel

### Method 1: Deploy via Vercel CLI (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Navigate to project directory**
   ```bash
   cd bluecust-frontend
   ```

3. **Deploy**
   ```bash
   vercel
   ```
   
4. **Follow the prompts:**
   - Set up and deploy? `Y`
   - Which scope? (Select your account)
   - Link to existing project? `N`
   - Project name: `bluecust-frontend` (or your choice)
   - Directory: `./` (current directory)
   - Override settings? `N`

5. **Set Environment Variable**
   ```bash
   vercel env add REACT_APP_BACKEND_URL
   ```
   Enter value: `https://bluecast-api-vw9o.onrender.com`
   Select environments: `Production`, `Preview`, `Development`

6. **Deploy to production**
   ```bash
   vercel --prod
   ```

### Method 2: Deploy via Vercel Dashboard

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Import on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Configure:
     - Framework Preset: **Create React App**
     - Root Directory: `./`
     - Build Command: `npm run build`
     - Output Directory: `build`
   
3. **Add Environment Variable**
   - In project settings, go to "Environment Variables"
   - Add: `REACT_APP_BACKEND_URL` = `https://bluecast-api-vw9o.onrender.com`
   - Select all environments (Production, Preview, Development)

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete

## 📦 Local Development

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
REACT_APP_BACKEND_URL=https://bluecast-api-vw9o.onrender.com
```

## 📁 Project Structure

```
bluecust-frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   └── ui/           # Reusable UI components
│   ├── lib/
│   │   └── utils.js      # Utility functions
│   ├── pages/
│   │   ├── LandingPage.js
│   │   ├── LoginPage.js
│   │   ├── RegisterPage.js
│   │   ├── CustomerDashboard.js
│   │   ├── AdminDashboard.js
│   │   ├── App.css
│   │   └── index.css
│   ├── App.js            # Main app with routing
│   └── index.js          # Entry point
├── .env                  # Environment variables
├── package.json
├── tailwind.config.js
└── README.md
```

## 🎨 Features

- **Landing Page** - Showcase platform benefits
- **Authentication** - Login and registration
- **Customer Dashboard** - Place and track orders
- **Admin Dashboard** - Manage orders and suppliers
- **Responsive Design** - Works on all devices
- **Modern UI** - Built with Tailwind CSS and Framer Motion

## 🔗 Backend

Backend API: https://bluecast-api-vw9o.onrender.com

## 📝 Notes

- The app uses React Router for navigation
- Styled with Tailwind CSS
- UI components from shadcn/ui pattern
- Animations powered by Framer Motion
- Toast notifications via Sonner

## 🐛 Troubleshooting

### Build fails on Vercel
- Ensure all dependencies are in `package.json`
- Check that environment variable is set correctly
- Verify Node version is >= 18.0.0

### API connection issues
- Verify `REACT_APP_BACKEND_URL` is set correctly
- Check that backend is running
- Ensure CORS is configured on backend

### Path import errors
- Make sure `jsconfig.json` is present
- Restart development server after adding jsconfig.json

## 📄 License

Private project for BlueCust.
