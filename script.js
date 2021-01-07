const greetingBlock = document.getElementById('greetingBlock');
const choosePlayer = document.getElementById('choosePlayer');
const buttons = choosePlayer.querySelectorAll('button');
const startButton = document.getElementById('start');
const names = document.querySelectorAll('input');

const container = document.getElementById('container');
const board = document.getElementById('gameBoard');
const cells = [...board.children];

const body = document.querySelector('body');
const mainBlocks = [...body.children].slice(0, 3);

console.log(mainBlocks)

const player = (name, color, number, fields) => {
  return {name, color, number, fields}
}

let player1 = player('player 1', 'blue', 1, {});

let player2 = player('player 2', 'red', 2, {});


startButton.addEventListener('mousedown', () => {
  mainBlocks.forEach(item => item.classList.add('off'))
  container.classList.remove('off');
  
  for (let i = 0; i < names.length; i++) {
    const parentNode = names[i].parentNode.parentNode;
    const player = parentNode.classList[0];

    if(player == 'player1' && names[i].value != '') {
      player1.name = names[i].value;
    } else if(player == 'player2' && names[i].value != '') {
      player2.name = names[i].value;
    }
  }
})

let gameBoard = (prop, player) => {
  prop.background = player.color;
}

let gameControl = (() => {
  let player = player1;
  let selectedCells = [];

  return function(item) {
    if(!selectedCells.includes(item)) {
      gameBoard(item.style, player)
      selectedCells.push(item);

      for (let i = 0; i < item.classList.length; i++) {
        let className = item.classList[i];

        if(player.fields[className] === undefined) {
          player.fields[className] = 0;
        }

        player.fields[className]++;

        if(player.fields[className] == 3) {
          mainBlocks[mainBlocks.length - 1].classList.remove('off');
        }
      }

      player = (player.number == 1) ? player2 : player1;

    }
  }

})()

cells.forEach(item => {
  item.addEventListener('mousedown', () => gameControl(item))
})