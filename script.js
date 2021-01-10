const greetingBlock = document.getElementById('greetingBlock');
const choosePlayer = document.getElementById('choosePlayer');
const buttons = choosePlayer.querySelectorAll('button');
const startButton = document.getElementById('start');
const names = document.querySelectorAll('input');

const container = document.getElementById('container');
const board = document.getElementById('gameBoard');
const cells = [...board.children];
const players = container.querySelectorAll('.namePlayer');
const images = container.querySelectorAll('img');

const restart = document.getElementById('restart');
const title = restart.querySelector('h2');
const img = restart.querySelector('img'); 

const body = document.querySelector('body');
const mainBlocks = [...body.children].slice(0, 3);

const player = (name, color, number, fields) => {
  return {name, color, number, fields}
}

let player1 = player('player 1', 'blue', 1, {});

let player2 = player('player 2', 'red', 2, {});

buttons.forEach(item => {
  item.addEventListener('mousedown', () => {
    const player = item.parentNode.parentNode.classList[0];
    const mode = item.textContent;
    const input = item.parentNode.parentNode.querySelector('input');
    const srcImg = (mode == 'Human') ? '/images/personIcon.png':
                                       '/images/robot.jpeg';

    if(player == 'player1') {
      player1.mode = mode;
      player1.src = srcImg;
    } else {
      player2.mode = mode;
      player2.src = srcImg;
    }

    if (mode == 'AI') {
      input.readOnly = true;
      input.value = 'AI';
    } else {
      input.readOnly = false;
      input.value = '';
    }
  })
});

startButton.addEventListener('mousedown', () => {
  if(player1.mode && player2.mode) {
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
  
    players[0].textContent = player1.name;
    players[1].textContent = player2.name;
  
    images[0].src = player1.src;
    images[1].src = player2.src;




    if(player1.mode == 'AI') {
      const choice = robotChoice(0, cells.length - 1)
      gameControl(cells[choice]);
    }
  } else {
    alert('You must choose the player mode!')
  }

})

let gameBoard = (prop, player) => {
  prop.background = player.color;
}

let gameControl = (() => {
  let player = player1;
  let selectedCells = [];

  return function(item) {
    if(item === undefined) {
      selectedCells = [];
      player = player1;
    } else if(!selectedCells.includes(item)) {
      gameBoard(item.style, player)
      selectedCells.push(item);

      for (let i = 0; i < item.classList.length; i++) {
        let className = item.classList[i];

        if(!player.fields[className]) {
          player.fields[className] = 0;
        }
        player.fields[className]++;

        if(player.fields[className] == 3) {
          restart.classList.remove('off');
          title.textContent = `${player.name} won!`
        }
      }

      player = (player.number == 1) ? player2 : player1;
      
      if(player.mode == 'AI') {
        let choice;
        do {
          choice = robotChoice(0, cells.length - 1);
        } while (selectedCells.includes(cells[choice]))
        gameControl(cells[choice]);
      }
    }
  }
})()

function robotChoice(minItem, maxItem) {
  return Math.round(Math.random() * (maxItem - minItem + 1) + minItem - 0.5);
}

cells.forEach(item => {
  item.addEventListener('mousedown', () => gameControl(item))
})

img.addEventListener('mousedown', () => {
  mainBlocks.forEach(item => {
    item.classList.add('off');
  })
  container.classList.remove('off');

  cells.forEach(item => {
    item.style.background = 'white';
  })

  player1.fields = {};
  player2.fields = {};

/*   if(player1.mode ) {

  } */
  gameControl();
})