    <?php
    header('Content-Type: application/json'); // Set the Content-Type to application/json

    if (isset($_FILES["file"])){ // Make sure this matches the name attribute in formData.append('file', file);
        $file = $_FILES["file"];

        $destination_path = "./img/" . $file["name"];
        if (move_uploaded_file($file["tmp_name"], $destination_path)) {
            // On successful upload, send a JSON response
            echo json_encode(["success" => true, "message" => "Archivo subido correctamente"]);
        } else {
            // If the upload fails for any reason, send a JSON error message
            echo json_encode(["success" => false, "message" => "Error al subir el archivo"]);
        }
    }
    else{
        // If no file is received, send a JSON error message
        echo json_encode(["success" => false, "message" => "Error: No se ha recibido ningun archivo"]);
    }
    ?>
