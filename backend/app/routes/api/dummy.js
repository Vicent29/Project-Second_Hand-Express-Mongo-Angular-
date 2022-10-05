var router = require("express").Router();
var mongoose = require('mongoose');
var Product = mongoose.model('product');
var Category = mongoose.model('category');
const category = require("../../controllers/category.controller.js");
var dummies = require('../../utils/dummy.json');

router.get("/", (req, res) => {
    try {
        Category.collection.drop();
        let category = [];
        dummies.map(dummy => {
            category.push(new Category({
                slug: dummy.slug,
                id_cat: dummy.id_cat || null,
                cat_name: dummy.cat_name || null,
                img_cat: dummy.img_cat || null,
            }))
        })
        Category.insertMany(category);
        res.send("All good");
    } catch (err) {
        res.send(err);
    }
})

module.exports = router;