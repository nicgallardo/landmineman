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
  console.log('a user connected');
});

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


module.exports = io;
