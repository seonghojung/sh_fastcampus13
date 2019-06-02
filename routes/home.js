const express = require("express");
const models = require("../models");

const router = express.Router();

/* GET home page. */
router.get("/", async (_, res) => {
  const products = await models.Products.findAll({
    include: [
      {
        model: models.User,
        as: "Owner",
        attributes: ["username", "displayname"]
      }
    ]
  });
  res.render("home.html", { products });
});

module.exports = router;
