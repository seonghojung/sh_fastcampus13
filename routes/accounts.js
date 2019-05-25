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
    const allUsers = await models.User.findAll();
    let idCheck = false;
    for (let i = 0; i < allUsers.length; i += 1) {
      if (allUsers[i].username === req.body.username) {
        idCheck = true;
      }
    }
    if (idCheck) {
      res.send(`<script> \
                   alert("아이디가 중복됩니다."); \
                   history.go(-1); \
               </script>`);
    } else {
      await models.User.create(req.body);
      res.send('<script>alert("회원가입 성공");location.href="/accounts/login";</script>');
    }
  } catch (e) {
    console.log(e);
  }
});

router.get("/login", (_, res) => {
  res.render("accounts/login.html");
});

module.exports = router;
