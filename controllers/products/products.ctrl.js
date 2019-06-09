const models = require("../../models");

exports.get_products_detail = async (req, res) => {
  try {
    const product = await models.Products.findByPk(req.params.id);
    res.render("products/detail.html", { product });
  } catch (e) {
    console.log(e);
  }
};
