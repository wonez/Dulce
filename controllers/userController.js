const User = require('../models/user');

const createUser = async (req, res) => {
    try{
        const user = await new User({ ...req.body })
            .save();
        res.status(200).json(user);
    }catch(err){
        res.status(500).end(err.message)
    }
}
const editUser = async (req, res) => {
    try{
        const user = await User.findByIdAndUpdate(req.params.id,{
            ...req.body
        })
        res.status(200).json(user);
    }catch(err){
        res.status(500).end(err.message)
    }
}
const getUser = async (req, res) => {
    try{
        const user = await User.findById(req.params.id)
        res.status(200).json(user);
    }catch(err){
        res.status(500).end(err.message)
    }
}
const deleteUser = async (req, res) => {
    try{
        await User.findOneAndDelete(req.params.id)
        res.status(200).end('User deleted');
    }catch(err){
        res.status(500).end(err.message)
    }
}

module.exports = {
    createUser,
    editUser,
    getUser,
    deleteUser
}