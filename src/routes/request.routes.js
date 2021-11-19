module.exports = (app) => {
  const requests = require("../controllers/request.controller.js");
  const multer = require("multer");
  const upload = multer();
  const verifyJwtToken = require("../middlewares/verifyJwtToken");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", [upload.none()], requests.create);

  // Retrieve all requests
  router.get("/", requests.findAll);

  // Retrieve a single Request with id
  router.get("/:id",  requests.findOne);

  // Update a Request with id
  router.put("/:id", [upload.none()], requests.update);

  app.use("/api/requests", router);
};
