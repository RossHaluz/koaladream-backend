const { createNewCategory, getCategories } = require('../controllers/category');
const { uploadAvatar } = require('../middleware');
const { validateBody } = require('../middleware/validateBody');
const { categoriesSchema } = require('../modules/Сategories');
const route = require('express').Router();


//Add categories
route.post('/create-category', validateBody(categoriesSchema), uploadAvatar.single('image'), createNewCategory);

//Get categories
route.get('/get-categories', getCategories);

module.exports = route;