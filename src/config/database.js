// Import Mongoose library for MongoDB interaction
const mongoose = require('mongoose');

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    // Connect to MongoDB using the URI with credentials and options
    await mongoose.connect(process.env.MONGO_URI);

    const dbName = mongoose.connection.name; // Get the name of the connected database
    console.log(`MongoDB connected to ${dbName}`);
  } catch (error) {
    // Log connection error and exit process if failed
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

// Handle connection events
mongoose.connection.on('connected', () => {
    console.log('Mongoose default connection open');
});

mongoose.connection.on('error', (err) => {
    console.error('Mongoose default connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose default connection disconnected');
});

// Graceful shutdown on process termination
const gracefulShutdown = async (msg) => {
    console.log(`Received ${msg}. Closing MongoDB connection...`);
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
    process.exit(0);
};

// Listen for termination signals
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

  // Export the connectDB function
module.exports = connectDB;