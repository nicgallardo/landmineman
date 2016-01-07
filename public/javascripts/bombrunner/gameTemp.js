BOMBRUNNER.game = {
  sound: {
    backgroundMusic: document.getElementById('background'),
    play: function(){
      return BOMBRUNNER.game.sound.backgroundMusic.playbackRate = 0.5;
    },
    stop: function(){
      return BOMBRUNNER.game.sound.backgroundMusic.playbackRate -= 100;
    },
    faster: function(){
      return BOMBRUNNER.game.sound.backgroundMusic.playbackRate += 0.25;
    },
    effects: {
      zap: document.getElementById('zap'),
      explosion: ''
    }

  },
  state: {
    hole: function(moveHole){
      console.log('moveHole', moveHole)
      $('.hole').css({top: moveHole.x, left: moveHole.y})
    },

    roomID: window.location,

    bombs: [],

    createBomb: function(){
      var bombX = Number(Math.random().toFixed(2));
      var bombY = Number(Math.random().toFixed(2));
      var bombCoordX = Math.floor(BOMBRUNNER.game.state.gameWindow * bombX);
      var bombCoordY = Math.floor(BOMBRUNNER.game.state.gameWindow * bombY);
      console.log("dombomb numbers: ", bombCoordY, "percentage dom: ",bombY );
      postBombs(bombX, bombY)
      //TODO create safezone
      function postBombs(x, y) {
        var room = BOMBRUNNER.game.state.roomID.pathname.split('/')[2];
        console.log("room: ",room);
        $.post('/api/v1/bomb/'+ room , {x:x,y:y})
      };
      BOMBRUNNER.game.state.addBombToDom();
    },

    addBombToDom: function(){
      var room = BOMBRUNNER.game.state.roomID.pathname.split('/')[2];
      $.get('/api/v1/room-bombs/'+room, function(doc){
        var bombs = doc.bombs;
        var bombCoordX;
        var bombCoordY;
        for (var i = 0; i < bombs.length; i++) {
          bombCoordX = Math.floor(BOMBRUNNER.game.state.gameWindow * bombs[i][0]);
          bombCoordY = Math.floor(BOMBRUNNER.game.state.gameWindow * bombs[i][1]);
          $('.desktop-garden').append("<div class='bomb' style='top:"+ bombCoordX +"px; left:"+ bombCoordY +"px;'></div>");
        }
      });
    },

    dataState: function(){
      return {
        userName: localStorage.getItem('firstName'),
        facebookId: localStorage.getItem('fbID'),
        points: localStorage.getItem('points')
      }
    },

    gameWindow: window.screen.width/2
  },

  play: {
    mouseEvents: function(events, gameState){
      var playerCoord  = {};
      if(events.offsetY || events.offsetX !== undefined) {
        events.x = events.offsetX;
        events.y = events.offsetY;
      }
      playerCoord.x = events.y;
      playerCoord.y = events.x;
      $('.ball').css({top: playerCoord.x+'px', left: playerCoord.y+'px'})
      return playerCoord;
    },
  },

  logic: {
    detectCollision: function(playerCoord){
      var holeX = Number($('.hole').css('top').split("px")[0]);
      var holeY = Number($('.hole').css('left').split("px")[0]);
      var bombs;
      // console.log("BOMBS IN COLLISION", bombs);
      var x = playerCoord.x;
      var y = playerCoord.y;

      var room = BOMBRUNNER.game.state.roomID.pathname.split('/')[2];
      $.get('/api/v1/room-bombs/'+room, function(doc){
        if(doc !== null){
          var bombs = doc.bombs;
          detectBombs(bombs);
        }
      });

      function detectBombs(bombs) {
        console.log(bombs);
        //need to work this out!!!! TODO
        var bombCoordX = Math.floor(BOMBRUNNER.game.state.gameWindow * bombX);
        var bombCoordY = Math.floor(BOMBRUNNER.game.state.gameWindow * bombY);
        for (var i = 0; i < bombs.length; i++) {
          var dx = bombs[i][0] - x;
          var dy = bombs[i][1] - y;
          var distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 9.5 + 9.5) {
            document.getElementById('popDiv').style.display = 'block';
            document.getElementById('gameOverMsg').innerHTML = "<h3>Game Over!</h3>";
            // BOMBRUNNER.game.sound.stop();
            // BOMBRUNNER.game.sound.effects.explosion();
          }
        }
      };


      var ex = holeX - x;
      var ey = holeY - y;

      var targetDistance = Math.sqrt(ex * ex + ey * ey);
      if(targetDistance < 5 + 5){
        // BOMBRUNNER.game.sound.faster();
        // BOMBRUNNER.game.sound.effects.zap();
        newX = Math.floor(Math.random()*(10, 380));
        newY = Math.floor(Math.random()*(10, 380));
        BOMBRUNNER.game.state.hole({x: newX, y: newY});
        BOMBRUNNER.game.state.createBomb();
      }
    }
  },
  user: {

    randomColor: function (){
      var colors = ['red', 'blue', 'black', 'pink', 'purple', 'orange', 'grey', 'black', 'yellow', 'brown'];
      return colors[Math.floor(Math.random()*(0, 9))];
    }

  }

};
