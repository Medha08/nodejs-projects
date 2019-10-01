if (process.env.NODE_ENV === "production") {
  //Offer production stage environment variables
  module.exports = {
    host: process.env.host || "",
    dbURI: process.env.dbURI,
    secretKey: process.env.secretKey,
    fb: {
      clientID: process.env.fbClientID,
      clientSecret: process.env.fbClientSecret,
      callbackURL: process.env.host + "/auth/facebook/callback",
      profileFields: ["id", "displayName", "photos"]
    },
    twitter: {
      consumerKey: process.env.twconsumerKey,
      consumerSecret: process.env.twconsumerSecret,
      callbackURL: process.env.host + "/auth/twitter/callback",
      profileFields: ["id", "displayName", "photos"]
    }
  };
} else {
  //offer dev stage settings and data
  module.exports = require("./development.json");
}
