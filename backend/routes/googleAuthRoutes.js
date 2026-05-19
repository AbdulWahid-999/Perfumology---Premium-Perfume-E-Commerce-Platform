const express = require('express');
const passport = require('passport');
const { googleCallback, googleFailure } = require('../controllers/googleAuthController');

const router = express.Router();

// Initiate Google OAuth flow
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

// Google OAuth callback
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/api/auth/google/failure',
    session: false,
  }),
  googleCallback
);

// Google authentication failure
router.get('/google/failure', googleFailure);

module.exports = router;
