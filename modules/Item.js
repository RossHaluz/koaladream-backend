const {Schema, model} = require('mongoose');

const ItemSchema = new Schema({
    images: {
        type: Array,
        default: []
    },
    title: {
        type: String,
        require: true
    },
    status: {
        type: String,
        enum: ['В наявності', 'Немає в наявності'],
        require:  true,
    },
    article: {
        type: String,
        require: true
    },
    params: {
       type: Object,
       default: {}
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
    hitSales: {
        type: Boolean,
        default: false,
    },
    similarProducts: {
        type: Schema.Types.ObjectId
    },
    category: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: 'Categories'
    }
})

const ItemModel = model('item', ItemSchema);

module.exports = {
    ItemModel
}