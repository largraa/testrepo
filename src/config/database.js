const mongoose = require('mongoose');

// MongoDB connection settings
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://root:Nq481retGABN2caB9D5PVFvp@172.21.183.167', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;