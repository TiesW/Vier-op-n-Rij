(function () {
    var prefixEl = document.querySelector('#prefix');
    var primaryTextEl = document.querySelector('.primary');
    var playAgainEl = document.querySelector('#play-again');
    var playAgainBtnEl = document.querySelector('#play-again-btn');
    var gameBoardEl = document.querySelector('#board');
  
    playAgainBtnEl.addEventListener('click', () => location.reload());
    gameBoardEl.addEventListener('click', placeGamePiece);
  
    function placeGamePiece(e) {
      if (e.target.tagName !== 'BUTTON') return;
  
      var targetCell = e.target.parentElement;
      var targetRow = targetCell.parentElement;
      var targetRowCells = [...targetRow.children];
      var gameBoardRowsEls = [...document.querySelectorAll('#board tr')];
  
      // Positie van geklikt vakje detecteren.
      var y_pos = gameBoardRowsEls.indexOf(targetRow);
      var x_pos = targetRowCells.indexOf(targetCell);
  
      // Ervoor zorgen dat het in het onderste vakje belandt.
      y_pos = Game.do.dropToBottom(x_pos, y_pos);

      if (Game.check.isPositionTaken(x_pos, y_pos)) {
        return;
      }
  
      // Het vakje inkleuren.
      Game.do.addDiscToBoard(x_pos, y_pos);
      Game.do.printBoard();
  
      // Checken voor een winnaar.
      if (Game.check.isVerticalWin() || Game.check.isHorizontalWin() || Game.check.isDiagonalWin()) {
        gameBoardEl.removeEventListener('click', placeGamePiece);
        prefixEl.textContent = Game.config.winMsg;
        playAgainEl.classList.add('show');
        return;
      } else if (Game.check.isGameADraw()) {
        gameBoardEl.removeEventListener('click', placeGamePiece);
        primaryTextEl.textContent = Game.config.drawMsg;
        playAgainEl.classList.add('show');
        return;
      }
  
      // Speler veranderen.
      Game.do.changePlayer();
    };
  
  })();