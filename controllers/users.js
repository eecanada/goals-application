const express = require('express');
const router = express.Router();


//1.0
router.get('/', (req,res)=>{
  res.render('users/index.ejs')
});

//1.1
router.get('/new', (req,res)=>{
res.render('users/new.ejs')
});

module.exports = router; 