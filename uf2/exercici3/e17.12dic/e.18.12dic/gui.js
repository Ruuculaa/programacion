// IMPORTACIONES DESDE OTROS ARCHIVOS
import { fusionarCoordenadas } from "./utilities.js";

// markOne: Marca una cel·la
export function marcar(x,y){//funcion markedOne
    const idCelda=fusionarCoordenadas(x,y); // x->0 y->7 ="07"
    const celda=document.getElementById(idCelda);
    if(celda.classList.contains('light')){
        celda.classList.replace('light','markedlight');
    } else if(celda.classList.contains('dark')){
        celda.classList.replace('dark','markeddark');
    }
}

// unMarkOne: Desmarca una cel·la específica.
export function desmarcar(x,y){
    const idCelda=fusionarCoordenadas(x,y); // x->0 y->7 ="07"
    const celda=document.getElementById(idCelda);
    if(celda.classList.contains('markedlight')){
        celda.classList.replace('markedlight','light');
    } else if(celda.classList.contains('markeddark')){
        celda.classList.replace('markeddark','dark');
    }
}

// cleanUpBoard: Neteja el tauler de les marques de moviment.
export function limpiezaCeldas(){
	for(let i=0;i<8;i++){
		for(let j=0;j<8;j++){
			desmarcar(i,j);
		}
	}
}

/* ----------------- NUEVAS FUNCIONES ------------- */

// Insereix una peça en una cel·la determinada 
// InsertPiece
// En esta función recogemos las variables "pieza" y "celda" donde recogeremos la id de la celda y el texto que haya en ella
export function insertarPieza(pieza, celda) {
    $("#"+celda).text(pieza);
}

// Elimina una peça d'una cel·la determinada 
// removePiece
// En esta función recogemos la variable "celda" donde al llamar la función elimine el texto o contenido HTML que haya en la celda "cellId"
export function eliminarPieza(celda){
    $("#"+celda).text("");
}

// Comprova si una cel·la està marcada com a jugada possible 
// isMarked 
// En esta función recogemos la variable "celda" donde nos regresará un TRUE o FALSE dependiendo si las celdas, tienen la clases CSS "markedlight" y "markeddark"
export function celdaMarcada(celda){
    return ($("#"+celda).hasClass("markedlight")||$("#"+celda).hasClass("markeddark"))?true:false;
}
