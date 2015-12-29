app.config(function($routeProvider, $locationProvider){
    $routeProvider
      .when('/', {
        templateUrl: 'partials/home.html',
        controller: 'HomeController'
      })
      .when('/about', {
        templateUrl: 'partials/about.html',
        controller: 'AboutController'
      })
      .when('/leaders', {
        templateUrl: 'partials/leaders.html',
        controller: 'LeadersController'
      })
      .when('/game', {
        templateUrl: 'partials/game.html',
        controller: 'GamesController'
      })
      .otherwise({redirectTo:'/'});
      $locationProvider.html5Mode(true);
  })
