const config = require("../config");
const mongoose = require("mongoose").connect(config.dbURI, {
  useNewUrlParser: true
});

// mongoose.connection.on("error", error => {
//   console.log("MongoDB Error Occurred");
// });
//"dbURI": "mongodb+srv://medha08:Med@2018@cluster0-6veuw.mongodb.net/chatcatdb?retryWrites=true&w=majority",

module.exports = {
  mongoose
};
