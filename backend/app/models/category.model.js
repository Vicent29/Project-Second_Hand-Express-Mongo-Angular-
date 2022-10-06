const mongoose = require('mongoose');
const slug = require('slug');
const uniqueValidator = require('mongoose-unique-validator');

module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      slug: { type: String, lowercase: true, unique: true },
      id_cat: String,
      cat_name: String,
      img_cat: Array,
      products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
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
    this.slug = slug(this.cat_name) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
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
      id_cat: this.id_cat,
      cat_name: this.cat_name,
      products: this.products,
    };
  };

  const Category = mongoose.model("category", schema);
  return Category;
};
