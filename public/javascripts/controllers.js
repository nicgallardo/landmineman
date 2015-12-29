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
