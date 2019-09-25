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

let activateRoutes = () => {
  return routes();
};

router = activateRoutes();

module.exports = {
  router: require("./routes")(),
  session: session
};
