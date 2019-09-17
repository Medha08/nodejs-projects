const express = require("express");
const app = express();

const loginRegister = require("./login_register");

const port = process.env.PORT || 4040;

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use("/", loginRegister.router);

app.listen(port, err => {
  if (!err) {
    console.log(`Medium Clone listening at port ${port}`);
  }
});
