<?php
/**
 * SEGNEC - Procesador de Formulario de Contacto
 * Envía las consultas de la web a info@segnec.com.ar
 */

// 1. Configuración
$destinatario = "info@segnec.com.ar";
$asunto = "Nueva consulta desde la web Segnec";

// 2. Cabeceras para respuesta JSON
header('Content-Type: application/json');

// 3. Verificar método de envío
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["status" => "error", "message" => "Método no permitido"]);
    exit;
}

// 4. Obtener y sanitizar datos
$nombre   = filter_var(trim($_POST["nombre"] ?? ""), FILTER_SANITIZE_STRING);
$email    = filter_var(trim($_POST["email"] ?? ""), FILTER_SANITIZE_EMAIL);
$telefono = filter_var(trim($_POST["telefono"] ?? ""), FILTER_SANITIZE_STRING);
$mensaje  = filter_var(trim($_POST["mensaje"] ?? ""), FILTER_SANITIZE_STRING);

// 5. Validación básica
if (empty($nombre) || empty($email) || empty($mensaje)) {
    echo json_encode(["status" => "error", "message" => "Por favor, completa todos los campos obligatorios."]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["status" => "error", "message" => "El formato del email no es válido."]);
    exit;
}

// 6. Construir el cuerpo del mensaje
$contenido = "Has recibido una nueva consulta desde el formulario de contacto de segnec.com.ar:\n\n";
$contenido .= "Nombre: $nombre\n";
$contenido .= "Email: $email\n";
$contenido .= "Teléfono: " . ($telefono ?: "No proporcionado") . "\n";
$contenido .= "Mensaje:\n$mensaje\n\n";
$contenido .= "---";

// 7. Cabeceras del correo
$headers = "From: Web Segnec <no-reply@segnec.com.ar>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// 8. Enviar correo
try {
    if (mail($destinatario, $asunto, $contenido, $headers)) {
        echo json_encode(["status" => "success", "message" => "¡Mensaje enviado con éxito! Nos contactaremos pronto."]);
    } else {
        throw new Exception("Error al ejecutar la función mail().");
    }
} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => "Hubo un problema al enviar el mensaje. Por favor, intentá más tarde."]);
}
?>
