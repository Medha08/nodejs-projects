const config = require("../config");
const mongoose = require("mongoose");
mongoose.connect(config.dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// mongoose.connection.on("error", error => {
//   console.log("MongoDB Error Occurred");
// });
//"dbURI": "mongodb+srv://medha08:Med@2018@cluster0-6veuw.mongodb.net/chatcatdb?retryWrites=true&w=majority",

let UserSchema = new mongoose.Schema({
  profileId: String,
  name: String,
  profilePic: String
});

//Turn the schema into a usable model

let userModel = mongoose.model("User", UserSchema);

module.exports = {
  mongoose,
  userModel
};
