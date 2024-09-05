const express = require('express');
const connectDB = require('./config/database');
const userRoutes = require('./routes/userRoutes');

// Initialize Express app
const app = express();

// Load environment variables from .env file
require('dotenv').config();

// Connect to MongoDB
connectDB();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Use the user routes for handling user-related API requests
app.use('/users', userRoutes);

// Start the server on the specified port
const port = process.env.PORT || 3000; // Use environment variable or default to 3000
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});