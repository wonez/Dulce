const Category = require('../models/category')
const Post = require('../models/post')

const getCategoryPosts = async (req, res) => {
    try{
        const start = req.query.start;
        const uri = req.params.uri;
        const category = await Category.findOne({ uri: uri })
        const postsCount = await Post.find({ category: category._id }).countDocuments();
        let posts = [];
        if(start){  
            //load more
            posts = await Post.find({ category: category._id }).skip(+start).limit(9);
        }else{
            posts = await Post.find({ category: category._id }).limit(9);
        } 
        res.status(200).json({posts, postsCount, category})
    }catch(err){
        console.log(err);
        res.status(500).json({message: err.message})
    }
} 

const getCategories = async (req, res) => {
    try{
        const categories = await Category.find({})
        res.status(200).json(categories)
    } catch(err){
        res.status(500).json({message: err.message})
    }
}
const createCategory = async (req, res) => {
    try{
        const category = await new Category({ ...req.body })
            .save();
        res.status(200).json(category);
    }catch(err){
        res.status(500).end(err.message)
    }
}
const deleteCategory = async (req, res) => {
    try{
        await Category.findOneAndDelete(req.params.id)
        res.status(200).end('Category deleted');
    }catch(err){
        res.status(500).end(err.message)
    }
}

module.exports = {
    createCategory,
    deleteCategory,
    getCategories,
    getCategoryPosts
}