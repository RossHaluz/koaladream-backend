const { CtrlWrapperr, HttpError } = require("../healpers");
const { FilterModel } = require("../modules/Filter");


const createFilter = async(req, res) => {
const {name, filterValue} = req.body;
const newFilter = await FilterModel.create({
    name,
    filterValue
})

res.json(newFilter);
}

const getAllFilters = async(req, res) => {
const getFilters = await FilterModel.find();
if(!getFilters){
    throw HttpError(404, "Filters not found")
}

res.json(getFilters);
}

const getFilter = async (req, res) => {
const {filterName} = req.params;
const getFilter = await FilterModel.findOne({name: filterName});
if(!getFilter){
    throw HttpError(404, 'Filter not found');
}

res.json(getFilter);
}

module.exports = {
    createFilter: CtrlWrapperr(createFilter),
    getAllFilters: CtrlWrapperr(getAllFilters),
    getFilter: CtrlWrapperr(getFilter)
}