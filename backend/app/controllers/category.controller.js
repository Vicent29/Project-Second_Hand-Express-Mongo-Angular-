const { category, product } = require("../models");
const db = require("../models");
var mongoose = require('mongoose');
var Category = mongoose.model('category');
var Product = mongoose.model('product');
const serializeCategory = require('./serializers/serializers_category');

// Create and Save a new Category
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.id_cat) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  try {
    // Create a Category
    const category = new Category({
      id_cat: req.body.id_cat || null,
      cat_name: req.body.cat_name || null,
      img_cat: req.body.img_cat || null,
    });
    await category.save();
    res.send(category);
  } catch (error) {
    res.status(500).send('Hubo un error');
  }
};

// Find all Categories from the database.
exports.findAll = async (req, res) => {
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
};

// Find a one Categoryes with an id
exports.findOne = async (req, res) => {
  try {
    let category = await Category.findOne({ slug: req.params.id });

    if (!category) {
      res.status(404).json({ msg: 'No existe la categoria' })
    }

    res.json(category)
    // res.json(serializeCategory.serializeOneCategory(category));

  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }

};

// Update a Category by the id in the request
exports.update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  try {
    let old_category = await Category.findOne({ slug: req.params.id });
    if (old_category.cat_name !== req.body.cat_name && req.body.cat_name !== undefined) {
      old_category.slug = null;
    }
    old_category.cat_name = req.body.cat_name || old_category.cat_name;
    old_category.id_cat = req.body.id_cat || old_category.id_cat;
    old_category.img_cat = req.body.img_cat || old_category.img_cat;
    const category = await old_category.save();
    if (!category) { res.status(404).json(FormatError("Category not found", res.statusCode)); }
    res.json({ msg: "Category updated" })

  } catch (error) {
    res.status(404).send({
      message: `Cannot update Category with id=${req.params.id}. Maybe Category was not found!`
    });
  }
};

// Delete a Category with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.params.id;

  try {

    let category = await Category.findOneAndDelete({ slug: req.params.id });

    if (!category) {
      res.status(404).json({ msg: 'No existe la categoria' })
    }

    res.send({ msg: 'Category eliminado con éxito!' })


  } catch (error) {
    res.status(404).send({
      message: `Cannot delete Category with id=${id}. Maybe Category was not found!`
    });
  }
};

// Find de products with that category
exports.FindProductByCategory = async (req, res) => {
  if (req.params.slug.indexOf('-') == -1) {
    try {
      let first = req.params.slug.substr(0, 1).toUpperCase();
      const category = await Category.findOne({ cat_name: first + req.params.slug.replace(/\.[^/.]+$/, "").substr(1) })
      const products = await Product.find({ id_prod_cat: first + category.slug.substr(1) })
      res.json(products.map(product => product.toJSONFor()))
    } catch (err) {
      res.json(err);
    }
  } else {
    try {
      let first = req.params.slug.substr(0, 1).toUpperCase();
      const category = await Category.findOne({ slug: first + req.params.slug.substr(1) })
      const products = await Product.find({ id_prod_cat: first + category.slug.substr(1) })
      res.json(products.map(product => product.toJSONFor()));
    } catch (error) {
      res.json("eee");
    }
  }
}

// Delete all Categories from the database.

exports.deleteAll = async (req, res) => {

  try {
    const deleteALL = await Category.collection.drop();
    res.send({ msg: 'Category were deleted successfully' })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing all category."
    });
  }
}

// Find all published Category
exports.findAllPublished = async (req, res) => {
  try {
    Category.find({ published: true })
    res.json(data);
  } catch (error) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving Category."
    });
  }
};
