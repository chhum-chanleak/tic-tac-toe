// Module pattern for board
const board = (() => {
  const emptyBoard = document.createElement('div');
  let winningDirection = '';

  //  Create an empty board for new game
  const createEmptyBoard = () => {    
    const length = 9;
  
    emptyBoard.setAttribute('class', 'board-game');
  
    for (let i = 0; i < length; i += 1) {
      const div = document.createElement('div');
  
      div.setAttribute('class', `box ${i + 1}`);
      emptyBoard.appendChild(div);
    }
  };

  // check all directions in the board for winner
  const checkAllDirections = (directionsObj) => {
    let contents = [];

    // Put textContents to contents
    for (const prop in directionsObj) {
      contents.push(...directionsObj[prop]);
    }

    for (let i = 0; i < contents.length; i += 1) {
      if (game.hasWon(contents[i])) {
        return true;
      }
    }
    return false;
  };

  // Set color for X and O
  const setColorForContents = () => {
    for (let i = 0; i < board.getBoxesFromBoard().length; i += 1) {
      if (board.getBoxesFromBoard()[i].textContent === 'X') {
        board.getBoxesFromBoard()[i].style.color = '#f00';
      } else if (board.getBoxesFromBoard()[i].textContent === 'O') {
        board.getBoxesFromBoard()[i].style.color = '#00f';
      }
    }
  };

  const getEmptyBoard = () => emptyBoard;

  // Private method
  const getBoxesFromBoard = () => {
    let boxes = [];

    for (let i = 0; i < emptyBoard.children.length; i += 1) {
      boxes.push(emptyBoard.children[i]);
    }
    return boxes;
  };

  const getRows = () => {
    let row1 = [];
    let row2 = [];
    let row3 = [];

    for (let i = 0; i < getBoxesFromBoard().length; i += 1) {
      switch (getBoxesFromBoard()[i].getAttribute('class')) {
        case 'box 1':
        case 'box 2':
        case 'box 3':
          row1.push(getBoxesFromBoard()[i]);
        break;
        case 'box 4':
        case 'box 5':
        case 'box 6':
          row2.push(getBoxesFromBoard()[i]);
        break;
        case 'box 7':
        case 'box 8':
        case 'box 9':
          row3.push(getBoxesFromBoard()[i]);
        break;
      }
    }

    return { row1, row2, row3 };
  };
  
  const getColumns = () => {
    let column1 = [];
    let column2 = [];
    let column3 = [];

    for (let i = 0; i < getBoxesFromBoard().length; i += 1) {
      switch (getBoxesFromBoard()[i].getAttribute('class')) {
        case 'box 1':
        case 'box 4':
        case 'box 7':
          column1.push(getBoxesFromBoard()[i]);
        break;
        case 'box 2':
        case 'box 5':
        case 'box 8':
          column2.push(getBoxesFromBoard()[i]);
        break;
        case 'box 3':
        case 'box 6':
        case 'box 9':
          column3.push(getBoxesFromBoard()[i]);
        break;
      }
    }

    return { column1, column2, column3 };
  };
  
  // Get main(backward) diagonal boxes
  const getMainDiagonal = () => {
    let mainDiagonal = [];

    for (let i = 0; i < getBoxesFromBoard().length; i += 1) {

      switch(getBoxesFromBoard()[i].getAttribute('class')) {
        case 'box 1':
        case 'box 5':
        case 'box 9': mainDiagonal.push(getBoxesFromBoard()[i]);
          break;
      }
    }
    return mainDiagonal;
  };

  const getOffDiagonal = () => {
    let offDiagonal = [];

    for (let i = 0; i < getBoxesFromBoard().length; i += 1) {
      switch(getBoxesFromBoard()[i].getAttribute('class')) {
        case 'box 3':
        case 'box 5':
        case 'box 7': offDiagonal.push(getBoxesFromBoard()[i]);
      }
    }
    return offDiagonal;
  };

  // Get textContents of the passed parameter and return an array of textContents
  const getTextContents = (direction) => {
    let contents = [];

    for (let i = 0; i < direction.length; i += 1) {
      contents.push(direction[i].textContent);
    }
    return contents;
  };

  // Get all directions from board-game as an object
  const getDirectionsObject = () => {
    return directions = {
      rows: [
        board.getTextContents(getRows().row1),
        board.getTextContents(getRows().row2),
        board.getTextContents(getRows().row3)
      ],
      columns: [
        board.getTextContents(getColumns().column1),
        board.getTextContents(getColumns().column2),
        board.getTextContents(getColumns().column3),
      ],
      diagonals: [
       getTextContents(getMainDiagonal()),
       getTextContents(getOffDiagonal()),
      ]
    };
  };
  
  const getDirectionClasses = (direction) => {
    let classes = [];

    for (let i = 0; i < direction.length; i += 1) {
      classes.push(direction[i].getAttribute('class'));
    }
    return classes;
  };

  const getDirectionByName = (name) => {
    switch (name) {
      case 'row1': return getRows().row1;
      case 'row2': return getRows().row2;
      case 'row3': return getRows().row3;
      case 'column1': return getColumns().column1;
      case 'column2': return getColumns().column2;
      case 'column3': return getColumns().column3;
      case 'mainDiagonal': return getMainDiagonal();
      case 'offDiagonal': return getOffDiagonal();
    }
  };

  // Pass in a direction and have its color set.
  const setBgColorForDirection = (direction) => {
    const content = direction[0].textContent;

    for (let i = 0; i < direction.length; i += 1) {
      if (content === 'X') {
        direction[i].style.backgroundColor = '#f004';
      } else if (content === 'O') {
        direction[i].style.backgroundColor = '#00f4';
      }      
    }
  };

  // Take two parameters and return true if it is winning direction
  const isWinningDirection = (direction) => {
      if (isIncomplete(direction) || isMixed(direction)) {
        return false;
     }
     return true
  };

  const getWinningDirection = () => winningDirection;

  const checkForWinningDirection = () => {
    for (let i = 0; i < 8; i += 1) {
      switch (i) {
        case 0: 
          if (isWinningDirection(getRows().row1)) {
            winningDirection = 'row1';
            return getWinningDirection();
          }          
        case 1: 
          if (isWinningDirection(getRows().row2)) {
            winningDirection = 'row2';
            return getWinningDirection();
          } 
        case 2:
          if (isWinningDirection(getRows().row3)) {
            winningDirection = 'row3';
            return getWinningDirection();
          } 
        case 3: 
          if (isWinningDirection(getColumns().column1)) {
            winningDirection = 'column1';
            return getWinningDirection();
          } 
        case 4:
          if (isWinningDirection(getColumns().column2)) {
            winningDirection = 'column2';
            return getWinningDirection();
          } 
        case 5: 
        if (isWinningDirection(getColumns().column3)) {
          winningDirection = 'column3';
          return getWinningDirection();
        } 
        case 6:
          if (isWinningDirection(getMainDiagonal())) {
            winningDirection = 'mainDiagonal';
            return getWinningDirection();
          }    
        case 7: 
          if (isWinningDirection(getOffDiagonal())) {
            winningDirection = 'offDiagonal';
            return getWinningDirection();
          }       
      }
    }
  };

  // Return true when at least one textContent is empty
  const isIncomplete = (direction) => {
    for (let i = 0; i < direction.length; i += 1) {
      if (direction[i].textContent === '') {
        return true;
      }
    }
    return false;
  };

  // Return true when textContents of the direction are not the same
  const isMixed = (direction) => {
    const contents = getTextContents(direction);

    for (let i = 0; i < contents.length; i += 1) {
      if (contents[i] === contents[i + 1] && (contents[i] === contents[i + 2])) {
        // If it is entirely empty, then it also return false.
        if (!isIncomplete(direction)) {
          return false;
        }        
      }
    }
    return true;
  };

  // Create a new game button
  const createNewGameButton = () => {
    const button = document.createElement('button');

    button.setAttribute('class', 'btn new-game');
    button.textContent = 'NEW GAME';

    // Set textContent to 'RESET' when the game is set.
    if (game.isGameSet()) {
      button.textContent = 'RESET';
    }

    button.addEventListener('click', handleNewGameButton);
    document.body.appendChild(button);    
  };

  const handleNewGameButton = () => {
    const congrats = document.querySelector('p.congrats');

    if (game.isGameSet()) {
      congrats.remove();
    }

    game.resetGame();
    emptyBoardGame();
    board.createEmptyBoard();
    game.addEvent(board.getBoxesFromBoard());
    document.body.appendChild(board.getEmptyBoard());
    player.showPlayersTurn();
    removeNewGameButton();
  }

  const removeNewGameButton = () => {
    const button = document.querySelector('.btn.new-game');

    button.remove();
  };

  // Empty each child of .board-game
  const emptyBoardGame = () => {
    const boardGame = document.querySelector('.board-game');

    for (let i = 0; i < boardGame.children.length; i += 1) {
      boardGame.children[i].remove();
      i -= 1;
    }
  };

  const setWinningDirection = (state) => {
    winningDirection = state;
  };

  // Make variables and/or functions public
  return {
    getEmptyBoard,
    createEmptyBoard,
    getBoxesFromBoard,
    getRows,
    getColumns,
    getMainDiagonal,
    getOffDiagonal,
    getTextContents,
    getDirectionsObject,
    checkAllDirections,
    setColorForContents,
    getDirectionClasses,
    isWinningDirection,
    checkForWinningDirection,
    getWinningDirection,
    setBgColorForDirection,
    isIncomplete,
    getDirectionByName,
    isMixed,
    createNewGameButton,
    emptyBoardGame,
    setWinningDirection,
  };
})();

