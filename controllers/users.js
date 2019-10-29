const express = require('express');
const router = express.Router();
const User = require('../models/users.js');

//1.0
router.get('/', (req,res)=>{
  User.find({}, (err, AllUsers)=>{
    res.render('users/index.ejs', {
        users: AllUsers
    })
  })
});

//1.1
router.get('/new', (req,res)=>{
res.render('users/new.ejs')
});

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
        author: foundAuthor
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



module.exports = router; 