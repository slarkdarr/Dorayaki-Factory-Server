const db = require("../models");
const Ingredient = db.ingredients;

// Create and Save a new User
exports.create = async (req, res) => {
  try {
    // Get user input
    const { name, stock } = req.body;
    // Valusernameate request
    if (!name || !stock) {
      res.status(400).send({
        message: "Empty field not allowed",
      });
      return;
    }

    const newIngredient = {
      name: name,
      stock: stock,
    };

    // Save Ingredient in the database
    Ingredient.create(newIngredient)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Ingredient.",
        });
      });
    return;
  } catch (error) {
    console.log(error);
  }
};

// Retrieve all Ingredient from the database.
exports.findAll = async (req, res) => {
  Ingredient.findAll({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Ingredients.",
      });
    });
};

// Find a single User with an username
exports.findOne = (req, res) => {
  const id = req.params.id;

  Ingredient.findOne({ where: { id: id } })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Ingredient with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Ingredient with id=" + id,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  // Get user input
  const stock = req.body.stock;

  if (!stock) {
    res.status(400).send({
      message: "No stock provided",
    });
    return;
  }

  Ingredient.update(
    { stock: stock },
    {
      where: { id: id },
    }
  )
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Ingredient was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Ingredient with id=${id}. Maybe Ingredient was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Ingredient with id=" + id,
      });
    });
};
