const express = require('express');
const connectDB = require('./config/dbConfig');
const userRoutes = require('./src/routes/userRoutes');

const app = express();
connectDB();

app.use(express.json());
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});