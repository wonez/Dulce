const User = require('../models/user');
const formidable = require('formidable');

// const createUser = async (req, res) => {
//     try{
//         const user = await new User({ ...req.body })
//             .save();
//         res.status(200).json(user);
//     }catch(err){
//         res.status(500).end(err.message)
//     }
// }
// const getUser = async (req, res) => {
//     try{
//         const user = await User.findById(req.params.id)
//         res.status(200).json(user);
//     }catch(err){
//         res.status(500).end(err.message)
//     }
// }
const registerUser = async (req, res) => {
    try{
        const user = await new User({ ...req.body })
            .save();
        res.status(200).json(user);
    }catch(err){
        res.status(500).end(err.message)
    }
}
const loginUser = async (req, res) => {
      try{
          const user = await User.findOne({email: req.body.email})
          res.status(200).json(user);
      }catch(err){
          res.status(500).end(err.message)
      }
}
const editUser = async (req, res) => {
    const form = new formidable.IncomingForm();
    form.multiples = true;
    form.uploadDir = 'public/images'
    form.keepExtensions = true;
    
    form.parse(req, (err, fields, files) => {
        console.log(fields, files)
    })
    // try{
    //     const user = await User.findOneAndUpdate({ _id: req.params.id },{
    //         ...req.body
    //     }, {new: true})
    //     res.status(200).json(user);
    // }catch(err){
    //     res.status(500).end(err.message)
    // }
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
    // createUser,
    // getUser,
    loginUser,
    registerUser,
    editUser,
    deleteUser
}
