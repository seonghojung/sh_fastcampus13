const { Router } = require("express");

const router = Router();
const paginate = require("express-paginate");
const ctrl = require("./admin.ctrl");
const csrfProtection = require("../../middleware/csrf");
const adminRequired = require("../../middleware/adminRequired");
const upload = require("../../middleware/multer");

// 제품 리스트
router.use(adminRequired);
router.get("/products", paginate.middleware(3, 50), ctrl.get_products);
router.get("/products/write", csrfProtection, ctrl.get_write);
router.post("/products/write", upload.single("thumbnail"), csrfProtection, ctrl.post_write);
router.get("/products/detail/:id", ctrl.get_detail);
router.post("/products/detail/:id", ctrl.post_memo_write);
router.get("/products/delete/:product_id/:memo_id", ctrl.get_memo_delete);
router.get("/products/edit/:id", csrfProtection, ctrl.get_products_update);
router.post(
  "/products/edit/:id",
  upload.single("thumbnail"),
  csrfProtection,
  ctrl.post_products_update
);
router.get("/products/delete/:id", ctrl.get_products_delete);
router.post("/products/ajax_summernote", upload.single("thumbnail"), ctrl.post_products_delete);

// 주문 리스트
router.get("/order", ctrl.get_order);
router.get("/order/edit/:id", ctrl.get_order_edit);
router.post("/order/edit/:id", ctrl.post_order_edit);

// 통계, 구글 차트
router.get("/statistics", ctrl.statistics);

// 태그 입력 및 삭제
router.post("/tag", ctrl.write_tag);
router.delete("/tag/:product_id/:tag_id", ctrl.delete_tag);

module.exports = router;
