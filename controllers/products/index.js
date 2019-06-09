const { Router } = require("express");

const router = Router();
const ctrl = require("./products.ctrl");

router.get("/:id", ctrl.get_products_detail);

module.exports = router;
