import { currentShooterIndex, aliensRemoved } from "./shoot.js";
import { resultsDisplay } from "./app.js";
import { squares } from "./app.js";

export let invadersId;  
export let GO = false;
export let width = 15;
export const grid = document.querySelector('.grid');
export let results = 0;
export let alienInvaders = [
  0,1,2,3,4,5,6,7,8,9,
  15,16,17,18,19,20,21,22,23,24,
  30,31,32,33,34,35,36,37,38,39
];
let direction = 1;
let goingRight = true;
let end = false;

// Función centralizada para manejar Game Over
function gameOver(message) {
  GO = true;
  resultsDisplay.innerHTML = message;
  window.alert(message);
  setTimeout(() => {
    location.href = "./index.html"; // Reinicia el juego
  }, 100);
}

export function moveInvaders() {
  let currentLaser2Index;

  if (GO) return; // Si el juego terminó, no continuar

  const leftEdge = alienInvaders[0] % width === 0;
  const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1;

  remove(); // Elimina los invaders de su posición anterior

  if (rightEdge && goingRight) {
    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += width + 1;
    }
    direction = -1;
    goingRight = false;
  }

  if (leftEdge && !goingRight) {
    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += width - 1;
    }
    direction = 1;
    goingRight = true;
  }

  // Mueve los invaders hacia abajo y verifica si llegan al fondo
  for (let i = 0; i < alienInvaders.length; i++) {
    alienInvaders[i] += direction;
    if (alienInvaders[i] >= 200) { 
      gameOver("Game Over"); // Fin del juego si los invaders llegan abajo
      return;
    }
  }

  draw();

  // Verifica colisión con el jugador
  if (squares[currentShooterIndex].classList.contains('invader', 'shooter')) {
    gameOver("Game Over");
    return;
  }

  // Verifica si todos los aliens han sido eliminados
  if (aliensRemoved.length === alienInvaders.length) {
    gameOver("You Win!");
    return;
  }

  shoot2(); // Llama a la función de disparo de invaders
}

export function remove() {
  for (let i = 0; i < alienInvaders.length; i++) {
    squares[alienInvaders[i]].classList.remove('invader');
  }
}

function shoot2() {
  let laser2Id;
  let quiDispara = parseInt(Math.random() * 29);
  let currentLaser2Index = alienInvaders[quiDispara];

  if (squares[currentLaser2Index].classList.contains('invader')) {
    function moveLaser2() {
      squares[currentLaser2Index].classList.remove('laser2');
      currentLaser2Index += width;
      squares[currentLaser2Index].classList.add('laser2');

      if (squares[currentLaser2Index].classList.contains('shooter')) {
        squares[currentLaser2Index].classList.remove('laser2');
        squares[currentLaser2Index].classList.remove('shooter');
        squares[currentLaser2Index].classList.add('boom');
        gameOver("Game Over");
        clearInterval(laser2Id);
        return;
      }

      // Elimina el láser si llega al fondo
      for (let y = 210; y < 225; y++) {
        if (squares[y].classList.contains('laser2')) {
          squares[y].classList.remove('laser2');
          clearInterval(laser2Id);
        }
      }
    }

    laser2Id = setInterval(moveLaser2, 100);
  } else if (!end) {
    shoot2(); // Intenta disparar de nuevo si no hay invader en la posición seleccionada
  }
}

export function draw() {
  for (let i = 0; i < alienInvaders.length; i++) {
    if (!aliensRemoved.includes(i)) {
      squares[alienInvaders[i]].classList.add('invader');
    }
  }
}
