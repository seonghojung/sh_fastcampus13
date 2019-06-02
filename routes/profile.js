const express = require("express");
const csrf = require("csurf");
const models = require("../models");
const loginRequired = require("../helpers/loginRequired");

const router = express.Router();
const csrfProtection = csrf({ cookie: true });

// 프로필 페이지
router.get("/", loginRequired, (req, res) => {
  res.render("profile/index.html");
});

// 프로필 수정 페이지
router.get("/edit", loginRequired, csrfProtection, async (req, res) => {
  try {
    const user = await models.User.findOne({
      where: {
        id: req.user.id
      }
    });
    res.render("profile/editForm.html", { user, csrfToken: req.csrfToken() });
  } catch (e) {
    console.log(e);
  }
});
router.post("/edit", loginRequired, csrfProtection, async (req, res) => {
  try {
    await models.User.update(
      {
        displayname: req.body.displayname
      },
      {
        where: { username: req.body.username }
      }
    );
    req.login(req.user, err => {
      if (err) {
        return next(err);
      }
      return res.redirect("/profile");
    });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
