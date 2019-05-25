const express = require("express");
const helmet = require("helmet");
const nunjucks = require("nunjucks");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

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

const admin = require("./routes/admin");
const accounts = require(".//routes/accounts");

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

app.get("/", (req, res) => {
  res.send("first app");
});

app.use("/admin", admin);
app.use("/accounts", accounts);

app.listen(port, () => {
  console.log("Express listening on port", port);
});
