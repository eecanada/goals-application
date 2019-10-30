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
router.get('/new', async (req,res)=>{
  try{
    res.render('books/new.ejs', {
  })
  } catch (err) {
    res.send(err)
  }
  })

//1.2 
router.post('/', async (req,res)=>{
  try{
    const CreatedBook = await Book.create(req.body)
    res.redirect('/books')
  } catch (err){
    res.send(err)
  }
})


//1.3 
router.get('/:id', async (req,res)=>{
  try{
    const foundBook = await Book.findById(req.params.id)
    res.render('books/show.ejs', {
      book: foundBook
    })
  } catch (err){
    res.send(err);
  }
})

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