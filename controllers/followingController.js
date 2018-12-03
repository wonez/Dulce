const User = require('../models/user')

const followUser = async (req, res) => {
    try{
        const id = req.params.id;
        const user = await User.findByIdAndUpdate(req.user._id, {
            $push: { following: id }
        }, {new: true})
        res.status(200).json(user);
    }catch(err){
        res.status(500).json({message: err.message})
    }
}

const unfollowUser = async (req, res) => {
    try{
        const id = req.params.id;
        const user = await User.findByIdAndUpdate(req.user._id, {
            $pull: { following: id }
        }, {new: true})
        res.status(200).json(user);
    }catch(err){
        res.status(500).json({message: err.message})
    }
}

const followingUsers = async(req, res) => {
    try{
        const id = req.params.id;
        const start = +req.query.start;
        const users = await User.findById(id, {
            _id: 1
        }).populate({
            path: 'following',
            select: 'name surname dateCreated avatarUrl',
            options: { sort: {name: 1}, limit: 9, skip: start }
        })
        res.status(200).json({people: users.following})
    }catch(err){
        res.status(500).json({message: err.message})
    }
}

module.exports = {
    followUser,
    unfollowUser,
    followingUsers
}
