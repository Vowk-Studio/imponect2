<?php

// OK, la respuesta que le daremos al navegador SIEMPRE es JSON
header('Content-Type: application/json');

// Sólo aceptamos requests POST. El GET es para visitas normales, no para forms.
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // --- Lectura de los datos del formulario (el payload JSON) ---
    
    // PHP tiene que leer los datos crudos que JS mandó con fetch.
    $json_data = file_get_contents('php://input');
    $data = json_decode($json_data, true);

    // Si algo sale mal al decodificar o faltan campos, corto aquí.
    if (json_last_error() !== JSON_ERROR_NONE || !isset($data['email']) || !isset($data['consulta'])) {
        http_response_code(400); // Bad Request
        echo json_encode(['success' => false, 'message' => '¡Faltan datos en el form!']);
        exit;
    }
    
    // Limpio y asigno variables por si intentan inyectar algo feo
    $email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
    $consulta = htmlspecialchars($data['consulta']);
    
    // Doble chequeo de que el email sea email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400); 
        echo json_encode(['success' => false, 'message' => 'El email tiene un formato raro.']);
        exit;
    }

    // --- Prepárate para el envío de correo ---
    
    $destinatario = "ventas@imponect.com"; // <-- ¡Asegúrate que este email sea el bueno!
    $asunto = "Nueva Consulta Web: " . $email;
    
    $cuerpo = "Email del remitente: " . $email . "\n\n";
    $cuerpo .= "Mensaje:\n" . $consulta;
    
    // Cabeceras para que no vaya a Spam y sepa responder
    $cabeceras = 'From: ' . $email . "\r\n" .
                 'Reply-To: ' . $email . "\r\n" .
                 'X-Mailer: PHP/' . phpversion();

    // --- ¡A enviar! ---
    
    if (mail($destinatario, $asunto, $cuerpo, $cabeceras)) {
        // Enviar OK al JS
        http_response_code(200);
        echo json_encode(['success' => true, 'message' => '¡Mensaje enviado con éxito!']);
        exit;
    } else {
        // Algo falló en el servidor (revisar logs o configuración de hosting)
        http_response_code(500); 
        echo json_encode(['success' => false, 'message' => 'Error del servidor. El mail no salió.']);
        exit;
    }

} else {
    // Si acceden por URL (navegador), les digo que no
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método incorrecto, usa el formulario.']);
    exit;
}
