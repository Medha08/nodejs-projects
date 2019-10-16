const express = require("express");

const app = express();

const chatCat = require("./app");
const passport = require("passport");
const morgan = require("morgan");

app.set("port", process.env.PORT || 3000);
//app.set("views","./views")
app.set("view engine", "ejs");

app.use(express.static("public"));

// let middle = (req, res, next) => {
//   req.hello = "This is Medha in between hooked!";
//   console.log("Middle " + req.hello);
//   next();
// };

// app.use(middle);

// app.get("/", (req, res, next) => {
//   //res.send("<h1> hello All </h1>");
//   //res.sendFile(__dirname + "/views/login.htm");
//   res.render("login", {
//     pageTitle: "My Page"
//   });
// });
app.use("/", chatCat.session);
app.use(passport.initialize());
app.use(passport.session());

app.use(
  morgan("combined", {
    stream: {
      write: message => {
        chatCat.logger.log("info", message);
      }
    }
  })
);

app.use("/", chatCat.router);
// app.get("/dashboard", (req, res, next) => {
//   console.log(req.hello);
//   res.send("<h1> hello! This is a dashboard!" + req.hello + " </h1>");
// });


chatCat.ioServer(app).listen(app.get("port"), err => {
  if (!err) {
    console.log("Listening at port 3000");
  }
});
