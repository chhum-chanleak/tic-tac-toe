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
  
    return emptyBoard;
  };

  const getBoxesFromBoard = () => {
    let boxes = [];

    for (let i = 0; i < emptyBoard.children.length; i += 1) {
      boxes.push(emptyBoard.children[i]);
    }
    return boxes;
  };

  // Make variables and/or functions public
  return {
    createEmptyBoard,
    getRows,
    getBoxesFromBoard,
  }
})();