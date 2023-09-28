const { Schema, model } = require("mongoose");
const Joi = require("joi");

const ItemSchema = new Schema({
  images: {
    type: String,
    default: ''
  },
  categoryName: {
    type: String,
    require: true,
  },
  options: {
    type: [Object],
    default: [],
  },
  title: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    enum: ["В наявності", 'Закінчується', "Немає в наявності"],
    default: "В наявності",
    require: true,
  },
  article: {
    type: String,
    require: true,
  },
  filters: {
    type: [Object],
    default: [],
  },
  price: {
    type: String,
    require: true,
  },
  oldPrice: {
    type: String,
  },
  desc: {
    type: String,
  },
  characteristics: {
    type: [Object],
    default: [],
  },
  care: {
    type: String,
  },
  hitSales: {
    type: Boolean,
    default: false,
  },
  category: {
    type: Schema.Types.ObjectId,
    require: true,
    ref: "Categories",
  },
});

const ItemModel = model("item", ItemSchema);

const itemSchema = Joi.object({
  title: Joi.string().required(),
  images: Joi.string(),
  categoryName: Joi.string().required(),
  status: Joi.string().required(),
  options: Joi.array().items(Joi.object()),
  filters: Joi.array().items(Joi.object()),
  article: Joi.string().required(),
  cloth: Joi.string(),
  price: Joi.string().required(),
  oldPrice: Joi.string(),
  desc: Joi.string(),
  characteristics: Joi.array().items(
    Joi.object().keys({
      name: Joi.string(),
      text: Joi.string(),
    })
  ),
  care: Joi.string(),
  hitSales: Joi.boolean(),
});

module.exports = {
  ItemModel,
  itemSchema,
};
