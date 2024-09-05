const mongoose = require('mongoose');
const userData = require('./user-data.json'); // Assuming user data is in a file named user-data.json
const User = require('./models/user'); // Assuming you have defined a User model

// Connect to MongoDB
mongoose.connect('mongodb://root:Nq481retGABN2caB9D5PVFvp@172.21.183.167:27017/labs-mongo-breezy-modern-needle', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Insert User Data
userData.users.forEach(async (userData) => {
  const newUser = new User({
    username: userData.username,
    email: userData.email,
    password: userData.password,
    profile: userData.profile,
  });

  try {
    await newUser.save();
    console.log(`User ${userData.username} inserted successfully`);
  } catch (error) {
    console.error(`Error inserting user ${userData.username}: ${error.message}`);
  }
});