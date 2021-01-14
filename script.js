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
      const choice = robotChoice();
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
          choice = robotChoice(player, selectedCells);
        } while (selectedCells.includes(cells[choice]))
        gameControl(cells[choice]);
      }
    }
    

    return {player, selectedCells};
  }
})()

/* let gameControl = (() => {
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
          choice = robotChoice(0, player, selectedCells);
        } while (selectedCells.includes(cells[choice]))
        gameControl(cells[choice]);
      }
    }
    

    return {player, selectedCells};
  }
})() */

function robotChoice(player, selectedCells = []) {
 if (!selectedCells.length) {
/*     let maxItem = 0;
    let minItem = cells.length - 1;
    return Math.round(Math.random() * (maxItem - minItem + 1) + minItem - 0.5); */
    return 4;
  } else {
    let enemyFields;
    if (player.number == 1) {
      enemyFields = JSON.parse(JSON.stringify(player2.fields));
    } else {
      enemyFields = JSON.parse(JSON.stringify(player1.fields));
    }
    let robotChoice = JSON.parse(JSON.stringify(player.fields));


    let winChoice = 0;
    let id = 0
    for (let i = 0; i < cells.length; i++) {
      let test = 0;
      if (!selectedCells.includes(cells[i])) {
        let classList = [...cells[i].classList];

        for (let j = 0; j < classList.length; j++) {
          if(!robotChoice[classList[j]]) {
            robotChoice[classList[j]] = 0;
          }
          robotChoice[classList[j]]++;
        }

        for (const key in robotChoice) {
          test++;
        }
      }

      if (test > winChoice) {
        winChoice = test;
        id = i;
      }

      robotChoice = JSON.parse(JSON.stringify(player.fields));
    }
    return id;
  }
}

/* function robotChoice(id, player, selectedCells = []) {
  if(!selectedCells.length) {
    let maxItem = 0;
    let minItem = cells.length - 1;
    return Math.round(Math.random() * (maxItem - minItem + 1) + minItem - 0.5);
  } else if (!(selectedCells.length == cells.length - 2)) {
    let enemyFields;
    let robotFields = JSON.parse(JSON.stringify(player.fields));
    if(player.number == 2) {
      enemyFields = JSON.parse(JSON.stringify(player1.fields));
    } else {
      enemyFields = JSON.parse(JSON.stringify(player2.fields));
    }

    let currentClass = '';
    let playerObj = JSON.parse(JSON.stringify(player));

    for (const key in playerObj.fields) {
      if (playerObj.fields[key] == 2) {
        let value = enemyFields[key];
        if(value) {
          delete playerObj.fields[key];
        }
        currentClass += (playerObj.fields[key] === undefined) ? '' : '.' + key;
      }
    }

    if (currentClass) {
      let currentElem = board.querySelectorAll(currentClass);
      currentElem = [...currentElem];
      for (let i = 0; i < currentElem.length; i++) {
        if (!selectedCells.includes(currentElem[i])) {
          return currentElem[i].dataset.id;
        }
        
      }

    } 

    for (const key in enemyFields) {
      let playerObj = JSON.parse(JSON.stringify(player));
      if(enemyFields[key] == 2 && !playerObj.fields[key]) {
        let currentLine = board.querySelectorAll(`.${key}`);
        currentLine = [...currentLine];
        for (let i = 0; i < currentLine.length; i++) {
          let classArray = currentLine[i].classList;
          for (let j = 0; j < classArray.length; j++) {
            if(!enemyFields[classArray[j]]) {
              console.log(currentLine[i]);
              return currentLine[i].dataset.id;
            }
          }
        }
      }
    }

    let countKeys = 0;
    let id;

    for (let i = 0; i < cells.length; i++) {
      let playerObj = JSON.parse(JSON.stringify(player));
      let countWinWay = 0;

      if(!selectedCells.includes(cells[i])) {
        
        let arrayClasses = cells[i].classList;
        for (let j = 0; j < arrayClasses.length; j++) {
          if(!playerObj.fields[arrayClasses[j]]) {
            playerObj.fields[arrayClasses[j]] = 0;
          }
          playerObj.fields[arrayClasses[j]]++;
        }

        for (const key in playerObj.fields) {
          let value = enemyFields[key];
          if(value) {
            delete playerObj.fields[[key]];
          }
        }

        let count = 0;

        for (const key in playerObj.fields) {
          count++;
          let test = playerObj.fields[key];
          if (playerObj.fields[key] == 2) {
            countWinWay++;
          }
        }

        if (count > countKeys || countWinWay == 2) {
          countKeys = count;
          id = i;
        }
      }

    }
    return id;
  } else {
    for (let i = 0; i < cells.length; i++) {
      if (!selectedCells.includes(cells[i])) {
        return cells[i].dataset.id;
      }
      
    }
  }
} */

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

  let values = gameControl();

  if(values.player.mode == 'AI') {
    let choice;
    do {
      choice = robotChoice(0, cells.length - 1);
    } while (values.selectedCells.includes(cells[choice]))
    gameControl(cells[choice]);
  }
})