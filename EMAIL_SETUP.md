# Email Setup Instructions for Perfumology

## Gmail App Password Setup

To enable email notifications, you need to create a Gmail App Password:

### Step 1: Enable 2-Step Verification
1. Go to your Google Account: https://myaccount.google.com/
2. Click on "Security" in the left sidebar
3. Under "Signing in to Google", click on "2-Step Verification"
4. Follow the steps to enable 2-Step Verification

### Step 2: Generate App Password
1. After enabling 2-Step Verification, go back to Security settings
2. Under "Signing in to Google", click on "App passwords"
3. Select "Mail" as the app
4. Select "Other (Custom name)" as the device
5. Enter "Perfumology" as the name
6. Click "Generate"
7. Copy the 16-character password (it will look like: xxxx xxxx xxxx xxxx)

### Step 3: Update Backend .env File
Open `backend/.env` and replace `your_app_password_here` with the generated app password:

```
EMAIL_USER=wahidnarejo11234@gmail.com
EMAIL_PASS=xxxx xxxx xxxx xxxx
ADMIN_EMAIL=wahidnarejo11234@gmail.com
```

**Important:** Remove the spaces from the app password when pasting it in the .env file.

## Features Implemented

### 1. Order Email Notifications
- When a customer places an order, you will receive an email at wahidnarejo11234@gmail.com
- Email includes:
  - Order ID
  - Customer name and email
  - List of ordered items with quantities and prices
  - Shipping address
  - Total amount

### 2. Contact Form
- New page at `/contact` route
- Users can send messages directly to you
- Email includes:
  - Sender's name and email
  - Subject
  - Message content
- Added "Contact" link in the Navbar

## Testing

### Test Order Email:
1. Make sure backend is running: `cd backend && npm run dev`
2. Place a test order through the website
3. Check your email at wahidnarejo11234@gmail.com

### Test Contact Form:
1. Visit http://localhost:5173/contact
2. Fill out the contact form
3. Submit the message
4. Check your email at wahidnarejo11234@gmail.com

## Troubleshooting

If emails are not sending:
1. Verify 2-Step Verification is enabled on your Google account
2. Double-check the app password in .env file (no spaces)
3. Make sure EMAIL_USER matches your Gmail address
4. Check backend console for error messages
5. Ensure nodemailer package is installed: `npm list nodemailer`

## Security Note
- Never commit the .env file to Git (it's already in .gitignore)
- Keep your app password secure
- The app password is different from your regular Gmail password
