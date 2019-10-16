const router = require("express").Router();
const db = require("../db");
const crypto = require("crypto");
// Iterate through the routes object and mount the routes
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
    } else {
      //console.log("Inside else", routes["NA"]);
      router.use(routes["NA"]);
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

//A middleware that checks to see  if the user is  authenticated and logged in
let isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/");
  }
};

let findRoomByName = (allRooms, room) => {
  //new feature to find index of element based on condition that can be mentioned in callback, woks best with array of objects,as it iterates over every elt of array gives ref to exact index,element and whole array
  let findRoomIndex = allRooms.findIndex((element, index, array) => {
    if (element.room == room) {
      return true;
    } else {
      return false;
    }
  });
  //if elt not found returns -1
  return findRoomIndex > -1 ? true : false;
};

let randomRoomId = () => {
  return crypto.randomBytes(24).toString("hex");
};

let findRoomByID = (allRooms, roomId) => {
  let findRoom = allRooms.find((element, index, array) => {
    if (element.roomId == roomId) {
      return true;
    } else {
      return false;
    }
  });
  //console.log("Room", findRoom);
  return findRoom;
};

//Add User To ChatRoom
let addUserToRoom = (allRooms, data, socket) => {
  //Get the room Object
  let getRoom = findRoomByID(allRooms, data.roomId);

  if (getRoom !== undefined) {
    //Get the active user's Id(Object ID used in session -> unique identifier of user in room)
    let userID = socket.request.session.passport.user; // Same as re.user but made possible to use here due to bridge created using express-session to get current user data
    //console.log("UserID", userID, "getRoom", getRoom);
    //primary key and will be used to look up users in chatRoom users array.

    //Check to see if the user already exists in the chatroom before prompting him to join again after refresh or if not add him in room
    let checkUser = getRoom.user.findIndex((element, index, array) => {
      if (userID == element.userID) {
        return true;
      } else {
        return false;
      }
    });

    //If the User already present in room remove him first (connected via 2 browsers)
    if (checkUser > -1) {
      getRoom.user.splice(checkUser, 1);
    }
    //Push the user into room's users array
    getRoom.user.push({
      socketID: socket.id,
      userID: userID,
      userName: data.userName,
      userPic: data.userPic
    });

    //Join the channel
    socket.join(data.roomId);

    //Return the updated room Object
    return getRoom;
  }
};
//Find and purge user when socket disconnects
let removeUserFromRoom = (allRooms, socket) => {
  for (let room of allRooms) {
    //Find User
    let findUser = room.user.findIndex((element, index, array) => {
     // console.log("Element", element);
      if (element.socketID === socket.id) {
        // console.log(
        //   element.socketID === socket.id,
        //   element.socketID,
        //   socket.id
        // );
        return true;
      } else {
        return false;
      }
    });

    //console.log("findUser", findUser);

    if (findUser > -1) {
      socket.leave();
      room.user.splice(findUser, 1);
      return room;
    }
  }
};

module.exports = {
  routes,
  findOne,
  createNewUser,
  findById,
  isAuthenticated,
  findRoomByName,
  randomRoomId,
  findRoomByID,
  addUserToRoom,
  removeUserFromRoom
};
