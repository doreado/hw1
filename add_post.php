<?php
ini_set('display_errors', 1);
error_reporting(~0);

session_start();

if (!isset($_SESSION['user_id'])) {
  header("Location: login.php");
  exit;
}

if (!isset($_GET['type']) || !isset($_GET['type_id']) || !isset($_GET['content']) ) {
  header("Location: home.php");
  exit;
}

require "dbconf.php";

$user = mysqli_real_escape_string($db, $_SESSION['user_id']);
$type = mysqli_real_escape_string($db, $_GET['type']);
$type_id = mysqli_real_escape_string($db, $_GET['type_id']);
$content = mysqli_real_escape_string($db, $_GET['content']);

$query = "INSERT INTO POST(user, content, type, type_id, time) 
          VALUES (".$user.",'".$content."','".$type."','".$type_id."',CURRENT_TIMESTAMP);";

echo $query;
$success = mysqli_query($db, $query);
mysqli_close($db);

$response = ['success' => $success];

echo json_encode($response);
?>
