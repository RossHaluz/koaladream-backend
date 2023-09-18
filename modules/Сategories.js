const {Schema, model} = require('mongoose');
const Joi = require('joi');

const CategoriesSchema = new Schema({
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
})

const CategoriesModel = model('category', CategoriesSchema);

const categoriesSchema = Joi.object({
    title: Joi.string().required(),
    img: Joi.string().required()
})

module.exports = {
    CategoriesModel,
    categoriesSchema
}