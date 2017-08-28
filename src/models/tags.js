const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const tagsSchema = new Schema({
  tagName: {
    type: String,
    required: true,
    unique: true
  },
  articles: {
    type: [{ type: ObjectId, ref: 'Articles' }],
    required: true
  }
});

const Tags = mongoose.model('Tags', tagsSchema, 'Tags');

module.exports = Tags;