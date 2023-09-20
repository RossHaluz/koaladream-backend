const { Schema, model } = require("mongoose");
const Joi = require("joi");

const AdminAuthSchema = new Schema({
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  token: {
    type: String,
    default: "",
  },
});

const adminAuthSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const AdminAuthModel = model("adminAuth", AdminAuthSchema);

module.exports = {
  AdminAuthModel,
  adminAuthSchema,
};
