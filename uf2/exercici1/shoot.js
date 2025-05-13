import { resultsDisplay } from "./app.js";
import { alienInvaders, GO } from "./aliens.js";
import { squares } from "./app.js";

export let aliensRemoved = [];
export let currentShooterIndex = 202; /* posición inicial */
export let width = 15;
let results = 0;

// Mover el jugador (Shooter)
export function moveShooter(e) {
  if (GO) return; // No permitir movimiento si el juego ha terminado

  squares[currentShooterIndex].classList.remove('shooter');

  if (e.key === 'ArrowLeft' && currentShooterIndex % width !== 0) {
    currentShooterIndex -= 1;
  } else if (e.key === 'ArrowRight' && currentShooterIndex % width < width - 1) {
    currentShooterIndex += 1;
  }

  squares[currentShooterIndex].classList.add('shooter');
}

// Disparar láser
export function shoot(e) {
  if (GO) return; // No disparar si el juego ha terminado

  let laserId;
  let currentLaserIndex = currentShooterIndex;

  function moveLaser() {
    squares[currentLaserIndex].classList.remove('laser');
    currentLaserIndex -= width;

    // Si el láser se sale de la pantalla
    if (currentLaserIndex < 0) {
      clearInterval(laserId);
      return;
    }

    squares[currentLaserIndex].classList.add('laser');

    // Colisión con un invader
    if (squares[currentLaserIndex].classList.contains('invader')) {
      squares[currentLaserIndex].classList.remove('laser', 'invader');
      squares[currentLaserIndex].classList.add('boom');

      setTimeout(() => squares[currentLaserIndex].classList.remove('boom'), 300);
      clearInterval(laserId);

      const alienRemoved = alienInvaders.indexOf(currentLaserIndex);
      aliensRemoved.push(alienRemoved);

      results++;
      resultsDisplay.innerHTML = results;
      document.getElementById("obj").innerHTML = "Objetivo fallido";

      console.log(aliensRemoved);
    }
  }

  // Disparar con tecla ArrowUp
  if (e.key === 'ArrowUp') {
    laserId = setInterval(moveLaser, 100);
  }
}

// Eventos
document.addEventListener('keydown', moveShooter);
document.addEventListener('keydown', shoot);
