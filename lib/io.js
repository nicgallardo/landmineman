var io = require('socket.io')();
var db = require('monk')('localhost/bombroller-users');
var users = db.get('users');

io.on('connection', function(socket){
  socket.on('leader', function(){
    users.find({}, function (err, docs){
      socket.emit("users", docs)
    })
  })
})


io.on('connection', function(socket){
  socket.on('tracker', function(data){
    socket.emit("playerMovement", data);
    socket.broadcast.emit("playerMovement", data);
  })
})

io.on('connection', function(socket){
  socket.on('trackHole', function(data){
    socket.emit("holeMovement", data);
    socket.broadcast.emit("holeMovement", data);
  })
})

io.on('connection', function(socket){
  socket.on('trackBombs', function(data){
    socket.emit("bombsTracked", data);
    socket.broadcast.emit("bombsTracked", data);
  })
})

io.on('connection', function(socket) {
  socket.on('createRoom', function(room){
    socket.room = room;
  })
  socket.on('addUser', function(username){
    socket.username = username;
    socket.join(socket.room);
    console.log("socket", socket.username);
    socket.broadcast.to(socket.room).emit('updatechat', socket.username);
  })
});

module.exports = io;
