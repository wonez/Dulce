const Post = require('../models/post');
const User = require('../models/user');

const searchByValue = async (req, res) => {
    try{
        const value = req.query.value;
        //find posts find users 
        // const posts = await Post.find({ title: value});
        // const users = await Post.find({ name: value, surname: value })
        const recipes = await Post.find({}).limit(3);
        const users = await User.find({}).limit(8);

        const recipesCount = await Post.find({}).countDocuments();
        const usersCount = await User.find({}).countDocuments();

        res.status(200).json({
            recipes,
            users,
            recipesCount,
            usersCount
        })
    } catch(err){
        res.status(500).json({message: err.message})
    }
}

const getMoreRecipes = async (req, res) => {
    try{
        const { value, start } = req.query;
        const recipes = await Post.find({}).skip(+start).limit(9);
        res.status(200).json({ recipes })
    }catch(err){
        console.log(err.message)
        res.status(500).json({message: err.message})
    }
}

const getMoreUsers = async (req, res) => {
    try{
        const { value, start } = req.query;
        const users = User.find({}).skip(+start).limit(6);
        res.status(200).json({ users })
    }catch(err){
        console.log(err.message)
        res.status(500).json({message: err.message})
    }
}

module.exports = {
    searchByValue,
    getMoreRecipes,
    getMoreUsers
}