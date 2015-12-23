app.controller('IndexController', ['$scope', function($scope) {

  }]);

app.controller('HomeController', ['$scope', '$http', function($scope, $http) {
    $http.get('/me').then(function(response){
      // localStorage.setItem('fbID', response.data.fbID);
      // localStorage.setItem('firstName', response.data.firstName);
      $scope.userName = localStorage.getItem("firstName");
    }, function (err) {
      // localStorage.removeItem('fbID');
      // localStorage.removeItem('firstName');
      // $scope.userName = null;

    })
}]);

app.controller('NavController', ['$scope', '$window', '$http', function($scope, $window, $http) {
    var test = $window.navigator.userAgent;

    $http.get('/me').then(function(response){
      // console.log(response.data);
      localStorage.setItem('fbID', response.data.fbID);
      localStorage.setItem('firstName', response.data.firstName);
      $scope.userName = localStorage.getItem("firstName");

    }, function (err) {
      localStorage.removeItem('fbID');
      localStorage.removeItem('firstName');
      $scope.userName = null;

    })
}]);

app.controller('AboutController', ['$scope', "$http", function($scope, $http) {

}]);

app.controller('LeadersController', ['$scope', function($scope) {
  var socket = io();
  socket.on('users', function(data){
    console.log(data);
    $scope.users = data;
    $scope.$apply();
  })
    $scope.greeting = 'Welcome to Landmine Man!';
}]);
