<?php
// Establece el tipo de contenido de la respuesta como JSON
header('Content-Type: application/json');

// Verifica si el archivo se subió correctamente (sin errores)
if ($_FILES["arxiu"]["error"] == UPLOAD_ERR_OK) {
    // Obtiene la ubicación temporal del archivo subido
    $nombre_temporal = $_FILES["arxiu"]["tmp_name"];
    
    // Lee el archivo CSV y convierte cada línea en un array
    $datosCSV = array_map('str_getcsv', file($nombre_temporal));
    
    // Extrae la primera fila (encabezados) y la guarda en una variable
    $encabezados = array_shift($datosCSV);
    
    // Prepara un array para almacenar los datos procesados
    $datos = array();
    
    // Combina cada fila de datos con los encabezados para crear arrays asociativos
    foreach ($datosCSV as $fila) {
        $datos[] = array_combine($encabezados, $fila);
    }
    
    // Convierte el array de datos a formato JSON y lo imprime
    echo json_encode($datos);
} else {
    // Si hubo un error al subir el archivo, devuelve un código de error 500
    http_response_code(500);
}
?>