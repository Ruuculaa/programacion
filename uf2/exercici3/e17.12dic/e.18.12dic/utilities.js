// extractCoordinates
export function extraerCoordenadas(celda){
    // funcion que extrae fila y columna de una celda, y lo devuelve como objeto.
        let coord={
            X: parseInt(celda.charAt(0),10),
            Y: parseInt(celda.charAt(1),10)
        }
        return coord;
    }

// fusionCoordinates
export function fusionarCoordenadas(x,y){
    return String(x)+String(y);
}

/* --------------------------------------------------------------------------- NUEVAS FUNCIONES ---------------------------------------------------------------------------------*/

// whichPiece 
// En esta función regresamos el tipo de pieza (blanca o negra) que hay en la celda 
export function quePieza(celda){// function whichPiece del prototipo
    return $("#"+celda).text();
}

// Función donde declaramos la celda donde esta ubicada una pieza y si no hay ninguna torre se marca o si hay una torre pues no se marca
// occupiedCell
export function celdaOcupada(celda) {
   
    return $("#"+celda).text()!="";
}

// Función donde declaramos las dos piezas y si son diferentes o no 
//oppositePiece
export function piezaContraria(pieza1, pieza2){
    return pieza1!=pieza2;
}

/*
// samePiece
function piezaMisma(pieza1, pieza2) {
    return pieza1==pieza2;
}

randomCoord {
    
}
*/
