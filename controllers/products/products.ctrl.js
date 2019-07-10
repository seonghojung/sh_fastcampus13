const models = require("../../models");
const userLikes = require("../../helpers/userLikes");

exports.get_products_detail = async (req, res) => {
  try {
    const product = await models.Products.findByPk(req.params.id);

    // 좋아요 내용을 가져온다
    const userLikeList = await userLikes(req);

    res.render("products/detail.html", { product, userLikeList });
  } catch (e) {
    console.log(e);
  }
};
