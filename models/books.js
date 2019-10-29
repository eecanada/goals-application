const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  improvement: String,
  img: String,
  title: String,
  caption: String
})

const Book = mongoose.model('Book', bookSchema)

module.exports = Book