import { sequelize } from '../models/index.js';
import { seedUsers } from './user-seeds.js';

//SEEDING FUNCTION
const seedAll = async (): Promise<void> => {
    try {
      console.log('Connecting to the database...');
      await sequelize.sync({ force: true }); // Force sync resets the database
      console.log('\n----- DATABASE SYNCED -----\n');
  
      console.log('Seeding users...');
      await seedUsers();
      console.log('\n----- USERS SEEDED -----\n');

      
      console.log('\n----- ALL SEEDS EXECUTED SUCCESSFULLY -----\n');
      process.exit(0); // Exit process with success code
    } catch (error) {
      console.error('Error during seeding:', error);
      process.exit(1); // Exit process with failure code
    }
  };
  
  seedAll();
