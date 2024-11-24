import { Request, Response } from 'express';
import { User } from '../models/user'; // Import the User model

// Controller to fetch all users
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.findAll(); // Fetch all users from the database
        res.status(200).json(users); // Respond with the users in JSON format
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ message: 'Failed to fetch users.' });
    }
};
