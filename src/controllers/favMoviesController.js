const asyncHandler = require('express-async-handler');
const FavMovie = require('../models/favMovie');

const favMovie = {
    
    addFavMovie: (asyncHandler(async (req, res) => {
        const userID = req.params.userID;
        const movieID = req.params.movieID;
        const fav = await FavMovie.create({ 'userID': userID, 'movieID': movieID, 'rate': req.body });
        res.json(fav);
    })),
    
    getFavMovies: (asyncHandler(async (req, res) => {
        const userID = req.params.userID;
        const fav = await FavMovie.find({ 'userID': userID }).sort({ 'rate': 1 });
        //res.render('favMovies', fav);
        res.json(fav);
    })),

    removeFavMovie: (asyncHandler(async (req, res) => {
        const userID = req.params.userID;
        const movieID = req.params.movieID;
        await Category.deleteOne({ 'userID': userID, 'movieID': movieID });
        //res.redirect('/favMovies');
        res.json('Category deleted successfully.');
    }))

}

module.exports = favMovie;
