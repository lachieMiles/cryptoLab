import bcrypt from 'bcrypt';
import { User } from '../models/user';

export const seedUsers = async () => {
    const users = [
        {
            username: 'admin',
            email: 'admin@example.com',
            password: await bcrypt.hash('admin123', 10), // Hash password
            role: 'admin',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            username: 'user',
            email: 'user@example.com',
            password: await bcrypt.hash('user123', 10), // Hash password
            role: 'user',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ];

    try {
        await User.bulkCreate(users);
        console.log('Users seeded successfully!');
    } catch (err) {
        console.error('Error seeding users:', err);
    }
};
