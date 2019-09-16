const helper = require("../helper");
module.exports = () => {
  const routes = {
    get: {
      "/": (req, res, next) => {
        res.render("login", {
          pageTitle: "My Page"
        });
      },
      "/rooms": (req, res, next) => {
        res.render("rooms");
      },
      "/chatroom": (req, res, next) => {
        res.render("chatroom");
      },
      "/getDataSession": (req, res, next) => {
        res.send("This is session Data" + req.session.hello);
      },
      "/setDataSession": (req, res, next) => {
        req.session.hello = "Hi All";
        res.send("Session Data Set");
      }
    },
    post: {}
  };

  return helper.routes(routes);
};
