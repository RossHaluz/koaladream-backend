const {Schema, model} = require('mongoose');
const Joi = require('joi');

const FilterSchema = new Schema({
    name: {
        type: String,
        require: true 
    }, 
    filterValue: {
        type: Array, 
        default: [],
        require: true
    }
})

const FilterModel = model('filter', FilterSchema);

const filterSchema = Joi.object({
    name: Joi.string().required(),
    filterValue: Joi.array().required()
})

module.exports = {
    FilterModel,
    filterSchema
}
