const express = require("express");
const { check, validationResult } = require("express-validator/check");

const User = require("../models/User.js");

const router = express.Router();

// @route POST api/users
// @route Register a user
// @access Public
router.post(
  "/",
  [check("name", "please add a name").not().isEmpty()],
  [check("email", "please include a valid Email").isEmail()],
  [
    check(
      "password",
      "please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    return res.send("passed");
  }
);

module.exports = router;
