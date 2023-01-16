const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://oiverse.azurewebsites.net",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  //socket.disconnect();
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    console.log(`join_room by ${socket.id}`, data);
    socket.join(data);
  });

  socket.on("leave_room", (data) => {
    socket.leave(data);
  });

  socket.on("remove_player", (data) => {
    console.log('removed',data);
    socket.to(data.roomId).emit("receive_message", data)  });

  socket.on("disconnect", (data) => {
    console.log(`Got disconnect!${socket.id}`, data);
  });

  socket.on("send_message", (data) => {
     console.log(data);
    //socket.broadcast.emit("receive_message", data);
    // socket.to(data.roomId).emit("receive_message", data);
    socket.to(data.roomId).emit("receive_message", data);
  });
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});
