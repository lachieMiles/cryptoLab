import { User } from '../models/index'; // Import the initialized User model

export const seedUsers = async () => {
    try {
        const users = [
            {
                username: 'Shareef Evans',
                email: 'shareefevans@example.com',
                password: 'password', // This will be hashed by the beforeCreate hook
            },
            {
                username: 'Henry Agustin',
                email: 'henryagustin@example.com',
                password: 'password', // This will be hashed by the beforeCreate hook
            },
            {
                username: 'Lachlan Miles',
                email: 'lachlanmiles@example.com',
                password: 'password', // This will be hashed by the beforeCreate hook
            },
        ];

        // Insert users into the database
        await User.bulkCreate(users);
        console.log('Users seeded successfully!');
    } catch (err) {
        console.error('Error seeding users:', err);
    }
};
