import { sequelize } from '../models/index';
import { seedUsers } from '../models/user';

const seedAll = async () => {
    try {
        console.log('Connecting to the database...');
        await sequelize.sync({ force: true }); // Force sync to reset the database
        console.log('Database synced successfully!');

        console.log('Seeding users...');
        await seedUsers();

        console.log('All seeds executed successfully!');
    } catch (err) {
        console.error('Error during seeding:', err);
    } finally {
        await sequelize.close();
        console.log('Database connection closed.');
    }
};

seedAll();
