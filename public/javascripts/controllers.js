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
    var test = $window.navigator.userAgent;

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
  //need to loop through bombs object constantly to see if they are hit
  //needs to loop through bombs to make sure new bomb isnt placed where the hole is when player achieves point
  //create bomb needs to loop through the bombs to make sure bombs are not placed on top of another
  function handleOrientation(event) {
    var x = Math.floor(event.beta);
    var y = Math.floor(event.gamma);

    for (var i = 0; i < bombs.length; i++) {
      var dx = bombs[i][0] - x;
      var dy = bombs[i][1] - y;
      var distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 9.5 + 9.5) {
        domAlert.innerHTML='<h1>DEAD</h1>';
        garden.appendChild(domAlert);
      }
    }


    if(blackHole.x == x && blackHole.y == y) {
      score.innerHTML = point;
      point++;
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
    $scope.count++;
    var dataObj = {
      score : $scope.count,
    }
    $http.post('/api/v1/add-point', dataObj).
    success(function(data) {
        console.log("posted successfully: ", data);
    }).error(function(data) {
        console.error("error in posting: ", data);
    })
  }
}]);
