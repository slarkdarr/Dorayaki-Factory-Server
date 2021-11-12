const express = require("express");
const dotenv = require('dotenv');
const cors = require("cors");
const router = require('./src/routes/routes')

// Init express
const app = express();
// Init environment
dotenv.config();
const port = Number(process.env.PORT || 3331);

// parse requests of content-type: application/json
app.use(express.urlencoded({ extended: true }));
// parses incoming requests with JSON payloads
app.use(express.json());
// enabling cors for all requests by using cors middleware
app.use(cors());
// Enable pre-flight
app.options("*", cors());

app.get('/', (req, res) => {
  res.json({'message': 'ok'});
})

app.use('/', router);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({'message': err.message});
  return;
});

// starting the server
app.listen(port, () =>
    console.log(`🚀 Server running on port ${port}!`));


module.exports = app;