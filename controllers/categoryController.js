const Category = require('../models/category')

const createCategory = async (req, res) => {
    try{
        const category = await new Category({ ...req.body })
            .save();
        res.status(200).json(category);
    }catch(err){
        res.status(500).end(err.message)
    }
}
const editCategory = async (req, res) => {
        try{
            const category = await Category.findByIdAndUpdate(req.params.id,{
                ...req.body
            })
            res.status(200).json(category);
        }catch(err){
            res.status(500).end(err.message)
        }
}
const getCategory = async (req, res) => {
    try{
        const category = await Category.findById(req.params.id)
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
    editCategory,
    getCategory,
    deleteCategory
}