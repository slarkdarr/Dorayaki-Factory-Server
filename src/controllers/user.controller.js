const db = require("../models");
const User = db.users;
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

function generateAccessToken(username) {
  return jwt.sign(username, process.env.SECRET_JWT, { expiresIn: "5400s" });
}

// Create and Save a new User
exports.create = async (req, res) => {
  // Valusernameate request
  if (
    !req.body.username ||
    !req.body.name ||
    !req.body.email ||
    !req.body.password
  ) {
    res.status(400).send({
      message: "Any field cannot be empty",
    });
    return;
  }

  // Create a User
  const salt = await bcrypt.genSalt(10);
  // now we set user password to hashed password
  let pass = await bcrypt.hash(req.body.password, salt);
  const user = {
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,
    password: pass,
  };

  // Save User in the database
  User.create(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    });
};

// Retrieve all Users from the database.
exports.findAll = async (req, res) => {
  User.findAll({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Users.",
      });
    });
};

// Find a single User with an username
exports.findOne = (req, res) => {
  const username = req.params.username;

  User.findOne({ where: { username: username } })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find User with username=${username}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving User with username=" + username,
      });
    });
};

// login
exports.login = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  User.findOne({ where: { username: username } })
    .then((data) => {
      if (data) {
        bcrypt.compare(password, data.password, function (err, result) {
          if (result) {
            const token = generateAccessToken({ username: username });
            res.json(token);
          } else {
            res.status(403).send({
              message: `Wrong password!`,
            });
          }
        });
      } else {
        res.status(404).send({
          message: `Cannot find User with username=${username}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving User with username=" + username,
      });
    });

  // if (userGet === null) {
  //   res.status(404).send({
  //     message: `Cannot find User with username=${username}.`,
  //   });
  // } else {
  //   bcrypt.compare(password, userGet.password, function (err, result) {
  //     if (result) {
  //       const token = generateAccessToken({ username: username });
  //       res.status(200).json(token);
  //     } else {
  //       res.status(403).send({
  //         message: `Wrong password!`,
  //       });
  //     }
  //   });
  // }
};
