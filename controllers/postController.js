const Post = require('../models/post');
const Comment = require('../models/comment');
const { createForm, transformPath } = require('../utlity/form')
const fs = require('fs');

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
            if(req.user._id.toString() == post.author){
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
        const start = +req.query.start; 
        
        const count = await Post.find({author}).count();
        const posts = await Post
            .find({ author })
            .skip(start)
            .limit(10)
            .sort({ dateCreated: -1 })
            .populate('author', { avatarUrl: 1, name: 1, surname: 1 });
        res.status(200).json({posts, count})
    } catch(err) {
        res.status(500).end(err.message)
    }
}

const postComment = async(req, res) => {
    try{
        const postId = req.params.postId;
        const comment = await new Comment({
            text: req.body.text,
            author: req.user._id,
            postId
        }).save();
        await Post.findByIdAndUpdate(postId, {
            $push: { comments: comment._id }
        });
        const post = await Post
            .findById(postId)
            .populate({
                path: 'comments',
                select: 'text author dateCreated',
                populate: {
                    path: 'author',
                    select: 'avatarUrl name surname'
                }
            })
            .populate({
                path: 'author',
                select: 'avatarUrl name surname'
            });
        res.status(200).json({
            comments: post.comments
        })
    }catch(err){
        console.log(err.message);
        res.status(500).json({message: err.message})
    }
}

const postLike = async(req, res) => {
    try{
        const postId = req.params.postId;
        const post = await Post.findById(postId);
        const index = post.likes.indexOf(req.user._id);
        if(index != -1){
            post.likes.splice(index, 1);
        }else{
            post.likes.push(req.user._id);
        }
        post.save();
        res.status(200).json({likes: post.likes});
    } catch(err) {
        console.log(err.message);
        res.status(500).end(err.message)
    }
}

const getPost = async (req, res) => {
    try{
        const post = await Post
            .findById(req.params.id)
            .populate({
                path: 'comments',
                select: 'text author dateCreated',
                populate: {
                    path: 'author',
                    select: 'avatarUrl name surname'
                }
            })
            .populate({
                path: 'author',
                select: 'avatarUrl name surname'
            });
        res.status(200).json(post);
    }catch(err){
        res.status(500).end(err.message)
    }
}

const deletePost = async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        if(req.user._id.toString() == post.author){
            const { imgUrl, comments } = post;
            const imgPath = imgUrl.substring(imgUrl.indexOf('images'))
            fs.unlinkSync(`public/${imgPath}`);
            for(let comment of comments){
                await Comment.findByIdAndRemove(comment);
            }
            await Post.findByIdAndRemove(req.params.id)
            res.status(200).json({message: 'Post deleted'});
        }else{
            throw new Error('Unothorized')
        }
    }catch(err){
        console.log(err.message)
        res.status(500).json({messageer: err.message})
    }
}

const getNewsFeed = async (req, res) => {
    try{
        const start = +req.query.start;
        const count = await Post.aggregate([
            { $match: {$or: [{ author: req.user._id }, { author: { $in: req.user.following }}]}},
            { $count: "posts" }
        ]);
        const posts = await Post
        .find({
            $or: [{ author: req.user._id }, { author: { $in: req.user.following }}]
        })
        .skip(start)
        .limit(10)
        .sort({ dateCreated: -1 })
        .populate('author', { avatarUrl: 1, name: 1, surname: 1 })
        res.status(200).json({posts, count: count[0].posts});
    }catch(err){
        res.status(500).end(err.message)
    }
}

const deleteComment = async(req, res) => {
    try{
        const { postId, commentId } = req.params;
        await Post.findByIdAndUpdate(postId, {
            $pull: { comments: commentId }
        })
        await Comment.findByIdAndRemove(commentId);
        res.status(200).json({message: 'Comment deleted'})
    }catch(err){
        console.log(err.message);
        res.status(500).end(err.message)
    }
}

const editComment = async(req, res) => {
    try{
        const comment = await Comment.findByIdAndUpdate(req.params.commentId, {
            text: req.body.text
        }, {new: true})
        res.status(200).json({text: comment.text});
    }catch(err){
        console.log(err.message);
        res.status(500).end(err.message)
    }
}

module.exports = {
    getPost,
    createPost,
    editPost,
    deletePost,
    getNewsFeed,
    getUserPosts,
    postComment,
    postLike,
    editComment,
    deleteComment
};