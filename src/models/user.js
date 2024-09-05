const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,  // Username is mandatory
    unique: true,    // Ensure usernames are unique
    trim: true,      // Remove leading and trailing spaces
    minlength: 3,    // Minimum length for the username (optional)
    maxlength: 50    // Maximum length for the username (optional)
  },
  password: {
    type: String,
    required: true,  // Password is mandatory
    minlength: 6     // Minimum length for the password (optional)
  },
});

userSchema.index({ username: 1 }); // Index on username field

// Create the User model based on the schema
const User = mongoose.model('User', userSchema);

// Export the User model
module.exports = User;