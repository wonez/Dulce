const Post = require('../models/post');

const createPost = async (req, res) => {
    const { title } = req.body;
    const post = await new Post({
        title
    }).save();
    res.end(`Created: ${post.title}`)
}

const getPost = async (req, res) => {
    const id = req.params.id
    const post = await Post.findOne({ title: id });
    res.json(post)
}

const editPost = async (req, res) => {
    const id = req.params.id;
    const { title } = req.body;

    const post = await Post.findOne({ title: id});
    post.title = title 
    await post.save();
    res.end('Post edited')
}

const deletePost = async (req, res) => {
    const id = req.params.id;

    await Post.findOneAndDelete({ title: id });
    res.end('Post deleted')
}

const getManyPosts = async (req, res) => {
    const posts = await Post.find({});
    res.json(posts);
}

module.exports = {
    getPost,
    createPost,
    editPost,
    deletePost,
    getManyPosts
};