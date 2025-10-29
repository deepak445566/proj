require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// Improved CORS configuration
app.use(cors({
  origin: 'http://localhost:5173', // React app ka URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');

app.use('/api/auth', authRoutes);
app.use('/api', profileRoutes);

app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
  console.log(`CORS enabled for: http://localhost:3000`);
});