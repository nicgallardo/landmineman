var io = require('socket.io')();
var db = require('monk')('localhost/bombroller-users');
var users = db.get('users');

var allUsers;
users.find({}, function (err, docs){
  allUsers = docs;
})

io.on('connection', function(socket){
  socket.emit("users", allUsers);
  console.log(allUsers);
})

module.exports = io;
