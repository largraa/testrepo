const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// User registration
exports.registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during user registration:', error); // Log the error
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// User login
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Validate password
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate JWT for the user
    const token = jwt.sign({ username: existingUser.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({ token });
  } catch (error) {
    console.error('Error during user login:', error); // Log the error
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const { newUsername } = req.body;

    // Validate newUsername
    if (!newUsername) {
      return res.status(400).json({ message: 'New username is required' });
    }

    // Update the username
    const result = await User.updateOne({ username }, { username: newUsername });
    if (result.nModified === 0) {
      return res.status(404).json({ message: 'User not found or no change made' });
    }

    return res.status(200).json({ message: 'User profile updated successfully' });
  } catch (error) {
    console.error('Error during user profile update:', error); // Log the error
    return res.status(500).json({ message: 'Internal server error' });
  }
};