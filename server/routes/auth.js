const express = require('express');
const router = express.router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const redisClient = require('../config/redis');

//User Registration
router.post('/register', async (req, res) => {
    try {
        const {username, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            username,
            password: hashedPassword
        });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

//User Login
router.post("/login", async (req, res) => {
    try {
        const [username, password] = req.body;
        const user = await User.findOne({username});
        if(!user) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }
        const passwordMatch = bcrypt.compare(password, user.password);
        if(passwordMatch){
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ token });
        }else{
            res.status(400).json({ error: 'Invalid username or password' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

//Logout
router.delete("/logout", async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if(!token){
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const decodedToken = jwt.decode(token);
        if(!decodedToken || !decodedToken.exp){
            return res.status(400).json({ error: 'Invalid token' });
        }

        const expirationTime = decodedToken.exp;
        const currentTime = Math.floor(Date.now() / 1000);

        const timeToExpire = expirationTime - currentTime;
        if(timeToExpire > 0){
            await redisClient.set(token, 'blacklisted', {
                'EX' : timeToExpire
            });
        }

        res.status(200).send('Logged out successfully');
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

module.exports = router;