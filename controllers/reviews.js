const { CtrlWrapperr, HttpError } = require("../healpers");
const { ItemModel } = require("../modules/Item");
const { ReviewsModel } = require("../modules/Review");
const { UserModel } = require("../modules/User");

const createReviws = async (req, res) => {
    const {email} = req.body;
    const {itemId} = req.params;
    const user = await UserModel.findOne({email});
    const item = await ItemModel.findOne({_id: itemId});

    if(req.files){
        const imgArray = [];
        req.files.map(item => imgArray.push(item.path));
        const createReviewWithImg = await ReviewsModel.create({
            ...req.body, 
            images: imgArray
        })
        if(!createReviewWithImg) {
            throw HttpError(400, 'Something is wrong...')
        }
        await UserModel.findByIdAndUpdate(user._id, {
            $push: {reviews: createReviewWithImg._id}
        })

        await ItemModel.findByIdAndUpdate(item._id, {
            $push: {reviews: createReviewWithImg._id}
        })

        return res.json(createReviewWithImg);
    }

    const createReview = await ReviewsModel.create({
        ...req.body
    });

    await UserModel.findByIdAndUpdate(user._id, {
        $push: {reviews: createReview._id}
    })

    await ItemModel.findByIdAndUpdate(item._id, {
        $push: {reviews: createReview._id}
    })

    res.json(createReview);
}

const getAllReviewsUser  = async(req, res) => {
    const {id} = req.userId;
    const user = await UserModel.findById(id);
    if(!user){
        throw HttpError(404, 'User not found');
    }

    const reviews = await Promise.all(
        user?.reviews?.map(item => {
            return ReviewsModel.findOne({_id: item})
        })
    )

    if(!reviews){ 
        throw HttpError(404, 'Reviews not found'); 
    }

    res.json(reviews);
}

const getReviewsItem = async(req, res) => {
    const {itemId} = req.params;
    const item = await ItemModel.findOne({_id: itemId});
    if(!item){
        throw HttpError(404, 'Item not found')
    }
    
    const reviews = await Promise.all(
        item?.reviews?.map(item => {
            return ReviewsModel.findOne({_id: item});
        })
    )

    res.json(reviews);
}

module.exports = {
    createReviws: CtrlWrapperr(createReviws),
    getAllReviewsUser: CtrlWrapperr(getAllReviewsUser),
    getReviewsItem: CtrlWrapperr(getReviewsItem)
}