const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/UsersController");
const multer = require('multer');
const upload = multer();

/**
 * Get all users
 * */
router.get("/users", async function (req, res, next) {
  try {
    res.json(await userControllers.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting users `, err.message);
    next(err);
  }
});

/* POST user */
router.post('/users', upload.none(), async function(req, res, next) {
  console.log(req.body);
  try {
    res.json(await userControllers.create(req.body));
  } catch (err) {
    console.error(`Error while creating user`, err.message);
    next(err);
  }
});

module.exports = router;
