//IMPORTACIÓN
import { moveInvaders, draw } from './aliens.js';
import { currentShooterIndex, moveShooter, shoot } from "./shoot.js";

const grid = document.querySelector('.grid');
export const resultsDisplay = document.querySelector('.results');

let invadersId; // Control del intervalo de movimiento de los aliens
let isPaused = false; // Estado de pausa del juego

// Crear la cuadrícula
for (let i = 0; i < 225; i++) {
  const square = document.createElement('div');
  grid.appendChild(square);
}

export const squares = Array.from(document.querySelectorAll('.grid div'));

// Función para pausar el juego
function pauseGame() {
  if (!isPaused) {
    clearInterval(invadersId); // Limpia el intervalo de movimiento de los aliens
    isPaused = true; // Cambia el estado a pausado
    console.log("Juego en pausa");
  }
}

// Función para reanudar el juego
function resumeGame() {
  if (isPaused) {
    invadersId = setInterval(moveInvaders, 600); // Reinicia el intervalo
    isPaused = false; // Cambia el estado a reanudado
    console.log("Juego reanudado");
  }
}

// Botones de pausa y reanudación
document.getElementById('pauseBtn').addEventListener('click', pauseGame);
document.getElementById('resumeBtn').addEventListener('click', resumeGame);

// Llamadas a funciones iniciales
draw();
squares[currentShooterIndex].classList.add('shooter');
invadersId = setInterval(moveInvaders, 600);

// Eventos del teclado
document.addEventListener('keydown', (e) => {
  if (!isPaused) {
    shoot(e);       // Permite disparar solo si no está en pausa
    moveShooter(e); // Permite mover solo si no está en pausa
  }
});
