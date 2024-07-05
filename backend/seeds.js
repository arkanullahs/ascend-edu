const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { User } = require('./models/user.model');

mongoose.connect('mongodb+srv://arkanullahsaad:autopass@thinkbase.ltnfpgl.mongodb.net/test?retryWrites=true&w=majority&appName=ThinkBase');

User.collection.drop();

const users = [
    {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: bcrypt.hashSync('Password123!', 10)
    },
    {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        password: bcrypt.hashSync('Password123!', 10)
    },
    {
        firstName: 'Alice',
        lastName: 'Johnson',
        email: 'alice.johnson@example.com',
        password: bcrypt.hashSync('Password123!', 10)
    },
    {
        firstName: 'Bob',
        lastName: 'Brown',
        email: 'bob.brown@example.com',
        password: bcrypt.hashSync('Password123!', 10)
    }
];

User
    .create(users)
    .then(allUsersCreated => {
        console.log(`Created ${allUsersCreated.length} users`);
        mongoose.connection.close();
    })
    .catch(err => console.log('An error occurred', err));
