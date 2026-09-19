import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Root API Route
app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to the AWS SBG RMDSSOE Backend API',
    status: 'online',
    timestamp: new Date().toISOString(),
  });
});

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// Induction / Club Info endpoint
app.get('/api/info', (req, res) => {
  res.json({
    club: 'AWS Student Builder Group (SBG)',
    institution: 'RMD Sinhgad School of Engineering, Pune',
    domains: [
      'Cloud Architecture & AWS Services',
      'DevOps & CI/CD Pipelines',
      'AI/ML on Cloud',
      'Web & App Development',
      'Technical Event Management & Media',
    ],
    induction: {
      status: 'Open',
      academicYear: '2026-2027',
    },
  });
});

// Sample registration endpoint
app.post('/api/register', (req, res) => {
  const { name, email, department, year, domain } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      error: 'Name and email are required fields.',
    });
  }

  // Simulated registration response
  res.status(201).json({
    success: true,
    message: `Thank you for registering, ${name}! Your application has been received.`,
    data: { name, email, department, year, domain, registeredAt: new Date().toISOString() },
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message,
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Backend server is running on http://localhost:${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
});
