// IMPORTACIONES DESDE OTROS ARCHIVOS
import { marcadoCeldas,moverPieza } from "./gamelogic.js";
import { limpiezaCeldas } from "./gui.js";
import { quePieza } from "./utilities.js";

// DECLARAMOS VARIABLES
let turn = 1;
let twhite = 3;
let tblack = 3;

// Funció de escritura de las torres y los turnos de los jugadores
function write(){
// Añadimos una condición que si el turno que este actualmente es impar, turno de torres blancas, sino torres negras
document.getElementById("turn").innerHTML ="Torn de: "+((turn%2==1)?"blanques":"negres");
document.getElementById("twhite").innerHTML ="Torres Blanques: "+twhite;
document.getElementById("tblack").innerHTML ="Torres Negres: "+tblack;
}

let movementStarted=null;
function init(){
    $(document).ready(function(){
        $(".chess-board").click(function() {
            let cellId = $(this).attr("id");
            // Declaramos la condición que si las celda detecta los contenidos HTML "♜" "♖"
            if ($("#" + cellId).html() == "♜" || $("#" + cellId).html() == "♖") {
                // Declaramos la condición que si la casilla que seleccion
                if((movementStarted==null && ($("#" + cellId).html() == "♖" && turn%2==1) || $("#" + cellId).html() == "♜" && turn%2==0)){
                    // Al seleccionar la casilla, declaramos que la casilla seleccionada "movementStarted" tendrá la id de la casilla "cellID"
                    movementStarted=cellId;
                    marcadoCeldas($("#" + cellId).html(),cellId);
                }
                else if(cellId==movementStarted){
                    movementStarted=null;
                    limpiezaCeldas();
                }
                else if(movementStarted !=null){
                    if ($("#" + cellId).html() != $("#" + movementStarted).html()){
                        // Al llegar a la condición implica el cambio de turno, ya que se come la torre enemiga
                        moverPieza(movementStarted, cellId);
                        (quePieza(cellId) == "♜") ? twhite-- : tblack--;
                        movementStarted=null;
                        limpiezaCeldas();
                        turn++;
                        write();
                        // Añadimos la condición que si las torres negras o blancas lleguen a 0 muestre un alert del ganador
                        twhite==0? alert("Ha ganado las torres negras") : tblack==0? alert("Ha ganado las torres blancas") : null; 
                    }
                }
            }
            else if(cellId!=undefined){
                // Se ha hecho click en una celda distinta. Debemos ver si la celda está marcada y, si lo está, mover la pieza
                // movementStarted tiene la primera celda, cellId tiene la segunda
                moverPieza(movementStarted,cellId); 
                movementStarted=null;
                turn++;
                write();
            }
        });
    });
}

document.addEventListener("DOMContentLoaded",()=>{write();
    init();});
