document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('drop-zone');
    const gallery = document.getElementById('gallery');

    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('dragging');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('dragging');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragging');
        const files = e.dataTransfer.files;
        if (files.length) {
            uploadFiles(files);
        }
    });

    dropZone.addEventListener('click', () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.multiple = true;
        fileInput.click();

        fileInput.onchange = () => {
            const files = fileInput.files;
            uploadFiles(files);
        };
    });

    function uploadFiles(files) {
        Array.from(files).forEach(file => {
            // Simulate file upload and show progress
            const url = './img';
            const formData = new FormData();
            formData.append('file', file);

            // Use fetch API to upload the file
            fetch("archivo.php", {
                    method: "POST",
                    body: formData
                })
                .then(function (response) {
                    return response.json();
                }).then(function (respondeData) {
                    console.log("tot OK!");
                    showImagePreview(file); // Muestra la imagen en el gallery
                    uploadToServer(formData); // Sube la imagen al servidor
                })
                .catch((error) => {
                    console.error('Error', error);
                });
        });
    }

    function showImagePreview(file) {
        let fileType = file.type;
        let validExtensions = ["image/jpeg", "image/jpg", "image/png"];
        const gallery = document.getElementById('gallery');
        if (validExtensions.includes(fileType)) {
            let fileReader = new FileReader();
            fileReader.onload = () => {
                let fileURL = fileReader.result;
                var imgTag = `<img src="${fileURL}" alt="" class="uploaded-image">`;
                const uploadedImage = document.createElement('div');
                uploadedImage.classList.add('uploaded-image-container');
                uploadedImage.innerHTML = imgTag;
                gallery.appendChild(uploadedImage);
            };
            fileReader.readAsDataURL(file);
        } else {
            alert("This is not an Image File!");
            dropZone.classList.remove("active");
            dropZone.textContent = "Drag & Drop to Upload File";
        }
    }

    function uploadToServer(formData) {
        fetch("archivo.php", {
                method: "POST",
                body: formData
            })
            .then(function (response) {
                return response.json();
            }).then(function (responseData) {
                console.log("Archivo subido al servidor:", responseData);
            })
            .catch((error) => {
                console.error('Error al subir archivo al servidor:', error);
            });
    }
});
