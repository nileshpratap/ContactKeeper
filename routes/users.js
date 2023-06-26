const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/User.js");
const router = express.Router();

// @route POST api/users
// @route Register a user
// @access Public
router.post(
  "/",
  check("name", "please add a name").not().isEmpty(),
  check("email", "please include a valid Email").isEmail(),
  check(
    "password",
    "please enter a password with 6 or more characters"
  ).isLength({ min: 6 }),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email: email });

      if (user) {
        // we check if user exists in DB.
        return res.status(400).json({ msg: "user already exists." });
      }

      // user doesn't exists in DB, so creating new instance of it to register in DB.
      user = new User({
        name,
        email,
        password,
      });

      // encrypt the password before saving in DB. Determine salt to and parameter for defining level of security. 10 passed here.
      const salt = await bcrypt.genSalt(10);

      // password encryption.
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // new user added in the DB, now send client a json web token to log him in, protectedly.
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
