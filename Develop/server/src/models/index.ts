import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';
import { UserFactory } from './user.js';


const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL)
  : new Sequelize(process.env.DB_NAME || '', process.env.DB_USER || '', process.env.DB_PASSWORD, {
      host: 'localhost',
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432, // Default port
      dialect: 'postgres',
      dialectOptions: {
        decimalNumbers: true,
      },
    });


// Initialize the User model
const User = UserFactory(sequelize);

// Export the models and sequelize instance
export { sequelize, User, };