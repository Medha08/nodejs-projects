const passport = require("passport");
const facebookStrategy = require("passport-facebook").Strategy;
const twitterStrategy = require("passport-twitter").Strategy;
const config = require("../config");
const helper = require("../helper");

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id); // unique id of mongodb
  });

  passport.deserializeUser((id, done) => {
    helper
      .findById(id)
      .then(user => {
        // console.log("user", user);
        done(null, user);
      })
      .catch(error => console.log(error));
  });

  const authFuncCb = (accessToken, refreshToken, profile, done) => {
    //console.log("AccessToken", accessToken, "Refresh token", refreshToken);
    //cb takes data out of auth to rest of our workflow
    //the callback is called verify callback
    //job is to find user in local db via  profile.id which represents userId as returned by fb
    //If user found,we don't need to repeatedly fetch it from facebook rather we fetch and return the found user from mongodb and send it to verifier callback using done() method
    //Once done is invoked user data becomes available for app to use

    //If user not found, then create one return
    helper.findOne(profile.id).then(result => {
      if (result) {
        done(null, result);
      } else {
        //Create a new user and return
        helper
          .createNewUser(profile)
          .then(newChatUser => done(null, newChatUser))
          .catch(error => console.log("Error while creating new user"));
      }
    });
  };

  passport.use(new facebookStrategy(config.fb, authFuncCb));
  passport.use(new twitterStrategy(config.twitter, authFuncCb));
};
