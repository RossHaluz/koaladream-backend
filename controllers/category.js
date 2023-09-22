const { HttpError, CtrlWrapperr } = require("../healpers");
const { CategoriesModel } = require("../modules/Сategories");


const createNewCategory = async(req, res) => {
const {path} = req.file;

    const createNewCategory = await CategoriesModel.create({
        ...req.body,
        image: path
    })

    res.json(createNewCategory)
}

const getCategories = async (req, res) => {
    const categories = await CategoriesModel.find().limit(4);
    if(!categories){
        HttpError(404, 'Categories not found');
    }

    res.json(categories);
}

const getAllCategories = async(req, res) => {
    const categories = await CategoriesModel.find();
    if(!categories){
        throw HttpError(404, 'Categories not found');
    }

    res.json(categories);
}

const deleteCategory = async(req, res) => {
    const {categoryId} = req.params;
    const category = await CategoriesModel.findByIdAndDelete(categoryId);
    if(!category){
        throw HttpError(400, 'Category not delete')
    }

    res.json({
        category,
        message: 'Category success delete'
    })
}

const getCategory = async(req, res) => {
    const {categoryId} = req.params;

    const category = await CategoriesModel.findById(categoryId);
    if(!category){
        throw HttpError(404, 'Category not found');
    }

    const categories = await CategoriesModel.find();

    res.json({
        category,
        categories
    });
}

const updateCategory = async(req, res) => {
    const {categoryId} = req.params;
    
    if(req.file){
      const {path} = req.file;
      const categoryWhithImg = await CategoriesModel.findByIdAndUpdate(categoryId, {
        ...req.body,
        image: path,
      }, {new: true})

      return res.json(categoryWhithImg)
    }
    const category = await CategoriesModel.findByIdAndUpdate(categoryId, {...req.body}, {new: true});
    if(!category){
        throw HttpError(404, 'Category not found ')
    }

    res.json(category)
}

module.exports = {
    createNewCategory: CtrlWrapperr(createNewCategory),
    getCategories: CtrlWrapperr(getCategories),
    getAllCategories: CtrlWrapperr(getAllCategories),
    deleteCategory: CtrlWrapperr(deleteCategory),
    getCategory: CtrlWrapperr(getCategory),
    updateCategory: CtrlWrapperr(updateCategory)
}