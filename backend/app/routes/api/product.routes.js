var router = require("express").Router();
var mongoose = require("mongoose");
var Product = mongoose.model("product");
var Comment = mongoose.model("comment");
var User = mongoose.model("user");
var auth = require("../auth");
const product = require("../../controllers/product.controller.js");

// Preload product
router.param("product", function (req, res, next, slug) {
  Product.findOne({ slug: slug })
    .populate("author")
    .then(function (product) {
      if (!product) {
        return res.sendStatus(404);
      }

      req.product = product;

      return next();
    })
    .catch(next);
});

router.param("comment", function (req, res, next, id) {
  Comment.findById(id)
    .then(function (comment) {
      if (!comment) {
        return res.sendStatus(404);
      }

      req.comment = comment;

      return next();
    })
    .catch(next);
});

router.param("user", function (req, res, next, email) {
  User.findOne({ email: email })
    .then(function (user) {
      if (!user) {
        return res.sendStatus(404);
      }

      req.user = user;

      return next();
    })
    .catch(next);
});

// Create a new Product
router.post("/", product.create);

// Retrieve all product
router.get("/", product.findAll);

// Retrieve a single Product with id
router.get("/:id", product.findOne);

// Update a Product with id
router.put("/:id", product.update);

// Delete a Product with id
router.delete("/:id", product.delete);

// Create a new Product
router.delete("/", product.deleteAll);

// Favorite a product
router.post("/:product/favorite", auth.required, function (req, res, next) {
  var productId = req.product._id;
  // console.log(productId);
  // res.send(req.auth.id)
  User.findById(req.auth.id)
    .then(function (user) {
      if (!user) {
        return res.sendStatus(401);
      }

      return user.favorite(productId).then(function () {
        // return req.product.updateFavoriteCount().then(function (product) {
        return res.json({ product: req.product.toJSONFor(user) });
        // });
      });
    })
    .catch(next);
});

// Unfavorite a product
router.delete("/:product/favorite", auth.required, function (req, res, next) {
  var productId = req.product._id;

  User.findById(req.auth.id)
    .then(function (user) {
      if (!user) {
        return res.sendStatus(401);
      }

      return user.unfavorite(productId).then(function () {
        // return req.product.updateFavoriteCount().then(function (product) {
        return res.json({ product: req.product.toJSONFor(user) });
        // });
      });
    })
    .catch(next);
});

router.get("/:product/comment", auth.optional, function (req, res, next) {
  var productSlug = req.product.slug;
  console.log("hoa");

  Promise.resolve(req.auth ? User.findById(req.auth.id) : null)
    .then(function (user) {
      Product.findOne({ slug: productSlug })
        .populate({
          path: "comments",
          populate: {
            path: "author",
          },
          options: {
            sort: {
              createdAt: "desc",
            },
          },
        })
        .then(function (product) {
          return res.json({
            comments: product.comments.map(function (comment) {
              return comment.toJSONFor(user);
            }),
          });
        });
    })
    .catch(next);
});

router.post("/:product/comment", auth.required, function (req, res, next) {
  User.findById(req.auth.id)
    .then(function (user) {
      if (!user) {
        return res.sendStatus(401);
      }

      var comment = new Comment();
      comment.body = req.body.body;
      comment.product = req.product._id;
      comment.author = user;

      return comment.save().then(function () {
        req.product.comments.push(comment);
        return req.product.save().then(function (product) {
          res.json({ comment: comment.toJSONFor(user) });
        });
      });
    })
    .catch(next);
});

router.delete(
  "/:product/comment/:comment",
  auth.required,
  function (req, res, next) {
    if (req.comment.author.toString() === req.auth.id.toString()) {
      req.product.comments.remove(req.comment._id);
      req.product
        .save()
        .then(Comment.find({ _id: req.comment._id }).remove().exec())
        .then(function () {
          res.sendStatus(204);
        });
    } else {
      res.sendStatus(403);
    }
  }
);

router.get("/products/:user", function (req, res, next) {
  Product.find({ author: req.user.email })
    .then(function (data) {
      if (!data) {
        return res.sendStatus(401);
      }
      return res.json(data);
    })
    .catch(next);
});

router.get("/favorite/:user", function (req, res, next) {
  Product.find({_id: req.user.favorites})
  .then(function (data) {
    if (!data) {
      return res.sendStatus(401);
    }
    return res.json(data);
  })
  .catch(next);
});

module.exports = router;
