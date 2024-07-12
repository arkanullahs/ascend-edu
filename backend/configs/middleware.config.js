// configs/middleware.config.js

const bodyParser = require('body-parser');
const cors = require('cors');
const auth = require('../middleware/auth.middleware');

module.exports = app => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cors());

    // Add the auth middleware to the app
    app.use((req, res, next) => {
        req.auth = auth;
        next();
    });
};