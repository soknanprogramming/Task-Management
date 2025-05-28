// routes/usersRoute.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');
const { validateUser } = require('../validator/userValidator');

router.post('/register', validateUser, userController.registerUser);
router.post('/login', userController.loginUser) 
router.get('/', userController.checkLogin)

module.exports = router;