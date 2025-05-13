// Exemple d'ús de la funció llegirXML per llegir aula.xml i crear objectes de la classe aula
let aules= [];

async function llegirXML(arxiu) {
    const resposta = await fetch(arxiu, { mode: 'no-cors'});
    const text = await resposta.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text, "application/xml");
    return xmlDoc;
}


function mostraaulesEnTaula(aules) {
  const taula = document.createElement('table');
  taula.border = 1;
  const thead = document.createElement('thead');
  const titols = ['NumAula', 'Capacitat'];
  const filaTitols = document.createElement('tr');

  titols.forEach((titol) => {
    const th = document.createElement('th');
    th.textContent = titol;
    filaTitols.appendChild(th);
  });

  thead.appendChild(filaTitols);
  taula.appendChild(thead);

  const tbody = document.createElement('tbody');

  aules.forEach((aula) => {
    const fila = document.createElement('tr');
    const dades = [
      aula.getNumAula(),
      aula.getCapacitat(),
      
    ];

    dades.forEach((dada) => {
      const td = document.createElement('td');
      td.textContent = dada;
      fila.appendChild(td);
    });

    tbody.appendChild(fila);
  });

  taula.appendChild(tbody);
  document.getElementById('aules').appendChild(taula);
}




async function llegiraulesDesDeXML(arxiu){
  const xmlDoc = await llegirXML(arxiu);
//  llegirXML(arxiu).then((xmlDoc) => {
    const elementsaula = xmlDoc.getElementsByTagName("aula");
  
    for (let i = 0; i < elementsaula.length; i++) {
      const numaula = elementsaula[i].getElementsByTagName("numAula")[0].textContent;
      const capacitat = elementsaula[i].getElementsByTagName("capacitat")[0].textContent;
      const aula = new Aula(numaula, capacitat);
      
  
      aules.push(aula);
//  });
}
}
// Executa les funcions corresponents quan la pàgina carrega
document.addEventListener('DOMContentLoaded', async () => {
 window.location.pathname.endsWith('Aula.html') 
    const xmlDoc = await llegiraulesDesDeXML("aula.xml"); 
  //  const aules = crearaulesDesDeXML(xmlDoc);
    mostraaulesEnTaula(aules);
  
});


/*// Exemple d'ús de la funció generaraulesXML per generar un arxiu aules.xml

const aulesXML = generaraulesXML();
console.log(aulesXML);*/

