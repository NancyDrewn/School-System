<?php
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
    $pass = $_POST["password"];
    
    // Prepare SQL statement to fetch hashed password
    if ($stmt = $conn->prepare("SELECT password_hash FROM users WHERE username = ?")) {
        $stmt->bind_param("s", $user);
        $stmt->execute();
        $stmt->bind_result($hashed_password);
        $stmt->fetch();
        $stmt->close();
        
        // Check if the password matches
        if (password_verify($pass, $hashed_password)) {
            // Password is correct, insert login record into login_db
            if ($stmt = $conn->prepare("INSERT INTO login_db (username) VALUES (?)")) {
                $stmt->bind_param("s", $user);
                $stmt->execute();
                $stmt->close();
                
                // Redirect to dashboard with a success parameter
                header("Location: dash.html?login=success");
                exit();
            } else {
                echo "Error preparing login record statement.";
            }
        } else {
            echo "Invalid credentials!";
        }
    } else {
        echo "Error preparing password fetch statement.";
    }
}

// Close the connection
$conn->close();
?>
