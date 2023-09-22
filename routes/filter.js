const {
  createFilter,
  getAllFilters,
  deleteFilter, 
  getFilter,
  updateFilter
} = require("../controllers/filter");
const { validateBody, checkAuth } = require("../middleware");
const { FilterModel, filterSchema } = require("../modules/Filter");
const route = require("express").Router();

//Create a new filter
route.post("/add-filter", validateBody(filterSchema), createFilter);

//Get all filters
route.get("/get-filters", getAllFilters);

//Delete filter
route.delete('/delete-filter/:filterId', deleteFilter);

//Get filter
route.get('/get-filter/:filterId', getFilter);

//Update filter 
route.put('/update-filter/:filterId', updateFilter);


module.exports = route;
