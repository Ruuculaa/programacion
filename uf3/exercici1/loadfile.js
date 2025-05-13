function loadFile(){
    const fileInput = document.getElementById('file-input');
    const encondingSelect = document.getElementById('enconding-select');
    const textArea = document.getElementById('text-area')
    if(fileInput.files.length!=0){
        const file = fileInput.files[0];

        const reader = new FileReader();
        reader.readAsText(file, encondingSelect.value);

        reader.onload = () => {
            const texto = reader.result;
            textArea.value = texto;

            //Enviamos una solicitud HTTP GET al archivo en el servidor

            fetch('./' + file.name)
            .then(response => response.text())
            .then(textoServer => {
                console.log(textoServer);
            })
            .catch(error => console.error(error));
        };
    }
}

const fileInput = document.getElementById('file-input');
fileInput.addEventListener('change', loadFile)