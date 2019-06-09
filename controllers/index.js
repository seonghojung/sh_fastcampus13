const { Router } = require("express");
const home = require("./home");

const router = Router();

router.use("/", home);
router.use("/accounts", require("./accounts"));
router.use("/admin", require("./admin"));
router.use("/auth", require("./auth"));
router.use("/chat", require("./chat"));
router.use("/profile", require("./profile"));
router.use("/products", require("./products"));

module.exports = router;
