<?php
header('Content-Type: application/json');

if ($_FILES["arxiu"]["error"] == UPLOAD_ERR_OK) {
    $nombre_temporal = $_FILES["arxiu"]["tmp_name"];
    $datosCSV = array_map('str_getcsv', file($nombre_temporal));
    $encabezados = array_shift($datosCSV); // Remover los encabezados y guardarlos en una variable separada
    $datos = array();
    foreach ($datosCSV as $fila) {
        $datos[] = array_combine($encabezados, $fila);
    }
    echo json_encode($datos);
} else {
    http_response_code(500);
}
?>
