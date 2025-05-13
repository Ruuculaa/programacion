// Exemple d'ús de la funció llegirXML per llegir professor.xml i crear objectes de la classe Professor
let professors = [];

async function llegirXML(arxiu) {
    const resposta = await fetch(arxiu, { mode: 'no-cors'});
    const text = await resposta.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text, "application/xml");
    return xmlDoc;
}
// Exemple de funció per llegir un arxiu XML
 


// Funció per generar un arxiu professors.xml amb una taula de tots els professors
/*function generarProfessorsXML() {
  const xmlDoc = document.implementation.createDocument("", "", null);
  const root = xmlDoc.createElement("professors");
  xmlDoc.appendChild(root);

  for (const professor of professors) {
    const elementProfessor = xmlDoc.createElement("professor");
    const nom = xmlDoc.createElement("nom");
    nom.appendChild(xmlDoc.createTextNode(professor.nom));
    const cognom = xmlDoc.createElement("cognom");
    cognom.appendChild(xmlDoc.createTextNode(professor.cognom));
    const DNI = xmlDoc.createElement("DNI");
    DNI.appendChild(xmlDoc.createTextNode(professor.DNI));
    const especialitat = xmlDoc.createElement("especialitat");
    especialitat.appendChild(xmlDoc.createTextNode(professor.especialitat));

    elementProfessor.appendChild(nom);
    elementProfessor.appendChild(cognom);
    elementProfessor.appendChild(DNI);
    elementProfessor.appendChild(especialitat);

    const assignaturesElement = xmlDoc.createElement("assignatures");
    
    for (const assignatura of professor.getAssignatures()) {
      const assignaturaElement = xmlDoc.createElement("assignatura");
      assignaturaElement.setAttribute("codi", assignatura.codi);
      assignaturaElement.appendChild(xmlDoc.createTextNode(assignatura.nom));
      assignaturesElement.appendChild(assignaturaElement);
    }
    
    elementProfessor.appendChild(assignaturesElement);
    root.appendChild(elementProfessor);
    
    }
    
    const serializer = new XMLSerializer();
    const xmlString = serializer.serializeToString(xmlDoc);
    return xmlString;
}*/

function mostraProfessorsEnTaula(professors) {
  const taula = document.createElement('table');
  taula.border = 1;
  const thead = document.createElement('thead');
  const titols = ['Nom', 'Cognom', 'DNI', 'Especialitat', 'Assignatures'];
  const filaTitols = document.createElement('tr');

  titols.forEach((titol) => {
    const th = document.createElement('th');
    th.textContent = titol;
    filaTitols.appendChild(th);
  });

  thead.appendChild(filaTitols);
  taula.appendChild(thead);

  const tbody = document.createElement('tbody');

  professors.forEach((professor) => {
    const fila = document.createElement('tr');
    const dades = [
      professor.getNom(),
      professor.getCognom(),
      professor.getDNI(),
      professor.getEspecialitat(),
      professor.getAssignatures().map((assignatura) => `${assignatura.getNom()} (${assignatura.getCodi()})`).join(', '),
    ];

    dades.forEach((dada) => {
      const td = document.createElement('td');
      td.textContent = dada;
      fila.appendChild(td);
    });

    tbody.appendChild(fila);
  });

  taula.appendChild(tbody);
  document.getElementById('professors').appendChild(taula);
}

