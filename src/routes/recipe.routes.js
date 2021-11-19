module.exports = (app) => {
  const recipes = require("../controllers/recipe.controller.js");
  const multer = require("multer");
  const upload = multer();
  const verifyJwtToken = require("../middlewares/verifyJwtToken");

  var router = require("express").Router();

  // Create a new Recipe
  router.post("/", [verifyJwtToken, upload.none()], recipes.create);

  // Retrieve all recipes
  router.get("/", recipes.findAll);

  // Retrieve a single Recipe with id
  router.get("/:id", recipes.findOne);

  app.use("/api/recipes", router);
};
