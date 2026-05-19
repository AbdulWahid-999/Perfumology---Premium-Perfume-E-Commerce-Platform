# Quick Reference Guide - Perfumology Website

## 🚀 Getting Started

### Start Backend Server
```bash
cd backend
npm run dev
# Server runs on http://localhost:5000
```

### Start Frontend Server
```bash
cd frontend
npm run dev
# Frontend runs on http://localhost:5173
```

---

## 📱 Testing Mobile Responsiveness

### Browser DevTools Method
1. Open Chrome/Firefox DevTools (F12)
2. Click Device Toolbar (Ctrl+Shift+M)
3. Select device or custom dimensions
4. Test at these breakpoints:
   - **Mobile:** 375px (iPhone SE)
   - **Mobile:** 414px (iPhone 12)
   - **Tablet:** 768px (iPad)
   - **Desktop:** 1024px+

### Key Areas to Test
- ✅ Hamburger menu opens/closes
- ✅ Navigation links work
- ✅ Text is readable
- ✅ Buttons are clickable
- ✅ Forms are usable
- ✅ Images scale properly
- ✅ No horizontal scrolling

---

## 🧪 Feature Testing Checklist

### Authentication
- [ ] Register new account
- [ ] Login with credentials
- [ ] Logout functionality
- [ ] Protected routes redirect to login
- [ ] Admin can access admin dashboard

### Products
- [ ] Browse all products
- [ ] Search for products
- [ ] Filter by price range
- [ ] Filter by rating
- [ ] Filter by scent type
- [ ] Filter by brand
- [ ] Sort by price/rating/popularity
- [ ] View product details
- [ ] See related products
- [ ] View recently viewed products

### Shopping
- [ ] Add product to cart
- [ ] Update cart quantity
- [ ] Remove from cart
- [ ] View cart total
- [ ] Proceed to checkout
- [ ] Enter shipping address
- [ ] Add gift wrapping
- [ ] Place order
- [ ] View order history

### User Profile
- [ ] View profile information
- [ ] Edit profile
- [ ] Change password
- [ ] Add address
- [ ] Edit address
- [ ] Delete address
- [ ] Set default address

### Reviews
- [ ] Add product review
- [ ] Rate product
- [ ] Edit own review
- [ ] Delete own review
- [ ] View all reviews

### Wishlist
- [ ] Add to wishlist
- [ ] Remove from wishlist
- [ ] View wishlist
- [ ] Add to cart from wishlist

### Admin Features
- [ ] View dashboard analytics
- [ ] See sales trends
- [ ] View top products
- [ ] Check low stock alerts
- [ ] Manage products
- [ ] Manage orders
- [ ] Update order status

---

## 🎨 Responsive Design Verification

### Mobile Menu (Critical)
```
✅ Hamburger button visible on mobile
✅ Menu opens with smooth animation
✅ Menu closes when link clicked
✅ Menu closes when X button clicked
✅ All navigation items accessible
✅ Logout button works
✅ Admin link shows for admin users
```

### Text Sizing
```
✅ Hero title readable on mobile
✅ Body text not too small
✅ Labels visible on forms
✅ No text overflow
✅ Line height appropriate
```

### Spacing
```
✅ No content touching edges
✅ Proper padding on cards
✅ Adequate gap between elements
✅ Buttons have enough space
✅ Forms have proper spacing
```

### Touch Targets
```
✅ Buttons min 44px height
✅ Links easily clickable
✅ Form inputs large enough
✅ Proper spacing between clickables
```

---

## 🔍 Common Issues & Solutions

### Issue: Mobile menu not opening
**Solution:** Check browser console for errors, ensure useState is imported in Navbar.jsx

### Issue: Text cut off on mobile
**Solution:** Verify responsive classes are applied (text-sm md:text-base lg:text-lg)

### Issue: Buttons too small on mobile
**Solution:** Check padding classes (px-3 md:px-4 py-2 md:py-3)

### Issue: Horizontal scrolling on mobile
**Solution:** Check container width, ensure px-4 padding on container

### Issue: Images not scaling
**Solution:** Verify w-full and h-auto classes on images

### Issue: Forms hard to use on mobile
**Solution:** Check input padding and font size, ensure labels are visible

---

## 📊 Performance Checklist

- [ ] Page loads in < 3 seconds
- [ ] Images lazy load properly
- [ ] Animations are smooth (60fps)
- [ ] No console errors
- [ ] No memory leaks
- [ ] Mobile performance good
- [ ] Touch interactions responsive

