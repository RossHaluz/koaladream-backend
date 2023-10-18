const { CtrlWrapperr, HttpError } = require('../healpers');
const { OrderModel } = require('../modules/Order');

const createNewOrder = async (req, res) => {
    const order = await OrderModel.create({
        ...req.body,
    })

    res.json(order)
}

const getOrders = async(req, res) => {
    const orders = await OrderModel.find();

    res.json(orders)
}

const deleteOrder = async (req, res) => {
    const {orderId} = req.params;
    const order = await OrderModel.findByIdAndDelete(orderId);
    if(!order){
        throw HttpError(404, 'Order not found');
    }

    res.json(order);
}

const updateOrder = async (req, res) => {
    const {orderId} = req.params;
    const order = await OrderModel.findByIdAndUpdate(orderId, {...req.body}, {new: true});

    res.json(order);
}

const getOrder = async (req, res) => {
    const {orderId} = req.params;
    const order = await OrderModel.findById(orderId);

    if(!order){
        throw HttpError(404, 'Order not found')
    }

    res.json(order)
}


module.exports = { 
    createNewOrder: CtrlWrapperr(createNewOrder),
    getOrders: CtrlWrapperr(getOrders),
    deleteOrder: CtrlWrapperr(deleteOrder),
    updateOrder: CtrlWrapperr(updateOrder),
    getOrder: CtrlWrapperr(getOrder)
}