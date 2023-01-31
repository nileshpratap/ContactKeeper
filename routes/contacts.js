const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.js");
const { check, validationResult } = require("express-validator/check");

const User = require("../models/User.js");
const Contact = require("../models/Contact.js");
const { default: mongoose } = require("mongoose");

// @route GET api/contacts
// @desc Get all users contacts
// @access Private
router.get("/", auth, async (req, res) => {
  // res.send("Get all contacts");

  try {
    const contacts = await Contact.find({ user: req.user.find }).sort({
      date: -1,
    });
    res.json(contacts);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

// @route POST api/constacts
// @desc Add new contact
// @access private
router.post(
  "/",
  [auth, [check("name", "Name is required.").not().isEmpty()]],
  async (req, res) => {
    // res.send("Add contact");

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;

    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      });
      const contact = await newContact.save();
      res.json(contact);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route PUT api/contacts/:id
// @desc update a contanct
// @access Private
router.put("/:id", (req, res) => {
  res.send("Update contact");
});

// @route DELETE api/contacts/:id
// @desc delete a user
// @access Private
router.delete("/", (req, res) => {
  res.send("Delete a user");
});

module.exports = router;
