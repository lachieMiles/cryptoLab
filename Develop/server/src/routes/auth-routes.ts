import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    // Find user by username
    const user = await User.findOne({ //changed to just User so we can access the User model
        where: { username },
    });

    // Handle invalid username
    if (!user) {
        return res.status(401).json({ message: 'Unable to Authenticate User' });
    }

    // Check password validity
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
        return res.status(401).json({ message: 'Invalid Password' });
    }

    // Generate JWT token
    const secretKey = process.env.JWT_SECRET_KEY || 'default_secret_key';
    const token = jwt.sign({ username: user.username, id: user.id }, secretKey, { expiresIn: '2h' });

    // Send token back to the client
    res.status(200).json({ token });  //last time it was res.json({ token }) so it was never sent to the client;
};

const router = Router();
router.post('/login', login);

export default router;
