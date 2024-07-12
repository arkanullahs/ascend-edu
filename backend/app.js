require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const userRoutes = require("./routes/users.routes");
const authRoutes = require("./routes/auth");
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

//routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

module.exports = app;
