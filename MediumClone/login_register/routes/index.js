const helper = require("../helper");

module.exports = () => {
  const routeObj = {
    get: {
      "/signIn": (req, res, next) => {
        res.render("signIn");
      },
      "/signUp": (req, res, next) => {
        res.render("signUp");
      }
    },
    post: {},
    NA: (req, res, next) => {
      res.status(404);
      res.sendFile(process.cwd() + "/views/404.html");
    }
  };

  return helper.routes(routeObj);
};
