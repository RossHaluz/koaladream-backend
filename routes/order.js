const { addItem } = require('../controllers/order');
const route = require('express').Router();

route.post('/add-item/:itemId', addItem);



module.exports = route;