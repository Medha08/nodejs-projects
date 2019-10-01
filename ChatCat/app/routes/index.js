const helper = require("../helper");
const passport = require("passport");
const config = require("../config");
module.exports = () => {
  const routes = {
    get: {
      "/": (req, res, next) => {
        res.render("login", {
          pageTitle: "My Page"
        });
      },
      "/rooms": [
        helper.isAuthenticated,
        (req, res, next) => {
          //console.log("user", req.user);
          res.render("rooms", {
            user: req.user,
            host: config.host
          });
        }
      ],
      "/chatroom/:id": [
        helper.isAuthenticated,
        (req, res, next) => {
          //get the room if the particular room id exists
          let getRoom = helper.findRoomByID(
            req.app.locals.chatRoom,
            req.params.id
          );
          if (getRoom == undefined) {
            return next();
          } else {
            res.render("chatroom", {
              user: req.user,
              host: config.host,
              room: getRoom.room,
              roomId: getRoom.roomId
            });
          }
        }
      ],
      "/auth/facebook": passport.authenticate("facebook"),
      "/auth/facebook/callback": passport.authenticate("facebook", {
        successRedirect: "/rooms",
        faliureRedirect: "/"
      }),
      "/auth/twitter": passport.authenticate("twitter"),
      "/auth/twitter/callback": passport.authenticate("twitter", {
        successRedirect: "/rooms",
        faliureRedirect: "/"
      }),
      "/logout": (req, res, next) => {
        req.logout();
        res.redirect("/");
      }
      // "/getDataSession": (req, res, next) => {
      //   res.send("This is session Data" + req.session.hello);
      // },
      // "/setDataSession": (req, res, next) => {
      //   req.session.hello = "Hi All";
      //   res.send("Session Data Set");
      // }
    },
    post: {},
    NA: (req, res, next) => {
      res.status(404).sendFile(process.cwd() + "/views/404.html");
    }
  };

  return helper.routes(routes);
};
