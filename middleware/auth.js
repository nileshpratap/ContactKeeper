// middleware has access to req, res

const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  //get token from the header
  const token = req.header("x-auth-token");

  // check if taken is not there
  if (!token) {
    return res.status(401).json({ msg: "No token, Authorization denied." });
  }

  try {
    // decode the token and insert user into req
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user;

    // call next() after all the middleware statements.
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token is not valid." });
  }
};