---

## 🔐 Security Checklist

- [ ] Passwords hashed with bcrypt
- [ ] JWT tokens used for auth
- [ ] Protected routes working
- [ ] Admin routes protected
- [ ] Input validation on forms
- [ ] CORS configured properly
- [ ] No sensitive data in localStorage
- [ ] API errors don't expose details

---

## 📝 API Endpoints Reference

### Authentication
```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/profile (protected)
PUT    /api/auth/profile (protected)
PUT    /api/auth/change-password (protected)
POST   /api/auth/addresses (protected)
PUT    /api/auth/addresses/:id (protected)
DELETE /api/auth/addresses/:id (protected)
```

### Products
```
GET    /api/products
GET    /api/products/:id
GET    /api/products/search/suggestions
POST   /api/products (admin)
PUT    /api/products/:id (admin)
DELETE /api/products/:id (admin)
```

### Cart
```
GET    /api/cart (protected)
POST   /api/cart (protected)
PUT    /api/cart/:itemId (protected)
DELETE /api/cart/:itemId (protected)
```

### Orders
```
POST   /api/orders (protected)
GET    /api/orders (protected)
GET    /api/orders/:id (protected)
GET    /api/orders/all (admin)
PUT    /api/orders/:id/status (admin)
```

### Reviews
```
GET    /api/reviews/product/:productId
POST   /api/reviews (protected)
PUT    /api/reviews/:id (protected)
DELETE /api/reviews/:id (protected)
```

### Wishlist
```
GET    /api/wishlist (protected)
POST   /api/wishlist (protected)
DELETE /api/wishlist/:productId (protected)
```

### Admin
```
GET    /api/admin/analytics
GET    /api/admin/customers
```

---

## 🎯 Deployment Checklist

### Before Deployment
- [ ] All tests passing
- [ ] No console errors
- [ ] Environment variables configured
- [ ] Database connection working
- [ ] API endpoints tested
- [ ] Frontend builds successfully
- [ ] Mobile responsiveness verified
- [ ] Performance optimized

### Deployment Steps
1. Build frontend: `npm run build`
2. Deploy backend to Render/Railway
3. Deploy frontend to Vercel/Netlify
4. Configure environment variables
5. Test production URLs
6. Monitor for errors

---

## 📞 Troubleshooting

### Backend Won't Start
```bash
# Check if port 5000 is in use
lsof -i :5000

# Check MongoDB connection
# Verify MONGO_URI in .env

# Check Node version
node --version
```

### Frontend Won't Start
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check Node version
node --version

# Check if port 5173 is in use
lsof -i :5173
```

### API Calls Failing
```
1. Check backend is running
2. Check CORS configuration
3. Check API URL in frontend
4. Check network tab in DevTools
5. Check backend console for errors
```

### Mobile Menu Not Working
```
1. Check Navbar.jsx has useState imported
2. Check mobileMenuOpen state exists
3. Check onClick handler on button
4. Check mobile menu JSX renders
5. Check CSS classes for visibility
```

---

## 📚 Documentation Files

- **COMPLETION_SUMMARY.md** - Project overview and status
- **RESPONSIVE_FIXES_SUMMARY.md** - Detailed responsive design changes
- **BACKEND_SETUP.md** - Backend configuration guide
- **FRONTEND_SETUP.md** - Frontend configuration guide
- **FEATURES_IMPLEMENTED.md** - Complete feature list
- **README.md** - Project readme

---

## 🎓 Key Learnings

### Responsive Design
- Mobile-first approach
- Tailwind breakpoints (sm, md, lg, xl)
- Flexible layouts with flexbox/grid
- Touch-friendly UI elements

### React Best Practices
- Hooks (useState, useEffect, useContext)
- Component composition
- Proper state management
- Protected routes

### MERN Stack
- Express REST APIs
- MongoDB aggregation
- JWT authentication
- Mongoose schemas

### UI/UX
- Gradient colors and animations
- Loading states and skeletons
- Toast notifications
- Smooth transitions

---

## ✅ Final Verification

Run this checklist before considering the project complete:

- [ ] Mobile menu fully functional
- [ ] All pages responsive on mobile/tablet/desktop
- [ ] All features working correctly
- [ ] No console errors
- [ ] No broken links
- [ ] Forms submit successfully
- [ ] Authentication working
- [ ] Admin features accessible
- [ ] Performance optimized
- [ ] Ready for deployment

---

**Last Updated:** May 18, 2026
**Status:** ✅ Complete & Ready for Testing
