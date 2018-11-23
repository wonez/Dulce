const Category = require('../models/category')
const Post = require('../models/post')

const getCategoryPosts = async (req, res) => {
    try{
        //query for load more
        const start = req.query.start;
        const id = req.params.id;
        const category = await Category.findById(id)
        const postsCount = await Post.find({ category: id }).countDocuments();
        let posts = [];
        if(start){  
            posts = await Post.find({ category: id }).skip(+start).limit(9);
        }else{
            posts = await Post.find({ category: id }).limit(9);
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