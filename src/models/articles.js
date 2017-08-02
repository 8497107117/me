const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const articlesSchema = new Schema({
    year: {
        type: String,
        required: true,
    },
    month: {
        type: String,
        required: true,
    },
    day: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    tags: [String]
});

const Articles = mongoose.model('Articles', articlesSchema, 'Articles');

module.exports = Articles;