const {Schema, model} = require('mongoose');

const OrderSchema = new Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    phone: {
        type: Number,
        require: true
    },
    email: {
        type: String
    },
    postalService: {
        type: String,
        require: true
    },
    address:{
        type: String,
    },
    city: {
        type: String,
    },
    department:{
        type: String
    },
    payment: {
        type: String,
        require: true
    },
    comment: {
        type: String,
    },
    items: { 
        type: [Object],
    },
    dateAdded: {
        type: Date
    },
    status: {
        type: String,
        default: 'Очікування',
        enum: ['В обробці менеджера', 'Замовлення оброблене', 'Очікування']
    },
    numberOrder: {
        type: Number,
    }
    
})

const OrderModel = model('order', OrderSchema);

module.exports = { 
    OrderModel
}