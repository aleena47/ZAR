# Frontend Deployment Guide for Vercel

## ✅ Endpoints Updated

All React components have been updated to use the configured axios instance that respects the `REACT_APP_API_URL` environment variable:

- ✅ `Home.js` - Uses configured axios
- ✅ `AIChatbot.js` - Uses configured axios  
- ✅ `Products.js` - Uses configured axios
- ✅ `ProductDetail.js` - Uses configured axios
- ✅ `Collections.js` - Uses configured axios
- ✅ `Login.js` - Already using configured axios
- ✅ `Signup.js` - Already using configured axios
- ✅ `Profile.js` - Already using configured axios
- ✅ All other components - Already using configured axios

All API calls will now use the backend URL from `REACT_APP_API_URL` environment variable.

---

## 🚀 Deployment Steps

### 1. Go to Vercel Dashboard

1. Visit [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click **"Add New Project"**
3. Import your Git repository (same repo as backend)

### 2. Configure Project Settings

**Project Settings:**
- **Project Name**: `zar-frontend` (or your choice)
- **Framework Preset**: **Create React App**
- **Root Directory**: `client` ⚠️ **IMPORTANT: Set this to `client`**
- **Build Command**: Leave empty (handled by vercel.json)
- **Output Directory**: Leave empty (handled by vercel.json)
- **Install Command**: Leave empty

### 3. Set Environment Variable

**Critical Step!** Go to **Settings → Environment Variables** and add:

```
REACT_APP_API_URL=https://zar-backend.vercel.app
```

⚠️ **Replace `zar-backend.vercel.app` with your actual backend URL!**

### 4. Deploy

Click **"Deploy"** and wait for the build to complete.

---

## ✅ Verification

After deployment, test these:

1. **Visit your frontend URL**: `https://zar-frontend.vercel.app`
2. **Check browser console** - Should see no CORS errors
3. **Test login/signup** - Should connect to backend
4. **Browse products** - Should load from backend API
5. **Test AI chatbot** - Should work with backend

---

## 🔍 How It Works

1. All components import `axios` from `../auth` (configured axios)
2. `auth.js` sets: `axios.defaults.baseURL = process.env.REACT_APP_API_URL || ''`
3. If `REACT_APP_API_URL` is set, all API calls go to that URL
4. If not set (local dev), it defaults to empty string (relative paths, uses proxy)

**Example:**
- Local dev: API calls go to `http://localhost:5000/api/...` (via proxy)
- Production: API calls go to `https://zar-backend.vercel.app/api/...`

---

## 🐛 Troubleshooting

### Frontend can't connect to backend
- ✅ Check `REACT_APP_API_URL` is set correctly in Vercel
- ✅ Verify backend URL is accessible (visit it in browser)
- ✅ Check browser console for CORS errors
- ✅ Make sure backend has CORS enabled (it does in server.js)

### API calls return 404
- ✅ Verify backend is deployed and running
- ✅ Check backend URL is correct (no trailing slash)
- ✅ Test backend endpoint directly: `https://zar-backend.vercel.app/api/products`

### Build fails
- ✅ Check Root Directory is set to `client`
- ✅ Verify `client/package.json` exists
- ✅ Check build logs in Vercel dashboard

---

## 📝 Summary

**Before deployment:**
- ✅ All axios imports updated to use configured instance
- ✅ `vercel.json` configured for Create React App
- ✅ Environment variable ready: `REACT_APP_API_URL`

**After deployment:**
- Set `REACT_APP_API_URL` environment variable in Vercel
- Frontend will automatically connect to your backend!

