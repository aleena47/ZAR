# Vercel Deployment Guide

This project is split into **Backend** and **Frontend** for separate deployment on Vercel.

## 🎯 Deployment Structure

### Backend Deployment (Root Directory)
- **Project Name**: `zar-backend` (or your choice)
- **Root Directory**: `.` (root of repository)
- **Framework**: Other / No Framework

### Frontend Deployment (Client Directory)
- **Project Name**: `zar-frontend` (or your choice)
- **Root Directory**: `client`
- **Framework**: Create React App

---

## 📋 Step-by-Step Deployment

### 1. Deploy Backend First

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New Project"**
3. Import your Git repository
4. **Project Settings**:
   - **Project Name**: `zar-backend`
   - **Framework Preset**: **Other** or **No Framework**
   - **Root Directory**: `.` (leave empty or use `.`)
   - **Build Command**: Leave empty (handled by vercel.json)
   - **Output Directory**: Leave empty
   - **Install Command**: Leave empty (handled by vercel.json)

5. **Environment Variables** (Settings → Environment Variables):
   ```
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key (optional)
   GEMINI_API_KEY=your_gemini_api_key
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=production
   ```

6. Deploy!

7. **Copy the Backend URL** (e.g., `https://zar-backend.vercel.app`)

---

### 2. Deploy Frontend

1. In Vercel Dashboard, click **"Add New Project"** again
2. Import the **same** Git repository
3. **Project Settings**:
   - **Project Name**: `zar-frontend`
   - **Framework Preset**: **Create React App**
   - **Root Directory**: `client`
   - **Build Command**: Leave empty (handled by vercel.json)
   - **Output Directory**: Leave empty (handled by vercel.json)
   - **Install Command**: Leave empty

4. **Environment Variables** (Settings → Environment Variables):
   ```
   REACT_APP_API_URL=https://zar-backend.vercel.app
   ```
   ⚠️ **IMPORTANT**: Replace `zar-backend.vercel.app` with your actual backend URL!

5. Deploy!

---

## 🌐 Final URLs

- **Backend API**: `https://zar-backend.vercel.app/api/*`
- **Frontend App**: `https://zar-frontend.vercel.app`

---

## 🔄 Updating Deployments

Both projects are linked to the same repository. When you push changes:

- **If you change files in root** (server.js, package.json, etc.) → Backend will redeploy
- **If you change files in client/** → Frontend will redeploy

You can also trigger manual redeployments from the Vercel dashboard.

---

## 🐛 Troubleshooting

### Backend Issues
- Check that all environment variables are set correctly
- Verify Supabase connection in backend logs
- Check that `server.js` exports properly for Vercel

### Frontend Issues
- Ensure `REACT_APP_API_URL` points to the correct backend URL
- Check browser console for CORS errors
- Verify API endpoints are accessible from frontend

### CORS Issues
- Backend already has `cors()` enabled, should work
- If issues persist, check server.js CORS configuration

---

## 📝 Files Structure

```
ZARTHEAPP/
├── vercel.json          # Backend configuration (root)
├── server.js            # Backend server
├── package.json         # Backend dependencies
├── client/
│   ├── vercel.json      # Frontend configuration
│   ├── package.json     # Frontend dependencies
│   └── src/             # React app source
└── VERCEL_DEPLOYMENT.md # This file
```

---

## ✅ Checklist

- [ ] Backend deployed successfully
- [ ] Backend environment variables set
- [ ] Backend URL copied
- [ ] Frontend deployed successfully
- [ ] Frontend `REACT_APP_API_URL` set to backend URL
- [ ] Test API endpoints from frontend
- [ ] Verify authentication works
- [ ] Check all pages load correctly

