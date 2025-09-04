const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const BlacklistedToken = require('../models/blacklistedToken');
const axios = require('axios');

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
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ token });
        } else {
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

        const expiresAt = new Date(decodedToken.exp * 1000);

        await BlacklistedToken.create({ token, expiresAt });

        res.status(200).send('Logged out successfully');
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GitHub OAuth callback
router.get('/github/callback', async (req, res) => {
    try {
        const { code } = req.query;
        
        if (!code) {
            return res.status(400).json({ error: 'Authorization code not provided' });
        }

        // Exchange code for access token
        const tokenResponse = await axios.post('https://github.com/login/oauth/access_token', {
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code: code
        }, {
            headers: {
                'Accept': 'application/json'
            }
        });

        const accessToken = tokenResponse.data.access_token;

        if (!accessToken) {
            return res.status(400).json({ error: 'Failed to get access token' });
        }

        // Get user info from GitHub
        const userResponse = await axios.get('https://api.github.com/user', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        const gitokhubUser = userResponse.data;

        // Get user's email (might be private)
        const emailResponse = await axios.get('https://api.github.com/user/emails', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        
        const primaryEmail = emailResponse.data.find(email => email.primary)?.email || githubUser.email;

        // Check if user exists in database
        let user = await User.findOne({ 
            $or: [
                { githubId: githubUser.id.toString() },
                { email: primaryEmail }
            ]
        });

        if (!user) {
            // Create new user
            user = new User({
                username: githubUser.login,
                email: primaryEmail,
                githubId: githubUser.id.toString(),
                avatar: githubUser.avatar_url,
                // No password needed for OAuth users
                password: null
            });
            await user.save();
        } else {
            // Update existing user with GitHub info if needed
            if (!user.githubId) {
                user.githubId = githubUser.id.toString();
                user.avatar = githubUser.avatar_url;
                await user.save();
            }
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Redirect to frontend with token
        res.redirect(`http://localhost:5173/auth/callback?token=${token}`);

    } catch (error) {
        console.error('GitHub OAuth error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;