const mongoose = require('mongoose');
const slug = require('slug');
const uniqueValidator = require('mongoose-unique-validator');

module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      slug: { type: String, lowercase: true, unique: true },
      prod_nom: String,
      id_prod_typ: String,
      prod_desc: String,
      price: String,
      id_prod_cat: String,
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
    console.log(this.slug);
  };//slugify

  // schema.method("toJSON", function () {
  //   const { __v, _id, ...object } = this.toObject();
  //   object.id = _id;
  //   return object;
  // });

  schema.methods.toJSONFor = function(){
    return {
      slug: this.slug,
      prod_nom: this.prod_nom,
      id_prod_typ: this.id_prod_typ,
      prod_desc: this.prod_desc,
      price: this.price,
      id_prod_cat: this.id_prod_cat,
    };
  };

  const Product = mongoose.model("product", schema);
  return Product;
};
