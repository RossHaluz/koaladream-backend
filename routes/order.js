const { createNewOrder, getOrders, deleteOrder, updateOrder, getOrder } = require('../controllers/order');
const route = require('express').Router();

//Create new order
route.post('/create-order', createNewOrder);

//Get all orders
route.get('/get-orders', getOrders);

//Delete order 
route.delete('/delete-order/:orderId', deleteOrder);

//Update order
route.put('/update-order/:orderId', updateOrder);

//Get order 
route.get('/get-order/:orderId', getOrder);

module.exports = route;