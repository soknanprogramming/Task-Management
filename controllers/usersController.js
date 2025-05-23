// controllers/usersController.js
const usersModel = require('../models/usersModel');

exports.registerUser = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        // Check if the user already exists
        const existingUser = await usersModel.User.findOne({ username : username });
        const existingEmail = await usersModel.User.findOne({ email : email });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }
        else if (existingEmail) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        // Create a new user
        const newUser = new usersModel.User({
            username,
            password,
            email,
        });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}