// Declarar variables
let board = null;
let game = new Chess;

let boardConfig = {
   draggable: true,
   position: "start", 
   sparePieces: false,   
   onDrop: function(source,target, piece, newPos, oldPos, orientation) {
       let move = game.move({
           from: source,
           to: target,
       });
       console.log("Source: " + source);
       console.log("Target: " + target);
       console.log("Piece: " + piece);
       console.log("newPos: " + Chessboard.objToFen(newPos));
       console.log("oldPos: " + Chessboard.objToFen(oldPos));
       console.log("Orientation: " + orientation);
       console.log("============================");
       if(move===null){
           return 'snapback';
       }
   }
}


let queenPositions;
let solution=[0,0,0,0,0,0,0,0];
function solutionToPositions(solution){
   let rows="abcdefgh"
   let positions={};
   solution.forEach((col,row)=>{
       const position = rows[col] + (row + 1);
       positions [position] = "bQ"
   });
   return positions;
}

/*let boardPositions = {
    a1: [0, 0],    a2: [0, 1],  a3:[0, 2],     a4: [0, 3],    a5: [0, 4],    a6: [0, 5],    a7: [0, 6],    a8: [0, 7],
    b1: [1, 0],    b2: [1, 1],  b3: [1, 2],    a4: [1, 3],    b5: [1, 4],    b6: [1, 5],    b7: [1, 6],    b8: [1, 7],
    c1: [2, 0],    c2: [2, 1],  c3: [2, 2],    c4: [2, 3],    c5: [2, 4],    c6: [2, 5],    c7: [2, 6],    c8: [2, 7],
    d1: [3, 0],    d2: [3, 1],  d3: [3, 2],    d4: [3, 3],    d5: [3, 4],    d6: [3, 5],    d7: [3, 6],    d8: [3, 7],
    e1: [4, 0],    e2: [4, 1],  e3: [4, 2],    e4: [4, 3],    e5: [4, 4],    e6: [4, 5],    e7: [4, 6],    e8: [4, 7],
    f1: [5, 0],    f2: [5, 1],  f3: [6, 2],    f4: [5, 3],    f5: [5, 4],    f6: [5, 5],    f7: [5, 6],    f8: [5, 7],
    g1: [6, 0],    g2: [6, 1],  g3: [6, 2],    g4: [6, 3],    g5: [6, 4],    g6: [6, 5],    g7: [6, 6],    g8: [6, 7],
    h1: [7, 0],    h2: [7, 1],  h3: [7, 2],    h4: [7, 3],    h5: [7, 4],    h6: [7, 5],    h7: [7, 6],    h8: [7, 7],
};*/

