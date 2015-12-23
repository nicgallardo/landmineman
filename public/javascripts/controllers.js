app.controller('IndexController', ['$scope', function($scope) {

  }]);

app.controller('HomeController', ['$scope', '$window', '$http', '$cookies', function($scope, $window, $http, $cookies) {
    var test = $window.navigator.userAgent;
    $http.get('/user-api').then(function(response){
      console.log(response.data);
      localStorage.setItem('fbID', response.data.fbID);
      localStorage.setItem('firstName', response.data.firstName);
    })
    $scope.userName = localStorage.getItem("firstName");
    // $scope.clearstorage = localStorage.
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
