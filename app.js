const express = require("express");
const helmet = require("helmet");
const nunjucks = require("nunjucks");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const listen = require("socket.io");

// flash  메시지 관련
const flash = require("connect-flash");

// passport 로그인 관련
const passport = require("passport");
const session = require("express-session");

// db 관련
const db = require("./models");

// DB authentication
db.sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
    // DB Sync 할 때 아래 코드 주석 제외 후 실행
    // return db.sequelize.sync();
    // DB Drop 할 때 아래 코드 주석 제외 후 실행
    // return db.sequelize.drop();
  })
  .then(() => {
    console.log("DB Sync complete.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

const home = require("./routes/home.js");
const admin = require("./routes/admin");
const accounts = require("./routes/accounts");
const contacts = require("./routes/contacts");
const auth = require("./routes/auth");
const chat = require("./routes/chat");
const profile = require("./routes/profile");

const app = express();
const port = 3000;

nunjucks.configure("template", {
  autoescape: true,
  express: app
});

// Middlewares Settings
app.use(helmet());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// 업로드 path 추가
app.use("/uploads", express.static("uploads"));

// session 관련 셋팅
app.use(
  session({
    secret: "fastcampus",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 2000 * 60 * 60 // 지속시간 2시간
    }
  })
);

// passport 적용
app.use(passport.initialize());
app.use(passport.session());

// 플래시 메시지 관련
app.use(flash());

// .......flash 아래에다 붙여 넣는다.

// 로그인 정보 뷰에서만 변수로 셋팅, 전체 미들웨어는 router위에 두어야 에러가 안난다
app.use((req, res, next) => {
  app.locals.isLogin = req.isAuthenticated();
  // app.locals.urlparameter = req.url; //현재 url 정보를 보내고 싶으면 이와같이 셋팅
  // app.locals.userData = req.user; //사용 정보를 보내고 싶으면 이와같이 셋팅
  next();
});

// Routing
app.use("/", home);
app.use("/admin", admin);
app.use("/accounts", accounts);
app.use("/contacts", contacts);
app.use("/auth", auth);
app.use("/chat", chat);
app.use("/profile", profile);

const server = app.listen(port, () => {
  console.log("Express listening on port", port);
});

const io = listen(server);
require("./helpers/socketConnection")(io);
