const router = require("express").Router();
const db = require("../db");

let _registerRoutes = (routes, methods) => {
  for (key in routes) {
    //Content must be an object, must not be null , must not be an array
    //console.log("Key", key, routes[key], methods);
    if (
      typeof routes[key] === "object" &&
      routes[key] != null &&
      !(routes[key] instanceof Array)
    ) {
      _registerRoutes(routes[key], key);
    }
    if (methods === "get") {
      router.get(key, routes[key]);
    } else if (methods === "post") {
      router.post(key, routes[key]);
    }
  }
};

let routes = routes => {
  _registerRoutes(routes);
  return router;
};

//Find a single document/user in db with the key
let findOne = profileId => {
  return db.userModel.findOne({
    profileId: profileId
  }); // returns promise
};

//Create a new user and returns that instance

let createNewUser = profile => {
  return new Promise((resolve, reject) => {
    let newUser = new db.userModel({
      profileId: profile.id,
      name: profile.displayName,
      profilePic: profile.photos[0].value || ""
    });

    newUser.save(error => {
      if (error) {
        reject(error);
      } else {
        resolve(newUser);
      }
    });
  });
};

//ES6 promisified version of findById

let findById = userId => {
  return new Promise((resolve, reject) => {
    db.userModel.findById(userId, (error, user) => {
      if (error) {
        reject(error);
      } else {
        resolve(user);
      }
    });
  });
};
module.exports = {
  routes,
  findOne,
  createNewUser,
  findById
};
