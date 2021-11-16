const db = require("../models");
const Request = db.requests;

// Retrieve all Request from the database.
exports.findAll = async (req, res) => {
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
    return;
  } catch (error) {
    console.log(error);
  }
};

exports.update = (req, res) => {
  const id = req.params.id;

  // Get user input
  const status = req.body.status;

  if (!status) {
    res.status(400).send({
      status: "Error",
      message: "No status provided",
    });
    return;
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
