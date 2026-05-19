const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:5000/api/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (user) {
          return done(null, user);
        }

        // Check if user exists with same email
        user = await User.findOne({ email: profile.emails[0].value });

        if (user) {
          // Link Google account to existing user
          user.googleId = profile.id;
          user.authProvider = 'google';
          if (!user.profilePicture && profile.photos[0]) {
            user.profilePicture = profile.photos[0].value;
          }
          try {
            await user.save();
            return done(null, user);
          } catch (saveError) {
            console.error('Error linking Google account:', saveError);
            return done(new Error('Failed to link Google account to existing user'), null);
          }
        }

        // Create new user
        try {
          user = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
            authProvider: 'google',
            profilePicture: profile.photos[0]?.value || '',
            password: Math.random().toString(36).slice(-8),
          });
          return done(null, user);
        } catch (createError) {
          console.error('Error creating new user:', createError);
          return done(new Error('Failed to create new user account'), null);
        }
      } catch (error) {
        console.error('Google OAuth error:', error);
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;

