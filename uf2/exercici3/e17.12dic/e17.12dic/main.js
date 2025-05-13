// Importación de funciones desde otros módulos:
// - gamelogic.js: Contiene la lógica básica del juego (marcar celdas, mover piezas, identificar piezas)
// - gui.js: Contiene funciones relacionadas con la interfaz gráfica (limpiar celdas marcadas)
import { marcadoCeldas, moverPieza, quePieza } from "./gamelogic.js";
import { limpiezaCeldas } from "./gui.js";

// Variables de estado del juego:
// - turn: Controla de quién es el turno actual (1=blancas, 2=negras)
// - twhite: Cantidad de torres blancas restantes
// - tblack: Cantidad de torres negras restantes
let turn = 1;
let twhite = 2;
let tblack = 2;

// Función que actualiza la interfaz de usuario:
// Muestra de quién es el turno actual y cuántas torres quedan de cada color
function write() {
  document.getElementById("turn").innerHTML =""+" Turno de "+((turn%2==1)? "blancas":"negras") ;
  document.getElementById("twhite").innerHTML =""+" Torres blancs "+twhite;
  document.getElementById("tblack").innerHTML ="" +"Torre negra "+tblack;
}

// Variable para rastrear el inicio de un movimiento:
// Almacena la celda de origen cuando un jugador selecciona una torre para mover
let movementStarted=null;

// Función principal que inicializa el juego:
// Configura los event listeners para el tablero de ajedrez
function init(){
   $(document).ready(function(){
       // Evento click para las celdas del tablero
       $(".chess-board").click(function() {
           let cellId = $(this).attr("id");
           
           // Comportamiento cuando se hace click en una torre (♜ o ♖)
           if ($("#" + cellId).html() == "♜" || $("#" + cellId).html() == "♖") {
               // Primera selección de una torre (inicio de movimiento)
               if(movementStarted==null&& ($("#" + cellId).html() == "♜" && turn%2==1 || $("#" + cellId).html() == "♖" && turn%2==0)){
                   movementStarted=cellId;
                   marcadoCeldas($("#" + cellId).html(),cellId); // Marca celdas disponibles
               }
               // Click en la misma torre (cancelar selección)
               else if(cellId==movementStarted){
                   movementStarted=null;
                   limpiezaCeldas(); // Limpia los marcadores
               }
               // Intento de capturar una torre enemiga
               else if(movementStarted !=null){
                   if ($("#" + cellId).html() != $("#" + movementStarted).html()){
                       moverPieza(movementStarted,cellId); // Mueve la torre
                       // Reduce el contador de torres del oponente
                       (quePieza(cellId) == "♜" ) ? twhite-- : tblack--;
                       movementStarted=null;
                       limpiezaCeldas();
                       turn++; // Cambia el turno
                       write(); // Actualiza la interfaz
                       // Comprueba si hay un ganador
                       twhite == 0 ? alert("Han ganado las torres negras") : tblack == 0 ? alert("Han ganado las torres blancas") : null;
                   }
               }
           }
           // Comportamiento al hacer click en una celda vacía
           else if(cellId!=undefined){
               if(movementStarted!=null) {
                   moverPieza(movementStarted,cellId); // Mueve la torre a celda vacía
                   movementStarted=null;
                   limpiezaCeldas();
                   turn++; // Cambia el turno
                   write(); // Actualiza la interfaz
               }
           }
       });
   });
}

// Inicialización del juego cuando el DOM está listo:
// - Muestra el estado inicial
// - Configura los event listeners
document.addEventListener("DOMContentLoaded",()=>{
   write();
   init();
});