/*let boardPositions={
    a1: (0, 1),    "bQ": (0, 2),   a3: (0, 3),    a4: (0, 4),    a5: (0, 5),    a6: (0, 6),    a7: (0, 7),    a8: (0, 8),
    b1: (1, 1),    b2: (1, 2),  b3: (1, 3),    bQ: (1, 4),    b5: (1, 5),    b6: (1, 6),    b7: (1, 7),    b8: (1, 8),
    c1: (2, 1),    c2:(2, 2),   c3: (2, 3),    c4: (2, 4),    c5: (2, 5),    bQ: (2, 6),    c7: (2, 7),    c8: (2, 8),
    d1: (3, 1),    d2: (3, 2),  d3: (3, 3),    d4: (3, 4),    d5: (3, 5),    d6: (3, 6),    d7: (3, 7),    bQ: (3, 8),
    e1: (4, 1),    e2: (4, 2),  bQ: (4, 3),    e4: (4, 4),    e5: (4, 5),    e6: (4, 6),    e7: (4, 7),    e8: (4, 8),
    bQ: (5, 1),    f2: (5, 2),  f3: (6, 3),    f4: (5, 4),    f5: (5, 5),    f6: (5, 6),    f7: (5, 7),    f8: (5, 8),
    g1: (6, 1),    g2: (6, 2),  g3: (6, 3),    g4: (6, 4),    g5: (6, 5),    g6: (6, 6),    bQ: (6, 7),    g8: (6, 8),
    h1: (7, 1),    h2: (7, 2),  h3: (7, 3),    h4: (7, 4),    bQ: (7, 5),    h6: (7, 6),    h7: (7, 7),    h8: (7, 8),
    
}*/
/*const boardPositions=[
    a1 [0, 1],   "bQ"[0, 2],  a3 [0, 3],    a4 [0, 4],    a5 [0, 5],    a6 [0, 6],    a7 [0, 7],    a8 [0, 8],
    b1 [1, 1],    b2 [1, 2],  b3 [1, 3],    bQ [1, 4],    b5 [1, 5],    b6 [1, 6],    b7 [1, 7],    b8 [1, 8],
    c1 [2, 1],    c2 [2, 2],  c3 [2, 3],    c4 [2, 4],    c5 [2, 5],    bQ [2, 6],    c7 [2, 7],    c8 [2, 8],
    d1 [3, 1],    d2 [3, 2],  d3 [3, 3],    d4 [3, 4],    d5 [3, 5],    d6 [3, 6],    d7 [3, 7],    bQ [3, 8],
    e1 [4, 1],    e2 [4, 2],  bQ [4, 3],    e4 [4, 4],    e5 [4, 5],    e6 [4, 6],    e7 [4, 7],    e8 [4, 8],
    bQ [5, 1],    f2 [5, 2],  f3 [6, 3],    f4 [5, 4],    f5 [5, 5],    f6 [5, 6],    f7 [5, 7],    f8 [5, 8],
    g1 [6, 1],    g2 [6, 2],  g3 [6, 3],    g4 [6, 4],    g5 [6, 5],    g6 [6, 6],    bQ [6, 7],    g8 [6, 8],
    h1 [7, 1],    h2 [7, 2],  h3 [7, 3],    h4 [7, 4],    bQ [7, 5],    h6 [7, 6],    h7 [7, 7],    h8 [7, 8],
    
];*/
/* a1,a2:wQ,a3,a4,a5,a6,a7,a8,
    b1,b2,b3,b4:wQ,b5,b6,b7,b8,
    c1,c2,c3,c4,c5,c6:wQ,c7,c8,
    d1,d2,d3,d4,d5,d6,d7,d8:wQ,
    e1,e2,e3:wQ,e4,e5,e6,e7,e8,
    f1:wQ,f2,f3,f4,f5,f6,f7,f8,
    g1,g2,g3,g4,g5,g6,g7:wQ,g8,
    h1,h2,h3,h4,h5:wQ,h6,h7,h8 */
    function convertCoord(c) {
        //convert a typical chess coord to a numerical one object, with X and Y, like "a0" -> x: 0, y: 0
        const col = c.charAt(0);
        const row = c.charAt(1);
        const y = col.charCodeAt(0) - 'a'.charCodeAt(0);
        const x = parseInt(row, 10) - 1;
        return { X: x, Y: y };
      }
      
      function convertPos(X,Y) {
        //convert a c.X, c.Y coordinate to a typical chess coord string, like c.X: 0, c.y: 0 -> "a0"
        const col = String.fromCharCode('a'.charCodeAt(0) + Y);
        const row = X + 1;
        return col + row;
      }
      let threatenedQueens = []; // Variable para mantener un registro de las reinas amenazadas

      function checkQueenThreats(queenPositions) {
          threatenedQueens = []; // Limpiar el registro de reinas amenazadas en cada llamada
          let queenCoord = Object.keys(queenPositions);
          queenCoord.forEach(element => {
              let celda = convertCoord(element);
              if (marcadoCeldas("bQ", celda)) {
                  threatenedQueens.push(celda); // Agregar la posición de la reina amenazada al registro
              }
          });
          if (threatenedQueens.length > 0) {
              console.log("¡Las reinas están amenazadas!");
              console.log("Posiciones amenazadas:", threatenedQueens);
          } else {
              console.log("Las reinas no están amenazadas.");
          }
      }
//        let isQueenMarked = marcadoCeldas(celda);
  /*if ("bQ" == marcar(celda)) {
            console.log("La reina está amenazada");
            // Haz algo si la reina está amenazada
        } else {
            console.log("La reina no está amenazada");
            // Haz algo si la reina no está amenazada
        }*/
    
    


