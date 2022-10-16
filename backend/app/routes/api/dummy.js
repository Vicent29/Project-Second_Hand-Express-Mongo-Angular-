var router = require("express").Router();
var mongoose = require('mongoose');
var Product = mongoose.model('product');
var Category = mongoose.model('category');
const category = require("../../controllers/category.controller.js");
const product_serializers = require("../../controllers/serializers/product_serializers.js");
var dummies = require('../../utils/dummy.json');

router.get("/", (req, res) => {
    try {
        Category.collection.drop();
        Product.collection.drop();

        let product = []
        dummies[1].map(dummy => {
            product.push(
                new Product({
                    prod_nom: dummy.prod_nom || null,
                    slug: dummy.slug || null,
                    id_prod_typ: dummy.id_prod_typ || null,
                    prod_desc: dummy.prod_desc || null,
                    price: dummy.price || null,
                    img_prod: dummy.img_prod || null,
                    id_prod_cat: dummy.id_prod_cat || null,
                    location: dummy.location || null,
                    quality: dummy.quality || null,
                    disponibility: dummy.disponibility || null
                })
            )
        })
        Product.insertMany(product);
        let category = [];
        dummies[0].map(dummy => {
            category.push(new Category({
                slug: dummy.slug,
                id_cat: dummy.id_cat || null,
                cat_name: dummy.cat_name || null,
                img_cat: dummy.img_cat || null,
                img_cat2: dummy.img_cat2 || null,
                products: dummy.products || null
            }))
        })

        Category.insertMany(category);

        res.send("All good");
    } catch (err) {
        res.send("error");
    }
})

module.exports = router;