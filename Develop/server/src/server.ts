const forceDatabaseRefresh = false;

import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import express from 'express';
import routes from './routes/index.js';
import { sequelize } from './models/index.js';
import cryptoRouter from './routes/api/crypto-routes.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Serves static files in the entire client's dist folder
app.use(express.static('../client/dist'));
app.use(cors());
app.use(
  cors({
    origin: 'http://localhost:5173', // Allow requests from your frontend's origin
    methods: 'GET,POST,PUT,DELETE', // Specify allowed HTTP methods
    credentials: true, // Allow cookies if needed
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