import {pokemonObjects} from "./PokemonData.js";
import {populateTable} from "./UIHandlers.js";


// QUICK SORT
function quickSort(arr) {
 if (arr.length <= 1) {
   return arr;
 }
 const pivot = arr[0];
 const left = [];
 const right = [];
 for (let i = 1; i < arr.length; i++) {
   const elementStat = parseInt(arr[i].stat, 10);
   const pivotStat = parseInt(pivot.stat, 10);
   if (elementStat < pivotStat || (elementStat === pivotStat && arr[i].name < pivot.name)) {
     left.push(arr[i]);
   } else {
     right.push(arr[i]);
   }
 }
 return quickSort(left).concat(pivot, quickSort(right));
}


// QUICK SORT: TEMPS                      


export function quickSortAndPopulate() {
 const resultElement = document.getElementById("temps"); // Mostra resultat
 const startTime = performance.now(); // S'obté temps inicial
 const sortedpokemonObjects = quickSort(pokemonObjects); // Crida funció
 const endTime = performance.now(); // S'obté temps final
 const elapsedTime = endTime - startTime; // Càlcul temps en milisegons
  resultElement.textContent = `Temps que triga quickSort: ${elapsedTime} milisegons.` // Mostra temps transcurrit
  populateTable(sortedpokemonObjects); // Crida funció per a la taula
}




////////////////////////////////////////////////////////////////////////////////////////////////////////


// SELECTION SORT


function selectionSort() {
 const n = pokemonObjects.length;
 for (let i = 0; i < n - 1; i++) {
   let minIndex = i;
   for (let j = i + 1; j < n; j++) {
     const statA = parseInt(pokemonObjects[j].stat, 10);
     const statB = parseInt(pokemonObjects[minIndex].stat, 10);
     if (statA < statB || (statA === statB && pokemonObjects[j].name.localeCompare(pokemonObjects[minIndex].name) < 0)) {
       minIndex = j;
     }
   }
   if (minIndex !== i) {
     const temp = pokemonObjects[i];
     pokemonObjects[i] = pokemonObjects[minIndex];
     pokemonObjects[minIndex] = temp;
   }
 }
 return pokemonObjects;
}


// SELECTION SORT TIME
 export function selectionSortAndPopulate() {
 const resultElement = document.getElementById("temps"); // Obtenir resultat
 const startTime = performance.now(); // Obtenir temps inicial
 const sortedpokemonObjects = selectionSort(pokemonObjects); // Crida funció
 const endTime = performance.now(); // Obtenir temps final
 const elapsedTime = endTime - startTime; // Càlcul temps en milisegons
  resultElement.textContent = `Temps que triga selectonSort: ${elapsedTime} milisegons.`; // Mostra temps transcurrit


 populateTable(sortedpokemonObjects); // Crida funció per a la taula
}


////////////////////////////////////////////////////////////////////////////////////////////////////////
// INSERTION SORT
function insertionSort(arr) {
 const n = arr.length;
 for (let i = 1; i < n; i++) {
   const key = arr[i];
   let j = i - 1;
   while (j >= 0 && (parseInt(arr[j].stat, 10) > parseInt(key.stat, 10) || (parseInt(arr[j].stat, 10) === parseInt(key.stat, 10) && arr[j].name.localeCompare(key.name) > 0))) {
     arr[j + 1] = arr[j];
     j = j - 1;
   }
   arr[j + 1] = key;
 }
 return arr;
}




// INSERTION SORT TIME


export function insertionSortAndPopulate() {
 const resultElement = document.getElementById("temps"); // Obtenir resultat
 const startTime = performance.now(); // Obtenir temps inicial
 const sortedpokemonObjects = insertionSort(pokemonObjects); // Crida funció
 const endTime = performance.now(); // Obtenir temps final
 const elapsedTime = endTime - startTime; // Càlcul temps en milisegons
 resultElement.textContent = `Temps que triga insertionSort: ${elapsedTime} milisegons.`; // Mostra temps transcurrit
 populateTable(sortedpokemonObjects); // Crida funció per a la taula
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BUBBLE SORT


function bubbleSort(arr) {
 const n = arr.length;
 for (let i = 0; i < n - 1; i++) {
   for (let j = 0; j < n - i - 1; j++) {
     const statA = parseInt(arr[j].stat, 10);
     const statB = parseInt(arr[j + 1].stat, 10);
     if (statA > statB || (statA === statB && arr[j].name.localeCompare(arr[j + 1].name) > 0)) {
       // Swap arr[j] and arr[j+1]
       const temp = arr[j];
       arr[j] = arr[j + 1];
       arr[j + 1] = temp;
     }
   }
 }
 return arr;
}


// BUBBLE SORT: TEMPS


export function bubbleSortAndPopulate() {
 const resultElement = document.getElementById("temps"); // Obtenir resultat
 const startTime = performance.now(); // Obtenir temps incial
 const sortedpokemonObjects = bubbleSort(pokemonObjects); // Crida funció
 const endTime = performance.now(); // Obtenir temps final
 const elapsedTime = endTime - startTime; // Càlcul temps en milisegons
 resultElement.textContent = `Temps que triga bubbleSort: ${elapsedTime} milisegons.`; // Mostra temps transcurrit
 populateTable(sortedpokemonObjects); // Crida funció per a la taula
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// MIX IT
function mixIt(arr) {
 const n = arr.length;
 for (let i = n - 1; i > 0; i--) {
   const j = Math.floor(Math.random() * (i + 1));
   // Intercambia arr[i] y arr[j]
   [arr[i], arr[j]] = [arr[j], arr[i]];
 }
 return arr;
}
// MIX SORT: TEMPS
export function mix() {
 const resultElement = document.getElementById("temps"); // Obtenir resultat
 const startTime = performance.now(); // Obtenir temps incial
 const sortedpokemonObjects = mixIt(pokemonObjects); // Crida funció
 const endTime = performance.now(); // S'obté temps finalització
 const elapsedTime = endTime - startTime; // Càlcul temps en milisegons
 resultElement.textContent = `Temps que triga mixIt: ${elapsedTime} milisegons.`; // Mostra temps transcurrit
 populateTable(sortedpokemonObjects); // Crida funció per a la taula
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




