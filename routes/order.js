const { createNewOrder, getOrders, deleteOrder, updateOrder, getOrder, getOrdersUser } = require('../controllers/order');
const { checkAuth } = require('../middleware/checkAuth');
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

//Get orders for current user
route.get('/orders-user', checkAuth, getOrdersUser); 

module.exports = route;