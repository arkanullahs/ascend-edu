require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const port = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to mongo', err);
});

require('./configs/cors.config')(app);
require('./configs/middleware.config')(app);
require('./routes')(app);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

module.exports = app;
