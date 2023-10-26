const {Schema, model, } = require('mongoose');
const Joi = require('joi');

const UserSchema = new Schema({
    userName: {
        type: String,
        require: true,
    },
    phone: {
        type: String,
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
    },
    posts: {
        type: [Schema.Types.ObjectId],
        ref: 'Blog'
    },
    orders: {
        type: [Schema.Types.ObjectId],
        ref: 'Order'
    }
})

const UserModel = model('user', UserSchema);

const schemaUserRegister = Joi.object({
    userName: Joi.string(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3),
    phone: Joi.string().min(10)
})

const schemaUserLogin = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3),
})

const schemaForgotPassword = Joi.object({
    email: Joi.string().email().required()
})

const schemaChangePassword = Joi.object({
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().min(3).required(),
})


module.exports = {
    UserModel,
    schemaUserRegister,
    schemaUserLogin,
    schemaForgotPassword,
    schemaChangePassword
}