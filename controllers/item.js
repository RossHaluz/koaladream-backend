const { HttpError, CtrlWrapperr } = require("../healpers");
const { ItemModel } = require("../modules/Item");
const { CategoriesModel } = require("../modules/Сategories");

const addItem = async(req, res) => {
const {nameCategory} = req.params;
const findCategory = await CategoriesModel.findOne({title: nameCategory});
if(!findCategory){
    throw HttpError(404, "Category not found")
}
const createNewItem = await ItemModel.create({
    ...req.body,
    category: findCategory._id
})

res.json(createNewItem)
}

module.exports = {
    addItem: CtrlWrapperr(addItem)
}