# 🌸 Ecommerce Perfume Website - MERN Stack

A full-stack ecommerce website for selling perfumes, built with MongoDB, Express, React, and Node.js.

## ✨ Features

### Customer Features
- 🔐 User authentication (Email/Password + Google OAuth 2.0)
- 🔍 Advanced search with filters (brand, scent, price, rating)
- 🛍️ Browse products with sorting options
- 👁️ View detailed product information
- ⭐ Product reviews and ratings system
- 🛒 Shopping cart with real-time updates
- 💝 Wishlist functionality
- 💳 Checkout process with multiple addresses
- 📦 Order history and tracking
- 🔥 Sales and discount pricing
- 👤 Profile management with Google profile picture
- 📧 Email notifications for orders

### Admin Features
- 📊 Admin dashboard with statistics
- ➕ Create, edit, and delete products
- 🖼️ Image upload for products (PNG, JPG, GIF, WEBP)
- 💰 Discount and sales management
- 📋 View and manage all orders
- 🔄 Update order status
- 📧 Receive contact form submissions via email

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account (free tier)
- Git

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd "ecommerce perfume website"
```

### 2. Set Up Backend

```bash
cd backend
npm install
```

Create `backend/.env`:
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string_here
JWT_SECRET=your_super_secret_jwt_key_change_this
NODE_ENV=development
```

Start backend:
```bash
npm run dev
```

### 3. Set Up Frontend

Open a new terminal:
```bash
cd frontend
npm install
```

