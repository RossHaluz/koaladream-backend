const {Schema, model} = require('mongoose');

const OrderSchema = new Schema({
    firstname: {
        type: String,
        require: true
    },
    surname: {
        type: String,
        require: true
    },
    phone: {
        type: Number,
        require: true
    },
    payment: {
        type: String,
        require: true
    },
    delivery: {
        type: String,
        require: true
    },
    comment: {
        type: String,
    },
    items: { 
        type: [Schema.Types.ObjectId],
        ref: 'Item'
    }
})

const OrderModel = model('order', OrderSchema);

exports.model = { 
    OrderModel
}