const { addItem } = require('../controllers/item');
const route = require('express').Router();

//Add item 
route.post('/add-item/:nameCategory', addItem);

module.exports = route;