const mongoose = require('mongoose');

const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

mongoose
    .connect(process.env.MONGO_URI, mongoOptions)
    .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
    .catch(err => console.error('Error connecting to mongo', err));

module.exports = mongoose;
