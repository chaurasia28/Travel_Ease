import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    try {

        // hashing password
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)

        console.log('Request body:', req.body);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
            photo: req.body.photo,
        });

        // Log newUser object before saving
        console.log('New user object:', newUser);

        await newUser.save();

        res.status(200).json({ success: true, message: 'User registered successfully' });
    } catch (err) {
        console.error('Error during registration:', err); // Log detailed error
        res.status(500).json({ success: false, message: 'Internal server error. Try again' });
    }
};

// user login
export const login = async (req, res) => {

    const email = req.body.email

    try {

        const user = await User.findOne({ email })

        // if user doesn't exist
        if (!user) {
            return res.status(404).json({
                success: false, message: 'User not found'
            })
        }

        // if user exists then check the password or compare the password
        const checkCorrectPassword = await bcrypt.compare(req.body.password, user.password);

        // if password is incorrect
        if (!checkCorrectPassword) {
            return res
                .status(401)
                .json({ success: false, message: 'Incorrect password' });
        }
        
        const { password, role, ...rest } = user._doc
        
        // create jwt token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '15d' }
        );

        // set token in the browser cookies and send the response to the client
        res
            .cookie('accessToken', token, {
                httpOnly: true,
                expires: token.expiresIn
            })
            .status(200)
            .json({
                token,
                data: { ...rest },
                role,
            });
    } catch (err) { 
        res
            .status(500)
            .json({ success: false, message: 'Failed to login' });
    }
};
