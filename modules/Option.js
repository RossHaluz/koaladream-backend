const { Schema, model } = require("mongoose");
const Joi = require("joi");

const OptionSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  optionValues: {
    type: [Object],
    default: [],
    require: true,
  },
});

const OptionModel = model("option", OptionSchema);

const optionSchema = Joi.object({
  name: Joi.string().required(),
  optionValues: Joi.array()
    .items(Joi.object().keys({ name: Joi.string() }))
    .required(),
});

module.exports = {
  OptionModel,
  optionSchema,
};
