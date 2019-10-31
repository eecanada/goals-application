const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');



//controllers
const usersController = require('./controllers/users');
const booksController = require('./controllers/books');

require('./db/db');

//middleware
app.use(bodyParser.urlencoded({extend:false}));
app.use(methodOverride('_method'));

app.use(session({
  secret: "this is a random secret string", 
  resave: false, 
  saveUninitialized: false 
}));

app.use((req, res, next) => {
  res.locals.user = req.session.username || null;
  next()
})

//uses
app.use('/users',usersController);
app.use('/books',booksController);

//my home page 
app.get('/', (req,res)=>{
  res.render('index.ejs' , {
    message: req.session.message,
  })
});


app.get('/login', (req,res)=>{
  res.render('login/login.ejs')
})

app.get('/registration', (req,res)=>{
  res.render('registration/registration.ejs')
})

//my server
app.listen(3000, ()=>{
  console.log(3000, 'server is listening')
});