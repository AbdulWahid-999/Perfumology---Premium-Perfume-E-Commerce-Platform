# 🚀 Vercel Deployment - Ready!

## ✅ Files Created:

### Backend:
1. **vercel.json** - Vercel configuration
2. **.vercelignore** - Files to ignore
3. **package.json** - Updated with Node 18.x

### Frontend:
1. **vercel.json** - Vite configuration

---

## 📋 Deployment Steps:

### **Step 1: Push to GitHub**
```bash
git add .
git commit -m "Add Vercel configuration files"
git push origin main
```

---

### **Step 2: Deploy Backend**

1. Go to **https://vercel.com**
2. Sign in with GitHub
3. Click **"Add New"** → **"Project"**
4. Select your GitHub repo
5. Configure:
   - **Root Directory:** `backend`
   - **Framework:** Node.js
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`

6. Add Environment Variables:
```
NODE_ENV=production
MONGO_URI=mongodb+srv://perfumeadmin:admin1234@cluster0.opaj5vi.mongodb.net/perfume-shop?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=sk_51NxABC123xyz789POIUYTREWQlkjhgfdsaMNBVCX
EMAIL_USER=ichikaorimora149@gmail.com
EMAIL_PASS=kzdd teni lctk drth
ADMIN_EMAIL=ichikaorimora149@gmail.com
GOOGLE_CLIENT_ID=468038774452-lei7e1go43rgbliop25ommbi6ru2f2kj.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
GOOGLE_CALLBACK_URL=https://your-backend.vercel.app/api/auth/google/callback
FRONTEND_URL=https://your-frontend.vercel.app
CLOUDINARY_CLOUD_NAME=claude
CLOUDINARY_API_KEY=322766121475289
CLOUDINARY_API_SECRET=ZrmAAN81_QrTo93Tf_Kmykfm7IE
```

7. Click **"Deploy"**
8. Wait 3-5 minutes
9. Copy backend URL: `https://your-backend.vercel.app`

---

### **Step 3: Deploy Frontend**

1. Click **"Add New"** → **"Project"**
2. Select your GitHub repo again
3. Configure:
   - **Root Directory:** `frontend`
   - **Framework:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

4. Add Environment Variable:
```
VITE_API_URL=https://your-backend.vercel.app/api
```

5. Click **"Deploy"**
6. Wait 2-3 minutes
7. Copy frontend URL: `https://your-frontend.vercel.app`

---

### **Step 4: Update Google OAuth**

1. Go to **Google Cloud Console**
2. Update **Authorized redirect URIs:**
```
https://your-backend.vercel.app/api/auth/google/callback
```

3. Update **Authorized JavaScript origins:**
```
https://your-frontend.vercel.app
```

---

### **Step 5: Update Backend Environment**

1. Go to Vercel backend project
2. Go to **"Settings"** → **"Environment Variables"**
3. Update:
```
GOOGLE_CALLBACK_URL=https://your-backend.vercel.app/api/auth/google/callback
FRONTEND_URL=https://your-frontend.vercel.app
```

4. Redeploy (automatic)

---

### **Step 6: Test Production**

1. Open frontend URL
2. Register/Login
3. Try Google OAuth
4. Add product with image
5. Verify everything works

---

## ✅ Final URLs:

```
Frontend: https://your-frontend.vercel.app
Backend: https://your-backend.vercel.app
Images: Cloudinary (permanent)
Database: MongoDB Atlas
```

---

## 🎉 Deployment Complete!

Your ecommerce perfume website is now **live on production**! 🚀

---

**Ready to deploy? Push to GitHub aur Vercel mein deploy karo!**
