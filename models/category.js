const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const URLSlugs = require('mongoose-url-slugs');

const categorySchema = new Schema({
    name: String,
})

categorySchema.plugin(URLSlugs('name', {field: 'uri'}));

module.exports = mongoose.model('Category', categorySchema)