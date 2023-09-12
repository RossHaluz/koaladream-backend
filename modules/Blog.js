const {Schema, model} = require('mongoose');
const Joi = require('joi');

const BlogSchema = new Schema({
    title: {
        type: String,
        default: '',
        require: true
    },
    img: {
        type: String,
        default: '',
        require: true
    },
    desc: {
        type: String,
        default: '',
        require: true
    }
})

const BlogModel = model('blog', BlogSchema);

const blogSchema = Joi.object({
    title: Joi.string().required(),
    img: Joi.string().required(),
    desc: Joi.string().required()
})

module.exports = {
    BlogModel,
    blogSchema
}