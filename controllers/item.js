const { HttpError, CtrlWrapperr } = require("../healpers");
const { ItemModel } = require("../modules/Item");
const { CategoriesModel } = require("../modules/Сategories");

const addItem = async(req, res) => {
const {nameCategory} = req.params;
const {path} = req.file;
const images = [];
images.push(path)
const findCategory = await CategoriesModel.findOne({title: nameCategory});
if(!findCategory){
    throw HttpError(404, "Category not found")
}

const createNewItem = await ItemModel.create({
    ...req.body,
    category: findCategory._id,
    images: images
})

res.json(createNewItem)
}

const getHitsItems = async (req, res) => {
    const getHitsItems = await ItemModel.find({hitSales: true}).limit(8);
    if(!getHitsItems){
        throw HttpError(404, 'Hits items not found');
    }

    res.json(getHitsItems);
}

module.exports = {
    addItem: CtrlWrapperr(addItem),
    getHitsItems: CtrlWrapperr(getHitsItems),
}