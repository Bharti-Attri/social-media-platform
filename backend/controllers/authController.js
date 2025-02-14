import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const register = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({username});
    if (user) {
        res.status(401).json({ message: 'User already exist' })
    } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET,{ expiresIn: '1h' });
        res.json({token, message: 'User registered' });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET,{ expiresIn: '1h' });
        res.json({ token, message:'login success' });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
};
export {register,login};