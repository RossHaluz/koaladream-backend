const {Schema, model, } = require('mongoose');
const Joi = require('joi');

const UserSchema = new Schema({
    userName: {
        type: String,
        require: true,
    },
    phone: {
        type: Number,
        min: 10
    },
    password: {
        type: String,
        min: 3,
        require: true
    },
    birthdayDay: {
        type: String
    }, 
    email: {
        type: String,
        unique: true,
        require: true
    },
    avatar: {
        type: String,
        default: ''
    },
    token: {
        type: String,
        default: ''
    }
})

const UserModel = model('user', UserSchema);

const schemaUserRegister = Joi.object({
    userName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3),
    passwordConfirmation: Joi.any().equal(Joi.ref('password')).required().label('Confirm password').messages({ 'any.only': '{{#label}} does not match' })
})

const schemaUserLogin = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3),
})

const schemaForgotPassword = Joi.object({
    email: Joi.string().email().required()
})

const schemaChangePassword = Joi.object({
    password: Joi.string().min(3).required(),
    password_confirm: Joi.any().equal(Joi.ref('password')).required().label('Confirm password').messages({ 'any.only': '{{#label}} does not match' })
})


module.exports = {
    UserModel,
    schemaUserRegister,
    schemaUserLogin,
    schemaForgotPassword,
    schemaChangePassword
}