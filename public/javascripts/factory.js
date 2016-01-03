app.factory('pop', ['$window', function() {
  return function (point) {
      document.getElementById('popDiv').style.display = 'block';
      document.getElementById('gameOverMsg').innerHTML = "<h3>Game Over!</h3><h4>Final Score " + point + "</h4>";
    }
}]);

app.factory('playAgain', ['$window', function() {
  return function () {
      location.reload(true);
    }
}]);
