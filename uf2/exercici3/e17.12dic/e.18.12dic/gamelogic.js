// IMPORTACIONES DESDE OTROS ARCHIVOS
import { marcar, insertarPieza, eliminarPieza, limpiezaCeldas, celdaMarcada } from "./gui.js";
import { extraerCoordenadas, quePieza, celdaOcupada, fusionarCoordenadas, piezaContraria } from "./utilities.js";

export function marcadoCeldas(pieza, celda) {
  /* whereToGo funcion mark del prototipo*/
  // Cuando se hace click sobre una torre, se hace el marcado en diagonal y horizontal de adonde puede moverse
  marcadoArriba(pieza, celda);
  marcadoAbajo(pieza, celda);
  marcadoDerecha(pieza, celda);
  marcadoIzquierda(pieza, celda);
}

/*------------------------------------------------------------- ARRIBA ---------------------------------------------------------------------------*/
function marcadoArriba(pieza, celda) {
  //marca todas las celdas desde la torre, hasta el borde derecho del tablero. Celda es un string con dos números entre 0 y 7, por ejemplo 00 fila 0 columna 0
        let coord=extraerCoordenadas(celda);
        let tempX=coord.X-1;
        marcar (coord.X,coord.Y);
        while(tempX>=0 && !celdaOcupada(fusionarCoordenadas(tempX,coord.Y))){
            marcar(tempX,coord.Y);
            tempX--;
        }
        if(tempX>=0 && piezaContraria(quePieza(celda),quePieza(fusionarCoordenadas(tempX,coord.Y)))){// hay una torre que se puede matar
            marcar(tempX,coord.Y);
        }
}

/*------------------------------------------------------------- ABAJO ---------------------------------------------------------------------------*/


function marcadoAbajo(pieza, celda) {
  //marca todas las celdas desde la torre, hasta el borde derecho del tablero. Celda es un string con dos números entre 0 y 7, por ejemplo 00 fila 0 columna 0
        let coord=extraerCoordenadas(celda);
        let tempX=coord.X+1;
        marcar (coord.X,coord.Y);
        while(tempX<8 && !celdaOcupada(fusionarCoordenadas(tempX,coord.Y))){
            marcar(tempX,coord.Y);
            tempX++;
        }
        if(tempX<8 && piezaContraria(quePieza(celda),quePieza(fusionarCoordenadas(tempX,coord.Y)))){// hay una torre que se puede matar
            marcar(tempX,coord.Y);
        }
}

/*-------------------------------------------------------------- DERECHA -------------------------------------------------------------------------*/
function marcadoDerecha(pieza, celda) {
  //marca todas las celdas desde la torre, hasta el borde superior del tablero. Celda es un string con dos números entre 0 y 7, por ejemplo 00 fila 0 columna 0
        let coord=extraerCoordenadas(celda);
        let tempY=coord.Y+1;
        marcar (coord.X,coord.Y);
        while(tempY<8 && !celdaOcupada(fusionarCoordenadas(coord.X,tempY))){
            marcar(coord.X,tempY);
            tempY++;
        }
        if(tempY<8 && piezaContraria(quePieza(celda),quePieza(fusionarCoordenadas(coord.X,tempY)))){// hay una torre que se puede matar
            marcar(coord.X,tempY);
        }
}

/*------------------------------------------------------------ IZQUIERDA -------------------------------------------------------------------------*/
function marcadoIzquierda(pieza, celda) {
  //marca todas las celdas desde la torre, hasta el borde superior del tablero. Celda es un string con dos números entre 0 y 7, por ejemplo 00 fila 0 columna 0
    let coord=extraerCoordenadas(celda);
    let tempY=coord.Y-1;
    marcar (coord.X,coord.Y);
    while(tempY>=0 && !celdaOcupada(fusionarCoordenadas(coord.X,tempY))){
// recorremos el tablero mientras no lleguemos a la esquina del mismo, y mientras no encontremos una pieza.
        marcar(coord.X,tempY);
        tempY--;
    }
/* Aquí se puede llegar si:
    - Llegamos a final del tablero -> no hay que marcar NADA
    - Si llegamos a una pieza del color contrario -> Aquí marcamos una MÁS!
    - Si llegamos a una pieza del mismo color -> no hay que marcar NADA
*/
    if(tempY>=0 && piezaContraria(quePieza(celda),quePieza(fusionarCoordenadas(coord.X,tempY)))){// hay una torre que se puede matar
        marcar(coord.X,tempY);
    }
}

/* ------------------------------------------------------------- NUEVAS FUNCIONES --------------------------------------------------------------- */
// movePiece
// En esta función recogemos las variables celdaIni(movementStarded) y celdaFin(cellId) , donde indicaremos una condición: llamamos la función "celdaMarcada" que recogerá la celda donde irá la pieza indicando que si donde vayamos a clicar esta marcado no. Llamamos la función "insertarPieza" añadiendo la función "quePieza"y las variables"celdaIni" y "celdaFin". Luego la función "eliminarPieza" eliminará la pieza de su ubicación inicial y por ultimo una limpieza de celdas mediante la función "limpiezaCeldas"   
export function moverPieza(celdaIni, celdaFin) {
  if (celdaMarcada(celdaFin)) {
    insertarPieza(quePieza(celdaIni),celdaFin)
    eliminarPieza(celdaIni);
    limpiezaCeldas();
  }
}

/* 
menacedCell {
 
}

placeRocks {

}

*/


