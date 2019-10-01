const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const config = require("../config");
const db = require("../db");

const mongoose = db.mongoose.connect;

if (process.env.NODE_ENV === "production") {
  //Implement the Sessions using settings config of production

  module.exports = session({
    secret: config.secretKey,
    saveUninitialized: false,
    resave: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection
    })
  });
} else {
  //Implement the Sessions using settings config of development

  module.exports = session({
    secret: config.secretKey,
    saveUninitialized: true,
    cookie: { secure: false },
    resave: false,
    store: new MongoStore({
      mongooseConnection: db.mongoose.connection
    })
  });
}
