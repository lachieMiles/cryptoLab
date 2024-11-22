import { User } from '../models/user'; // Import the User model

// Function to seed the user data
export const seedUsers = async () => {
    try {
        const users = [
            {
                username: 'Shareef Evans',
                email: 'shareefevans@example.com',
                password: 'password', // Plain password (hashed automatically by hook)
            },
            {
                username: 'Henry Agustin',
                email: 'henryagustin@example.com',
                password: 'password', // Plain password (hashed automatically by hook)
            },
            {
                username: 'Lachlan Miles',
                email: 'lachlanmiles@example.com',
                password: 'password', // Plain password (hashed automatically by hook)
            },
        ];

        // Use bulkCreate to seed the user data
        await User.bulkCreate(users);
        console.log('Users seeded successfully!');
    } catch (err) {
        console.error('Error seeding users:', err);
    }
};
