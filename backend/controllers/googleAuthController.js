const generateToken = require('../utils/generateToken');

const googleCallback = async (req, res) => {
  try {
    if (!req.user) {
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5183';
      return res.redirect(`${frontendUrl}/auth-error?message=${encodeURIComponent('Authentication failed. Please try again.')}`);
    }

    const token = generateToken(req.user._id);

    // Redirect to frontend with token
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5183';
    res.redirect(
      `${frontendUrl}/auth-success?token=${token}&user=${encodeURIComponent(
        JSON.stringify({
          _id: req.user._id,
          name: req.user.name,
          email: req.user.email,
          role: req.user.role,
          profilePicture: req.user.profilePicture,
        })
      )}`
    );
  } catch (error) {
    console.error('Google callback error:', error);
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5183';
    res.redirect(`${frontendUrl}/auth-error?message=${encodeURIComponent('Something went wrong. Please try again.')}`);
  }
};

const googleFailure = (req, res) => {
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5183';
  res.redirect(`${frontendUrl}/auth-error?message=${encodeURIComponent('Google authentication failed. Please try again.')}`);
};

module.exports = {
  googleCallback,
  googleFailure,
};
