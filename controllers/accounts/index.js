const { Router } = require("express");

const router = Router();
const passport = require("passport");
const ctrl = require("./accounts.ctrl");
const csrfProtection = require("../../middleware/csrf");

const loginRequired = require("../../middleware/loginRequired");
const upload = require("../../middleware/multer");

// 회원가입 페이지
router.get("/join", ctrl.get_join);
router.post("/join", ctrl.post_join);

// 로그인 페이지
router.get("/login", ctrl.get_login);
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/accounts/login",
    failureFlash: true
  }),
  ctrl.post_login
);

// 로그아웃 페이지
router.get("/logout", ctrl.get_logout);

module.exports = router;
