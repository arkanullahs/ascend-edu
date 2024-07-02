const mongoose = require('mongoose')
const jwt = require("jsonwebtoken")
const Joi = require("Joi")
const passwordComplexity = require("joi-password-complexity")
const Schema = mongoose.Schema

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        unique: true
    },
    lastName: {
        type: String,
        required: true,
        unique: true
    },
    /*username: {
        type: String,
        required: true,
        unique: true
    },*/
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    /*role: {
        type: String,
        enum: ['Student', 'Teacher', 'Admin'],
        default: 'Student'
    },
    imageUrl: {
        type: String,
        default: 'https://www.cmcaindia.org/wp-content/uploads/2015/11/default-profile-picture-gmail-2.png'
    },*/
    /*favCourses: [{
        type: Schema.Types.ObjectId,
        ref: 'Course'
    }],
    favTeachers: [{
        type: Schema.Types.ObjectId,
        ref: 'Teacher'
    }]*/

}, /*{ timestamps: true }*/)

const User = mongoose.model('User', userSchema)
const validate = (data) => {
    const schema=Joi.object({
        firstName: Joi.string().required().label("First Name"),
        lastName: Joi.string().required().label("Last Name"),
        email: Joi.string().email.required().label("Email"),
        password: passwordComplexity().required().label("Password")
    });
    return schema.validate(data)
}

userSchema.methods.generateAuthToken =function (){
    const token=jwt.sign({_id:this_id},process.env.JWTPRIVATEKEY,{expiresIn:"7d"})
    return token
};

module.exports = {User,validate}