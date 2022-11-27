const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://main--magenta-tarsier-65a38d.netlify.app",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  // socket.disconnect();
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    console.log(data);
    //socket.broadcast.emit("receive_message", data);
    socket.to(data.roomId).emit("receive_message", data);
  });
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});
