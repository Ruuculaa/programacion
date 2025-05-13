let horarisGlobal = []; // Renombrar para evitar conflictos

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

function mostrahorarisEnThorari(horaris) {
    const thorari = document.createElement('table');
    thorari.border = 1;
    
    const titols = ['Dia','HoraInici', 'HoraFi'];
    const thead = document.createElement('thead');
    const filaTitols = document.createElement('tr');

    titols.forEach((titol) => {
        const th = document.createElement('th');
        th.textContent = titol;
        filaTitols.appendChild(th);
    });

    thead.appendChild(filaTitols);
    thorari.appendChild(thead);

    const tbody = document.createElement('tbody');

    horaris.forEach((horari) => {
        const fila = document.createElement('tr');
        
        const dades = [
            horari.dia,
            horari.horaInici,
            horari.horaFi,
        ];

        dades.forEach((dada) => {
            const td = document.createElement('td');
            td.textContent = dada;
            fila.appendChild(td);
        });

        tbody.appendChild(fila);
    });

    thorari.appendChild(tbody);

    const horarisElement = document.getElementById('horaris');
    if (horarisElement) {
        horarisElement.appendChild(thorari);
    } else {
        console.error("No se encontró ningún elemento con el id 'horaris' en el DOM.");
    }
}


async function llegirHorarisDesDeXML(arxiu) {
    try {
        const xmlDoc = await llegirXML(arxiu);
        const elementsHorari = xmlDoc.getElementsByTagName("horari");
        const horaris = [];

        for (let i = 0; i < elementsHorari.length; i++) {
            const dia = elementsHorari[i].getElementsByTagName("dia")[0].textContent;
            const horaInici = elementsHorari[i].getElementsByTagName("horaInici")[0].textContent;
            const horaFi = elementsHorari[i].getElementsByTagName("horaFi")[0].textContent;
            const horari = new Hora(dia,horaInici, horaFi, null, null, null); // Crear instancia de la clase Hora

            horaris.push(horari);
        }

        return horaris;
    } catch (error) {
        console.error("Error al leer los horarios desde el archivo XML:", error);
        throw error;
    }
}



document.addEventListener('DOMContentLoaded', async () => {
    try {
        if (window.location.pathname.endsWith('horaris.html')) {
            horarisGlobal = await llegirHorarisDesDeXML("horari.xml");
            mostrahorarisEnThorari(horarisGlobal);
        }
    } catch (error) {
        console.error("Error al cargar la página:", error);
    }
});
