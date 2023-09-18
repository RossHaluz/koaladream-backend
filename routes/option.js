const { createOption, getOptions, getOptionValues } = require('../controllers/option');
const { checkAuth, validateBody } = require('../middleware');
const { optionSchema } = require('../modules/Option');
const route = require('express').Router();

//Add new option
route.post('/add-option', checkAuth, validateBody(optionSchema), createOption);

//Get options
route.get('/get-options', getOptions);

//Get option values
route.get('/get-optionValues/:nameOption', getOptionValues);

module.exports = route;