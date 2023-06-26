const express = require("express");
const multer = require("multer");
const router = express.Router();
const auth = require("../middleware/auth.js");
const { check, validationResult } = require("express-validator");
const { v2: cloudinary } = require("cloudinary");

const User = require("../models/User.js");
const Contact = require("../models/Contact.js");
const { default: mongoose } = require("mongoose");
mongoose.set("strictQuery", true);
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    cb(null, file.fieldname + "-" + Date.now() + "." + extension);
  },
});
const upload = multer({ storage: storage });

// @route GET api/contacts
// @desc Get all users contacts
// @access Private
router.get("/", auth, async (req, res) => {
  // res.send("Get all contacts");

  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(contacts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route POST api/constacts
// @desc Add new contact
// @access private
router.post(
  "/",
  auth,
  check("name", "Name is required.").not().isEmpty(),
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
router.put("/:id", auth, async (req, res) => {
  // res.send("Update contact");

  const { name, email, phone, type } = req.body;

  // Build contact object
  const contactFields = {};
  if (name) {
    contactFields.name = name;
  }
  if (email) {
    contactFields.email = email;
  }
  if (phone) {
    contactFields.phone = phone;
  }
  if (type) {
    contactFields.type = type;
  }

  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ msg: "Contact not found" });

    //Make sure user own contact
    if (contact.user.toString() !== req.user.id) {
      res.status(401).json({ msg: "not Authorized!" });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id, // contact id
      { $set: contactFields },
      { new: true } // save even if contact is new
    );

    res.json(contact);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route DELETE api/contacts/:id
// @desc delete a user
// @access Private
router.delete("/:id", auth, async (req, res) => {
  // res.send("Delete a user");

  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ msg: "Contact not found" });

    //Make sure user own contact
    if (contact.user.toString() !== req.user.id) {
      res.status(401).json({ msg: "not Authorized!" });
    }

    await Contact.findByIdAndDelete(req.params.id);

    return res.json({ msg: "Contact Removed." });

    // return res.json(contact);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route POST api/contacts
// @desc Add new profileimg
// @access private
router.put(
  "/uploadimage/:id",
  auth,
  upload.single("file"),
  // check("file", "file is required.").not().isEmpty(),
  async (req, res) => {
    console.log("upload image for contact");
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }
    const file = req.file;
    // console.log(file, "backend");
    const contactFields = {};
    try {
      let dbcontact = await Contact.findById(req.params.id);
      // console.log("hi", req.params.id, dbcontact);
      if (!dbcontact) return res.status(404).json({ msg: "Contact not found" });

      //Make sure user own contact
      if (dbcontact.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: "not Authorized!" });
      }

      // console.log("file is ", file);
      await cloudinary.uploader.upload(
        file.path,
        { public_id: req.params.id },
        function (error, result) {
          // console.log(result);
          contactFields.profileimg = result.secure_url;
          if (error) {
            contactFields.profileimg = null;
          }
        }
      );

      const savedcontact = await Contact.findByIdAndUpdate(
        req.params.id, // contact id
        { $set: contactFields },
        { new: true } // save even if contact is new
      );

      res.json(savedcontact);
    } catch (error) {
      console.error(error.message);
      res.status(500).json(error);
    }
  }
);

module.exports = router;
