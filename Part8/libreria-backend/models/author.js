const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true,
      minlength: 4
    },
    born: {
      type: Number,
    },
  });
  
  authorSchema.virtual('bookCount', {
    ref: 'Book',
    localField: '_id',
    foreignField: 'author',
    count: true
  });

module.exports = mongoose.model('Author', authorSchema)