const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const path = require('path')


const app = express();

// Passport Config
require('./config/passport')(passport);

// DB Config
const db = require('./config/keys').mongoURI;
const Movie = require('./models/movie');
const { default: slugify } = require('slugify');

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true ,useUnifiedTopology: true}
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Express body parser
app.use(express.urlencoded({ extended: true }));

app.use('/static', express.static(path.join(__dirname, 'public')))


// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));



app.get('/create', (req,res)=>{

  res.render("create.ejs")

})

app.post('/create', (req,res)=>{
const {name,image,trailer,category, description}=req.body;

console.log(name,description,image, category,trailer)


var movie=new Movie({
  name:name,
  description:description,
  image_URL:image,
  category:category,
  trailer:trailer,
  slug:slugify(name)
})
movie.save()

res.send("Added the movie ")
  

})

app.get('/:movieSlug', async(req,res)=>{
  var slug=req.params.movieSlug

  var film=await Movie.findOne({slug:slug})
  var categorySearchKey=film.category
  
 
console.log(film, categorySearchKey)

var recommendedMovies=await Movie.find({category:categorySearchKey})
console.log(recommendedMovies)
//removing movie from movies 
         
  res.render('filmPage.ejs', {film:film, films:recommendedMovies})

})




app.post('/search', async(req,res)=>{ 

  const name=req.body.name
  const searchResult=await Movie.find( { name:{$regex:new RegExp(name)} } ).limit(15)
  console.log(searchResult)

  res.render("dashboard", {films:searchResult})
  
})



app.get('/categories/:Type', async(req,res)=>{
var categorySearch=req.params.Type

var films=await Movie.find({category:categorySearch})

console.log(films, categorySearch)
  res.render('landing.ejs', {films:films})



})

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on  ${PORT}`));
