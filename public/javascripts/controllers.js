app.controller('IndexController', ['$scope', function($scope) {

  }]);

app.controller('HomeController', ['$scope', '$window', '$http', function($scope, $window,$http) {
    var usersFirst = localStorage.getItem("firstname");
    //needs this for the nav show hide logic. not sure why?! TODO: FIX!
    $http.get('/me').then(function(response){
      $scope.userName = localStorage.getItem("firstName");
    }, function (err) {
    })
}]);

app.controller('NavController', ['$scope', '$window', '$http', function($scope, $window, $http) {
    var findBrowser = $window.navigator.userAgent;

    $http.get('/me').then(function(response){
      localStorage.setItem('fbID', response.data.facebookId);
      localStorage.setItem('firstName', response.data.firstname);
      localStorage.setItem('points', response.data.points)
      $scope.userName = localStorage.getItem("firstName");

    }, function (err) {
      localStorage.removeItem('fbID');
      localStorage.removeItem('firstName');
      localStorage.removeItem('points');
      $scope.userName = null;

    })
}]);

app.controller('AboutController', ['$scope', "$http", function($scope, $http) {

}]);

app.controller('LeadersController', ['$scope', function($scope) {
  var socket = io();
  // send a message
  socket.on('users', function(data){
    $scope.users = data;
    $scope.$apply();
  })
  socket.emit('leader', 'dummy');
   //learning experince
  // register a destroy hook that clears all listeners - check the learning experience
}]);

app.controller('GamesController', ['$scope', '$http',  function($scope, $http) {
  var backgroundMusic = document.getElementById('background');
  backgroundMusic.playbackRate = 0.5;



  var zap = document.getElementById('zap')
  var explosion = document.getElementById('kaboom')
  var domAlert = document.createElement('div');
  var ball   = document.querySelector('.ball');
  var garden = document.querySelector('.garden');
  var output = document.querySelector('.output');
  var score = document.querySelector('.score');
  var blackHoleLocation = document.querySelector('.blackhole-location')
  var domHoleLocation = document.querySelector('.domHole-location')
  var maxX = garden.clientWidth  - ball.clientWidth;
  var maxY = garden.clientHeight - ball.clientHeight;
  var blackHole = {
    x: 10,
    y: 10,
  }

  var point = 1;
  function handleOrientation(event) {
    var x = Math.floor(event.beta);
    var y = Math.floor(event.gamma);
//bomb hit logic
    for (var i = 0; i < bombs.length; i++) {
      var dx = bombs[i][0] - x;
      var dy = bombs[i][1] - y;
      var distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 9.5 + 9.5) {
        domAlert.innerHTML='<h4>Game Over</h4>';
        document.querySelector('.ticker').appendChild(domAlert);
        backgroundMusic.playbackRate -= 100;
        explosion.play();
      }
    }
//blackHole target logic
    if(blackHole.x == x && blackHole.y == y) {
      domAlert.innerHTML='<span>Score!</span>';
      document.querySelector('.ticker').appendChild(domAlert);
      score.innerHTML = point;
      point++;
      backgroundMusic.playbackRate += 0.1;
      zap.play();
      changeHole();
    }
    // console.log("x: ", x, " y: ", y);
    output.innerHTML = "beta : " + x + "\n";
    output.innerHTML += "gamma: " + y + "\n";

    if (x >  90) { x =  90};
    if (x < -90) { x = -90};

    x += 90;
    y += 90;

    ball.style.top  = (maxX*x/180 - 10) + "px";
    ball.style.left = (maxY*y/180 - 10) + "px";
  }

  function correctNumb(numb){
    if(numb == 0 ) return 90;
    if(numb == 90) return 0;
    return numb > 90 ? (numb-80): -(-numb + 80);
  }

  function changeHole() {
    var xCoord = Math.floor(Math.random()*(10, 170));
    var yCoord = Math.floor(Math.random()*(10, 170));
    blackHole.x = correctNumb(xCoord);
    blackHole.y = correctNumb(yCoord);

    xCoord, yCoord;
    var hole = document.querySelector('.hole');
    hole.style.top = xCoord + 'px';
    hole.style.left = yCoord + 'px';

    blackHoleLocation.innerHTML = "blackHole.x : " + blackHole.x + "  blackHole.y : " + blackHole.y;
    domHoleLocation.innerHTML = "dom.xCoord : " + xCoord + "  dom.yCoord : " + yCoord;

    createBomb();
  }
  var bombs = [];
  function createBomb() {
    //10, 170
    var xCoord = Math.floor(Math.random()*(30, 150));
    var yCoord = Math.floor(Math.random()*(30, 150));

    bombX = correctNumb(xCoord);
    bombY = correctNumb(yCoord);

    var tempBomb = [];
    tempBomb.push(bombX,bombY);
    bombs.push(tempBomb);

    var landmine = "<div class='bomb' style='top:" + xCoord+ "px; left:"+ yCoord +"px;'></div>";
    var bomb = document.createElement('div');
    bomb.innerHTML = landmine;
    garden.appendChild(bomb);
  }

  window.addEventListener('deviceorientation', handleOrientation);

  // below increments the score only
  $scope.count = 0;
  $scope.increment = function(){
    explosion.play();
    $scope.count++;
    // var dataObj = {
    //   score : $scope.count,
    // }
    // $http.post('/api/v1/add-point', dataObj).
    // success(function(data) {
    //     console.log("posted successfully: ", data);
    // }).error(function(data) {
    //     console.error("error in posting: ", data);
    // })
  }
}]);

//desktop game -----------------------------------------------------------------

