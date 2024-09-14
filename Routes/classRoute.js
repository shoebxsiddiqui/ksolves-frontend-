const express = require("express");
const {
  createClass,
  getClasses,
  getClass,
} = require("../Controllers/classController");
const { createClass } = require("../Controllers/classController");
const router = express.Router();

router.route("/create").post(createClass);

// router.route("/login").post(loginUser);

// router.route("/logout").get(logout);

module.exports = router;
