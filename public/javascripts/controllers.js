app.controller('IndexController', ['$scope', function($scope) {
    $scope.greeting = 'Welcome to Landmine Man!';
  }]);
app.controller('HomeController', ['$scope', '$window', function($scope, $window) {
    $scope.greeting = 'Welcome to Landmine Man!';
    var test = $window.navigator.userAgent;
    console.log(test);

  }]);
app.controller('AboutController', ['$scope', function($scope) {
    $scope.greeting = 'Welcome to Landmine Man!';
  }]);
