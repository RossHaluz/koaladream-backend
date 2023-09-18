const { HttpError, CtrlWrapperr } = require("../healpers");
const { FilterModel } = require("../modules/Filter");
const { ItemModel } = require("../modules/Item");
const { OptionModel } = require("../modules/Option");
const { CategoriesModel } = require("../modules/Сategories");
const pagination = require("../utils/pagination");

const addItem = async(req, res) => {
    const {categoryName} = req.body;
    const findCategory = await CategoriesModel.findOne({title: categoryName});
    if(!findCategory){
        throw HttpError(404, 'Category not found')
    }

    const newItem = await ItemModel.create({
       ...req.body,
       category: findCategory._id
    })

    res.json(newItem);

}

const getHitsItems = async (req, res) => {
    const getHitsItems = await ItemModel.find({hitSales: true}).limit(8);
    if(!getHitsItems){
        throw HttpError(404, 'Hits items not found');
    }

    res.json(getHitsItems);
}

const getCategoryItems = async(req, res) => {
    const {page: currentPage, limit: currentLimit} = req.query;
    const {page, limit, skip} = pagination(currentPage, currentLimit);
    const {category} = req.params;
    const findCategory = await CategoriesModel.findOne({title: category});
    if(!findCategory){ 
        throw HttpError(404, 'Category not found');
    }
    const getItems = await ItemModel.find({category: findCategory._id}, "", {skip, limit})
    const totalItems = await ItemModel.find({category: findCategory._id}).count();
    if(!getItems){
        throw HttpError(404, "Items not found")
    }

    res.json({
        getItems,
        meta: {
            page,
            limit,
            totalItems,
            totalPages: Math.ceil(totalItems / limit)
        }
    });

}

const getItemDetails = (req, res) => {
const {itemId} = req.params;

}

module.exports = {
    addItem: CtrlWrapperr(addItem),
    getHitsItems: CtrlWrapperr(getHitsItems),
    getCategoryItems: CtrlWrapperr(getCategoryItems),
    getItemDetails: CtrlWrapperr(getItemDetails)
}