const Post = require('../models/post');
const { createForm, transformPath } = require('../utlity/form')

const createPost = async (req, res) => {
    const form = createForm();
    form.parse(req, async(err, fields, files) => {
        try{
            const postData = {
                ...JSON.parse(fields.data),
                imgUrl: transformPath(files.img.path),
                author: req.user._id
            }
            const post = await new Post(postData).save();
            res.status(200).json(post);
        }catch(err){
            console.log(err.message);
            res.status(500).end(err.message)
        }
    })
}

const editPost = async (req, res) => {
    const form = createForm();
    form.parse(req, async(err, fields, files) => {
        try{
            const postId = req.params.id
            const post = await Post.findById(postId);
            if(req.user._id == post.author){
                const data = JSON.parse(fields.data);
                for(let key in data){
                    post[key] = data[key]
                }
                if(files.img){
                    post.imgUrl = transformPath(files.img.path)
                    //remove old photo
                }
                post.save();
                res.status(200).json(post);
            } else {
                throw new Error('Unauthorized')
            }
        }catch(err){
            console.log(err.message);
            res.status(500).end(err.message)
        }
    })
}

const getUserPosts = async(req, res) => {
    try{
        const author = req.params.userId;
        const posts = await Post
            .find({ author })
            .populate('author', { avatarUrl: 1, name: 1, surname: 1 });
        res.status(200).json({posts})
    } catch(err) {
        res.status(500).end(err.message)
    }
}

const postComment = async(req, res) => {
    try{
        const postId = req.params.postId;
        const post = await Post.findByIdAndUpdate(postId, {
            comment: 
        })
    }catch(err){
        console.log(err.message);
        res.status(500).json({message: err.message})
    }
}

const getPost = async (req, res) => {
    try{
        const post = await Post
            .findById(req.params.id)
            .populate('author', { avatarUrl: 1, name: 1, surname: 1 })
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
        const posts = await Post
            .find({})
            .populate('author', { avatarUrl: 1, name: 1, surname: 1 });
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
    getManyPosts,
    getUserPosts
};