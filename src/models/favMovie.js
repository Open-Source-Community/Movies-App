const mongoose = require("mongoose");

const favMovieSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    movieID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Film',
        required: true
    },
    rate: {
        type: Number,
        required: true
    }
});

const FavMovie = mongoose.model('favMovies', favMovieSchema);
module.exports = FavMovie;
