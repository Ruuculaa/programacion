let grups = [];

async function llegirXML(arxiu) {
    try {
        const resposta = await fetch(arxiu, { mode: 'no-cors' });
        const text = await resposta.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, "application/xml");
        return xmlDoc;
    } catch (error) {
        console.error("Error al leer el archivo XML:", error);
        throw error;
    }
}


function mostraGrupsEnTgrup(grups) {
    const tgrup = document.createElement('table');
    tgrup.border = 1;
    const thead = document.createElement('thead');
    const titols = ['NumGrup', 'NomAlumne','Cognom', 'DNI'];
    const filaTitols = document.createElement('tr');

    titols.forEach((titol) => {
        const th = document.createElement('th');
        th.textContent = titol;
        filaTitols.appendChild(th);
    });

    thead.appendChild(filaTitols);
    tgrup.appendChild(thead);

    const tbody = document.createElement('tbody');

    grups.forEach((grup) => {
        const fila = document.createElement('tr');
        const dades = [
            grup.getNumGrup(),
            grup.getAlumnes().map((alumne) => `${alumne.getNom()}`).join(),
            grup.getAlumnes().map((alumne) => `${alumne.getCognom()}`).join(),
            grup.getAlumnes().map((alumne) => `${alumne.getDNI()}`).join(),
        ];

        dades.forEach((dada) => {
            const td = document.createElement('td');
            td.textContent = dada;
            fila.appendChild(td);
        });

        tbody.appendChild(fila);
    });

    tgrup.appendChild(tbody);
    document.getElementById('grups').appendChild(tgrup);
}



async function llegirGrupsDesDeXML(arxiu) {
    try {
        const xmlDoc = await llegirXML(arxiu);
        const elementsGrup = xmlDoc.getElementsByTagName("grup");
        const grups = [];

        for (let i = 0; i < elementsGrup.length; i++) {
            const numGrup = elementsGrup[i].getElementsByTagName("numGrup")[0].textContent;
            const grup = new Grup(numGrup);

            const alumnes = elementsGrup[i].getElementsByTagName("alumne");
            for (let j = 0; j < alumnes.length; j++) {
                const nom = alumnes[j].getElementsByTagName("nom")[0].textContent;
                const cognom = alumnes[j].getElementsByTagName("cognom")[0].textContent;;
                const DNI = alumnes[j].getElementsByTagName("DNI")[0].textContent;;
                const alumne = new Alumne(nom,cognom,DNI,null,numGrup);
                grup.afegirAlumne(alumne);
            }

            grups.push(grup);
        }

        return grups;
    } catch (error) {
        console.error("Error al leer los grupos desde el archivo XML:", error);
        throw error;
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
     window.location.pathname.endsWith('grup.html')
            const grups = await llegirGrupsDesDeXML("grup.xml");
            mostraGrupsEnTgrup(grups);
        
    } catch (error) {
        console.error("Error al cargar la página:", error);
    }
});
