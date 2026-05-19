# Ecommerce Perfume Website - Backend Setup Guide

## ✅ Backend Complete!

Your backend is fully built with:
- ✅ User Authentication (Register, Login, JWT)
- ✅ Product Management (CRUD, Search, Filters)
- ✅ Shopping Cart (Add, Update, Remove)
- ✅ Order Management (Checkout, Order History)
- ✅ Admin Features (Manage Products & Orders)
- ✅ Error Handling

## 🚀 What You Need to Do Next

### Step 1: Set Up MongoDB Atlas (FREE)

1. **Create Account**
   - Go to: https://www.mongodb.com/cloud/atlas/register
   - Sign up with email or Google

2. **Create a Cluster**
   - Click "Build a Database"
   - Choose **FREE** M0 tier (512MB)
   - Select a cloud provider and region (closest to you)
   - Click "Create Cluster"

3. **Create Database User**
   - Go to "Database Access" in left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Username: `perfumeadmin` (or any name you want)
   - Password: Click "Autogenerate Secure Password" and **SAVE IT**
   - User Privileges: "Atlas admin"
   - Click "Add User"

4. **Whitelist Your IP**
   - Go to "Network Access" in left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Database" in left sidebar
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string (looks like):
     ```
     mongodb+srv://perfumeadmin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
     ```
   - Replace `<password>` with your actual password
   - Add database name before the `?`: 
     ```
     mongodb+srv://perfumeadmin:yourpassword@cluster0.xxxxx.mongodb.net/perfume-shop?retryWrites=true&w=majority
     ```

### Step 2: Update Your .env File

Open `backend/.env` and update these values:

```env
PORT=5000
MONGO_URI=mongodb+srv://perfumeadmin:yourpassword@cluster0.xxxxx.mongodb.net/perfume-shop?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_change_this_to_something_random_and_long
NODE_ENV=development
```

**Important:**
- Replace `MONGO_URI` with your actual MongoDB Atlas connection string
- Change `JWT_SECRET` to a long random string (example: `mySecretKey12345!@#$%perfumeShop2024`)

### Step 3: Start the Backend Server

```bash
cd backend
npm run dev
```

You should see:
```
Server running in development mode on port 5000
MongoDB Connected: cluster0-xxxxx.mongodb.net
```

### Step 4: Test the API (Optional but Recommended)

You can test with **Postman** or **Thunder Client** (VS Code extension):

#### Test 1: Register a User
- **POST** `http://localhost:5000/api/auth/register`
- **Body** (JSON):
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```
- Should return user data with a token

#### Test 2: Login
- **POST** `http://localhost:5000/api/auth/login`
- **Body** (JSON):
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
- Should return user data with a token

#### Test 3: Get Products (should be empty initially)
- **GET** `http://localhost:5000/api/products`
- Should return empty array

### Step 5: Create an Admin User (Important!)

To manage products, you need an admin account. After registering a regular user:

1. Go to MongoDB Atlas website
2. Click "Browse Collections" on your cluster
3. Find the `users` collection
4. Find your user document
5. Click "Edit Document"
6. Change `"role": "user"` to `"role": "admin"`
7. Click "Update"

Now you can create products with this admin account!

## 📁 Backend File Structure

```
backend/
├── config/
│   └── db.js                    # MongoDB connection
├── controllers/
│   ├── authController.js        # Register, login, profile
│   ├── productController.js     # CRUD products, search, filter
│   ├── cartController.js        # Cart operations
│   └── orderController.js       # Order operations
├── middleware/
│   ├── authMiddleware.js        # JWT verification
│   ├── adminMiddleware.js       # Admin role check
│   └── errorMiddleware.js       # Error handling
├── models/
│   ├── User.js                  # User schema
│   ├── Product.js               # Product schema
│   ├── Cart.js                  # Cart schema
│   └── Order.js                 # Order schema
├── routes/
│   ├── authRoutes.js            # Auth endpoints
│   ├── productRoutes.js         # Product endpoints
│   ├── cartRoutes.js            # Cart endpoints
│   └── orderRoutes.js           # Order endpoints
├── utils/
│   └── generateToken.js         # JWT token generation
├── .env                         # Environment variables
├── .gitignore
├── package.json
└── server.js                    # Express app entry point
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### Products
- `GET /api/products` - Get all products (with search/filter)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Cart
- `GET /api/cart` - Get user cart (protected)
- `POST /api/cart` - Add to cart (protected)
- `PUT /api/cart/:itemId` - Update cart item (protected)
- `DELETE /api/cart/:itemId` - Remove from cart (protected)
- `DELETE /api/cart` - Clear cart (protected)

### Orders
- `POST /api/orders` - Create order (protected)
- `GET /api/orders` - Get user orders (protected)
- `GET /api/orders/all` - Get all orders (admin only)
- `GET /api/orders/:id` - Get order details (protected)
- `PUT /api/orders/:id/status` - Update order status (admin only)

## 🎯 Next Steps

1. ✅ Set up MongoDB Atlas
2. ✅ Update .env file
3. ✅ Start backend server
4. ✅ Test API endpoints
5. ✅ Create admin user
6. ⏭️ **Build the Frontend** (React + Vite + Tailwind)

## 🆘 Troubleshooting

### "MongooseServerSelectionError"
- Check your MongoDB connection string in .env
- Make sure you replaced `<password>` with actual password
- Verify IP whitelist in MongoDB Atlas

### "Not authorized, token failed"
- Make sure you're sending the token in headers:
  ```
  Authorization: Bearer your_token_here
  ```

### "Not authorized as an admin"
- Make sure you changed the user role to "admin" in MongoDB

## 💡 Tips

- Keep your `.env` file secret (never commit to git)
- The backend will run on `http://localhost:5000`
- Frontend will connect to this URL
- Use strong passwords for production

---

**Backend Status: ✅ COMPLETE**

Ready to build the frontend? Let me know!
