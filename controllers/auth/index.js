const { Router } = require("express");

const router = Router();
const passport = require("passport");
const ctrl = require("./auth.ctrl");
const csrfProtection = require("../../middleware/csrf");

const loginRequired = require("../../middleware/loginRequired");
const upload = require("../../middleware/multer");

// 페이스북 로그인
// http://localhost:3000/auth/facebook 접근시 facebook으로 넘길 url 작성해줌
router.get("/facebook", passport.authenticate("facebook", { scope: "email" }));

// 인증후 페이스북에서 이 주소로 리턴해줌. 상단에 적은 callbackURL과 일치
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/auth/facebook/fail"
  })
);
router.get("/facebook/fail", ctrl.get_facebook_fail);

// 카카오톡 로그인
// http://localhost:3000/auth/kakao 접근시 kakao으로 넘길 url 작성해줌
router.get("/kakao", passport.authenticate("kakao"));

// 인증후 카카오에서 이 주소로 리턴해줌. 상단에 적은 callbackURL과 일치
router.get(
  "/kakao/callback",
  passport.authenticate("kakao", {
    successRedirect: "/",
    failureRedirect: "/auth/kakao/fail"
  })
);

router.get("/kakao/fail", ctrl.get_kakao_fail);

module.exports = router;
