// Module pattern for board
const board = (() => {
  const emptyBoard = document.createElement('div');

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
  };
})();

// Game module pattern
const game = (() => {
  let numberOfTurns = 0;
  // Handle functions
  // Handle box
  const handleBox = (event) => {
    for (let i = 0; i < board.getBoxesFromBoard().length; i += 1) {
      if (player.getPlayer1Status()) {
        if (isEmpty(event)) {
          event.target.textContent = `${player.getPlayers().player1.sign}`;
          player.togglePlayer1Status();

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
          player.togglePlayer1Status();

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

  // Check an array and return true when all array's item has the same values.
  const hasWon = (contents) => { 
    for (let i = 0; i < contents.length; i += 1) {
      if (contents[i] === contents[i + 1] && contents[i + 1] === contents[i + 2]) {
        if (contents[i][0] === 'X') {
            console.log('Player1 wins');
            player.increaseScore(`player1`);

            // Remove event(stop the game) from each box of the board when the game is won.
            game.removeEvent(board.getBoxesFromBoard());

            return true;             
          } else if (contents[i][0] === 'O') {
            console.log('Player2 wins');
            player.increaseScore(`player2`);

            // Remove event(stop the game) from each box of the board when the game is won.
            game.removeEvent(board.getBoxesFromBoard());

            return true; 
          }  
      }
    }
    return false;
  };

  const getNumberOfTurns = () => numberOfTurns;

  // Make variables and/or functions public
  return {
    addEvent,
    startGame,
    getNumberOfTurns,
    hasWon,
    removeEvent,
    isDraw,
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

  // Make variables and/or functions public
  return {
    getPlayer1Status,
    getCurrentPlayer,
    togglePlayer1Status,
    increaseScore,
    getPlayers,
  };
})();

game.startGame();
