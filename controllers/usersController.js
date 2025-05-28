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

exports.loginUser = async (req, res) => {
    try{
        const { username, password} = req.body;
        const checkUser = await usersModel.User.findOne({username: username, password: password});
        if(!checkUser) return res.status(400).json({message: "username or password has wrong"});
        if(checkUser){
            req.session.user = {id: checkUser._id, username: checkUser.username};
            res.status(201).json({message: `Welcome ${checkUser.username}`});
        }
    }
    catch(error){
        res.status(404).json({error: "Login is error"});
        console.log("Login error", error);
    }
}

exports.checkLogin = async (req, res) => {
    if (!req.session.user) return res.status(401).send('Please login.');
    res.status(200).send(`Hello ${req.session.user.username}, your have login.`);
}