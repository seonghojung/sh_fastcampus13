const { Router } = require("express");
const models = require("../../models");
const loginRequired = require("../../middleware/loginRequired");

const router = Router();
const ctrl = require("./products.ctrl");

router.get("/:id", ctrl.get_products_detail);

// 좋아요 구현
router.post("/like/:product_id(\\d+)", loginRequired, async (req, res) => {
  try {
    const product = await models.Products.findByPk(req.params.product_id);
    const user = await models.User.findByPk(req.user.id);

    const status = await user.addLikes(product);

    res.json({
      status
    });
  } catch (e) {
    console.log(e);
  }
});

// 좋아요 해제 구현
router.delete("/like/:product_id(\\d+)", loginRequired, async (req, res) => {
  try {
    const product = await models.Products.findByPk(req.params.product_id);
    const user = await models.User.findByPk(req.user.id);

    await user.removeLikes(product);

    res.json({
      message: "success"
    });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
