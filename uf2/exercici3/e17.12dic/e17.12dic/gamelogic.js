import {marcar,desmarcar,limpiezaCeldas} from './gui.js';
export function marcadoCeldas(pieza,celda){
// Cuando se hace click sobre una torre, se hace el marcado en diagonal y horizontal de adonde puede moverse
    marcadoArriba(pieza,celda);
    marcadoAbajo(pieza,celda);
    marcadoDerecha(pieza,celda);
    marcadoIzquierda(pieza,celda);
}
function marcadoIzquierda(pieza,celda){
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
function marcadoDerecha(pieza,celda){
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
function marcadoAbajo(pieza,celda){
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
function marcadoArriba(pieza,celda){
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
    function extraerCoordenadas(celda){
// funcion que extrae fila y columna de una celda, y lo devuelve como objeto.
    let coord={
        X: parseInt(celda.charAt(0),10),
        Y: parseInt(celda.charAt(1),10)
    }
    return coord;
}
export function fusionarCoordenadas(x,y){
    return String(x)+String(y);
}
export function moverPieza(celdaInicial,celdaFinal){
    if(estaMarcada(celdaFinal)){// puedo mover la torre
        insertarPieza(quePieza(celdaInicial),celdaFinal)
        eliminarPieza(celdaInicial);
    }
}

export function quePieza(celda){
    return $("#"+celda).text();
}
function estaMarcada(celda){
    if($("#"+celda).hasClass("markedlight")||$("#"+celda).hasClass("markeddark")){
        return true;
    }
    else{
        return false;
    }
//    return ($("#"+celda).hasClass("markedlight")||$("#"+celda).hasClass("markeddark"))?true:false;
}
function insertarPieza(pieza, celda){
    $("#"+celda).text(pieza);
}
function eliminarPieza(celda){
    $("#"+celda).text("");
}
function celdaOcupada(celda){

    return $("#"+celda).text()!="";
}
function piezaContraria(pieza1,pieza2){
    return pieza1!=pieza2;
}







