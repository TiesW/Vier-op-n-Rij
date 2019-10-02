  var Game = {};
  
  // Algemene configuraties voor het spel
  Game.config = {
    startingPlayer: "geel", // 'geel' of 'rood'.
    drawMsg: "Gelijkspel.",
    winMsg: "De winnaar is: ",
    countToWin: 4,
  
    // N.b.: de dimensies van het bord zijn 'zero-indexed'
    boardLength: 6,
    boardHeight: 5,
  };
  
  // Algemene staat van het spel
  Game.board = [[0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0]];
  
  Game.currentPlayer = Game.config.startingPlayer;