// alumne.js
class Alumne {
  constructor(nom, cognom, DNI, curs, grup) {
    this.nom = nom;
    this.cognom = cognom;
    this.DNI = DNI;
    this.curs = curs;
    this.grup = grup;
  }

  getNom() {
    return this.nom;
  }

  getCognom() {
    return this.cognom;
  }

  getDNI() {
    return this.DNI;
  }

  getCurs() {
    return this.curs;
  }

  getGrup() {
    return this.grup;
  }
}

let alumnes = [];

async function llegirAlumnesDesDeXML(arxiu) {
  const xmlDoc = await llegirXML(arxiu);
  const elementsAlumne = xmlDoc.getElementsByTagName("alumne");

  for (let i = 0; i < elementsAlumne.length; i++) {
    const nom = elementsAlumne[i].getElementsByTagName("nom")[0].textContent;
    const cognom = elementsAlumne[i].getElementsByTagName("cognom")[0].textContent;
    const DNI = elementsAlumne[i].getElementsByTagName("DNI")[0].textContent;
    const curs = elementsAlumne[i].getElementsByTagName("curs")[0].textContent;
    const grup = elementsAlumne[i].getElementsByTagName("grup")[0].textContent;
    
    const alumne = new Alumne(nom, cognom, DNI, curs, grup);
    alumnes.push(alumne);
  }
}

function mostraAlumnesEnTaula(alumnes) {
  const taula = document.createElement('table');
  taula.border = 1;
  taula.className = 'taula-alumnes';
  
  const thead = document.createElement('thead');
  const titols = ['Nom', 'Cognom', 'DNI', 'Curs', 'Grup'];
  const filaTitols = document.createElement('tr');

  titols.forEach((titol) => {
    const th = document.createElement('th');
    th.textContent = titol;
    filaTitols.appendChild(th);
  });

  thead.appendChild(filaTitols);
  taula.appendChild(thead);

  const tbody = document.createElement('tbody');

  alumnes.forEach((alumne) => {
    const fila = document.createElement('tr');
    const dades = [
      alumne.getNom(),
      alumne.getCognom(),
      alumne.getDNI(),
      alumne.getCurs(),
      alumne.getGrup()
    ];

    dades.forEach((dada) => {
      const td = document.createElement('td');
      td.textContent = dada;
      fila.appendChild(td);
    });

    tbody.appendChild(fila);
  });

  taula.appendChild(tbody);
  
  // Limpiar el contenedor antes de añadir la tabla
  const container = document.getElementById('alumnes');
  container.innerHTML = '';
  container.appendChild(taula);
}

// Cargar alumnos cuando la página esté lista
document.addEventListener('DOMContentLoaded', async () => {
  if (window.location.pathname.endsWith('Alumne.html')) {
    try {
      await llegirAlumnesDesDeXML("alumne.xml");
      mostraAlumnesEnTaula(alumnes);
    } catch (error) {
      console.error("Error cargando alumnos:", error);
      document.getElementById('alumnes').innerHTML = 
        '<p class="error">Error al cargar los datos de los alumnos</p>';
    }
  }
});