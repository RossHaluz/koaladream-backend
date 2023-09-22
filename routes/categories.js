const { createNewCategory, getCategories, getAllCategories, deleteCategory, getCategory, updateCategory } = require('../controllers/category');
const { uploadAvatar } = require('../middleware');
const { validateBody } = require('../middleware/validateBody');
const { categoriesSchema } = require('../modules/Сategories');
const route = require('express').Router();


//Add categories
route.post('/create-category', uploadAvatar.single('categoryImg'), createNewCategory);
// validateBody(categoriesSchema)

//Get categories
route.get('/get-categories', getCategories);

//Get all categories
route.get('/all-categories', getAllCategories);

//Delete category 
route.delete('/delete-category/:categoryId', deleteCategory);

//Get category
route.get('/get-category/:categoryId', getCategory);

//Update category 
route.put('/update-category/:categoryId', uploadAvatar.single('updateImg'), updateCategory);

module.exports = route;