/*

        function limpiezaCeldas(){
            for(let i=0;i<8;i++){
                for(let j=0;j<8;j++){
                    desmarcar(i,j);
                }
            }
        }*/
        function marcadoCeldas(pieza, celda) {
 //           const coord = convertCoord(celda);
 /*           const x = coord.X;
            const y = coord.Y;*/
            let threatsDetected = false;
            marcadoArriba(pieza, celda);
            marcadoAbajo(pieza, celda);
            marcadoDerecha(pieza, celda);
            marcadoIzquierda(pieza, celda);
            marcadoDiagonal(pieza, celda);
            return threatsDetected; 
        }
      
        function marcadoArriba(pieza, celda) {
            //marca todas las celdas desde la pieza hacia arriba hasta el borde superior del tablero
            
 //           let coord = convertPos(X,Y);
            
            let tempY = celda.Y - 1;
            marcar(celda.X, celda.Y);
            while (tempY >= 0) {
                marcar(celda.X, tempY);
                tempY--;
            }
        }
        
        function marcadoAbajo(pieza, celda) {
            //marca todas las celdas desde la pieza hacia abajo hasta el borde inferior del tablero
//            let celda = convertPos(x,y);
            let tempY = celda.Y + 1;
            marcar(celda.X, celda.Y);
            while (tempY < 8) {
                marcar(celda.X, tempY);
                tempY++;
            }
        }
        function marcadoDerecha(pieza, celda) {
            //marca todas las celdas desde la pieza hacia la derecha hasta el borde derecho del tablero
//            let celda = convertPos(x,y);
            let tempX = celda.X + 1;
            marcar(celda.X, celda.Y);
            while (tempX < 8) {
                marcar(tempX, celda.Y);
                tempX++;
            }
        }
        function marcadoIzquierda(pieza, celda) {
            //marca todas las celdas desde la pieza hacia la izquierda hasta el borde izquierdo del tablero
//            let celda = convertPos(x,y);
            let tempX = celda.X - 1;
            marcar(celda.X, celda.Y);
            while (tempX >= 0) {
                marcar(tempX, celda.Y);
                tempX--;
            }
        }
       
        
    

        function marcadoDiagonal(pieza, celda) {
            // marca todas las celdas en diagonal desde la posición especificada
//            let celda = convertPos(x,y);
            let tempX, tempY;
        
            // diagonal hacia arriba y hacia la izquierda
            tempX = celda.X - 1;
            tempY = celda.Y - 1;
            marcar(celda.X, celda.Y); // marca la posición inicial
            while (tempX >= 0 && tempY >= 0) {
                marcar(tempX, tempY);
                tempX--;
                tempY--;
            }
        
            // diagonal hacia abajo y hacia la derecha
            tempX = celda.X + 1;
            tempY = celda.Y + 1;
            while (tempX < 8 && tempY < 8) {
                marcar(tempX, tempY);
                tempX++;
                tempY++;
            }
        
            // diagonal hacia arriba y hacia la derecha
            tempX = celda.X - 1;
            tempY = celda.Y + 1;
            while (tempX >= 0 && tempY < 8) {
                marcar(tempX, tempY);
                tempX--;
                tempY++;
            }
        
            // diagonal hacia abajo y hacia la izquierda
            tempX = celda.X + 1;
            tempY = celda.Y - 1;
            while (tempX < 8 && tempY >= 0) {
                marcar(tempX, tempY);
                tempX++;
                tempY--;
            }
        }
        function marcar(x,y) {
            let celda = convertPos(x,y); 
            const elemento = document.querySelector('[data-square="'+celda+'"]');            
            // Asegúrate de que el elemento exista
                if (elemento.classList.contains('white-1e1d7')) { 
                    elemento.classList.add('highlight2-9c5d2'); 
                } else if (elemento.classList.contains('black-3c85d')) { 
                    elemento.classList.add('highlight2-9c5d2'); 
                
            } 
        }
        
        let boardConfigNQueenGame = {
            draggable: true,
            position: "empty",
            sparePieces: false,
            onDrop: function (source, target, piece, newPos, oldPos, orientation) {
                // Llamada a la función para marcar las amenazas de las reinas después de cada movimiento
                let queensThreatened = checkQueenThreats(newPos);
                // Console log para mostrar información mientras va funcionando el programa
                console.log("Source: " + source);
                console.log("Target: " + target);
                console.log("Piece: " + piece);
                // Método que permite describir una posición de un objeto de forma comprimida
                console.log("newPos: " + Chessboard.objToFen(newPos));
                console.log("oldPos: " + Chessboard.objToFen(oldPos));
                console.log("Orientation: " + orientation);
                console.log("============================");
                
                // Resto del código para volver a marcar las celdas amenazadas
                if (queenPositions) {
                    threatenedQueens.forEach(celda => {
                        marcar(celda.X, celda.Y);
                    });
                }
            }
        };
 
document.addEventListener("DOMContentLoaded", () => {
    const classicGame = document.getElementById("classicGame");
    board = Chessboard('board', boardConfigNQueenGame);
    queenPositions = solutionToPositions(solution);

    $("#nQueenGame").on('click', () => {
        // Establecer la posición inicial del tablero
        board.position(queenPositions);
        // Llamada a la función para marcar las amenazas de las reinas al iniciar el juego nQueenGame
        checkQueenThreats(queenPositions);
        
    });

    classicGame.addEventListener("click", () => {
        board = Chessboard("board", boardConfig);
    });
});