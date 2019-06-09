const { Router } = require("express");

const router = Router();
const ctrl = require("./chat.ctrl");

// 회원가입 페이지
router.get("/", ctrl.get_chat);

module.exports = router;
