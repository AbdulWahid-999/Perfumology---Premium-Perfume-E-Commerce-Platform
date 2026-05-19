# Ecommerce Perfume Website - Implementation Plan

## Project Overview
Build a full-stack ecommerce perfume website using the MERN stack (MongoDB, Express, React, Node.js). All tools and services will be free-tier or open source.

## Technology Stack

### Frontend
- **React** (with Vite for fast development)
- **React Router** for navigation
- **Axios** for API calls
- **Tailwind CSS** for styling
- **React Context API** for state management

### Backend
- **Node.js** with Express.js
- **MongoDB Atlas** (free tier: 512MB storage)
- **Mongoose** for MongoDB object modeling
- **JWT** (jsonwebtoken) for authentication
- **bcrypt** for password hashing
- **express-validator** for input validation
- **cors** for cross-origin requests

### Development Tools
- **Git** for version control
- **Postman** or **Thunder Client** for API testing
- **MongoDB Compass** (optional) for database visualization

### Deployment (Free Options)
- **Frontend**: Vercel or Netlify
- **Backend**: Render.com (free tier) or Railway.app
- **Database**: MongoDB Atlas (free tier)

## Core Features

### Phase 1: Foundation & Authentication
1. **Project Setup**
   - Initialize backend (Express server)
   - Initialize frontend (React with Vite)
   - Set up MongoDB Atlas account and cluster
   - Configure environment variables
   - Set up basic folder structure

2. **User Authentication**
   - User registration with email validation
   - User login with JWT token generation
   - Password hashing with bcrypt
   - Protected routes middleware
   - User profile management

### Phase 2: Product Management
3. **Product Catalog**
   - Product schema (name, description, price, brand, scent type, image URL, stock)
   - CRUD operations for products (admin only)
   - Product listing with pagination
   - Product detail view
   - Search functionality
   - Filter by brand, price range, scent type

4. **Image Handling**
   - Use free image hosting (Cloudinary free tier or direct URLs)
   - Image upload for product creation

### Phase 3: Shopping Experience
5. **Shopping Cart**
   - Add to cart (stored in MongoDB for logged-in users)
   - Update quantities
   - Remove items
   - Cart persistence across sessions
   - Calculate totals

6. **Checkout Process**
   - Order summary
   - Shipping information form
   - Order creation and storage
   - Order history for users

### Phase 4: Admin Features
7. **Admin Dashboard**
   - Admin role-based access
   - View all orders
   - Manage products (create, update, delete)
   - View user list
   - Order status management

## Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (enum: ['user', 'admin']),
  createdAt: Date,
  updatedAt: Date
}
```

### Product Collection
```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  price: Number,
  brand: String,
  scentType: String (enum: ['floral', 'woody', 'citrus', 'oriental', 'fresh']),
  imageUrl: String,
  stock: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Cart Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  items: [{
    productId: ObjectId (ref: Product),
    quantity: Number,
    price: Number
  }],
  updatedAt: Date
}
```

### Order Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  items: [{
    productId: ObjectId (ref: Product),
    name: String,
    quantity: Number,
    price: Number
  }],
  totalAmount: Number,
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  status: String (enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled']),
  createdAt: Date,
  updatedAt: Date
}
```

## Folder Structure

```
ecommerce-perfume-website/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── cartController.js
│   │   └── orderController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── adminMiddleware.js
│   │   └── errorMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Cart.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── cartRoutes.js
│   │   └── orderRoutes.js
│   ├── utils/
│   │   └── generateToken.js
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── CartItem.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── Orders.jsx
│   │   │   └── Admin/
│   │   │       ├── Dashboard.jsx
│   │   │       ├── ManageProducts.jsx
│   │   │       └── ManageOrders.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── CartContext.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
└── README.md
```

## Implementation Steps

