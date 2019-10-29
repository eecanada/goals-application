const express = require('express');
const router = express.Router();
const Book = require('../models/books.js')


//1.0
router.get('/', (req,res)=>{
  res.render('users/index.ejs')
});


//1.1
router.get('/new', (req,res)=>{
  res.render('books/new.ejs')
  });

module.exports = router;