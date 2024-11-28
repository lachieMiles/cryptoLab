const forceDatabaseRefresh = false;

import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import express from 'express';
import routes from './routes/index.js';
import { sequelize } from './models/index.js';
import cryptoRouter from './routes/api/crypto-routes.js';
import authRoutes from './routes/auth-routes.js';

const app = express();
const PORT = process.env.PORT || 1000;

//app.options('*', cors());

// Serves static files in the entire client's dist folder

app.use('/auth', authRoutes);

app.use(cors({
  origin: "https://cryptolab-rc3l.onrender.com",
  allowedHeaders: ["Content-Type"],
  credentials: true,
}));

app.use(express.static('../client/dist'));
app.use(express.json());
app.use(routes);
app.use('/api/crypto', cryptoRouter);

sequelize.sync({ force: forceDatabaseRefresh }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});