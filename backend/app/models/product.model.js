const mongoose = require('mongoose');
const slug = require('slug');
const uniqueValidator = require('mongoose-unique-validator');
const User = require('./user.model');

module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      slug: { type: String, lowercase: true, unique: true },
      prod_nom: String,
      id_prod_typ: String,
      prod_desc: String,
      price: Number,
      id_prod_cat: String,
      img_prod: Array,
      location: String,
      quality: String,
      disponibility: String,
      favorites: Number,
      comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'comment' }],
      // author: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }
      author: String
    },
    { timestamps: true }
  );

  schema.plugin(uniqueValidator, { msg: "already taken" });

  schema.pre('validate', function (next) {
    if (!this.slug) {
      this.slugify();
    }

    next();
  });//pre

  schema.methods.slugify = function () {
    this.slug = slug(this.prod_nom) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
  };//slugify

  schema.methods.updateFavoriteCount = function () {
    var product = this;
    // --------------------------------------------------------- 
    // Yolanda, que es count y como funciona
    // --------------------------------------------------------- 
    return User.count({ favorites: { $in: [product._id] } }).then(function (count) {
      product.favoritesCount = count;

      return product.save();
    });
  };

  schema.methods.toJSONFor = function () {
    return {
      slug: this.slug,
      prod_nom: this.prod_nom,
      id_prod_typ: this.id_prod_typ,
      prod_desc: this.prod_desc,
      price: this.price,
      img_prod : this.img_prod[0],
      id_prod_cat: this.id_prod_cat,
      disponibility: this.disponibility,
      favorites: this.favorites || 0,
      author: this.author,
    };
  };


  const Product = mongoose.model("product", schema);
  return Product;
};
