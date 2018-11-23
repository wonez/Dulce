const Post = require('../models/post');
const User = require('../models/user');

const searchByValue = async (req, res) => {
    try{
        const value = new RegExp(req.query.value, "i");;
        const recipes = await Post.find({ title: value }).limit(6);
        const users = await User.find({ $or: [{name: value}, {surname: value}] }).limit(8);

        const recipesCount = await Post.find({ title: value }).countDocuments();
        const usersCount = await User.find({ $or: [{name: value}, {surname: value}] }).countDocuments();

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