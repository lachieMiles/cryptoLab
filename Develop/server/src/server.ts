const forceDatabaseRefresh = false;

import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import express from 'express';
import routes from './routes/index.js';
import { sequelize } from './models/index.js';
import cryptoRouter from './routes/api/crypto-routes.js';

const app = express();
const PORT = process.env.PORT || 1000;

// Serves static files in the entire client's dist folder
app.use(express.static('../client/dist'));
app.use(cors());
app.use(
  cors({
    origin: [
      'https://cryptolab-rc3l.onrender.com', // Deployed frontend
      'http://localhost:5173', // Local development frontend
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
    credentials: true, // Allow cookies and authorization headers
  })
);


app.use(express.json());
app.use(routes);
app.use(express.json());
app.use('/api/crypto', cryptoRouter);

sequelize.sync({ force: forceDatabaseRefresh }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});