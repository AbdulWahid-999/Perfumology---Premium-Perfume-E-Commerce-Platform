# Ecommerce Perfume Website - Frontend Setup Guide

## ✅ Frontend Complete!

Your frontend is fully built with:
- ✅ User Authentication UI (Login, Register)
- ✅ Product Catalog (Browse, Search, Filters)
- ✅ Product Detail Page
- ✅ Shopping Cart
- ✅ Checkout Process
- ✅ Order History
- ✅ Admin Dashboard
- ✅ Admin Product Management
- ✅ Admin Order Management

## 🚀 How to Run the Frontend

### Step 1: Make Sure Backend is Running

First, ensure your backend server is running:

```bash
# In the backend directory
cd backend
npm run dev
```

You should see:
```
Server running in development mode on port 5000
MongoDB Connected: cluster0-xxxxx.mongodb.net
```

### Step 2: Start the Frontend

Open a **NEW terminal** (keep backend running) and run:

```bash
# In the frontend directory
cd frontend
npm run dev
```

You should see:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### Step 3: Open in Browser

Open your browser and go to: **http://localhost:5173/**

## 📱 Testing the Application

### 1. Register a New User
- Click "Register" in the navbar
- Fill in: Name, Email, Password
- Click "Register"
- You'll be logged in automatically

### 2. Browse Products
- Click "Products" in the navbar
- Currently empty (no products yet)
- You need to add products as admin first

### 3. Create Admin User
To add products, you need an admin account:

1. Register a regular user first (if you haven't)
2. Go to MongoDB Atlas website
3. Click "Browse Collections" on your cluster
4. Find the `users` collection
5. Find your user document
6. Click "Edit Document"
7. Change `"role": "user"` to `"role": "admin"`
8. Click "Update"
9. **Logout and login again** for changes to take effect

### 4. Add Products (Admin Only)
- Login with your admin account
- Click "Admin" in the navbar
- Click "Manage Products"
- Click "Add Product"
- Fill in product details:
  - Name: e.g., "Chanel No. 5"
  - Brand: e.g., "Chanel"
  - Price: e.g., 120
  - Stock: e.g., 50
  - Scent Type: Choose from dropdown
  - Image URL: Use a placeholder like `https://via.placeholder.com/300` or find perfume images online
  - Description: Write a description
- Click "Create Product"

### 5. Shop as Customer
- Logout from admin account
- Login as regular user (or browse as guest)
- Go to "Products"
- Click on a product to view details
- Click "Add to Cart"
- Go to "Cart"
- Click "Proceed to Checkout"
- Fill in shipping address
- Click "Place Order"
- View your order in "Orders"

### 6. Manage Orders (Admin)
- Login as admin
- Go to "Admin" → "Manage Orders"
- Change order status (Pending → Processing → Shipped → Delivered)

## 🎨 Features Overview

### For Customers:
- **Home Page**: Landing page with scent categories
- **Products Page**: Browse all products with search and filters
  - Search by name/description
  - Filter by brand, scent type, price range
- **Product Detail**: View full product information
- **Shopping Cart**: Add, update quantities, remove items
- **Checkout**: Enter shipping address and place order
- **Order History**: View all your orders and their status

### For Admins:
- **Dashboard**: Overview of total products, orders, pending orders
- **Manage Products**: Create, edit, delete products
- **Manage Orders**: View all orders and update their status

## 🔧 Configuration

### Environment Variables

**Backend** (`backend/.env`):
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_jwt_key
NODE_ENV=development
```

**Frontend** (`frontend/.env`):
```env
VITE_API_URL=http://localhost:5000/api
```

## 🎯 Sample Product Data

Here are some sample products you can add:

### Product 1:
- Name: Chanel No. 5
- Brand: Chanel
- Price: 120
- Stock: 50
- Scent Type: floral
- Image URL: https://via.placeholder.com/300
- Description: A timeless classic with floral notes

### Product 2:
- Name: Dior Sauvage
- Brand: Dior
- Price: 95
- Stock: 30
- Scent Type: woody
- Image URL: https://via.placeholder.com/300
- Description: Fresh and woody fragrance for men

### Product 3:
- Name: Versace Eros
- Brand: Versace
- Price: 85
- Stock: 40
- Scent Type: fresh
- Image URL: https://via.placeholder.com/300
- Description: Bold and confident scent

### Product 4:
- Name: Tom Ford Black Orchid
- Brand: Tom Ford
- Price: 150
- Stock: 20
- Scent Type: oriental
- Image URL: https://via.placeholder.com/300
- Description: Luxurious and mysterious fragrance

### Product 5:
- Name: Acqua di Gio
- Brand: Giorgio Armani
- Price: 90
- Stock: 45
- Scent Type: citrus
- Image URL: https://via.placeholder.com/300
- Description: Fresh aquatic fragrance

## 🆘 Troubleshooting

### "Cannot connect to backend"
- Make sure backend is running on port 5000
- Check `frontend/.env` has correct API URL
- Check browser console for errors

### "Products not showing"
- Make sure you added products as admin
- Check backend is connected to MongoDB
- Check browser console for errors

### "Not authorized as admin"
- Make sure you changed user role to "admin" in MongoDB
- Logout and login again after changing role

### "Cart is empty after adding items"
- Make sure you're logged in
- Check backend logs for errors
- Check browser console for errors

## 📂 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx           # Navigation bar
│   │   ├── ProductCard.jsx      # Product display card
│   │   ├── CartItem.jsx         # Cart item component
│   │   └── ProtectedRoute.jsx   # Route protection
│   ├── pages/
│   │   ├── Home.jsx             # Landing page
│   │   ├── Login.jsx            # Login page
│   │   ├── Register.jsx         # Registration page
│   │   ├── Products.jsx         # Product listing
│   │   ├── ProductDetail.jsx    # Single product view
│   │   ├── Cart.jsx             # Shopping cart
│   │   ├── Checkout.jsx         # Checkout page
│   │   ├── Orders.jsx           # Order history
│   │   └── Admin/
│   │       ├── Dashboard.jsx    # Admin dashboard
│   │       ├── ManageProducts.jsx  # Product management
│   │       └── ManageOrders.jsx    # Order management
│   ├── context/
│   │   ├── AuthContext.jsx      # Authentication state
│   │   └── CartContext.jsx      # Cart state (created but not used in final version)
│   ├── services/
│   │   └── api.js               # Axios configuration
│   ├── App.jsx                  # Main app with routes
│   ├── main.jsx                 # Entry point
│   └── index.css                # Tailwind CSS
├── .env                         # Environment variables
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## 🎉 You're All Set!

Your full-stack MERN ecommerce perfume website is complete!

**What you've built:**
- ✅ Complete backend API with authentication, products, cart, and orders
- ✅ Beautiful frontend with Tailwind CSS
- ✅ User authentication with JWT
- ✅ Product catalog with search and filters
- ✅ Shopping cart functionality
- ✅ Checkout and order management
- ✅ Admin dashboard for managing products and orders

**Next Steps:**
1. Set up MongoDB Atlas (see BACKEND_SETUP.md)
2. Start backend server
3. Start frontend server
4. Create admin user
5. Add products
6. Start shopping!

## 💡 Tips

- Use Chrome DevTools to debug issues
- Check browser console for frontend errors
- Check terminal for backend errors
- MongoDB Atlas has a free tier perfect for learning
- You can deploy this to production later (Vercel + Render + MongoDB Atlas)

---

**Status: ✅ COMPLETE**

Enjoy your ecommerce perfume website! 🎊