app.controller('DesktopGamesController', ['$scope', '$http',  function($scope, $http) {

  var backgroundMusic = document.getElementById('background');
  backgroundMusic.playbackRate = 0.5;
  var zap = document.getElementById('zap')
  var explosion = document.getElementById('kaboom')
  var domAlert = document.createElement('div');
  var ball   = document.querySelector('.ball');
  var garden = document.querySelector('.desktop-garden');
  var output = document.querySelector('.output');
  var score = document.querySelector('.score');
  var blackHoleLocation = document.querySelector('.blackhole-location')
  var domHoleLocation = document.querySelector('.domHole-location')
  var maxX = garden.clientWidth  - ball.clientWidth;
  var maxY = garden.clientHeight - ball.clientHeight;
  var tempHoleHolder;
  var blackHole = {
    x: 90,
    y: 90,
  }
  trackBlackHole(blackHole);

  var point = 1;
  var x = 0, y = 0;
  $scope.mouseTrack = function($event){
    y = $event.offsetX;
    x = $event.offsetY
    keyEvents(x, y)
    trackObjCreator(x, y)
  }

  function keyEvents(x, y) {
    for (var i = 0; i < bombs.length; i++) {
      var dx = bombs[i][0] - x;
      var dy = bombs[i][1] - y;
      var distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 9.5 + 9.5) {
        domAlert.innerHTML='<h4>Game Over</h4>';
        document.querySelector('.ticker').appendChild(domAlert);
        backgroundMusic.playbackRate -= 100;
        explosion.play();
      }
    }
//blackHole target logic
    if(blackHole.x == x && blackHole.y == y) {
      domAlert.innerHTML='<span>Score!</span>';
      document.querySelector('.ticker').appendChild(domAlert);
      score.innerHTML = point;
      point++;
      backgroundMusic.playbackRate += 0.1;
      zap.play();
      changeHole();
    }
    output.innerHTML = "beta : " + x + "\n";
    output.innerHTML += "gamma: " + y + "\n";

    ball.style.top  = x + "px";
    ball.style.left = y + "px";
  }

  function changeHole() {
    tempHoleHolder = blackHole;
    blackHole.x = Math.floor(Math.random()*(10, 380));
    blackHole.y = Math.floor(Math.random()*(10, 380));


    for (var i = 0; i < bombs.length; i++) {
      var dx = bombs[i][0] - blackHole.x;
      var dy = bombs[i][1] - blackHole.y;
      var distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 10 + 10) {
        changeHole();
      }
    }

    var hole = document.querySelector('.hole');
    hole.style.top = blackHole.x + 'px';
    hole.style.left = blackHole.y + 'px';

    // blackHoleLocation.innerHTML = "blackHole.x : " + blackHole.x + "  blackHole.y : " + blackHole.y;
    // domHoleLocation.innerHTML = "dom.xCoord : " + xCoord + "  dom.yCoord : " + yCoord;
    createBomb();
    trackBlackHole(blackHole)
  }
  var bombs = [];

  function createBomb() {
    var bombX = Math.floor(Math.random()*(20, 380));
    var bombY = Math.floor(Math.random()*(20, 380));
    //safezone doesnt work
    var xSafeZoneTop = (tempHoleHolder.x -15);
    var xSafeZoneBottom = (tempHoleHolder.x +15);
    var ySafeZoneLeft = (tempHoleHolder.y -15);
    var ySafeZoneRight = (tempHoleHolder.y +15);
    console.log("tempHoleHolder :",tempHoleHolder);
    console.log("safezone:", ySafeZoneRight, ySafeZoneLeft);
    if(bombX < xSafeZoneTop && bombX > xSafeZoneBottom){
      console.log("SAFEZONE TRIPPED");
      createBomb();
    }
    if(bombY < ySafeZoneLeft && bombY > ySafeZoneRight){
      console.log("SAFEZONE TRIPPED");
      createBomb();
    }

    var tempBomb = [];
    tempBomb.push(bombX,bombY);
    bombs.push(tempBomb);

    var landmine = "<div class='bomb' style='top:" + bombX+ "px; left:"+ bombY +"px;'></div>";
    var bomb = document.createElement('div');
    bomb.innerHTML = landmine;
    garden.appendChild(bomb);
    trackBombs(bombs);
  }
  //socket tracker
  var socket = io();
  var trackerObj = {};
  function trackObjCreator(x, y) {
    trackerObj["x"] = x, trackerObj["y"] = y;
    socket.on('playerMovement', function(data){
      $scope.movement = data;
      $scope.$apply();
    })
    socket.emit('tracker', trackerObj);
  }

  function trackBlackHole(blackHole){
    var socket = io();
    socket.on('holeMovement', function(data){
      $scope.holeMovement = data;
      $scope.$apply();
    })
    socket.emit('trackHole', blackHole);
  }

  function trackBombs(bombsArray) {
    var socket = io();
    socket.on('bombsTracked', function(data){
      $scope.holeMovement = data;
      $scope.$apply();
    })
    socket.emit('trackBombs', bombsArray);
  }

}]);

app.controller('WatchController', ['$scope', '$http',  function($scope, $http) {
  //track all movement player movement; holeMovement; bombsAdded justlook broadcast the bombsArray;

  var socket = io();
  socket.on('playerMovement', function(data){
    console.log("playerMovement: ",data);
    $scope.movement = data;
    $scope.$apply();
  })

  socket.on('holeMovement', function(data){
    console.log("holeMovement: ",data);
    $scope.holeMovement = data;
    $scope.$apply();
  })

  socket.on('bombsTracked', function(data){
    console.log("bombsTracked: ",data);
    $scope.bombsTracked = data;
    $scope.$apply();
  })


}]);
