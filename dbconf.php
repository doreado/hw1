<?php
// Database configuration  
$dbHost     = "localhost";  
$dbUsername = "root";  
$dbPassword = "";  
$dbName     = "hw1";  
  
// Create database connection  
$db = mysqli_connect($dbHost, $dbUsername, $dbPassword, $dbName) or die("Errore: ".mysqli_connect_error());
  
if (mysqli_connect_errno()) {
    throw new RuntimeException('mysqli connection error: ' . mysqli_connect_error());
}
mysqli_set_charset($db, 'utf8mb4');
if (mysqli_errno($db)) {
    throw new RuntimeException('mysqli error: ' . mysqli_error($db));
}

// to set the max_allowed_packet to 500MB
$db->query( 'SET @@global.max_allowed_packet = ' . 500 * 1024 * 1024 );
?>
