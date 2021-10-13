const mongoose = require("mongoose");
const slugify=require("slugify")
const movieSchema = new mongoose.Schema({
    category: {
        type:String,
        required: false  //till now 
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
        required: false
    },
    category:{
        type:String,
        default:"Drama"
    },
    slug:{
        type:String

    },
    trailer:{

        type:String,
        required:true
    }
});

const Movie = mongoose.model('movies', movieSchema);
module.exports = Movie;
