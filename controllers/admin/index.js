const { Router } = require("express");

const router = Router();
const paginate = require("express-paginate");
const ctrl = require("./admin.ctrl");
const csrfProtection = require("../../middleware/csrf");

const loginRequired = require("../../middleware/loginRequired");
const upload = require("../../middleware/multer");

// 제품 리스트
router.get("/products", paginate.middleware(3, 50), ctrl.get_products);
router.get("/products/write", csrfProtection, ctrl.get_write);
router.post(
  "/products/write",
  loginRequired,
  upload.single("thumbnail"),
  csrfProtection,
  ctrl.post_write
);
router.get("/products/detail/:id", ctrl.get_detail);
router.post("/products/detail/:id", ctrl.post_memo_write);
router.get("/products/delete/:product_id/:memo_id", ctrl.get_memo_delete);
router.get("/products/edit/:id", loginRequired, csrfProtection, ctrl.get_products_update);
router.post(
  "/products/edit/:id",
  loginRequired,
  upload.single("thumbnail"),
  csrfProtection,
  ctrl.post_products_update
);
router.get("/products/delete/:id", loginRequired, ctrl.get_products_delete);
router.post(
  "/products/ajax_summernote",
  loginRequired,
  upload.single("thumbnail"),
  ctrl.post_products_delete
);

// 주문 리스트
router.get("/order", ctrl.get_order);
router.get("/order/edit/:id", ctrl.get_order_edit);

module.exports = router;
