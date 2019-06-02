const express = require("express");
const csrf = require("csurf");
const models = require("../models");

const router = express.Router();
const csrfProtection = csrf({ cookie: true });

router.get("/", (req, res) => {
  res.render("profile/index.html");
});

router.get("/edit", csrfProtection, (req, res) => {
  res.render("profile/index.html");
});
module.exports = router;
