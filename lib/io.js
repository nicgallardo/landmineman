var io = require('socket.io')();
var db = require('monk')('localhost/bombroller-users');
var users = db.get('users');

io.on('connection', function(socket){
  socket.on('leader', function(){
    console.log("we're here");
    users.find({}, function (err, docs){
      socket.emit("users", docs)
    })
  })
})


module.exports = io;
