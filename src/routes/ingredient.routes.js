module.exports = (app) => {
  const ingredients = require("../controllers/ingredient.controller.js");
  const multer = require("multer");
  const upload = multer();
  const verifyJwtToken = require("../middlewares/verifyJwtToken");

  var router = require("express").Router();

  // Create a new Ingredient
  router.post("/", [verifyJwtToken, upload.none()], ingredients.create);

  // Retrieve all ingredients
  router.get("/", [verifyJwtToken, upload.none()], ingredients.findAll);

  // Retrieve a single Ingredient with id
  router.get("/:id", [verifyJwtToken, upload.none()], ingredients.findOne);

  // Update a Ingredient with id
  router.put("/:id", [verifyJwtToken, upload.none()], ingredients.update);

  app.use("/api/ingredients", router);
};
