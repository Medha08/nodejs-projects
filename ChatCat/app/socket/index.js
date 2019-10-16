const helper = require("../helper");
module.exports = (io, app) => {
  let allRooms = app.locals.chatRoom;

  // allRooms.push({
  //   room: "NodeJS",
  //   roomId: "001",
  //   user: []
  // });

  // allRooms.push({
  //   room: "ReactJS",
  //   roomId: "002",
  //   user: []
  // });

  io.of("/roomList").on("connection", socket => {
    console.log("Socket Connected at Server");
    socket.on("getChatRooms", () => {
      socket.emit("chatRoomList", JSON.stringify(allRooms));
    });
    socket.on("createChatRoom", newRoom => {
      //check to see if a room with same title exists or not
      // if not, create one and broadcast it to everyone
      if (!helper.findRoomByName(allRooms, newRoom)) {
        allRooms.push({
          room: newRoom,
          roomId: helper.randomRoomId(),
          user: []
        });
        //Emit an updated List to the creator
        socket.emit("chatRoomList", JSON.stringify(allRooms));
        //Emit an updated List to the everyone  connected to the room page
        socket.broadcast.emit("chatRoomList", JSON.stringify(allRooms));
      }
    });
  });

  io.of("/chatter").on("connection", socket => {
    //Join a chatroom
    socket.on("join", data => {
      let userList = helper.addUserToRoom(allRooms, data, socket);

      //Update the list of active users as shown in the chatRoom
      socket.broadcast
        .to(data.roomId)
        .emit("updateUserList", JSON.stringify(userList.user));
      //console.log(userList);
      socket.emit("updateUserList", JSON.stringify(userList.user));
    });

    //Discoonecct the user on logout/leave page
    socket.on("disconnect", () => {
      let room = helper.removeUserFromRoom(allRooms, socket);

      socket.broadcast
        .to(room.roomId)
        .emit("updateUserList", JSON.stringify(room.user));
    });

    //New Message Arrives
    socket.on("newMessage", data => {
      socket.broadcast
        .to(data.roomId)
        .emit("messagesUpdate", JSON.stringify(data));
    });
  });
};
