const express = require("express");

const router = express.Router();
const ctrl = require("./cart.ctrl");

router.get("/", ctrl.index);

module.exports = router;
