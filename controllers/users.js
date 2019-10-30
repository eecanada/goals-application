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
router.post('/', (req,res)=>{
  User.create(req.body, (err,createdUser)=>{
    if(err){
      console.log(err);
    }else{
      res.redirect('/users')
    }
  });
});

//1.3
router.get('/:id', (req, res) => {
  User.findById(req.params.id, (err, foundUser) => {
    if(err){
      res.send(err);
    } else {
      res.render('users/show.ejs', {
        user: foundUser
      });
    }
  })
});


//1.4 
router.delete('/:id', (req, res)=>{
	User.findByIdAndRemove(req.params.id, (err, response)=>{
    if(err){
      res.send(err)
    } else {
      res.redirect('/users');
    }
	});
});


//1.5 
router.get('/:id/edit', (req, res)=>{
	User.findById(req.params.id, (err, foundUser)=>{
    if(err){
      res.send(err);
    }else{
      res.render('users/edit.ejs', {
        user: foundUser
      });
	};
});
});


//1.6 
router.put('/:id', (req, res)=>{
	User.findByIdAndUpdate(req.params.id, req.body, (err, response)=>{
    if(err){
      res.send(err)
    }else{
      res.redirect('/users');  
    }
	});
});

module.exports = router; 