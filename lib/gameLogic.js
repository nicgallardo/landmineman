// var io = require('socket.io')();
var db = require('monk')('localhost/bombroller-users');
var users = db.get('users');
var ball   = document.querySelector('.ball');
var garden = document.querySelector('.garden');
var output = document.querySelector('.output');
var score = document.querySelector('.score');
var blackHoleLocation = document.querySelector('.blackhole-location')

var maxX = garden.clientWidth  - ball.clientWidth;
var maxY = garden.clientHeight - ball.clientHeight;
var blackHole = {
  x: 10,
  y: 10
}

var point = 1;
//need to loop through bombs object constantly to see if they are hit
//needs to loop through bombs to make sure new bomb isnt placed where the hole is when player achieves point
//create bomb needs to loop through the bombs to make sure bombs are not placed on top of another
function handleOrientation(event) {
  var x = Math.floor(event.beta);
  var y = Math.floor(event.gamma);

  for (var key in bombs) {
    console.log((bombs[key].x), x);
    if((bombs[key].x-10) == x && (bombs[key].y - 10) == y){
      // console.log("Dead");
    }
  }

  if(blackHole.x == x && blackHole.y == y) {
    score.innerHTML = point;
    point++;
    changeHole();
  }

  // output.innerHTML = "beta : " + x + "\n";
  // output.innerHTML += "gamma: " + y + "\n";

  if (x >  90) { x =  90};
  if (x < -90) { x = -90};

  x += 90;
  y += 90;

  ball.style.top  = (maxX*x/180 - 10) + "px";
  ball.style.left = (maxY*y/180 - 10) + "px";
}

function correctNumb(numb){
  if(numb == 0 ) return 90;
  if(numb == 90) return 0;
  return numb > 90 ? (numb-80) : -(-numb + 80);
}

function changeHole() {
  var xCoord = Math.floor(Math.random()*(10, 170));
  var yCoord = Math.floor(Math.random()*(10, 170));
  blackHole.x = correctNumb(xCoord);
  blackHole.y = correctNumb(yCoord);

  var hole = document.querySelector('.hole');
  hole.style.top = xCoord + 'px';
  hole.style.left = yCoord + 'px';

  // blackHoleLocation.innerHTML = "blackHole.x : " + blackHole.x + "  blackHole.y : " + blackHole.y;

  createBomb();
}
//array rather object
var bombs = [];
function createBomb() {
  var xCoord = Math.floor(Math.random()*(10, 170));
  var yCoord = Math.floor(Math.random()*(10, 170));

  bombX = correctNumb(xCoord);
  bombY = correctNumb(yCoord);

  var tempBomb = [];
  tempBomb.push(bombX,bombY);
  bombs.push(tempBomb);

  var landmine = "<div class='bomb' style='top:" + xCoord + "px; left:"+ yCoord +"px;'></div>";
  var bomb = document.createElement('div');
  bomb.innerHTML = landmine;
  garden.appendChild(bomb);
}

window.addEventListener('deviceorientation', handleOrientation);

// io.on('connection', function(socket){
//   socket.on('leader', function(){
//     users.find({}, function (err, docs){
//       socket.emit("users", docs)
//     })
//   })
// })

module.exports = gameLogic;
