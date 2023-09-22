const {Schema, model} = require('mongoose');
const Joi = require('joi');

const CategoriesSchema = new Schema({
    title: {
        type: String,
        default: '',
        require: true
    },
    desc: {
        type: String,
    },
    image: {
        type: String,
        default: '',
        require: true
    },
})

const CategoriesModel = model('category', CategoriesSchema);

const categoriesSchema = Joi.object({
    title: Joi.string().required(),
    desc: Joi.string(),
    image: Joi.string().required()
})

module.exports = {
    CategoriesModel,
    categoriesSchema
}