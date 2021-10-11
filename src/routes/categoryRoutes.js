const express = require('express');
const category = require('../controllers/categoryController');

const router = express.Router();

router.post("/categories", category.createNewCategory);
router.get("/categories", category.getAllCategories);
router.patch("/categories/:categoryID", category.updateCategory);
router.delete("/categories/:categoryID", category.deleteCategory);

module.exports = router;
