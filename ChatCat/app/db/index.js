const config = require("../config");
const mongoose = require("mongoose");
const logger = require("../logger");
mongoose.connect(config.dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
// Log an error if the connection fails
mongoose.connection.on("error", error => {
  logger.log(error, "MongoDB Error Occurred");
});
//"dbURI": "mongodb+srv://medha08:Med@2018@cluster0-6veuw.mongodb.net/chatcatdb?retryWrites=true&w=majority",
//Create a Schema that defines the structure for storing user data
let UserSchema = new mongoose.Schema({
  profileId: String,
  name: String,
  profilePic: String
});

let ChatRoomSchema = new mongoose.Schema({
  room: String,
  roomId: String,
  user: [{
    socketID: String,
    userID: String,
    userName: String,
    userPic: String
  }]
})

//Turn the schema into a usable model
let userModel = mongoose.model("User", UserSchema);
let chatRoomModel = mongoose.model("ChatRoom", ChatRoomSchema);

module.exports = {
  mongoose,
  userModel,
  chatRoomModel
};
