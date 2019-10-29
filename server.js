const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');


//controllers
const usersController = require('./controllers/users');

require('./db/db');

//uses
app.use('/users',usersController);

//middlewear
app.use(bodyParser.urlencoded({extend:false}));
app.use(methodOverride('method'));

//my home page 
app.get('/', (req,res)=>{
  res.render('index.ejs')
});

//my server
app.listen(3000, ()=>{
  console.log(3000, 'server is listening')
});