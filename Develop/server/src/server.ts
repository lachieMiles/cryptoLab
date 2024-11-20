import dotenv from 'dotenv';
import express from 'express';
dotenv.config();

import routes from './routes/index.js';

const app = express();
const PORT = process.env.PORT || 3001;

// app.use(express.static('../client/dist'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
