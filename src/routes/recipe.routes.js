module.exports = (app) => {
  const recipes = require("../controllers/recipe.controller.js");
  const multer = require("multer");
  const upload = multer();
  const verifyJwtToken = require("../middlewares/verifyJwtToken");

  var router = require("express").Router();

  // Create a new Ingredient
  router.post("/", [verifyJwtToken, upload.none()], recipes.create);

  // Retrieve all recipes
  router.get("/", [verifyJwtToken, upload.none()], recipes.findAll);

  // Retrieve a single Ingredient with id
  router.get("/:id", [verifyJwtToken, upload.none()], recipes.findOne);

  app.use("/api/recipes", router);
};
