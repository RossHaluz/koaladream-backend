const { addItem, getHitsItems } = require('../controllers/item');
const { uploadAvatar } = require('../middleware/upload');
const route = require('express').Router();

//Add item 
route.post('/add-item/:nameCategory', uploadAvatar.single('imageItem'), addItem);

//Get hits itams
route.get('/get-hitsItems', getHitsItems);

module.exports = route;