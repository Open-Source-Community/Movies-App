const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const Movie = require('../models/movie');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, async(req, res) =>{

var films=await Movie.find()

console.log(films)
res.render('dashboard', {user: req.user, films:films})

});

module.exports = router;
