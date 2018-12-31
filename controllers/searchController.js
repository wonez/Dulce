const Post = require('../models/post');
const User = require('../models/user');

const searchByValue = async (req, res) => {
    try{
        const values = req.query.value.split(' ');
        const possible = [];
        for(let val of values){
            possible.push(new RegExp(val, "i"));
        }
        const recipes = await Post.find({ title: { $in: possible }}).limit(6);
        const users = await User.find({ $or: [{name: { $in: possible }}, {surname: { $in: possible }}] }).limit(6);
        const recipesCount = await Post.find({ title: { $in: possible } }).countDocuments();
        const usersCount = await User.find({ $or: [{name: { $in: possible }}, {surname: { $in: possible }}] }).countDocuments();

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
        const { start } = req.query;
        const values = req.query.value.split(' ');
        const possible = [];
        for(let val of values){
            possible.push(new RegExp(val, "i"));
        }
        const recipesCount = await Post.find({ title: { $in: possible } }).countDocuments();
        const recipes = await Post.find({ title: { $in: possible }}).skip(+start).limit(6);
        res.status(200).json({ recipes, recipesCount })
    }catch(err){
        console.log(err.message)
        res.status(500).json({message: err.message})
    }
}

const getMoreUsers = async (req, res) => {
    try{
        const { start } = req.query;
        const values = req.query.value.split(' ');
        const possible = [];
        for(let val of values){
            possible.push(new RegExp(val, "i"));
        }
        const users = await User.find({ $or: [{name: { $in: possible }}, {surname: { $in: possible }}] }).skip(+start).limit(6);
        const usersCount = await User.find({ $or: [{name: { $in: possible }}, {surname: { $in: possible }}] }).countDocuments();

        res.status(200).json({ users, usersCount })
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