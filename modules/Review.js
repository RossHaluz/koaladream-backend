const {Schema, model} = require('mongoose');

const ReviewsSchema = new Schema({
    name:  {
        type: String,
        require: true,
    }, 
    email: {
        type: String,
        require: true,
    },
    rating: {
        type: Number, 
        require: true,
    }, 
    review: {
        type: String,
        require: true
    }, 
    images: { 
        type: [String],
        default: []
    },
    dateAdded: {
        type: String,
        require: true
    }
})

const ReviewsModel = model('review', ReviewsSchema);

module.exports = {
    ReviewsModel
}