const db = require("../models");
const Recipe = db.recipes;
const Ingredient = db.ingredients;
const recipeIngredient = db.recipeIngredient;

// Create and Save a new User
exports.create = async (req, res) => {
  try {
    // Get user input
    const { name, description, ingredientsObject } = req.body;
    if (!name || !description || !ingredientsObject) {
      res.status(400).send({
        status: "Error",
        message: "Empty field not allowed",
      });
      return;
    }

    const recipeObj = {
      name: name,
      description: description,
    };
    // Save Ingredient in the database
    let newRecipe = await Recipe.create(recipeObj);
    if (newRecipe) {
      let ingredients = Array.prototype.slice.call(ingredientsObject);
      let recipeId = newRecipe.id;
      ingredients.forEach(async (element) => {
        let newRecipeIngredient = await recipeIngredient.create({
          RecipeId: recipeId,
          IngredientId: element.id,
          quantity: element.quantity,
        });
      });
      res.send({ status: "OK", message: "New recipe created successfully" });
    } else {
      return res.status(500).send({
        status: "Error",
        message: err.message || "Some error occurred while creating Recipe.",
      });
    }
  } catch (error) {
    return res.status(500).send({
      status: "Error",
      message: `Name with  already exists`,
    });
  }
};

// Retrieve all recipe from the database.
exports.findAll = async (req, res) => {
  Recipe.findAll({ include: Ingredient })
    .then((data) => {
      res.send({ status: "OK", data: data });
    })
    .catch((err) => {
      res.status(500).send({
        status: "Error",
        message:
          err.message || "Some error occurred while retrieving Ingredients.",
      });
    });
};

// Find a single Recipe with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Recipe.findOne({ where: { id: id }, include: Ingredient })
    .then((data) => {
      if (data) {
        res.send({ status: "OK", data: data });
      } else {
        res.status(404).send({
          status: "Error",
          message: `Cannot find Recipe with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: "Error",
        message: "Error retrieving Recipe with id=" + id,
      });
    });
};