Create `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

Start frontend:
```bash
npm run dev
```

### 4. Access the Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 📚 Detailed Setup Guides

- **Backend Setup**: See [BACKEND_SETUP.md](./BACKEND_SETUP.md)
- **Frontend Setup**: See [FRONTEND_SETUP.md](./FRONTEND_SETUP.md)

## 🗄️ MongoDB Atlas Setup

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create a free account
3. Create a new cluster (M0 Free tier)
4. Create a database user
5. Whitelist your IP (or use 0.0.0.0/0 for development)
6. Get your connection string
7. Update `backend/.env` with your connection string

**Detailed instructions in BACKEND_SETUP.md**

## 👤 Creating an Admin User

1. Register a regular user through the website
2. Go to MongoDB Atlas → Browse Collections
3. Find the `users` collection
4. Edit your user document
5. Change `"role": "user"` to `"role": "admin"`
6. Save and logout/login again

## 🛠️ Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Passport.js** - Google OAuth 2.0
- **bcrypt** - Password hashing
- **Multer** - File upload handling
- **Nodemailer** - Email notifications

### Frontend
- **React** - UI library
- **Vite** - Build tool
- **React Router** - Routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **React Icons** - Icon library
- **Context API** - State management

## 📁 Project Structure

```
ecommerce perfume website/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Auth & admin middleware
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API routes
│   ├── utils/           # Helper functions
│   └── server.js        # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── context/     # React context
│   │   ├── services/    # API service
│   │   └── App.jsx      # Main app
│   └── public/
├── BACKEND_SETUP.md     # Backend setup guide
├── FRONTEND_SETUP.md    # Frontend setup guide
└── README.md            # This file
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)
- `GET /api/auth/google` - Initiate Google OAuth
- `GET /api/auth/google/callback` - Google OAuth callback

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin only)
- `POST /api/products/upload` - Upload product image (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Cart
- `GET /api/cart` - Get user cart (protected)
- `POST /api/cart` - Add to cart (protected)
- `PUT /api/cart/:itemId` - Update cart item (protected)
- `DELETE /api/cart/:itemId` - Remove from cart (protected)

### Orders
- `POST /api/orders` - Create order (protected)
- `GET /api/orders` - Get user orders (protected)
- `GET /api/orders/all` - Get all orders (admin only)
- `GET /api/orders/:id` - Get order details (protected)
- `PUT /api/orders/:id/status` - Update order status (admin only)

### Reviews
- `GET /api/reviews/product/:id` - Get product reviews
- `POST /api/reviews` - Add review (protected)
- `PUT /api/reviews/:id` - Update review (protected)
- `DELETE /api/reviews/:id` - Delete review (protected)

### Wishlist
- `GET /api/wishlist` - Get user wishlist (protected)
- `POST /api/wishlist` - Add to wishlist (protected)
- `DELETE /api/wishlist/:productId` - Remove from wishlist (protected)

### Contact
- `POST /api/contact` - Send contact form email

## 🎨 Scent Types

The application supports 6 scent types:
- 🌸 **Floral** - Elegant and romantic
- 🌲 **Woody** - Warm and sophisticated
- 🍊 **Citrus** - Fresh and energizing
- 🌙 **Oriental** - Luxurious and mysterious
- 💨 **Fresh** - Clean and invigorating
- 🌶️ **Spicy** - Bold and exotic

## 🧪 Testing the Application

### As a Customer:
1. Register a new account
2. Browse products
3. Add products to cart
4. Proceed to checkout
5. View order history

### As an Admin:
1. Create admin user (see above)
2. Login with admin account
3. Add new products
4. Manage existing products
5. View and update order status

## 🔒 Security Features

- Password hashing with bcrypt (10 salt rounds)
- JWT token authentication (30-day expiration)
- Protected routes (authentication required)
- Admin-only routes (role-based access)
- Input validation with express-validator
- CORS configuration

## 🆓 Free Hosting Options

### Backend
- **Render.com** (free tier) - Recommended
- **Railway.app** (free tier)

### Frontend
- **Vercel** (unlimited free projects) - Recommended
- **Netlify** (free tier)

### Database
- **MongoDB Atlas** (512MB free tier)

## 🚀 Deployment Guide

### 1. Backend Deployment (Render.com)
1. Create account on [Render](https://render.com)
2. New Web Service → Connect GitHub repo
3. Configure:
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
4. Add environment variables (see `.env.example`)
5. Deploy!

### 2. Frontend Deployment (Vercel)
1. Create account on [Vercel](https://vercel.com)
2. Import GitHub repo
3. Configure:
   - Root Directory: `frontend`
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Add environment variable: `VITE_API_URL=https://your-backend.onrender.com/api`
5. Deploy!

### 3. Update Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Update authorized redirect URIs with production URLs
3. Update authorized JavaScript origins

### 4. Post-Deployment
1. Update `FRONTEND_URL` in backend environment variables
2. Test all features in production

**Note:** Uploaded images on Render free tier are temporary. Use Cloudinary or AWS S3 for production.

## 🐛 Troubleshooting

### Backend won't start
- Check MongoDB connection string in `.env`
- Make sure MongoDB Atlas IP is whitelisted
- Check if port 5000 is already in use

### Frontend won't connect to backend
- Make sure backend is running on port 5000
- Check `VITE_API_URL` in `frontend/.env`
- Check browser console for CORS errors

### Can't add products
- Make sure you're logged in as admin
- Check user role in MongoDB is set to "admin"
- Logout and login again after changing role

### Cart is empty
- Make sure you're logged in
- Check backend logs for errors
- Clear browser localStorage and try again

## 📝 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/perfume-shop?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters_long
NODE_ENV=development

# Email Configuration (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
ADMIN_EMAIL=admin-email@gmail.com

# Google OAuth 2.0
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
FRONTEND_URL=http://localhost:5173
```

**See `.env.example` files in backend and frontend folders for detailed templates.**

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## 🎓 Learning Resources

- **Express.js**: https://expressjs.com/
- **MongoDB & Mongoose**: https://mongoosejs.com/
- **React**: https://react.dev/
- **Tailwind CSS**: https://tailwindcss.com/
- **JWT**: https://jwt.io/

## 📄 License

This project is open source and available for learning purposes.

## 🤝 Contributing

This is a learning project. Feel free to fork and modify for your own use!

## 📧 Support

If you encounter any issues:
1. Check the troubleshooting section
2. Review BACKEND_SETUP.md and FRONTEND_SETUP.md
3. Check browser console and terminal for errors
4. Make sure all environment variables are set correctly

## 🎉 Congratulations!

You've successfully set up a full-stack MERN ecommerce application! This project demonstrates:
- RESTful API design
- JWT authentication
- MongoDB database operations
- React state management
- Responsive UI with Tailwind CSS
- Admin panel functionality
- Shopping cart implementation
- Order management system

Happy coding! 🚀
"# Perfumology---Premium-Perfume-E-Commerce-Platform" 
