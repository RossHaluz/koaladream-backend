const { Schema, model } = require("mongoose");
const Joi = require("joi");

const ItemSchema = new Schema({
  images: {
    type: [String],
    default: [],
  },
  categoryName: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    enum: ["В наявності", "Немає в наявності"],
    default: "В наявності",
    require: true,
  },
  article: {
    type: String,
    require: true,
  },
  filters: {
    type: [String],
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
  images: Joi.array().items(Joi.string()),
  categoryName: Joi.string().required(),
  status: Joi.string().required(),
  filters: Joi.array().items(Joi.string()),
  article: Joi.string().required(),
  size: Joi.array().items(Joi.string()),
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
