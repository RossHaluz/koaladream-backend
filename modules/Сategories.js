const {Schema, model} = require('mongoose');
const Joi = require('joi');

const CategoriesSchema = new Schema({
    title: {
        type: String,
        default: '',
    },
    img: {
        type: String,
        default: '',
    },
})

const CategoriesModel = model('category', CategoriesSchema);

const categoriesSchema = Joi.object({
    title: Joi.string(),
    img: Joi.string()
})

module.exports = {
    CategoriesModel,
    categoriesSchema
}