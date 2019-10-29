const express = require('express');
const router = express.Router();
const Book = require('../models/books.js')

//1.0
router.get('/', async (req,res)=>{
  try{
    const allBooks = await Book.find({})
    res.render('books/index.ejs', {
      books: allBooks
    })
  } catch(err){
    res.send(err);
  }
})

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

//1.3 
router.get('/:id', (req,res)=>{
  Book.findById(req.params.id, (err, foundBook)=>{
    if(err){
      res.send(err)
    }else{
      res.render('books/show.ejs',{
        book: foundBook
      })
    }
  })
});

//1.4 
router.delete('/:id', (req,res)=>{
  Book.findByIdAndRemove(req.params.id,()=>{
    res.redirect('/books')
  })
});

//1.5 
router.get('/:id/edit',(req,res)=>{
  Book.findById(req.params.id, (err,foundBook)=>{
    if(err){
      res.send(err);
    }else{
      res.render('book/edit.ejs',{
        book: foundBook
      })
    }
  })
});

//1.6
router.get('/id', (req,res)=>{
  Book.findByIdAndUpdate(req.params.id, req.body,(err, response)=>{
    if(err){
      res.send(err)
    }else{
      res.redirect('/books')
    }
  })
});

module.exports = router;