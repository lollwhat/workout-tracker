const jwt = require('jsonwebtoken');
const BlacklistedToken = require('../models/blacklistedToken');

async function verifyToken(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const isBlackListed = await BlacklistedToken.findOne({ token });
    if (isBlackListed) {
        return res.status(403).send('Token is blacklisted');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
}
console.log(typeof verifyToken);

module.exports = verifyToken;