Game.do = (function() {
    function addDiscToBoard(x_pos, y_pos) {
      Game.board[y_pos][x_pos] = Game.currentPlayer;
    }
  
    function printBoard() {
      var row, cell;
      for (var y = 0; y <= Game.config.boardHeight; y++) {
        for (var x = 0; x <= Game.config.boardLength; x++) {
          if (Game.check.isPositionTaken(x, y)) {
            row = document.querySelector('tr:nth-child(' + (1 + y) + ')');
            cell = row.querySelector('td:nth-child(' + (1 + x) + ')');
            cell.firstElementChild.classList.add(Game.board[y][x]);
          }
        }
      }
    }
  
    // Van speler wisselen
    function changePlayer() {
      var currentPlayerNameEl = document.querySelector('#current-player');
      var otherPlayerNameEl = document.querySelector('#other-player');
  
      var otherPlayer = Game.currentPlayer
      var otherPlayerName = currentPlayerNameEl.textContent;
      var currentPlayerName = otherPlayerNameEl.textContent;
      Game.currentPlayer = (Game.currentPlayer === 'geel') ? 'rood' : 'geel';
  
  
      // Spelerwissel aangeven in scherm
      currentPlayerNameEl.classList.remove(otherPlayer);
      currentPlayerNameEl.classList.add(Game.currentPlayer);
      currentPlayerNameEl.textContent = currentPlayerName;
  
      otherPlayerNameEl.classList.remove(Game.currentPlayer);
      otherPlayerNameEl.classList.add(otherPlayer);
      otherPlayerNameEl.textContent = otherPlayerName;
  
    }
  
    function dropToBottom(x_pos, y_pos) {
      // Vanaf de bodem van de rij checken of elk hokje gevuld is, en zo niet, dan die 'y' invullen.
      for (var y = Game.config.boardHeight; y > y_pos; y--) {
        if (!Game.check.isPositionTaken(x_pos, y)) {
          return y;
        }
      }
      return y_pos;
    }
  
    return {
      addDiscToBoard,
      printBoard,
      changePlayer,
      dropToBottom
    };
  })();
  
  
  
  //Status checks.
  
  Game.check = (function() {
    function isPositionTaken(x_pos, y_pos) {
      return Game.board[y_pos][x_pos] !== 0;
    }
  
    function isGameADraw() {
      for (var y = 0; y <= Game.config.boardHeight; y++) {
        for (var x = 0; x <= Game.config.boardLength; x++) {
          if (!isPositionTaken(x, y)) {
            return false;
          }
        }
      }
      return true;
    }
  
    function isHorizontalWin() {
      var currentValue = null,
          previousValue = 0,
          tally = 0;
  
      // Elke rij tellen voor 4, en in dat geval een winst verklaren met 'return true'.
      for (var y = 0; y <= Game.config.boardHeight; y++) {
        for (var x = 0; x <= Game.config.boardLength; x++) {
          currentValue = Game.board[y][x];
          if (currentValue === previousValue && currentValue !== 0) {
            tally += 1;
          } else {
            // De tel terug naar 0 doen wanneer er een gat tussen de vakjes zit.
            tally = 0;
          }
          if (tally === Game.config.countToWin - 1) {
            return true;
          }
          previousValue = currentValue;
        }
  
        // De tel en de vorige waarde resetten na elke rij.
        tally = 0;
        previousValue = 0;
      }
  
      // Er is geen horizontale winst gevonden.
      return false;
    }
  
    function isVerticalWin() {
      var currentValue = null,
          previousValue = 0,
          tally = 0;
  
      // Elke kolom tellen voor 4, en in dat geval een winst verklaren met 'return true'.
      for (var x = 0; x <= Game.config.boardLength; x++) {
        for (var y = 0; y <= Game.config.boardHeight; y++) {
          currentValue = Game.board[y][x];
          if (currentValue === previousValue && currentValue !== 0) {
            tally += 1;
          } else {
            tally = 0;
          }
          if (tally === Game.config.countToWin - 1) {
            return true;
          }
          previousValue = currentValue;
        }
  
        tally = 0;
        previousValue = 0;
      }
  
      // Er is geen verticale winst gevonden.
      return false;
    }
  
    function isDiagonalWin() {
      var x = null,
          y = null,
          xtemp = null,
          ytemp = null,
          currentValue = null,
          previousValue = 0,
          tally = 0;
  
      // De bovenkant checken voor rechts-naar-onder diagonalen.
      for (x = 0; x <= Game.config.boardLength; x++) {
        xtemp = x;
        ytemp = 0;
  
        while (xtemp <= Game.config.boardLength && ytemp <= Game.config.boardHeight) {
          currentValue = Game.board[ytemp][xtemp];
          if (currentValue === previousValue && currentValue !== 0) {
            tally += 1;
          } else {
            tally = 0;
          }
          if (tally === Game.config.countToWin - 1) {
            return true;
          }
          previousValue = currentValue;
  
          // Diagonaal naar rechts-onder gaan.
          xtemp++;
          ytemp++;
        }
        tally = 0;
        previousValue = 0;
      }
  
      // De bovenkant checken voor links-naar-onder diagonalen.
      for (x = 0; x <= Game.config.boardLength; x++) {
        xtemp = x;
        ytemp = 0;
  
        while (0 <= xtemp && ytemp <= Game.config.boardHeight) {
          currentValue = Game.board[ytemp][xtemp];
          if (currentValue === previousValue && currentValue !== 0) {
            tally += 1;
          } else {
            tally = 0;
          }
          if (tally === Game.config.countToWin - 1) {
            return true;
          }
          previousValue = currentValue;
  
          xtemp--;
          ytemp++;
        }
        tally = 0;
        previousValue = 0;
      }
  
      // De linkerkant checken voor rechts-naar-onder diagonalen.
      for (y = 0; y <= Game.config.boardHeight; y++) {
        xtemp = 0;
        ytemp = y;
  
        while (xtemp <= Game.config.boardLength && ytemp <= Game.config.boardHeight) {
          currentValue = Game.board[ytemp][xtemp];
          if (currentValue === previousValue && currentValue !== 0) {
            tally += 1;
          } else {
            tally = 0;
          }
          if (tally === Game.config.countToWin - 1) {
            return true;
          }
          previousValue = currentValue;
  
          xtemp++;
          ytemp++;
        }
        tally = 0;
        previousValue = 0;
      }
  
      // De rechterkant checken voor links-naar-onder diagonalen.
      for (y = 0; y <= Game.config.boardHeight; y++) {
        xtemp = Game.config.boardLength;
        ytemp = y;
  
        while (0 <= xtemp && ytemp <= Game.config.boardHeight) {
          currentValue = Game.board[ytemp][xtemp];
          if (currentValue === previousValue && currentValue !== 0) {
            tally += 1;
          } else {
            tally = 0;
          }
          if (tally === Game.config.countToWin - 1) {
            return true;
          }
          previousValue = currentValue;
  
          xtemp--;
          ytemp++;
        }
        tally = 0;
        previousValue = 0;
      }
  
      // Er is geen diagonale winst gevonden.
      return false;
    }
  
   return {
     isPositionTaken,
     isGameADraw,
     isHorizontalWin,
     isVerticalWin,
     isDiagonalWin
   }
  
  })();