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


//1.2
router.post('/', (req,res)=>{
  Book.create(req.body, (err, createdBook)=>{
    if(err){
      console.log(err);
    }else{
      res.redirect('/books')
    }
  })
});

module.exports = router;