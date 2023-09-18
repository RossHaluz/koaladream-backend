const { createFilter, getAllFilters, getFilter } = require('../controllers/filter');
const { validateBody, checkAuth } = require('../middleware');
const { FilterModel, filterSchema } = require('../modules/Filter');
const route = require('express').Router();

//Create a ne filter
route.post('/add-filter', checkAuth, validateBody(filterSchema), createFilter);

//Get all filters 
route.get('/get-filters', getAllFilters);

//Get filter options
route.get('/get-filter/:filterName', getFilter);

module.exports = route;