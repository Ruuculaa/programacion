class Jugador {
  // Constructor de la clase base Jugador
  constructor(nom, edat, posicio, partits, accion) {
    this.nom = nom;           // Nombre del jugador
    this.edat = edat;         // Edad del jugador
    this.posicio = posicio;   // Posición en el campo (ej: "Extremo")
    this.partits = partits;   // Número de partidos jugados
    this.accion = accion;     // Estadística específica según posición (goles, interceptaciones, etc.)
  }

  // Método para representar el jugador como cadena de texto
  toString() {
    return `${this.nom}, ${this.edat} años, posición: ${this.posicio}, partits: ${this.partits}, accion: ${this.accion}`;
  }

  // Método estático para calcular el promedio de acción por partido para un array de jugadores
  static calcularPromedioAccionPorPartido(jugadores) {
    const totalAccion = jugadores.reduce((acc, jugador) => acc + jugador.accion, 0);
    const totalPartits = jugadores.reduce((acc, jugador) => acc + jugador.partits, 0);
    return totalAccion / totalPartits;
  }

  // Método estático para mostrar la información de los jugadores en una tabla HTML
  static mostrarInformacionEnTabla(jugadores) {
    const statsBody = document.getElementById('statsBody');
    statsBody.innerHTML = ''; // Limpiamos la tabla antes de agregar nueva información

    jugadores.forEach(jugador => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${jugador.nom}</td>
        <td>${jugador.edat}</td>
        <td>${jugador.posicio}</td>
        <td>${jugador.accion}</td>
        <td>${jugador.partits}</td>
      `;
      statsBody.appendChild(row);
    });
  }
}

class Extremo extends Jugador {
  constructor(nom, edat, gols_encaixats, partits) {
    // Llama al constructor padre con la posición fija "Extremo"
    super(nom, edat, "Extremo", partits, gols_encaixats);
  }

  // Sobrescribe toString para añadir información específica de extremo
  toString() {
    return super.toString() + `, goles encajados: ${this.accion}`;
  }
}

class Lateral extends Jugador {
  constructor(nom, edat, interceptacions, partits) {
    // Llama al constructor padre con la posición fija "Lateral"
    super(nom, edat, "Lateral", partits, interceptacions);
  }

  // Sobrescribe toString para añadir información específica de lateral
  toString() {
    return super.toString() + `, interceptaciones: ${this.accion}`;
  }
}

class Central extends Jugador {
  constructor(nom, edat, gols, partits) {
    // Llama al constructor padre con la posición fija "Central"
    super(nom, edat, "Central", partits, gols);
  }

  // Sobrescribe toString para añadir información específica de central
  toString() {
    return super.toString() + `, goles: ${this.accion}`;
  }
}

class Pivot extends Jugador {
  constructor(nom, edat, gols, partits) {
    // Llama al constructor padre con la posición fija "Pivot"
    super(nom, edat, "Pivot", partits, gols);
  }

  // Sobrescribe toString para añadir información específica de pivote
  toString() {
    return super.toString() + `, goles: ${this.accion}`;
  }
}

// Crear algunos jugadores
// Crear instancias de jugadores para cada posición
const jugador1 = new Extremo("Lorena", 21, 57, 50);    // Extremo con 57 goles encajados en 50 partidos
const jugador2 = new Lateral("Ariadna", 20, 60, 43);   // Lateral con 60 interceptaciones en 43 partidos
const jugador3 = new Central("Andrea", 19, 40, 26);    // Central con 40 goles en 26 partidos
const jugador4 = new Pivot("Noa", 19, 63, 23);         // Pivote con 63 goles en 23 partidos

// Agrupar todos los jugadores en un array llamado "equipo"
const equipo = [jugador1, jugador2, jugador3, jugador4];

// Mostrar la información de todos los jugadores en una tabla HTML
Jugador.mostrarInformacionEnTabla(equipo);

// Calcular el promedio de acción por partido para todo el equipo
const promedioAccionPorPartido = Jugador.calcularPromedioAccionPorPartido(equipo);

// Mostrar el promedio calculado en un elemento HTML con id 'promedio'
const promedioAccionDiv = document.getElementById('promedio');
promedioAccionDiv.textContent = `Promedio de acción por partido: ${promedioAccionPorPartido.toFixed(2)}`;