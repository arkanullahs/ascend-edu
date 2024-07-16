const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) {
        console.log('Access denied. No token provided.');
        return res.status(401).send('Access denied. No token provided.');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
        req.user = decoded;
        console.log('Decoded user:', decoded);
        next();
    } catch (ex) {
        console.log('Invalid token:', ex.message);
        res.status(400).send('Invalid token.');
    }
};
