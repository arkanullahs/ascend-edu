const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['student', 'teacher'],
        default: 'student'
    }
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, role: this.role }, process.env.JWTPRIVATEKEY, { expiresIn: "7d" });
    return token;
};

const User = mongoose.model('User', userSchema);

const validate = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().required().label("First Name"),
        lastName: Joi.string().required().label("Last Name"),
        email: Joi.string().email().required().label("Email"),
        password: passwordComplexity().required().label("Password"),
        role: Joi.string().valid('student', 'teacher').default('student').label("Role")
    });
    return schema.validate(data);
};

module.exports = { User, validate };