const db = require("../models");
const User = db.users;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function generateAccessToken(username) {
  return jwt.sign(username, process.env.SECRET_JWT, { expiresIn: "5400s" });
}

// Create and Save a new User
exports.create = async (req, res) => {
  try {
    // Get user input
    const { username, name, email, password } = req.body;
    // Valusernameate request
    if (!username || !name || !email || !password) {
      res.status(400).send({
        status: "Error",
        message: "Empty field not allowed",
      });
      return;
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ where: { username: username } });
    if (oldUser) {
      return res
        .status(409)
        .send({ status: "Error", message: "User Already Exist. Please Login" });
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
    const newUser = await User.create(user);
    const token = generateAccessToken({ username: username });
    res.status(201).json({ status: "OK", data: newUser, token: token });
  } catch (error) {
    console.log(error);
  }
};

// Retrieve all Users from the database.
exports.findAll = async (req, res) => {
  User.findAll({})
    .then((data) => {
      res.send({ status: "OK", data: data });
    })
    .catch((err) => {
      res.status(500).send({
        status: "Error",
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
        res.send({ status: "OK", data: data });
      } else {
        res.status(404).send({
          status: "Error",
          message: `Cannot find User with username=${username}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: "Error",
        message: "Error retrieving User with username=" + username,
      });
    });
};

// login
exports.login = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    res.status(400).send({
      status: "Error",
      message: "Empty field not allowed",
    });
  }

  User.findOne({ where: { username: username } })
    .then((data) => {
      if (data) {
        bcrypt.compare(password, data.password, function (err, result) {
          if (result) {
            const token = generateAccessToken({ username: username });
            res.json({ status: "OK", data: token });
          } else {
            res.status(403).send({
              status: "Error",
              message: `Wrong password!`,
            });
          }
        });
      } else {
        res.status(404).send({
          status: "Error",
          message: `Cannot find User with username=${username}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: "Error",
        message: "Error retrieving User with username=" + username,
      });
    });
};
