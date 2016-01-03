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

app.factory('keyEventsDesktopFactory', ['$window', function(x, y, bombs, blackHole, ball, boardAlert, point, score, backgroundMusic, changeHoleFn, pop, explosion) {
  return function (x, y, bombs, blackHole, ball, boardAlert, point, score, backgroundMusic, changeHoleFn, pop, explosion) {
    for (var i = 0; i < bombs.length; i++) {
      var dx = bombs[i][0] - x;
      var dy = bombs[i][1] - y;
      var distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 9.5 + 9.5) {
        pop(point);
        boardAlert.innerHTML='<h4>Game Over</h4>';
        backgroundMusic.playbackRate -= 100;
        explosion.play();
      }
    }
//blackHole target logic
    if(blackHole.x == x && blackHole.y == y) {
      boardAlert.innerHTML='<span> Score! Total: '+ point+' !</span>';
      score.innerHTML = point;
      point++;
      backgroundMusic.playbackRate += 0.1;
      zap.play();
      changeHoleFn();
    }

    ball.style.top  = x + "px";
    ball.style.left = y + "px";
    }
}]);

app.factory('changeHoleDesktopFactory', ['$window', function(blackHole, bombs) {
  return function (blackHole, bombs) {
    blackHole.x = Math.floor(Math.random()*(10, 380));
    blackHole.y = Math.floor(Math.random()*(10, 380));
    for (var i = 0; i < bombs.length; i++) {
      var dx = bombs[i][0] - blackHole.x;
      var dy = bombs[i][1] - blackHole.y;
      var distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 10 + 10) {
        changeHoleDesktop();
      }
    }
    var hole = document.querySelector('.hole');
    hole.style.top = blackHole.x + 'px';
    hole.style.left = blackHole.y + 'px';
    }
}]);

app.factory('createBombDesktopFactory', ['$window', function(tempHoleHolder, bombs, garden, trackBombs) {
  return function (tempHoleHolder, bombs, garden, trackBombs) {
    var bombX = Math.floor(Math.random()*(20, 380));
    var bombY = Math.floor(Math.random()*(20, 380));
    //safezone doesnt work
    var xSafeZoneTop = (tempHoleHolder.x -15);
    var xSafeZoneBottom = (tempHoleHolder.x +15);
    var ySafeZoneLeft = (tempHoleHolder.y -15);
    var ySafeZoneRight = (tempHoleHolder.y +15);
    // TODO these need to be debugged?
    if(bombX < xSafeZoneTop && bombX > xSafeZoneBottom) createBomb();
    if(bombY < ySafeZoneLeft && bombY > ySafeZoneRight) createBomb();

    var tempBomb = [];
    tempBomb.push(bombX,bombY);
    bombs.push(tempBomb);

    var landmine = "<div class='bomb' style='top:" + bombX+ "px; left:"+ bombY +"px;'></div>";
    var bomb = document.createElement('div');
    bomb.innerHTML = landmine;
    garden.appendChild(bomb);
    trackBombs(bombs);
    }
}]);
