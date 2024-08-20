<?php
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "test3_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $user = $_POST["username"];
    $email = $_POST["email"];
    $pass = $_POST["password"];
    $cpass = $_POST["cpassword"];
    
    // Simple validation
    if ($pass !== $cpass) {
        echo "Passwords do not match!";
        exit();
    }
    
    // Hash the password
    $hashed_password = password_hash($pass, PASSWORD_DEFAULT);
    
    // Prepare SQL statement
    $stmt = $conn->prepare("INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $user, $email, $hashed_password);
    
    // Execute the statement
    if ($stmt->execute()) {
        header("Location: dash.html");
        exit();
    } else {
        echo "Error: " . $stmt->error;
    }
    
    // Close the statement and connection
    $stmt->close();
}

$conn->close();
?>
