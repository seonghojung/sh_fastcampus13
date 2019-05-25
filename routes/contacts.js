const express = require("express");
const csrf = require("csurf");
const models = require("../models");

const router = express.Router();
const csrfProtection = csrf({ cookie: true });

router.get("/", async (_, res) => {
  try {
    const contacts = await models.Contacts.findAll();
    res.render("contacts/list.html", { contacts });
  } catch (e) {
    console.log(e);
  }
});

// CONTACT 글 작성 페이지
router.get("/write", csrfProtection, (req, res) => {
  res.render("contacts/form.html", { csrfToken: req.csrfToken() });
});
router.post("/write", csrfProtection, async (req, res) => {
  try {
    await models.Contacts.create(req.body);
    res.redirect("/contacts");
  } catch (e) {
    console.log(e);
  }
});

// CONTACT 상세 글 보기 페이지
router.get("/detail/:id", async (req, res) => {
  try {
    const contacts = await models.Contacts.findOne({
      where: {
        id: req.params.id
      },
      include: ["Memo"]
    });
    res.render("contacts/detail.html", { contacts });
  } catch (e) {
    console.log(e);
  }
});
// 메모 등록
router.post("/detail/:id", async (req, res) => {
  try {
    const contact = await models.Contacts.findByPk(req.params.id);
    await contact.createMemo(req.body);
    res.redirect(`/contacts/detail/${req.params.id}`);
  } catch (e) {
    console.log(e);
  }
});
// 메모 삭제
router.get("/delete/:contact_id/:memo_id", async (req, res) => {
  try {
    await models.ContactsMemo.destroy({
      where: {
        id: req.params.memo_id
      }
    });
    res.redirect(`/contacts/detail/${req.params.contact_id}`);
  } catch (e) {
    console.log(e);
  }
});

// CONTACT 글 수정 페이지
router.get("/edit/:id", csrfProtection, async (req, res) => {
  try {
    const contact = await models.Contacts.findByPk(req.params.id);
    res.render("contacts/form.html", { contact, csrfToken: req.csrfToken() });
  } catch (e) {
    console.log(e);
  }
});
router.post("/edit/:id", csrfProtection, async (req, res) => {
  try {
    await models.Contacts.update(req.body, {
      where: { id: req.params.id }
    });
    res.redirect(`/contacts/detail/${req.params.id}`);
  } catch (e) {
    console.log(e);
  }
});

// CONTACT 글 삭제 페이지
router.get("/delete/:id", async (req, res) => {
  try {
    await models.Contacts.destroy({
      where: {
        id: req.params.id
      }
    });
    res.redirect("/contacts");
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
