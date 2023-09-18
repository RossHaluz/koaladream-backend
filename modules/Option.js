const {Schema, model} = require('mongoose');
const Joi = require('joi');

const OptionSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    optionValues: {
        type: Array,
        default: [],
        require: true,
    }
});

const OptionModel = model('option', OptionSchema);

const optionSchema = Joi.object({
    name: Joi.string().required(),
    optionValues: Joi.array().required()
})

module.exports = {
    OptionModel,
    optionSchema
}