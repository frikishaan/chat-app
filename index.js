const express = require("express");
const app = express()();
const io = require("socket.io").listen(app);

// PORT number
const PORT = process.env.PORT || 5000;

const users = {};

// io.configure(function() {
//   io.set("transports", ["xhr-polling"]);
//   io.set("polling duration", 10);
// });

io.on("connection", function(socket, msg) {
  // Connected event

  socket.on("connected", function(name) {
    users[socket.id] = name;
    socket.broadcast.emit("user-connected", name);
  });

  // Disconnected event
  socket.on("disconnect", function() {
    socket.broadcast.emit("user-disconnected", users[socket.id]);
    delete users[socket.id];
  });

  socket.on("message", function(msg) {
    socket.broadcast.emit("message", { text: msg, name: users[socket.id] });
  });
});

app.listen(PORT);
