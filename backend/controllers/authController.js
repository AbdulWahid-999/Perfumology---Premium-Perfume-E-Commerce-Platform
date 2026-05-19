const User = require('../models/User');
const generateToken = require('../utils/generateToken');

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please add all fields' });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please add all fields' });
    }

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user profile
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.phone = req.body.phone || user.phone;

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        role: updatedUser.role,
        addresses: updatedUser.addresses,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Change password
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Please provide both current and new password' });
    }

    const user = await User.findById(req.user._id);

    if (user && (await user.matchPassword(currentPassword))) {
      user.password = newPassword;
      await user.save();
      res.json({ message: 'Password updated successfully' });
    } else {
      res.status(401).json({ message: 'Current password is incorrect' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add address
const addAddress = async (req, res) => {
  try {
    const { label, street, city, state, zipCode, country, isDefault } = req.body;

    if (!label || !street || !city || !state || !zipCode) {
      return res.status(400).json({ message: 'Please provide all address fields' });
    }

    const user = await User.findById(req.user._id);

    if (user) {
      // If this is set as default, unset other defaults
      if (isDefault) {
        user.addresses.forEach(addr => addr.isDefault = false);
      }

      user.addresses.push({
        label,
        street,
        city,
        state,
        zipCode,
        country: country || 'Pakistan',
        isDefault: isDefault || false,
      });

      await user.save();
      res.json(user.addresses);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update address
const updateAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    const { label, street, city, state, zipCode, country, isDefault } = req.body;

    const user = await User.findById(req.user._id);

    if (user) {
      const address = user.addresses.id(addressId);

      if (!address) {
        return res.status(404).json({ message: 'Address not found' });
      }

      // If this is set as default, unset other defaults
      if (isDefault) {
        user.addresses.forEach(addr => addr.isDefault = false);
      }

      address.label = label || address.label;
      address.street = street || address.street;
      address.city = city || address.city;
      address.state = state || address.state;
      address.zipCode = zipCode || address.zipCode;
      address.country = country || address.country;
      address.isDefault = isDefault !== undefined ? isDefault : address.isDefault;

      await user.save();
      res.json(user.addresses);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete address
const deleteAddress = async (req, res) => {
  try {
    const { addressId } = req.params;

    const user = await User.findById(req.user._id);

    if (user) {
      user.addresses = user.addresses.filter(
        addr => addr._id.toString() !== addressId
      );

      await user.save();
      res.json(user.addresses);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  changePassword,
  addAddress,
  updateAddress,
  deleteAddress,
};
