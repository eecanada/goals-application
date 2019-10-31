const express = require('express');
const router = express.Router();
const User = require('../models/users.js');

//1.0
router.get('/', async (req,res)=>{
  try{
    const allUsers = await User.find({})
    res.render('users/index.ejs', {
      users: allUsers
    })
  } catch(err){
    res.send(err);
  }
});

//1.1
router.get('/new', async (req,res)=>{
  try{
    res.render('users/new.ejs')
  } catch (err){
    res.send(err)
  }
})

//1.2
router.post('/', async (req,res)=>{
  try{
    const createdUser = await User.create(req.body)
    res.redirect('/users')
  } catch(err){
    res.send(err)
  }
});

//1.3
router.get('/:id', async (req, res)=>{
  try{
    const foundUser = await User.findById(req.params.id)
    .populate({path:'books'})
    .exec()
    res.render('users/show.ejs', {
      user: foundUser
    })
  } catch (err){
    res.send(err)
  }
})

//1.4 
router.delete('/:id', async (req, res)=>{
  try{
    const deletedUser = await User.findByIdAndRemove(req.params.id)
    res.redirect('/users')
  } catch (err){
    res.send(err)
  }
})

//1.5 
router.get('/:id/edit', async (req,res)=>{
  try{
    const foundUser = await User.findById(req.params.id)
    res.render('users/edit.ejs', {
      user: foundUser
    })
  } catch (err){
    res.send(err)
  }
});

//1.6 
router.put('/:id', async (req,res)=>{
  try{
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new:true});
    res.redirect('/users')
  } catch (err){
    res.send(err)
  }
})

module.exports = router; 