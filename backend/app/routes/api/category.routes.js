var router = require("express").Router();

var mongoose = require('mongoose');
var Category = mongoose.model('category');
const category = require("../../controllers/category.controller.js");
const serializeCategory = require('../../controllers/serializers/serializers_category');

var router = require("express").Router();

// Create a new category
router.post("/", category.create);

// Retrieve all category
router.get("/", async (req, res) => {
  try {
    const id_cat = req.body.id_cat;
    var condition = id_cat ? { id_cat: { $regex: new RegExp(id_cat), $options: "i" } } : {};

    const category = await Category.find(condition);
    res.json(serializeCategory.serializeAllCategories(category));
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while retrieving category."
    });
  }
});

// Retrieve all published category
router.get("/published", category.findAllPublished);

// Retrieve a single category with id
router.get("/:id", category.findOne);

// Update a category with id
router.put("/:id", category.update);

// Delete a category with id
router.delete("/:id", category.delete);

// Retrieve all products category
router.get("/product/:slug", category.FindProductByCategory);

// Create a new category
router.delete("/", category.deleteAll);

module.exports = router;
