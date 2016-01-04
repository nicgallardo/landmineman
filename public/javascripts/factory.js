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

 app.factory('blinkingDivFactory', ['$window', function(elem){
   return function (elem){
     blinkDiv(elem)
     function blinkDiv(elem) {
       $(elem).fadeOut('fast', function(){
         $(this).fadeIn('fast', function(){
           blinkDiv(this);
         });
       });
     }
   }
 }]);

app.factory('keyEventsDesktopFactory', ['$window', function(x, y, changeHoleFn, pop, desktopDomObj) {
  return function (x, y, changeHoleFn, pop, desktopDomObj) {
    for (var i = 0; i < desktopDomObj.bombs.length; i++) {
      var dx = desktopDomObj.bombs[i][0] - x;
      var dy = desktopDomObj.bombs[i][1] - y;
      var distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 9.5 + 9.5) {
        pop(desktopDomObj.points);
        desktopDomObj.backgroundMusic.playbackRate -= 100;
        desktopDomObj.explosion.play();
      }
    }

    if(desktopDomObj.blackHole.x == x && desktopDomObj.blackHole.y == y) {
      desktopDomObj.points++;
      desktopDomObj.boardAlert.innerHTML='<span> Score! Total: '+ desktopDomObj.points+' !</span>';
      desktopDomObj.score.innerHTML = desktopDomObj.points;
      desktopDomObj.backgroundMusic.playbackRate += .25;
      zap.play();
      changeHoleFn();
    }

    desktopDomObj.ball.style.top  = x + "px";
    desktopDomObj.ball.style.left = y + "px";
    }
}]);

app.factory('changeHoleDesktopFactory', ['$window', function(desktopDomObj) {
  return function (desktopDomObj) {
    desktopDomObj.blackHole.x = Math.floor(Math.random()*(10, 380));
    desktopDomObj.blackHole.y = Math.floor(Math.random()*(10, 380));
    for (var i = 0; i < desktopDomObj.bombs.length; i++) {
      var dx = desktopDomObj.bombs[i][0] - desktopDomObj.blackHole.x;
      var dy = desktopDomObj.bombs[i][1] - desktopDomObj.blackHole.y;
      var distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 10 + 10) {
        changeHoleDesktop();
      }
    }
    desktopDomObj.hole.style.top = desktopDomObj.blackHole.x + 'px';
    desktopDomObj.hole.style.left = desktopDomObj.blackHole.y + 'px';
    }
}]);



app.factory('createBombDesktopFactory', ['$window', function(trackBombs, desktopDomObj) {
  return function (trackBombs, desktopDomObj) {
    var bombX = Math.floor(Math.random()*(20, 380));
    var bombY = Math.floor(Math.random()*(20, 380));
    //safezone doesnt work
    var xSafeZoneTop = (desktopDomObj.tempHoleHolder.x -15);
    var xSafeZoneBottom = (desktopDomObj.tempHoleHolder.x +15);
    var ySafeZoneLeft = (desktopDomObj.tempHoleHolder.y -15);
    var ySafeZoneRight = (desktopDomObj.tempHoleHolder.y +15);
    // TODO these need to be debugged?
    if(bombX < xSafeZoneTop && bombX > xSafeZoneBottom) createBomb();
    if(bombY < ySafeZoneLeft && bombY > ySafeZoneRight) createBomb();

    var tempBomb = [];
    tempBomb.push(bombX,bombY);
    desktopDomObj.bombs.push(tempBomb);

    var landmine = "<div class='bomb' style='top:" + bombX+ "px; left:"+ bombY +"px;'></div>";
    var bomb = document.createElement('div');
    bomb.innerHTML = landmine;
    desktopDomObj.garden.appendChild(bomb);
    trackBombs(desktopDomObj.bombs);
    }
}]);
