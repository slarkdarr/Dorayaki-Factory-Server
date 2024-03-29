module.exports = app => {
    const users = require("../controllers/user.controller.js");
    const multer = require('multer');
    const upload = multer();
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", upload.none(), users.create);
  
    // Retrieve all users
    router.get("/", users.findAll);
  
    // Retrieve a single Tutorial with username
    router.get("/:username", users.findOne);

    router.post("/login", upload.none(), users.login);
  
    app.use('/api/users', router);
  };