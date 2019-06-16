const models = require("../../models");

exports.index = (req, res) => {
  let totalAmount = 0; // 총결제금액
  let cartList = {}; // 장바구니 리스트
  // 쿠키가 있는지 확인해서 뷰로 넘겨준다
  if (typeof req.cookies.cartList !== "undefined") {
    // 장바구니데이터
    cartList = JSON.parse(unescape(req.cookies.cartList));

    // 총가격을 더해서 전달해준다.
    for (const key in cartList) {
      totalAmount += parseInt(cartList[key].amount, 10);
    }
  }
  res.render("checkout/index.html", { cartList, totalAmount });
};

exports.get_complete = async (req, res) => {
  // 모듈 선언
  const { Iamporter } = require("iamporter");
  const iamporter = new Iamporter({
    apiKey: "8649095042200344",
    secret: "wgQJtu5iaxffsQkX7z3dTvHvwlxJ6ObD42mywsRHZ6XsWhp4QsiJXZfulMesBp5FrsdXU4EUbBm8SLcJ"
  });

  try {
    const iamportData = await iamporter.findByImpUid(req.query.imp_uid);
    await models.Checkout.Create({
      imp_uid: iamportData.data.imp_uid,
      merchant_uid: iamportData.data.merchant_uid,
      paid_amount: iamportData.data.amount,
      apply_num: iamportData.data.apply_num,

      buyer_email: iamportData.data.buyer_email,
      buyer_name: iamportData.data.buyer_name,
      buyer_tel: iamportData.data.buyer_tel,
      buyer_addr: iamportData.data.buyer_addr,
      buyer_postcode: iamportData.data.buyer_postcode,

      status: "결재완료"
    });

    res.redirect("/checkout/success");
  } catch (e) {}
};

exports.post_complete = async (req, res) => {
  await models.Checkout.create(req.body);
  res.json({ message: "success" });
};

exports.get_success = (req, res) => {
  res.render("checkout/success.html");
};
