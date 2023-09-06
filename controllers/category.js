const { HttpError, CtrlWrapperr } = require("../healpers");
const { CategoriesModel } = require("../modules/Сategories");


const createNewCategory = async (req, res) => {
    const {path} = req.file;

    const createNewCategory = await CategoriesModel.create({
        ...req.body,
        img: path
    })

    res.json(createNewCategory)
}

const getCategories = async (req, res) => {
    const categories = await CategoriesModel.find();
    if(!categories){
        HttpError(404, 'Categories not found');
    }

    res.json(categories);
}

module.exports = {
    createNewCategory: CtrlWrapperr(createNewCategory),
    getCategories: CtrlWrapperr(getCategories),
}