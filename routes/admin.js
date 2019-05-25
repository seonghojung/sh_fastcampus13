const express = require("express");
const csrf = require("csurf");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const models = require("../models");

const router = express.Router();
const csrfProtection = csrf({ cookie: true });

// 이미지 저장되는 위치 설정
const uploadDir = path.join(__dirname, "../uploads"); // 루트의 uploads위치에 저장한다.

// multer 셋팅
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    // 이미지가 저장되는 도착지 지정
    callback(null, uploadDir);
  },
  filename: (req, file, callback) => {
    // products-날짜.jpg(png) 저장
    callback(null, `products-${Date.now()}.${file.mimetype.split("/")[1]}`);
  }
});
const upload = multer({ storage });

router.get("/", (req, res) => {
  res.send("admin app 입니다.");
});

// 제품 리스트 페이지
router.get("/products", async (_, res) => {
  try {
    const products = await models.Products.findAll();
    res.render("admin/products.html", { products });
  } catch (e) {
    console.log(e);
  }
});

// 제품 등록 페이지
router.get("/products/write", csrfProtection, (req, res) => {
  res.render("admin/form.html", { csrfToken: req.csrfToken() });
});
router.post("/products/write", upload.single("thumbnail"), csrfProtection, async (req, res) => {
  try {
    req.body.thumbnail = req.file ? req.file.filename : "";
    await models.Products.create(req.body);
    res.redirect("/admin/products");
  } catch (e) {
    console.log(e);
  }
});

// 제품 상세 페이지
router.get("/products/detail/:id", async (req, res) => {
  try {
    const product = await models.Products.findOne({
      where: {
        id: req.params.id
      },
      include: ["Memo"]
    });
    res.render("admin/detail.html", { product });
  } catch (e) {
    console.log(e);
  }
});
// 메모 등록
router.post("/products/detail/:id", async (req, res) => {
  try {
    const product = await models.Products.findByPk(req.params.id);
    // create + as에 적은 내용 ( Products.js association 에서 적은 내용 )
    await product.createMemo(req.body);
    res.redirect(`/admin/products/detail/${req.params.id}`);
  } catch (e) {
    console.log(e);
  }
});
// 메모 삭제
router.get("/products/delete/:product_id/:memo_id", async (req, res) => {
  try {
    await models.ProductsMemo.destroy({
      where: {
        id: req.params.memo_id
      }
    });
    res.redirect(`/admin/products/detail/${req.params.product_id}`);
  } catch (e) {
    console.log(e);
  }
});

// 제품 수정 페이지
router.get("/products/edit/:id", csrfProtection, async (req, res) => {
  try {
    const product = await models.Products.findByPk(req.params.id);
    res.render("admin/form.html", { product, csrfToken: req.csrfToken() });
  } catch (e) {
    console.log(e);
  }
});
router.post("/products/edit/:id", upload.single("thumbnail"), csrfProtection, async (req, res) => {
  try {
    // 이전에 저장되어있는 파일명을 받아오기 위함
    const product = await models.Products.findByPk(req.params.id);

    if (req.file && product.thumbnail) {
      // 요청중에 파일이 존재 할시 이전이미지 지운다.
      fs.unlinkSync(`${uploadDir}/${product.thumbnail}`);
    }

    // 파일요청이면 파일명을 담고 아니면 이전 DB에서 가져온다
    req.body.thumbnail = req.file ? req.file.filename : product.thumbnail;

    await models.Products.update(req.body, {
      where: { id: req.params.id }
    });
    res.redirect(`/admin/products/detail/${req.params.id}`);
  } catch (e) {
    console.log(e);
  }
});

// 제품 삭제 페이지
router.get("/products/delete/:id", async (req, res) => {
  try {
    await models.Products.destroy({
      where: {
        id: req.params.id
      }
    });
    res.redirect("/admin/products");
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
