const forceDatabaseRefresh = false;
import path from 'path';
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
app.use(express.static(path.resolve(__dirname, '../client/dist')));
app.use(cors());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173', // Allow requests from your frontend's origin
    methods: 'GET,POST,PUT,DELETE', // Specify allowed HTTP methods
    credentials: true, // Allow cookies if needed
  })
);

app.get('*', (_, res) => {
  res.sendFile(path.resolve(__dirname, '../client/dist/index.html'));
});

app.use(express.json());
app.use(routes);
app.use(express.json());
app.use('/api/crypto', cryptoRouter);

sequelize.sync({ force: forceDatabaseRefresh }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
