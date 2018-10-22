const Post = require('../models/post');

const createPost = async (req, res) => {
    try{
        const post = await new Post({ ...req.body })
            .save();
        res.status(200).json(post);
    }catch(err){
        res.status(500).end(err.message)
    }
}

const editPost = async (req, res) => {
    try{
        const post = await Post.findOneByIdAndUpdate(req.params.id,{
            ...req.body
        });
        res.status(200).json(post)
    }catch(err){
        res.status(500).end(err.message)
    }
}

const getPost = async (req, res) => {
    try{
        const post = await Post.findById(req.params.id)
        res.status(200).json(post);
    }catch(err){
        res.status(500).end(err.message)
    }
}

const deletePost = async (req, res) => {
    try{
        await Post.findOneAndDelete(req.params.id)
        res.status(200).end('Post deleted');
    }catch(err){
        res.status(500).end(err.message)
    }
}

const getManyPosts = async (req, res) => {
    try{
        const posts = await Post.find({})
        res.status(200).json(posts);
    }catch(err){
        res.status(500).end(err.message)
    }
}

module.exports = {
    getPost,
    createPost,
    editPost,
    deletePost,
    getManyPosts
};