//const router = require("express").Router();

// router.get("/signUp", (req, res, next) => {
//   res.render("signUp");
// });

// router.get("/signIn", (req, res, next) => {
//   res.render("signIn");
// });

module.exports = {
  router: require("./routes")()
};
