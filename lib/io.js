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
  socket.on('tracker', function(){
      socket.emit("playerMovement", "This is only a test")
  })
})

module.exports = io;
