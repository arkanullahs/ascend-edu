// middleware/auth.middleware.js

const jwt = require("jsonwebtoken");

const auth = (requiredRole) => {
    return (req, res, next) => {
        const token = req.header("x-auth-token");
        if (!token) return res.status(401).send("Access denied. No token provided.");

        try {
            const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
            req.user = decoded;

            if (requiredRole && req.user.role !== requiredRole) {
                return res.status(403).send("Access denied. Insufficient permissions.");
            }

            next();
        } catch (ex) {
            res.status(400).send("Invalid token.");
        }
    };
};

module.exports = auth;