import {pokemonObjects} from "./PokemonData.js";
import {quickSortAndPopulate, selectionSortAndPopulate, insertionSortAndPopulate, bubbleSortAndPopulate, mix} from './Utilities.js'


document.addEventListener("DOMContentLoaded",()=>{
 console.log(pokemonObjects);


 // Call populateTable with the array of pokemon objects
 populateTable(pokemonObjects); 
  
 quickSortBtn.addEventListener("click", quickSortAndPopulate);
 selectionSortBtn.addEventListener("click", selectionSortAndPopulate);
 insertSortBtn.addEventListener("click", insertionSortAndPopulate);
 bubbleSortBtn.addEventListener("click", bubbleSortAndPopulate);
 mixBtn.addEventListener("click", mix); 


})   
////////////////////////////////////////////////////////////////////////////////////////////////////////


function esborrarTaula() {
   a = document.getElementById('taula')
   a.innerHTML="";
}
// Assuming pokemonObjects is already defined as shown previously


// Function to create a table row for a given pokemon object
function creaTaulaPokemon(pokemon) {
 return `
   <tr>
     <td>${pokemon.id}</td>
     <td>${pokemon.name}</td>
     <td><img src="${pokemon.image}" alt="${pokemon.name}"></td>
     <td>${pokemon.stat}</td>
   </tr>
 `;
}


// Function to populate the table body with pokemon rows
export function populateTable(pokemonArray) {
   const tableBody = document.getElementById('taula');
   let rowsHtml = '';
    pokemonArray.forEach(pokemon => {
     rowsHtml += creaTaulaPokemon(pokemon);
   });
    tableBody.innerHTML = rowsHtml;
}
