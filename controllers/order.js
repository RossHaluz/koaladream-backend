const { CtrlWrapperr } = require('../healpers');
const { ItemModel } = require('../modules/Item');
const OrderModel = require('../modules/Order');


const addItem = async(req, res) => {
    const {itemId} = req.params;
    const addItem = OrderModel.create({
        ...req.body,
        $push: {items: itemId}
    });

    res.json(addItem);
}

module.exports = { 
    addItem: CtrlWrapperr(addItem)
}