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
