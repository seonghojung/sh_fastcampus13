const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const models = require("../../models");
const passwordHash = require("../../helpers/passwordHash");

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  const result = user;
  result.password = "";
  done(null, result);
});

passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true
    },
    async (req, username, password, done) => {
      // 조회
      const user = await models.User.findOne({
        where: {
          username,
          password: passwordHash(password)
        }
        // attributes: { exclude: ['password'] }
      });

      // 유저에서 조회되지 않을시
      if (!user) {
        return done(null, false, { message: "일치하는 아이디, 패스워드가 존재하지 않습니다." });

        // 유저에서 조회 되면 세션등록쪽으로 데이터를 넘김
      } else {
        return done(null, user.dataValues);
      }
    }
  )
);

// 회원가입 페이지
exports.get_join = (_, res) => {
  res.render("accounts/join.html");
};
exports.post_join = async (req, res) => {
  try {
    const allUsers = await models.User.findAll();
    let idCheck = false;
    for (let i = 0; i < allUsers.length; i += 1) {
      if (allUsers[i].username === req.body.username) {
        idCheck = true;
      }
    }
    if (idCheck) {
      res.send(`<script> \
                   alert("아이디가 중복됩니다."); \
                   history.go(-1); \
               </script>`);
    } else {
      await models.User.create(req.body);
      res.send('<script>alert("회원가입 성공");location.href="/accounts/login";</script>');
    }
  } catch (e) {
    console.log(e);
  }
};

// 로그인 페이지
exports.get_login = (req, res) => {
  res.render("accounts/login.html", { flashMessage: req.flash().error });
};
exports.post_login = async (req, res) => {
  try {
    let cartList = {}; // 장바구니 리스트
    if (typeof req.cookies.cartList !== "undefined") {
      // 장바구니데이터
      cartList = JSON.parse(req.cookies.cartList);
      const cart = await models.Cart.findAll({
        where: {
          user_id: req.user.id
        }
      });
      for (let i = 0; i < cart.length; i += 1) {
        if (cartList[cart[i].product_id]) {
          if (parseInt(cart[i].number, 10) !== parseInt(cartList[cart[i].product_id].number, 10)) {
            cart[i].number = (
              parseInt(cart[i].number, 10) + parseInt(cartList[cart[i].product_id].number, 10)
            ).toString();
            cart[i].amount = (
              (parseInt(cartList[cart[i].product_id].amount, 10)
                / parseInt(cartList[cart[i].product_id].number, 10))
              * parseInt(cart[i].number, 10)
            ).toString();
          }
        }

        cartList[cart[i].product_id] = {
          number: cart[i].number,
          amount: cart[i].amount,
          thumbnail: cart[i].thumbnail,
          name: cart[i].name
        };
      }
      res.clearCookie("cartList");
      res.cookie("cartList", JSON.stringify(cartList), {
        maxAge: 3600 * 1000 * 3
      });

      await models.Cart.destroy({
        where: {
          user_id: req.user.id
        }
      });

      const user = await models.User.findByPk(req.user.id);
      for (const key in cartList) {
        await user.createCart({
          product_id: key,
          number: cartList[key].number,
          amount: cartList[key].amount,
          thumbnail: cartList[key].thumbnail,
          name: cartList[key].name
        });
      }
    } else {
      const cart = await models.Cart.findAll({
        where: {
          user_id: req.user.id
        }
      });
      for (let i = 0; i < cart.length; i += 1) {
        cartList[cart[i].product_id] = {
          number: cart[i].number,
          amount: cart[i].amount,
          thumbnail: cart[i].thumbnail,
          name: cart[i].name
        };
      }
      res.cookie("cartList", JSON.stringify(cartList), {
        maxAge: 3600 * 1000 * 3
      });
    }
    res.send('<script>alert("로그인 성공");location.href="/";</script>');
  } catch (e) {
    console.log(e);
  }
};

// 로그아웃 페이지
exports.get_logout = async (req, res) => {
  let cartList = {}; // 장바구니 리스트
  if (typeof req.cookies.cartList !== "undefined") {
    // 장바구니데이터
    cartList = JSON.parse(req.cookies.cartList);

    await models.Cart.destroy({
      where: {
        user_id: req.user.id
      }
    });

    const user = await models.User.findByPk(req.user.id);
    for (const key in cartList) {
      await user.createCart({
        product_id: key,
        number: cartList[key].number,
        amount: cartList[key].amount,
        thumbnail: cartList[key].thumbnail,
        name: cartList[key].name
      });
    }
  }
  res.clearCookie("cartList");
  req.logout();
  res.redirect("/accounts/login");
};