### Step 1: Backend Setup
1. Create `backend` folder and initialize npm
2. Install dependencies: express, mongoose, dotenv, cors, bcrypt, jsonwebtoken, express-validator
3. Set up MongoDB Atlas cluster and get connection string
4. Create database connection in `config/db.js`
5. Set up basic Express server in `server.js`
6. Configure environment variables (.env)

### Step 2: User Authentication
1. Create User model with Mongoose schema
2. Create auth routes (register, login)
3. Implement password hashing with bcrypt
4. Implement JWT token generation
5. Create auth middleware for protected routes
6. Test authentication endpoints

### Step 3: Product Management
1. Create Product model
2. Create product routes (CRUD operations)
3. Implement admin middleware
4. Add search and filter functionality
5. Test product endpoints

### Step 4: Cart Functionality
1. Create Cart model
2. Create cart routes (add, update, remove, get cart)
3. Link cart to authenticated users
4. Test cart endpoints

### Step 5: Order Management
1. Create Order model
2. Create order routes (create order, get user orders, get all orders for admin)
3. Implement order status updates
4. Test order endpoints

### Step 6: Frontend Setup
1. Create React app with Vite
2. Install dependencies: react-router-dom, axios, tailwindcss
3. Set up Tailwind CSS
4. Create folder structure
5. Set up routing with React Router

### Step 7: Authentication UI
1. Create AuthContext for global auth state
2. Create Login page
3. Create Register page
4. Implement protected routes
5. Create Navbar with auth status

### Step 8: Product UI
1. Create Products listing page
2. Create ProductCard component
3. Create ProductDetail page
4. Implement search and filters
5. Connect to backend API

### Step 9: Cart UI
1. Create CartContext for global cart state
2. Create Cart page
3. Create CartItem component
4. Implement add to cart functionality
5. Connect to backend API

### Step 10: Checkout & Orders
1. Create Checkout page
2. Implement order creation
3. Create Orders page to view order history
4. Connect to backend API

### Step 11: Admin Dashboard
1. Create admin-only routes
2. Create Dashboard page
3. Create ManageProducts page (CRUD UI)
4. Create ManageOrders page
5. Implement admin middleware on frontend

### Step 12: Testing & Refinement
1. Test all user flows
2. Test all admin flows
3. Add error handling
4. Add loading states
5. Improve UI/UX
6. Add form validations

### Step 13: Deployment
1. Deploy MongoDB Atlas (already cloud-hosted)
2. Deploy backend to Render.com or Railway
3. Deploy frontend to Vercel or Netlify
4. Configure environment variables on hosting platforms
5. Test production deployment

## Free Resources & Limits

### MongoDB Atlas Free Tier
- 512MB storage
- Shared RAM
- No credit card required
- Sufficient for learning and small projects

### Render.com Free Tier
- 750 hours/month
- Spins down after 15 minutes of inactivity
- 512MB RAM
- No credit card required

### Vercel Free Tier
- Unlimited personal projects
- 100GB bandwidth/month
- Automatic HTTPS
- No credit card required

## Learning Resources

### Express.js
- Official docs: https://expressjs.com/
- REST API tutorial: https://www.youtube.com/watch?v=fgTGADljAeg

### MongoDB & Mongoose
- MongoDB University (free courses): https://university.mongodb.com/
- Mongoose docs: https://mongoosejs.com/docs/guide.html

### JWT Authentication
- JWT.io: https://jwt.io/introduction
- Tutorial: https://www.youtube.com/watch?v=mbsmsi7l3r4

## Security Considerations
- Never commit .env files
- Use strong JWT secrets
- Implement rate limiting (express-rate-limit)
- Validate all user inputs
- Use HTTPS in production
- Implement CORS properly
- Hash passwords with bcrypt (salt rounds: 10)

## Next Steps After Plan Approval
1. Create backend folder structure
2. Initialize npm and install dependencies
3. Set up MongoDB Atlas account
4. Create basic Express server
5. Implement user authentication
