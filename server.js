const listen = require("socket.io");
const session = require("express-session");
const db = require("./models");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const app = require("./app.js");

const sessionMiddleWare = session({
  secret: "fastcampus",
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 2000 * 60 * 60 // 지속시간 2시간
  },
  store: new SequelizeStore({
    db: db.sequelize
  })
});

const port = 3000;

const server = app.listen(port, () => {
  console.log("Express listening on port", port);
});

const io = listen(server);

// socket io passport 접근하기 위한 미들웨어 적용
io.use((socket, next) => {
  sessionMiddleWare(socket.request, socket.request.res, next);
});

require("./helpers/socketConnection")(io);
