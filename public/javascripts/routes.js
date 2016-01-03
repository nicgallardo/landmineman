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
      .when('/game-desktop', {
        templateUrl: 'partials/game-desktop.html',
        controller: 'DesktopGamesController'
      })
      .when('/desktop-watch', {
        templateUrl: 'partials/desktop-watch.html',
        controller: 'WatchController'
      })
      .when('/room/:id', {
        templateUrl: 'partials/room.html',
        controller: 'RoomController'
      })
      .when('/test', {
        templateUrl: 'partials/test.html',
        controller: 'TestController'
      })
      .otherwise({redirectTo:'/'});
      $locationProvider.html5Mode(true);
  })
