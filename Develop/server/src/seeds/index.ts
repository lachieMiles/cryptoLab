import sequelize from '../config/connection';
import { seedUsers } from './user-seeds';

//SEEDING FUNCTION
const seedAll = async () => {
    try {
        console.log('Connecting to the database...');
        await sequelize.sync({ force: true }); // Force sync resets the database
        console.log('Database synced successfully!');

        console.log('Seeding users...');
        await seedUsers(); // Call the user-seeds function

        console.log('All seeds executed successfully!');
    } catch (err) {
        console.error('Error during seeding:', err);
    } finally {
        await sequelize.close();
        console.log('Database connection closed.');
    }
};

seedAll();
