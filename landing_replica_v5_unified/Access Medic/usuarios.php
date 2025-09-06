<?php
$host = "localhost";
$dbname = "access_medic";
$username = "root";
$password = "";

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $nombre = $_POST["nombre"];
        $contrasena = $_POST["contrasena"];

        $sql = "SELECT * FROM usuarios WHERE nombre = :nombre AND contrasena = :contrasena";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':nombre', $nombre);
        $stmt->bindParam(':contrasena', $contrasena);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            echo "success"; // Esto lo detectará JavaScript
        } else {
            echo "error";
        }
    }
} catch (PDOException $e) {
    echo "❌ Error: " . $e->getMessage();
}
?>
