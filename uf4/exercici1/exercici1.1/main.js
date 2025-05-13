  // Definición de la clase base Personaje
  class Personaje {
    constructor(nombre, raza, vida, ataque, curacion, especialidadataque, especialidadcurarse) {
        this.nombre = nombre;
        this.raza = raza;
        this.vida = vida;
        this.ataque = ataque;
        this.curacion = curacion;
        this.especialidadataque = especialidadataque;
        this.especialidadcurarse = especialidadcurarse;
    }

    recibirAtaque(danio) {
        this.vida -= danio;
        if (this.vida <= 0) {
            console.log(`${this.nombre} ha perdido la batalla.`);
        }
    }



    curarse() {
        const curacionTotal = this.curacion + this.especialidadcurarse;
        this.vida += curacionTotal;
    }


  }


  // Definición de subclase para los personajes Saiyajin
  class navidad extends Personaje {
    constructor(nombre, vida, ataque, curacion, especialidadcurarse) {
        super(nombre, "Saiyajin", vida, ataque, curacion, 0, especialidadcurarse);
    }
  }

  // Definición de subclase para los personajes Saiyajin
  class leon extends Personaje {
    constructor(nombre, vida, ataque, curacion, especialidadataque) {
        super(nombre, "Saiyajin", vida, ataque, curacion, especialidadataque, 0);
    }
  }

  // Definición de subclase para los personajes Demonio del frío
  class zanahoria extends Personaje {
    constructor(nombre, vida, ataque, curacion, especialidadataque) {
        super(nombre, "Demonio del frío", vida, ataque, curacion, especialidadataque, 0);
    }
  }

  // Definición de subclase para los personajes Namekianos
  class spiderwoman extends Personaje {
    constructor(nombre, vida, ataque, curacion, especialidadataque) {
        super(nombre, "Namekiano", vida, ataque, curacion, especialidadataque, 0);
    }
  }

  // Definición de subclase para los personajes Majin
  class Majinbuu extends Personaje {
    constructor(nombre, vida, ataque, curacion, especialidadcurarse) {
        super(nombre, "Majin", vida, ataque, curacion, 0, especialidadcurarse);
    }
  }

  // Definición de subclase para los personajes Humanos y Saiyajin
  class pikachu extends Personaje {
    constructor(nombre, vida, ataque, curacion, especialidadataque) {
        super(nombre, "Humano y Saiyajin", vida, ataque, curacion, especialidadataque, 0);
    }
  }

  const personaje1 = new navidad("navidad", 100, 30, 20, 20);
  const personaje2 = new leon("leon", 100, 28, 20, 15);
  const personaje3 = new zanahoria("zanahoria", 100, 40, 10, 10);
  const personaje4 = new spiderwoman("spiderwoman", 100, 19, 30, 10);
  const personaje5 = new Majinbuu("Luigi", 100, 25, 40, 10);
  const personaje6 = new pikachu("pikachu", 100, 20, 15, 10);

  let heroe;
  let oponente;

  function ocultarPersonajesSeleccionados(heroe) {
    const personajes = document.querySelectorAll('.personaje');
    personajes.forEach(personaje => {
      if (personaje.id !== heroe) {
        personaje.style.display = 'none';
      }
    });
  }

  function mostrarPersonajeAleatorio() {
    const personajesOcultos = document.querySelectorAll('.personaje[style="display: none;"]');
    if (personajesOcultos.length > 0) {
      const personajeAleatorio = personajesOcultos[Math.floor(Math.random() * personajesOcultos.length)];
      personajeAleatorio.style.display = 'block';
      const oponenteId = personajeAleatorio.id; // Obtener el ID del oponente seleccionado
      oponente = oponenteId; // Actualizar la variable oponente con el ID
      console.log("El oponente es " + oponente);
      document.getElementById('elegir').style.display = 'none';
      document.getElementById('seleccionarf').style.display = 'none';
      document.getElementById('seleccionargh').style.display = 'none';
      document.getElementById('seleccionarp').style.display = 'none';
      document.getElementById('seleccionarv').style.display = 'none';
      document.getElementById('seleccionarg').style.display = 'none';
      document.getElementById('seleccionarm').style.display = 'none';
      document.getElementById('titulo').style.display = 'none';
      document.getElementById('pelea').style.display = 'block';
      document.getElementById('accionesgh').style.display = 'none';
      document.getElementById('accionesfh').style.display = 'none';
      document.getElementById('accionesmh').style.display = 'none';
      document.getElementById('accionesvh').style.display = 'none';
      document.getElementById('accionesph').style.display = 'none';
      document.getElementById('accionesghh').style.display = 'none';
      document.getElementById('accionesgo').style.display = 'block';
      document.getElementById('accionesfo').style.display = 'block';
      document.getElementById('accionesmo').style.display = 'block';
      document.getElementById('accionesvo').style.display = 'block';
      document.getElementById('accionespo').style.display = 'block';
      document.getElementById('accionesgho').style.display = 'block';
      document.getElementById('heroe').style.display = 'block';
      document.getElementById('oponente').style.display = 'block';
      // Mostrar el personaje aleatorio en el div 'oponente'
      document.getElementById('oponente').innerHTML = personajeAleatorio.outerHTML;
      // Actualizar UI para mostrar el panel de lucha y las acciones

    } else {
      console.log('Todos los personajes ya están visibles.');
    }
  }

  function seleccionarPersonaje(heroeSeleccionado) {
    heroe = heroeSeleccionado; 
    ocultarPersonajesSeleccionados(heroe.id );
    mostrarPersonajeAleatorio();
    
    // Actualizar UI para mostrar el panel de lucha y las acciones
    document.getElementById('elegir').style.display = 'none';
    document.getElementById('seleccionarf').style.display = 'none';
    document.getElementById('seleccionargh').style.display = 'none';
    document.getElementById('seleccionarp').style.display = 'none';
    document.getElementById('seleccionarv').style.display = 'none';
    document.getElementById('seleccionarg').style.display = 'none';
    document.getElementById('seleccionarm').style.display = 'none';
    document.getElementById('titulo').style.display = 'none';
    document.getElementById('pelea').style.display = 'block';
    document.getElementById('accionesgh').style.display = 'block';
    document.getElementById('accionesfh').style.display = 'block';
    document.getElementById('accionesmh').style.display = 'block';
    document.getElementById('accionesvh').style.display = 'block';
    document.getElementById('accionesph').style.display = 'block';
    document.getElementById('accionesghh').style.display = 'block';
    document.getElementById('accionesgo').style.display = 'none';
    document.getElementById('accionesfo').style.display = 'none';
    document.getElementById('accionesmo').style.display = 'none';
    document.getElementById('accionesvo').style.display = 'none';
    document.getElementById('accionespo').style.display = 'none';
    document.getElementById('accionesgho').style.display = 'none';
    document.getElementById('heroe').style.display = 'block';
    document.getElementById('oponente').style.display = 'block';

    // Mostrar los datos del personaje seleccionado

    const personajeSeleccionado = document.getElementById(heroe);
    if (personajeSeleccionado) {
      document.getElementById('heroe').innerHTML = personajeSeleccionado.outerHTML;
      console.log("el heroe es " + heroe)
    } else {
      console.error('El personaje seleccionado no existe.');
    }
  }


  function obtenerHeroe() {


    const personajeSeleccionado = document.getElementById(heroe);

    switch (personajeSeleccionado.id) {
      case 'navidad':
        console.log('personaje heroe: navidad');
        return personaje1;
      case 'leon':
        console.log('personaje heroe: leon');
        return personaje2;
      case 'zanahoria':
        console.log('personaje heroe: zanahoria');
        return personaje3;
      case 'spiderwoman':
        console.log('personaje heroe: spiderwoman');
        return personaje4;
      case 'Luigi':
        console.log('personaje heroe: Luigi');
        return personaje5;
      case 'pikachu':
        console.log('personaje heroe: pikachu');
        return personaje6;
      default:
        console.error('Hero character not found for ID: ' + heroe);
        return null;
    }
  }


 // Función mejorada para obtener el oponente
