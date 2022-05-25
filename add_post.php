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
$success = mysqli_query($db, $query);
if ($success) {
  $query = "SELECT * FROM POST WHERE id=".mysqli_insert_id($db).";";
  $res = mysqli_query($db, $query);
  $data = mysqli_fetch_assoc($res);
} else {
  $data = '';
}

mysqli_close($db);

$response = ['success' => $success, 'data' => $data];
echo json_encode($response);
?>
