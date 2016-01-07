app.factory('socketDesktopPlayerMovesFactory', ['$window', function(x, y) {
  return function (x, y) {
      var socket = io();
      var trackerObj = {};
      trackerObj["x"] = x, trackerObj["y"] = y;
        socket.on('playerMovement', function(data){
          // $apply();
        })
        socket.emit('tracker', trackerObj);
    }
}]);

app.factory('roomsDesktopPlayerMovesFactory', ['$window', function(x, y) {
  return function (x, y) {
      var socket = io();
      var trackerObj = {};
      trackerObj["x"] = x, trackerObj["y"] = y;
      // socket.on('roomDesktopPlayerMoves', function(data){
      //     // $apply();
      //   })
      socket.emit('roomDesktopPlayerMovesTracker', trackerObj);
    }
}]);
