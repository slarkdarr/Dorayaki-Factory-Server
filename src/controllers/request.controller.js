const db = require("../models");
const Request = db.requests;
const Recipe = db.recipes;
const Ingredient = db.ingredients;
const User = db.users;
const nodemailer = require("nodemailer");
const Sequelize = require("sequelize");
const op = Sequelize.Op;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

// Retrieve all Request from the database.
exports.findAll = async (req, res) => {
  const { limit } = req.query;

  if (!limit || limit !== "true") {
    Request.findAll({})
      .then((data) => {
        res.send({ status: "OK", data: data });
      })
      .catch((err) => {
        res.status(500).send({
          status: "Error",
          message:
            err.message || "Some error occurred while retrieving Requests.",
        });
      });
  } else {
    //  Limit specified
    Request.findAll({
      where: {
        createdAt: { [op.gte]: new Date(new Date() - 30 * 60 * 1000) }, // last 30 minutes
        status: "accepted"
      },
    })
      .then((data) => {
        res.send({ status: "OK", data: data });
      })
      .catch((err) => {
        res.status(500).send({
          status: "Error",
          message:
            err.message || "Some error occurred while retrieving Requests.",
        });
      });
  }
};

// Find a single Request by id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Request.findOne({ where: { id: id } })
    .then((data) => {
      if (data) {
        res.send({ status: "OK", data: data });
      } else {
        res.status(404).send({
          status: "Error",
          message: `Cannot find Request with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: "Error",
        message: "Error retrieving Request with id=" + id,
      });
    });
};

// Create and Save a new Request
exports.create = async (req, res) => {
  try {
    // Get user input
    const { email, recipe_name, quantity, status } = req.body;

    if ((!email || !recipe_name || !quantity, !status)) {
      res.status(400).send({
        status: "Error",
        message: "Empty field not allowed",
      });
      return;
    }

    const newRequest = {
      email: email,
      recipe_name: recipe_name,
      quantity: quantity,
      status: status,
    };

    // Save Request in the database
    Request.create(newRequest)
      .then((data) => {
        res.send({ status: "OK", data: data });
      })
      .catch((err) => {
        res.status(500).send({
          status: "Error",
          message:
            err.message || "Some error occurred while creating the Request.",
        });
      });
    admin = await User.findAll();
    admin.forEach((element) => {
      let mailOptions = {
        from: process.env.EMAIL,
        to: element.email,
        subject: "New Request Arrived",
        text: "Check new request for " + recipe_name + " quantity " + quantity,
      };
      transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
          console.log(err);
        } else {
          console.log("Email sent to " + element.email);
        }
      });
    });

    return;
  } catch (error) {
    console.log(error);
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;
  // Get user input
  const status = req.body.status;
  const recipe_name = req.body.recipe_name;

  if (!status || !recipe_name) {
    res.status(400).send({
      status: "Error",
      message: "No status provided",
    });
    return;
  }
  if (status === "accepted") {
    recipe_data = await Recipe.findOne({
      where: { name: recipe_name },
      include: Ingredient,
      required: true,
    });
    if (!recipe_data) {
      res.send({
        status: "Error",
        message: `Cannot update recipe empty`,
      });
    }
    const requestInst = await Request.findOne({ where: { id: id } });
    const needs = requestInst["quantity"];
    recipe_data["Ingredients"].forEach((element) => {
      let totalNeed = needs * element["RecipeIngredients"]["quantity"];
      if (element["stock"] < totalNeed) {
        res.send({
          status: "Error",
          message: `Cannot update ingredients not enough`,
        });
      }
      Ingredient.update(
        { stock: element["stock"] - totalNeed },
        { where: { id: element["id"] } }
      );
    });
  }

  Request.update(
    { status: status },
    {
      where: { id: id },
    }
  )
    .then((num) => {
      if (num == 1) {
        res.send({
          status: "OK",
          message: "Request was updated successfully.",
        });
      } else {
        res.send({
          status: "Error",
          message: `Cannot update Request with id=${id}. Maybe Request was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: "Error",
        message: "Error updating Request with id=" + id,
      });
    });
};