// Game module pattern
const game = (() => {
  let numberOfTurns = 0;
  let winner = '';
  let gameState = 'The game is on going.';
  let gameHistory = [];

  // Handle box
  const handleBox = (event) => {
    for (let i = 0; i < board.getBoxesFromBoard().length; i += 1) {
      if (player.getPlayer1Status()) {
        if (isEmpty(event)) {
          event.target.textContent = `${player.getPlayers().player1.sign}`;
          board.setColorForContents();
          player.togglePlayer1Status();
          player.showPlayersTurn();
          game.handleDraw();

          // Only check of winner when numberOfTurns is greater than or equal to 5.
          if (game.getNumberOfTurns() >= 5) {
            board.checkAllDirections(board.getDirectionsObject());
          }
        }
     } else {
        if (isEmpty(event)) {
          event.target.textContent = `${
            player.getPlayers().player2.sign
          }`;
          board.setColorForContents();
          player.togglePlayer1Status();
          player.showPlayersTurn();
          game.handleDraw();

          // Only check of winner when numberOfTurns is greater than or equal to 5.
          if (game.getNumberOfTurns() >= 5) {
            board.checkAllDirections(board.getDirectionsObject());
          }
        }
      }
    }
  };

  // Handle DOMContentLoaded
  const handleDOMContentLoaded = () => {
    board.createEmptyBoard();
    game.addEvent(board.getBoxesFromBoard());
    document.body.appendChild(board.getEmptyBoard());
    player.showPlayersTurn();
    player.showPlayersScore();
  };

  // ADD event to document's object that fires handleDOMContentLoaded
  const startGame = () => {
    document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
  };

  // Add event to nodes
  const addEvent = (nodes) => {
    for (let i = 0; i < nodes.length; i += 1) {
      nodes[i].addEventListener('click', handleBox);
    }
  };

  // Remove event from nodes
  const removeEvent = (nodes) => {
    for (let i = 0; i < nodes.length; i += 1) {
      nodes[i].removeEventListener('click', handleBox);
    }
  };

  // Check to see if the box is empty
  const isEmpty = (event) => {
    if (event.target.textContent === '' && (event.target.textContent !== 'X' || event.target.textContent !== 'O')) {
      numberOfTurns += 1;
      return true;
    }
    return false;
  };

  // Check for when the there's no winner when the value of numberOfTurns is 9
  const isDraw = () => {
    if (game.getNumberOfTurns() === 9 && board.checkAllDirections(board.getDirectionsObject()) === false) {
      return true;
    }
    return false;
  };

  // Change gameState when the game is draw
  const handleDraw = () => {
    const playersTurn = document.querySelector('span.players-turn');

    if (numberOfTurns === 9 && isDraw()) {
      game.setGameState('The game has ended.');
      console.log("The game is draw.");
      playersTurn.style.color = '#b00ee7';
      playersTurn.textContent = 'The game is draw.';
      board.createNewGameButton();
    }
  };
  
  // Check an array and return true when all array's item has the same values.
  const hasWon = (contents) => { 
    for (let i = 0; i < contents.length; i += 1) {
      if (contents[i] === contents[i + 1] && contents[i + 1] === contents[i + 2]) {
        if (contents[i][0] === 'X') {
            winner = 'The winner is player1.';
            player.updatePlayersScore();

            // Remove event(stop the game) from each box of the board when the game is won.
            game.removeEvent(board.getBoxesFromBoard());

            return true;             
          } else if (contents[i][0] === 'O') {
            winner = 'The winner is player2.';
            player.updatePlayersScore();

            // Remove event(stop the game) from each box of the board when the game is won.
            game.removeEvent(board.getBoxesFromBoard());

            return true; 
          }  
      }
    }
    return false;
  };

  const getNumberOfTurns = () => numberOfTurns;

  const getWinner = () => winner;

  const getGameState = () => gameState;

  const setGameState = (state) => {
    gameState = state;
  };

  const getGameHistory = () => gameHistory;

  // Reset 'winningDirection' 'numberOfTurns', 'winner', 'gameState', 'isPlayer1'
  const resetGame = () => {
    // Reset players score to 0 when isGameSet() is true
    if (isGameSet()) {
      player.getPlayers().player1.score = 0;
      player.getPlayers().player2.score = 0;
      player.updatePlayersScore();
      gameHistory = [];
    }

    board.setWinningDirection('');
    numberOfTurns = 0;
    winner = '';
    gameState = 'The game is on going.';
    player.setIsPlayer1(true);
  };

  // Handle the end game when one of the players' score is 3.
  const isGameSet = () => {
    if (player.getPlayers().player1.score === 3 || player.getPlayers().player2.score === 3) {
      return true;
    }
    return false;
  };

  const setGameHistory = (state) => gameHistory.push(state);

  // Check for winning three games in a row.
  const isThreeInARow = () => {
    const { score: score1  } = player.getPlayers().player1;
    const { score: score2  } = player.getPlayers().player2;
    
    if (isGameSet()) {
      if ((score1 === 3 && score2 === 0) || (score1 === 0 && score2 === 3)) {
        return true;
      }
    }
    return false;
  };

  const handleThreeInARow = () => {
    const congrats = document.querySelector('p.congrats');

    if (isThreeInARow()) {
      congrats.textContent = `WOW! 3 wins in a row. ${getWinner()}`;
    }
  };

  // Decide the winner who gets 3 points first.
  const decideWinner = () => {
    const p = document.createElement('p');
    if (player.getPlayers().player1.score === 3 || player.getPlayers().player2.score === 3) {
      p.setAttribute('class', 'congrats');
      p.textContent = `Congratulations! ${getWinner()}`;
      document.body.appendChild(p);
    }
  };

  // Make variables and/or functions public
  return {
    addEvent,
    startGame,
    getNumberOfTurns,
    hasWon,
    removeEvent,
    isDraw,
    getWinner,
    setGameState,
    getGameState,
    handleDraw,
    resetGame,
    decideWinner,
    isGameSet,
    getGameHistory,
    isThreeInARow,
    setGameHistory,
    handleThreeInARow,
  };
})();

