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
const {filterId} = req.params;
const getFilter = await FilterModel.findOne({_id: filterId});
if(!getFilter){
    throw HttpError(404, 'Filter not found');
}

const filters = await FilterModel.find();

res.json({
    getFilter,
    filters
});
}

const deleteFilter = async(req, res) => {
    const {filterId} = req.params;
    const item = await FilterModel.findByIdAndDelete(filterId);
    if(!item){
        throw HttpError(404, 'Item not found')
    }

    res.json({
        item,
        message: 'Iteme success delete'
    })
}

const updateFilter = async(req, res) => {
    const {filterId} = req.params;
    const item = await FilterModel.findByIdAndUpdate(filterId, {...req.body}, {new: true});
    if(!item){
        throw HttpError(404, 'Item not found')
    }

    res.json(item);
}


module.exports = {
    createFilter: CtrlWrapperr(createFilter),
    getAllFilters: CtrlWrapperr(getAllFilters),
    getFilter: CtrlWrapperr(getFilter),
    deleteFilter: CtrlWrapperr(deleteFilter),
    updateFilter: CtrlWrapperr(updateFilter)
}