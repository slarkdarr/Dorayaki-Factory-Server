// const express = require("express");
// const dotenv = require('dotenv');
// const cors = require("cors");
// const router = require('./src/routes/routes')

// // Init express
// const app = express();
// // Init environment
// dotenv.config();
// const port = Number(process.env.PORT || 3331);

// // parse requests of content-type: application/json
// app.use(express.urlencoded({ extended: true }));
// // parses incoming requests with JSON payloads
// app.use(express.json());
// // enabling cors for all requests by using cors middleware
// app.use(cors());
// // Enable pre-flight
// app.options("*", cors());

// app.get('/', (req, res) => {
//   res.json({'message': 'ok'});
// })

// app.use('/', router);

// /* Error handler middleware */
// app.use((err, req, res, next) => {
//   const statusCode = err.statusCode || 500;
//   console.error(err.message, err.stack);
//   res.status(statusCode).json({'message': err.message});
//   return;
// });

// // starting the server
// app.listen(port, () =>
//     console.log(`🚀 Server running on port ${port}!`));


// module.exports = app;

const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
dotenv.config();

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

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
// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});