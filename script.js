let gameBoard = (() => {
  const board = document.getElementById('gameBoard');
  let cells = [...board.children];

  let rows = [];
  let columns = [];
  let diagonals = [];

  cells.forEach(item => {
    item.addEventListener('mousedown', () => {
      console.dir(item);
      for (let i = 0; i < item.classList.length; i++) {
        let className = item.classList[i];
        if(className.includes('row')) {
          let rows1 = board.querySelectorAll(`.${className}`);
          rows.push([...rows1]);
        } else if(className.includes('column')) {
          let columns1 = board.querySelectorAll(`.${className}`);
          columns.push([...columns1]);
        } else {
          let diagonals1 = board.querySelectorAll(`.${className}`);
          diagonals.push([...diagonals1]);
        }
      }
    })
  })

  return {
    rows,
    columns,
    diagonals
  }
})();


const player = (name) => {
  const hello = () => console.log('This is player object.');
  const sayName = () => console.log(`My name\'s ${name}`);
  
  return {hello, sayName};
}

const player1 = (name) => {
  const turn = () => {
    console.log('Player 1 turned!');
  }

  const {hello, sayName} = player(name);
  
  return {turn, hello, sayName};
}

let artem = player1('Artem');



function changeBackground() {
  let array = gameBoard.rows[0].concat(gameBoard.columns[0], gameBoard.diagonals[0]);
  array.forEach(item => {
    item.style.background = "red";
  })
}