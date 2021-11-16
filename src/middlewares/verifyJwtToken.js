const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.SECRET_JWT, (err, decoded) => {
    if (err)
      return res
        .status(403)
        .send({
          status: "Error",
          message: "Forbidden, token expired or not defined " + err,
        });

    req.user = decoded;

    next();
  });
}

module.exports = authenticateToken;
