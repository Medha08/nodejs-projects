const express = require("express");
const bodyParser = require("body-parser");
const stripe = require("stripe")("pk_test_lH2QAqWCJgcCEGHEwc929ALH00WBYphJKj");

const exhb = require("express-handlebars");

const app = express();

app.engine("handlebars", exhb({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//add middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(`${__dirname}/public`));

//add routes
app.get("/", (req, res) => {
  res.render("home");
});

const port = process.env.Port || 8080;

app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});
