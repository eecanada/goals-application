const express = require('express');
const router = express.Router();
const Book = require('../models/books.js');
const User = require('../models/users.js');

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
});

//1.1
router.get('/new', async (req,res)=>{
  try{
    const allAuthors = await Author.find({})
    res.render('books/new.ejs', {
      authors: allAuthors
  })
  } catch (err) {
    res.send(err)
  }
  });

//1.2 
router.post('/', async (req,res)=>{
  try{
    const CreatedBook = await Book.create(req.body)
    res.redirect('/books')
  } catch (err){
    res.send(err)
  }
});


//1.3 
router.get('/:id', async (req,res)=>{
  try{
    const foundBook = await Book.findById(req.params.id)
    res.render('books/show.ejs', {
      book: foundBook
    })
  } catch (err){
    res.send(err)
  }
});

//1.4 
router.delete('/:id', async (req,res)=>{
  try{
    const deletedBook = await Book.findByIdAndRemove(req.params.id)
    res.redirect('/books')
  } catch(err){
    res.send(err)
  }
});




//1.5 
router.get('/:id/edit', async (req,res)=>{
  try{
    const foundBook = await Book.findById(req.params.id)
    res.render('books/edit.ejs', {
      book: foundBook
    })
  } catch (err){
    res.send(err)
  }
})

//1.6
router.put('/:id', async (req,res)=>{
  try{
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {new:true});
    res.redirect('/books')
  } catch (err){
    res.send(err)
  }
})

module.exports = router;