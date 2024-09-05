const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route to handle user registration
router.post('/register', userController.registerUser);

// Route to handle user login
router.post('/login', userController.loginUser);

// Route to handle updating user profile based on username
router.put('/:username', userController.updateUserProfile);

module.exports = router;