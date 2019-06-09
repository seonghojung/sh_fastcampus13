const { Router } = require("express");

const router = Router();
const passport = require("passport");
const ctrl = require("./profile.ctrl");
const csrfProtection = require("../../middleware/csrf");

const loginRequired = require("../../middleware/loginRequired");
const upload = require("../../middleware/multer");

// 프로필 페이지
router.get("/", loginRequired, ctrl.get_profile);

// 프로필 수정 페이지
router.get("/edit", loginRequired, csrfProtection, ctrl.get_profile_update);
router.post("/edit", loginRequired, csrfProtection, ctrl.post_profile_update);

module.exports = router;
