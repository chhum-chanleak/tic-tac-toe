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

  // Check and return true when items of direction has the same textContent
  const hasWon = (direction) => {
    for (let i = 0; i < direction.length; i += 1) {
      if (direction[i].textContent !== '') {
        if ((direction[i].textContent === direction[i + 1].textContent) && (direction[i + 1].textContent === direction[i + 2].textContent)) {
          return true;
        }
      }
    }
    return false;
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
    hasWon,
  }
})();

// Game module pattern
const game = (() => {

  // Handle functions
  // Handle box
  const handleBox = (event) => {
    for (let i = 0; i < board.getBoxesFromBoard().length; i += 1) {
      if (player.getPlayer1Status()) {
        event.target.textContent = `${player.players.player1.sign}`;
        player.togglePlayer1Status();
     } else {
       event.target.textContent = `${
         player.players.player2.sign
       }`;
       player.togglePlayer1Status();
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

  // Check to see if the box is empty
  const isEmpty = (event) => {
    if (event.target.textContent === '' && (event.target.textContent !== 'X' || event.target.textContent !== 'O')) {
      return true;
    }
    return false;
  };

  // Make variables and/or functions public
  return {
    addEvent,
    startGame,
  };
})();

// Players module pattern
const player = (() => {
  let players = {
    player1: {
      sign: 'X',
    },
    player2: {
      sign: 'O',
    }
  };

  let isPlayer1 = true;

  const getPlayer1Status = () => isPlayer1;

  const togglePlayer1Status = () => {
    if (isPlayer1) {
      isPlayer1 = false;
    } else {
      isPlayer1 = true;
    }
  };

  // Make variables and/or functions public
  return {
    players,
    getPlayer1Status,
    togglePlayer1Status,
  };
})();

game.startGame();
