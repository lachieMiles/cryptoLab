import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import express from 'express';
import path from 'path';
import routes from './routes/index.js';
import { sequelize } from './models/index.js';
import cryptoRouter from './routes/api/crypto-routes.js';

const app = express();
const PORT = process.env.PORT || 3001;
const forceDatabaseRefresh = false;

// Serve static files from the frontend build folder
app.use(express.static(path.join(__dirname, '../client/dist')));

// Configure CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173', // Allow requests from your frontend's origin
    methods: 'GET,POST,PUT,DELETE', // Specify allowed HTTP methods
    credentials: true, // Allow cookies if needed
  })
);

// Middleware for parsing JSON
app.use(express.json());

// API Routes
app.use(routes);
app.use('/api/crypto', cryptoRouter);

// Catch-all route to serve React frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// Database synchronization and server start
sequelize.sync({ force: forceDatabaseRefresh }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
