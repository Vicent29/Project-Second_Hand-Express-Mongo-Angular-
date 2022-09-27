module.exports = app => {
  const category = require("../controllers/category.controller.js");

  var router = require("express").Router();

  // Create a new category
  router.post("/", category.create);

  // Retrieve all category
  router.get("/", category.findAll);

  // Retrieve all published category
  router.get("/published", category.findAllPublished);

  // Retrieve a single category with id
  router.get("/:id", category.findOne);

  // Update a category with id
  router.put("/:id", category.update);

  // Delete a category with id
  router.delete("/:id", category.delete);

  // Retrieve all products category
  router.get("/product/:slug", category.findcategoryproduct);

  // Create a new category
  router.delete("/", category.deleteAll);

  app.use("/category", router);
};