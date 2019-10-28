const express = require('express');
const app = express();



//controllers
const usersController = require('./controllers/users')

//uses
app.use('/users',usersController)

//my home page 
app.get('/', (req,res)=>{
  res.render('index.ejs')
})

//my server
app.listen(3000, ()=>{
  console.log(3000, 'server is listening')
})