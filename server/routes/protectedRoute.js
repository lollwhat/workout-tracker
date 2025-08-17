const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
console.log(typeof verifyToken); // Check if verifyToken is a function
const { verify } = require('jsonwebtoken');

router.get('/', verifyToken, (req, res) => {
    res.status(200).json({ message: 'Protected route accessed', userId: req.userId });
});

module.exports = router;