function obtenerOponente() {
  // Asegurarse de que el ID del oponente está correctamente asignado y existe
  if (!oponente || !document.getElementById(oponente)) {
      console.error('Personaje oponente no encontrado o ID no existe:', oponente);
      return null; // Retornar null si no se encuentra
  }

  // Usar el ID para obtener el objeto personaje correcto
  switch (oponente) {
      case 'navidad':
          console.log('personaje oponente: navidad');
          return personaje1;
      case 'leon':
          console.log('personaje oponente: leon');
          return personaje2;
      case 'zanahoria':
          console.log('personaje oponente: zanahoria');
          return personaje3;
      case 'spiderwoman':
          console.log('personaje oponente: spiderwoman');
          return personaje4;
      case 'Luigi':
          console.log('personaje oponente: Luigi');
          return personaje5;
      case 'pikachu':
          console.log('personaje heroe: pikachu');
          return personaje6;
      default:
          console.error('Personaje oponente no identificado:', oponente);
          return null;
  }
}

  // Función para atacar al oponente
  function atacarh() {
    const heroe = obtenerHeroe();
    const oponente = obtenerOponente();
    const ataqueTotal = heroe.ataque + heroe.especialidadataque;
    oponente.recibirAtaque(ataqueTotal);
    console.log(`${heroe.nombre} ataca a ${oponente.nombre} con ${ataqueTotal} puntos de daño. Que es ${heroe.ataque} + ${heroe.especialidadataque} .Vida restante de ${oponente.nombre}: ${oponente.vida}`);
    if (oponente.vida <= 0) {
      alert("WIN " + heroe.nombre);
    }
  }

  // Función para que el héroe se cure
  function curarseh() {
    const heroe = obtenerHeroe();
    heroe.curarse(); // curarse ya añade la especialidad al cálculo dentro de la clase
    console.log(`${heroe.nombre} se cura, recuperando puntos de vida.  Que es ${heroe.curacion} + ${heroe.especialidadcurarse}. Vida actual: ${heroe.vida}`);
  }


  // Función para atacar al oponente (revisión simple)
function atacaro() {
  const heroe = obtenerHeroe();
  const oponente = obtenerOponente();
  if (heroe && oponente) {
      const ataqueTotal = oponente.ataque + oponente.especialidadataque;
      heroe.recibirAtaque(ataqueTotal);
      console.log(`${oponente.nombre} ataca a ${heroe.nombre} con ${ataqueTotal} puntos de daño. Que es ${oponente.ataque} + ${oponente.especialidadataque} .Vida restante de ${heroe.nombre}: ${heroe.vida}`);
      if (heroe.vida <= 0) {
          alert("WIN " + oponente.nombre);
      }
  }
}
// Función para que el oponente se cure
function curarseo() {
  const oponente = obtenerOponente();
  if (oponente) {
      oponente.curarse();
      console.log(`${oponente.nombre} se cura, recuperando puntos de vida.  Que es ${oponente.curacion} + ${oponente.especialidadcurarse}. Vida actual: ${oponente.vida}`);
  }
}


