//const router = require("express").Router();

// router.get("/", (req, res, next) => {
//   res.render("login", {
//     pageTitle: "My Page"
//   });
// });

// router.get("/get", (req, res, next) => {
//   res.send("Hello Tgere!")
// });

//Social Auth Logic
require("./auth")();

const routes = require("./routes");
const session = require("./session");
const config = require("../app/config");
const redis = require("redis").createClient;
const adapter = require("socket.io-redis");
//Create an IO Server Instance
const ioServer = app => {
  app.locals.chatRoom = [];
  const server = require("http").Server(app);
  const io = require("socket.io").listen(server);

  io.use((socket, next) => {
    require("./session")(socket.request, {}, next);
  });
  require("./socket")(io, app);
  return server;
};

let activateRoutes = () => {
  return routes();
};

router = activateRoutes();

module.exports = {
  router: require("./routes")(),
  session,
  ioServer,
  logger: require("./logger")
};
