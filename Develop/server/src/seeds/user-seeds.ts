import { User } from '../models/user.js';

export const seedUsers = async () => {
  try {
    await User.bulkCreate(
      [
        { username: 'ShareefE', email: 'shareefevans@example.com', password: 'password' },
        { username: 'HenryA', email: 'henryagustin@example.com', password: 'password' },
        { username: 'LachieM', email: 'lachlanmiles@example.com', password: 'password' },
      ],
      { individualHooks: true } // Ensures that hooks like `beforeCreate` are triggered
    );
    console.log('Users seeded successfully!');
  } catch (err) {
    console.error('Error seeding users:', err);
  }
};
