const {Schema, model} = require('mongoose');

const ItemSchema = new Schema({
    images: {
        type: []
    },
    title: {
        type: String,
        require: true
    },
    status: {
        type: String,
        enum: ['В наявності', 'Немає в наявності'],
        require:  true
    },
    size: {
        type: String, 
        require: true
    },
    article: {
        type: String,
        require: true
    },
    price: {
        type: String,
        require: true,
    },
    oldPrice: {
        type: String
    },
    desc: {
        type: String,
    },
    characteristics: {
        type: String
    },
    care: {
        type: String
    },

})