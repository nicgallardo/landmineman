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

app.factory('keyEventsDesktopFactory', ['$window', function(x, y, changeHoleFn, pop, desktopDomObj, getUserName) {
  return BOMBRUNNER.game.logic.detectExplosion(x, y, changeHoleFn, pop, desktopDomObj, getUserName);
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
