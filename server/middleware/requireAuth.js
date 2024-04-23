const jwt = require("jsonwebtoken");
const User = require('../models/user.js');

const requireAuth = async (req, res, next) => {
    try {
        // Read token from cookies
        const token = req.cookies.Authorization;

        // Decode the token
        const decoded = jwt.verify(token, 'cfGg43x7z4G82z6UuT7R2Q5Hn8$cAeZvP');

        // Check expiration
        if (Date.now() > decoded.exp) return res.sendStatus(401);

        // Find the user using decoded sub
        const user = await User.findById(decoded.sub);
        if (!user) return res.sendStatus(401);

        // Attach user to req
        req.user = user;

        // Continue
        next();
    } catch (error) {
        console.error('Error in requireAuth middleware:', error);
        return res.sendStatus(401);
    }
};

module.exports = requireAuth;