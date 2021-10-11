const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image_URL: {
        type: String,
        required: true
    }
});

const Movie = mongoose.model('movies', movieSchema);
module.exports = Movie;
