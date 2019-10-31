const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const Book = require('../models/books.js');
const bcrypt = require('bcryptjs');

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

//logout
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if(err){
      res.send(err);
    } else {
      res.redirect('/');
    }
  })

});

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
    res.render('users/show.ejs', {
      user: foundUser
    })
  } catch (err){
    res.send(err)
  }
})

// 1.4
router.delete('/:id', async (req,res)=>{
  try{
    const deletedUser = await User.findByIdAndRemove(req.params.id)
    await Book.deleteMany({
      _id:{
        $in: deletedUser.books
      }
    })
    res.redirect('/books')
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

// registration route 
router.post('/registration', async (req, res) => {
  
  try { 
    const foundUser = await User.findOne({username:req.body.username});
    if(foundUser){
      req.session.message = 'Username or password is incorrect';
      res.redirect('/')
    } else {
      const password = req.body.password; 
      const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10))

      const userDbEntry = {};
      userDbEntry.username = req.body.username;

      userDbEntry.password = passwordHash;
      userDbEntry.email    = req.body.email;

      const createdUser = await User.create(userDbEntry);
      console.log(createdUser)
      req.session.username = createdUser.username;
      req.session.logged = true;

      res.redirect('/')
    }
    
  } catch(err) {
      console.log(err)
    }
})


//my login page route
router.post('/login', async(req, res)=>{
  console.log('hit login route')

  try{
    const foundUser = await User.findOne({username: req.body.username})
    console.log(foundUser, 'this is found user')
    if(foundUser){
      if(bcrypt.compareSync(req.body.password, foundUser.password)){
        // req.session.message ='Logged out.'; ///maybe take out
        req.session.username = foundUser.username;
        req.session.userId = foundUser._id
        req.session.logged = true;
        res.redirect('/users')
      }else{
        req.session.message = 'Username or password is incorrect'
        res.redirect('/');
      }
    }else {
      req.session.message = 'Username or password is incorrect'
      res.redirect('/'); 
    }
  } catch (err){
    console.log(err)

  }

});



module.exports = router; 