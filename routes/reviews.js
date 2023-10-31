const { createReviws, getAllReviewsUser, getReviewsItem } = require('../controllers/reviews');
const { uploadAvatar, checkAuth } = require('../middleware');
const route = require('express').Router();

//Create new review
route.post('/create-review/:itemId', checkAuth, uploadAvatar.array('images'), createReviws);

//Get reviews for current item
route.get('/reviews-item/:itemId', getReviewsItem);

//Get all reviews for current user
route.get('/get-reviews', checkAuth, getAllReviewsUser); 

module.exports = route