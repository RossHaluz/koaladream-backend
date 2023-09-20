const { Schema, model } = require("mongoose");
const Joi = require("joi");

const FilterSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  filterValue: {
    type: [Object],
    default: [],
    require: true,
  },
});

const FilterModel = model("filter", FilterSchema);

const filterSchema = Joi.object({
  name: Joi.string().required(),
  filterValue: Joi.array()
    .items(Joi.object().keys({ name: Joi.string() }))
    .required(),
});

module.exports = {
  FilterModel,
  filterSchema,
};
