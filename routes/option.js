const {
  createOption,
  getOptions,
  deleteOption,
  updateOption,
  getOption,
} = require("../controllers/option");
const { checkAuth, validateBody } = require("../middleware");
const { optionSchema } = require("../modules/Option");
const route = require("express").Router();

//Add new option
route.post("/add-option", validateBody(optionSchema), createOption);

//Get options
route.get("/get-options", getOptions);

//Delete option
route.delete("/delete-option/:optionId", deleteOption);

//Get option
route.get("/get-option/:optionId", getOption);

//Update option
route.put("/update-option/:optionId", updateOption);

module.exports = route;
