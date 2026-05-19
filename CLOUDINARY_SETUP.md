# Cloudinary Setup Guide

## 🎨 Step 1: Create Cloudinary Account

1. Go to **https://cloudinary.com**
2. Click **"Sign Up"**
3. Enter email aur password
4. Verify email
5. Dashboard open hoga

---

## 🔑 Step 2: Get Your Credentials

1. Dashboard mein jao
2. **"Settings"** → **"API Keys"** pe click karo
3. Yeh 3 cheezein copy karo:
   - **Cloud Name** (top mein likha hoga)
   - **API Key**
   - **API Secret**

**Example:**
```
Cloud Name: perfumeshop
API Key: 123456789
API Secret: abcdefghijklmnop
```

---

## 📝 Step 3: Update Backend .env

Backend folder mein `.env` file mein add karo:

```env
CLOUDINARY_CLOUD_NAME=perfumeshop
CLOUDINARY_API_KEY=123456789
CLOUDINARY_API_SECRET=abcdefghijklmnop
```

---

## ✅ Step 4: Backend Configuration Complete

Ab backend automatically Cloudinary use karega image uploads ke liye!

**Kya hoga:**
- Admin product image upload karega
- Image Cloudinary pe jayegi
- Permanent URL milega
- MongoDB mein URL save hoga
- Frontend image dikhayega

---

## 🎯 Next Steps:

1. Cloudinary account banao
2. Credentials copy karo
3. `.env` file update karo
4. Backend restart karo
5. Test karo!

---

**Cloudinary account bana liya?** Batao credentials, main backend setup kar dunga!
