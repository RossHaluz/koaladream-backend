const { setPost, getPosts } = require('../controllers/blog');
const { checkAuth, uploadAvatar } = require('../middleware');
const { validateBody } = require('../middleware/validateBody');
const { blogSchema } = require('../modules/Blog');
const route = require('express').Router();

//Add a post 
route.post('/set-post', checkAuth, validateBody(blogSchema), uploadAvatar.single('image'), setPost);

//Get all posts
route.get('/get-posts', getPosts); 

module.exports = route;