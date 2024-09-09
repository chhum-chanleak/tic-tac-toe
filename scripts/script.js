// Module pattern
const board = (() => {
  const emptyBoard = document.createElement('div');

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

  // Make variables and/or functions public
  return {
    createEmptyBoard,
  }
})();