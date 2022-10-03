var router = require("express").Router();
var mongoose = require('mongoose');
var Product = mongoose.model('product');
var Category = mongoose.model('category');
const category = require("../../controllers/category.controller.js");
var dummies = require('../../utils/dummy.json');

router.get("/", (req, res) => {
    let prueba = [];
    dummies.map(dummy => {
        // const category = category.send(dummy);
        prueba.push(new Category({
            id_cat: dummy.id_cat || null,
            cat_name: dummy.cat_name || null,
            img_cat: dummy.img_cat || null,
        }))
    })
    Category.insertMany(prueba);


    // Category.insertMany({ dummies });
    res.json("pepe");
})

module.exports = router;