const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./src/models");
db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', { raw: true }).then ( function () {
  db.sequelize.sync().then ( function () {
    console.log("Re-sync db.");
  });
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to app" });
});

require("./src/routes/user.routes")(app);
require("./src/routes/ingredient.routes")(app);
require("./src/routes/recipe.routes")(app);
require("./src/routes/request.routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});