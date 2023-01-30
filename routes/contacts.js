const express = require("express");

const router = express.Router();

// @route GET api/contacts
// @desc Get all users contacts
// @access Private
router.get("/", (req, res) => {
  res.send("Get all contacts");
});

// @route POST api/constacts
// @desc Add new contact
// @access private
router.post("/", (req, res) => {
  res.send("Add contact");
});

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
