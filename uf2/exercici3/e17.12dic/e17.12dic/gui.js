// Importa la función fusionarCoordenadas del módulo gamelogic.js
// Esta función convierte coordenadas numéricas (x,y) a un string id ("00", "01", etc.)
import { fusionarCoordenadas } from "./gamelogic.js";

// Función para marcar/resaltar una celda específica del tablero
// Recibe coordenadas (x,y) de la celda a marcar
export function marcar(x,y){
    // Convierte las coordenadas a un ID de celda (ej: x=0, y=7 => "07")
    const idCelda=fusionarCoordenadas(x,y);
    
    // Obtiene la referencia al elemento HTML de la celda
    const celda=document.getElementById(idCelda);
    
    // Si la celda tiene clase 'light' (color claro)
    if(celda.classList.contains('light')){
        // Cambia la clase a 'markedlight' (resaltado para celdas claras)
        celda.classList.replace('light','markedlight');
    } 
    // Si la celda tiene clase 'dark' (color oscuro)
    else if(celda.classList.contains('dark')){
        // Cambia la clase a 'markeddark' (resaltado para celdas oscuras)
        celda.classList.replace('dark','markeddark');
    }
}

// Función para quitar el marcado/resaltado de una celda
// Recibe coordenadas (x,y) de la celda a desmarcar
export function desmarcar(x,y){
    // Convierte las coordenadas a un ID de celda
    const idCelda=fusionarCoordenadas(x,y);
    
    // Obtiene la referencia al elemento HTML de la celda
    const celda=document.getElementById(idCelda);
    
    // Si la celda está marcada como 'markedlight' (resaltado claro)
    if(celda.classList.contains('markedlight')){
        // Restaura la clase original 'light'
        celda.classList.replace('markedlight','light');
    } 
    // Si la celda está marcada como 'markeddark' (resaltado oscuro)
    else if(celda.classList.contains('markeddark')){
        // Restaura la clase original 'dark'
        celda.classList.replace('markeddark','dark');
    }
}

// Función para limpiar TODOS los marcados del tablero completo
export function limpiezaCeldas(){
    // Recorre todas las filas del tablero (0 a 7)
    for(let i=0;i<8;i++){
        // Recorre todas las columnas del tablero (0 a 7)
        for(let j=0;j<8;j++){
            // Desmarca cada celda individualmente
            desmarcar(i,j);
        }
    }
}