# 🚀 Deployment Guide - Vercel

This guide will walk you through deploying the Employee Task Manager application on Vercel, with the backend and frontend as separate projects.

## 📋 Prerequisites

- [Vercel Account](https://vercel.com/signup) (free tier works)
- [MongoDB Atlas Account](https://www.mongodb.com/cloud/atlas/register) (for production database)
- GitHub repository with your code
- Google Cloud Console project (for OAuth)

---

## 🗄️ Part 1: Backend Deployment

### Step 1: Prepare MongoDB Atlas

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a new cluster (free M0 tier available)
3. Click **Connect** → **Connect your application**
4. Copy the connection string (it looks like: `mongodb+srv://username:<password>@cluster.mongodb.net/`)
5. Replace `<password>` with your actual password
6. Add `/taskmanager` at the end: `mongodb+srv://username:password@cluster.mongodb.net/taskmanager`
7. In **Network Access**, add `0.0.0.0/0` to allow connections from anywhere

### Step 2: Deploy Backend to Vercel

1. **Install Vercel CLI** (optional, but recommended):
   ```bash
   npm install -g vercel
   ```

2. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

3. **Deploy using Vercel CLI**:
   ```bash
   vercel
   ```
   
   Or use the Vercel Dashboard:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click **Add New** → **Project**
   - Import your GitHub repository
   - Set **Root Directory** to `backend`
   - Click **Deploy**

4. **Configure Environment Variables** in Vercel Dashboard:
   - Go to your project → **Settings** → **Environment Variables**
   - Add the following variables:
     ```
     MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmanager
     JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
     GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
     PORT=5000
     ```

5. **Redeploy** after adding environment variables:
   - Go to **Deployments** tab
   - Click the three dots on the latest deployment
   - Click **Redeploy**

6. **Copy your backend URL** (e.g., `https://your-backend.vercel.app`)

### Step 3: Update Google OAuth for Production

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services** → **Credentials**
3. Edit your OAuth 2.0 Client ID
4. Add to **Authorized JavaScript origins**:
   - Your frontend URL (we'll get this in Part 2)
5. Add to **Authorized redirect URIs**:
   - Your frontend URL (we'll get this in Part 2)

---

## 🎨 Part 2: Frontend Deployment

### Step 1: Update API Base URL

1. **Create production environment file** (optional):
   Create `.env.production` in the frontend directory:
   ```env
   REACT_APP_API_URL=https://your-backend.vercel.app
   REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
   ```

2. **Update authService.js and taskService.js**:
   
   In `frontend/src/services/authService.js` and `taskService.js`, update the API URL:
   ```javascript
   const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
   ```

### Step 2: Deploy Frontend to Vercel

1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

2. **Deploy using Vercel CLI**:
   ```bash
   vercel
   ```
   
   Or use the Vercel Dashboard:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click **Add New** → **Project**
   - Import your GitHub repository (or create a new one for frontend only)
   - Set **Root Directory** to `frontend`
   - **Framework Preset**: Create React App
   - Click **Deploy**

3. **Configure Environment Variables** in Vercel Dashboard:
   - Go to your project → **Settings** → **Environment Variables**
   - Add:
     ```
     REACT_APP_API_URL=https://your-backend.vercel.app
     REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
     ```

4. **Redeploy** after adding environment variables

5. **Copy your frontend URL** (e.g., `https://your-app.vercel.app`)

### Step 3: Update Google OAuth with Frontend URL

1. Go back to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services** → **Credentials**
3. Edit your OAuth 2.0 Client ID
4. Add to **Authorized JavaScript origins**:
   - `https://your-app.vercel.app`
5. Add to **Authorized redirect URIs**:
   - `https://your-app.vercel.app`
6. Click **Save**

---

## 🔧 Part 3: Configure CORS

Update your backend `server.js` to allow requests from your frontend:

```javascript
const cors = require('cors');

const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
```

Add `FRONTEND_URL` to your backend environment variables in Vercel:
```
FRONTEND_URL=https://your-app.vercel.app
```

---

## ✅ Verification Checklist

- [ ] Backend is deployed and accessible
- [ ] Frontend is deployed and accessible
- [ ] MongoDB Atlas is connected
- [ ] Environment variables are set correctly
- [ ] Google OAuth is configured with production URLs
- [ ] CORS is configured properly
- [ ] You can sign up/login
- [ ] You can create/edit/delete tasks
- [ ] Google OAuth signup works

---

## 🐛 Troubleshooting

### Backend Issues

**Problem**: "Cannot connect to database"
- **Solution**: Check MongoDB Atlas network access allows `0.0.0.0/0`
- Verify `MONGO_URI` environment variable is correct

**Problem**: "JWT error" or authentication fails
- **Solution**: Ensure `JWT_SECRET` is set in environment variables
- Make sure it's the same secret used during development (or regenerate tokens)

### Frontend Issues

**Problem**: "Network Error" or API calls fail
- **Solution**: Check `REACT_APP_API_URL` points to correct backend URL
- Verify CORS is configured on backend
- Check browser console for specific error messages

**Problem**: Google OAuth fails
- **Solution**: Verify Google Cloud Console has correct authorized origins and redirect URIs
- Check `REACT_APP_GOOGLE_CLIENT_ID` matches the one in Google Console
- Ensure you're using the **Web application** client ID, not Android/iOS

### General Issues

**Problem**: Environment variables not working
- **Solution**: Redeploy after adding/changing environment variables
- For React, variables must start with `REACT_APP_`
- Check Vercel deployment logs for errors

---

## 🔄 Continuous Deployment

Vercel automatically redeploys when you push to your GitHub repository:

1. Make changes locally
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "your message"
   git push
   ```
3. Vercel will automatically detect the push and redeploy

---

## 📊 Monitoring

- **Vercel Dashboard**: Monitor deployments, view logs, check analytics
- **MongoDB Atlas**: Monitor database performance and usage
- **Google Cloud Console**: Track OAuth usage

---

## 💰 Cost Considerations

- **Vercel Free Tier**: 
  - 100 GB bandwidth/month
  - Unlimited personal projects
  - Serverless function execution limits

- **MongoDB Atlas Free Tier (M0)**:
  - 512 MB storage
  - Shared RAM
  - Perfect for development/small projects

- **Google OAuth**: Free

---

## 🎉 You're Done!

Your Employee Task Manager is now live on Vercel! Share your production URL with your team.

**Frontend**: `https://your-app.vercel.app`  
**Backend API**: `https://your-backend.vercel.app`

---

## 📝 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
