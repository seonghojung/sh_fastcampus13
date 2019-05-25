const express = require("express");
const models = require("../models");

const router = express.Router();

router.get("/", (_, res) => {
  res.send("account app");
});

// 회원가입 페이지
router.get("/join", (_, res) => {
  res.render("accounts/join.html");
});
router.post("/join", async (req, res) => {
  try {
    await models.User.create(req.body);
    res.send('<script>alert("회원가입 성공");location.href="/accounts/login";</script>');
  } catch (e) {
    console.log(e);
  }
});

router.get("/login", (_, res) => {
  res.render("accounts/login.html");
});

module.exports = router;
