const asyncHandler = require('express-async-handler');
const Category = require('../models/category');
const Movie = require('../models/movie');

const category = {
    
    createNewCategory: (asyncHandler(async (req, res) => {
        const category = await Category.create(req.body);
        //res.redirect('/categories');
        
        res.json(category);
    })),
    
    getAllCategories: (asyncHandler(async (_req, res) => {
        const categories = await Category.find();
        console.log(categories);
        //res.render('categories', categories);
        res.json('categories');
    })),

    updateCategory: (asyncHandler(async (req, res) => {
        const categoryID = req.params.categoryID;
        const updatedCategory = req.body;
        await Category.updateOne({ '_id': categoryID }, updatedCategory);
        //res.redirect('/categories');
        res.json(category);
    })),


    deleteCategory: (asyncHandler(async (req, res) => {
        const categoryID = req.params.categoryID;

        if (await Category.exists({ '_id': categoryID })) {

            await Movie.deleteMany({ 'category': categoryID });
            await Category.deleteOne({ '_id': categoryID });
            //res.redirect('/categories');
            res.json('Category deleted successfully.');
        }
        else {
            res.json('Category not found.');
        }

    }))

}

module.exports = category;
