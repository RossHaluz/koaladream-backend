const { CtrlWrapperr, HttpError } = require("../healpers");
const { BlogModel } = require("../modules/Blog");
const { UserModel } = require("../modules/User");

const setPost = async(req, res) => {
    const {path} = req.file;
    const {id} = req.userId;
    const {title, desc, img} = req.body;
    const newPost = await BlogModel.create({
        title: title,
        desc: desc,
        img: path
    });
    await UserModel.findByIdAndUpdate(id, {
        $push: {posts: newPost._id}
    }, {new: true})

    res.json(newPost);
}

const getPosts = async(req, res) => {
    const getAllPosts = await BlogModel.find();
    if(!getAllPosts){
        throw HttpError(404, "Posts not found");
    }

    res.json(getAllPosts);
}

module.exports = {
    setPost: CtrlWrapperr(setPost),
    getPosts: CtrlWrapperr(getPosts)
}