// Players module pattern
const player = (() => {
  let players = {
    player1: {
      sign: 'X',
      score: 0,
    },
    player2: {
      sign: 'O',
      score: 0,
    }
  };

  let isPlayer1 = true;

  const getPlayer1Status = () => isPlayer1;

  const getPlayers = () => players;

  const togglePlayer1Status = () => {
    if (isPlayer1) {
      isPlayer1 = false;
    } else {
      isPlayer1 = true;
    }
  };

  const getCurrentPlayer = () => {
    if (isPlayer1) {
      return `player1`;
    }
    return 'player2';
  };

  const increaseScore = (player) => {
    if (player === 'player1') {
      players.player1.score += 1;
    } else {
      players.player2.score += 1;
    }
  };
  
  const showPlayersTurn = () => {
    const turn = document.querySelector('.players-turn');

    turn.textContent = `${getCurrentPlayer()}'s turn.`;

    if (turn.textContent === "player1's turn.") {
      turn.style.color = '#f00';
    } else {
      turn.style.color = '#00f';
    }

    // Show the winner instead players' turn when the game is won.
    if (board.checkAllDirections(board.getDirectionsObject())) {

      turn.textContent = `${game.getWinner()}`;

      if (game.getWinner() === 'The winner is player1.') {
        // End-game function calls
        player.increaseScore('player1');
        game.decideWinner();
        game.setGameState('The game has ended.');
        turn.style.color = '#f00';
        console.log(game.getWinner());
        board.setBgColorForDirection(board.getDirectionByName(board.checkForWinningDirection()));
        board.createNewGameButton();
        game.setGameHistory(game.getWinner());
        game.handleThreeInARow();
      } 
      else if (game.getWinner() === 'The winner is player2.'){
        // End-game function calls
        player.increaseScore('player2');
        game.decideWinner();
        game.setGameState('The game has ended.');
        turn.style.color = '#00f';
        console.log(game.getWinner());
        board.setBgColorForDirection(board.getDirectionByName(board.checkForWinningDirection()));
        board.createNewGameButton();
        game.setGameHistory(game.getWinner());
        game.handleThreeInARow();
      }
    }    
  };

    // Show each player's score on page
    const showPlayersScore = () => {
      const player1Score = document.querySelector('span.player1');
      const player2Score = document.querySelector('span.player2');
      const player1Span = document.createElement('span');
      const player2Span = document.createElement('span');
  
      player1Span.textContent = ` ${player.getPlayers().player1.score}`;
      player2Span.textContent = ` ${player.getPlayers().player2.score}`;
      player1Span.style.color = '#f00';
      player2Span.style.color = '#00f';
      player1Span.setAttribute('class', 'score');
      player2Span.setAttribute('class', 'score');
  
      player1Score.insertAdjacentElement("beforeend", player1Span);
      player2Score.insertAdjacentElement("beforeend", player2Span);
    };

    // Stop displaying score
    const updatePlayersScore = () => {
      const player1Score = document.querySelector('span.player1 > span.score');
      const player2Score = document.querySelector('span.player2 > span.score');

      player1Score.remove();
      player2Score.remove();
      showPlayersScore();
    };

    const setIsPlayer1 = (state) => {
      isPlayer1 = state;
    };

  // Make variables and/or functions public
  return {
    getPlayer1Status,
    getCurrentPlayer,
    togglePlayer1Status,
    increaseScore,
    getPlayers,
    showPlayersTurn,
    showPlayersScore,
    updatePlayersScore,
    setIsPlayer1,
  };
})();

game.startGame();