async function llegirAssignaturesDesDeXML(arxiu) {
  const xmlDoc = await llegirXML(arxiu);
  const elementsAssignatura = xmlDoc.getElementsByTagName("assignatura");
  const assignatures = [];

  for (let i = 0; i < elementsAssignatura.length; i++) {
    const nom = elementsAssignatura[i].getElementsByTagName("nom")[0].textContent;
    const codi = elementsAssignatura[i].getElementsByTagName("codi")[0].textContent;
    const grup = elementsAssignatura[i].getElementsByTagName("grup")[0].textContent;

    const assignatura = new Assignatura(nom, codi, [], grup);

    const elementsHorari = elementsAssignatura[i].getElementsByTagName("diaSetmana");

    for (let j = 0; j < elementsHorari.length; j++) {
      const dia = elementsHorari[j].getElementsByTagName("dia")[0].textContent;
      const horaInici = elementsHorari[j].getElementsByTagName("horaInici")[0].textContent;
      const horaFi = elementsHorari[j].getElementsByTagName("horaFi")[0].textContent;

      const horari = new Horari();
      horari.afegirHora(dia, new Hora(horaInici, horaFi));
      assignatura.horari.push(horari);
    }

    assignatures.push(assignatura);
  }

  return assignatures;
}

function mostraAssignaturesEnTaula(assignatures) {
  const taula = document.createElement('table');
  taula.border = 1;
  const thead = document.createElement('thead');
  const titols = ['Nom', 'Codi', 'Horari', 'Grup'];
  const filaTitols = document.createElement('tr');

  titols.forEach((titol) => {
    const th = document.createElement('th');
    th.textContent = titol;
    filaTitols.appendChild(th);
  });

  thead.appendChild(filaTitols);
  taula.appendChild(thead);

  const tbody = document.createElement('tbody');

  assignatures.forEach((assignatura) => {
    const fila = document.createElement('tr');
    const horariString = assignatura.horari.map(horari => {
      const diaHora = [];
      horari.getDiesSetmana().forEach((hores, dia) => {
        hores.forEach(hora => {
          diaHora.push(`${dia}: ${hora.getHoraInici()}-${hora.getHoraFi()}`);
        });
      });
      return diaHora.join(', ');
    }).join(', ');

    const dades = [
      assignatura.getNom(),
      assignatura.getCodi(),
      horariString,
      assignatura.getGrup(),
    ];

    dades.forEach((dada) => {
      const td = document.createElement('td');
      td.textContent = dada;
      fila.appendChild(td);
    });

    tbody.appendChild(fila);
  });

  taula.appendChild(tbody);
  document.getElementById('assignatures').appendChild(taula);
}

async function llegirProfessorsDesDeXML(arxiu){
  const xmlDoc = await llegirXML(arxiu);
//  llegirXML(arxiu).then((xmlDoc) => {
    const elementsProfessor = xmlDoc.getElementsByTagName("professor");
  
    for (let i = 0; i < elementsProfessor.length; i++) {
      const nom = elementsProfessor[i].getElementsByTagName("nom")[0].textContent;
      const cognom = elementsProfessor[i].getElementsByTagName("cognom")[0].textContent;
      const DNI = elementsProfessor[i].getElementsByTagName("DNI")[0].textContent;
      const especialitat = elementsProfessor[i].getElementsByTagName("especialitat")[0].textContent;
  
      const professor = new Professor(nom, cognom, DNI, especialitat);
      const assignatures = elementsProfessor[i].getElementsByTagName("assignatura");
  
      for (let j = 0; j < assignatures.length; j++) {
        const assignatura = assignatures[j].textContent;
        const codi = assignatures[j].getAttribute("codi");
        professor.afegirAssignatura({ nom: assignatura, codi: codi });
      }
        
      professors.push(professor);
    }
//  });
}

// Executa les funcions corresponents quan la pàgina carrega
document.addEventListener('DOMContentLoaded', async () => {
  if (window.location.pathname.endsWith('Assignatures.html')) {
    const assignatures = await llegirAssignaturesDesDeXML("assignatura.xml");
    mostraAssignaturesEnTaula(assignatures);
  } else if (window.location.pathname.endsWith('Professor.html')) {
    const xmlDoc = await llegirProfessorsDesDeXML("professor.xml"); 
  //  const professors = crearProfessorsDesDeXML(xmlDoc);
    mostraProfessorsEnTaula(professors);
  }
});


/*// Exemple d'ús de la funció generarProfessorsXML per generar un arxiu professors.xml

const professorsXML = generarProfessorsXML();
console.log(professorsXML);*/

