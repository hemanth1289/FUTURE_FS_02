const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const leadRoutes = require('./routes/leadRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/leads', leadRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Mini CRM API is running' });
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully');
   const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });
