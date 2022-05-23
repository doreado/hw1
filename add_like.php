<?php
ini_set('display_errors', 1);
error_reporting(~0);

session_start();

if (!isset($_SESSION['user_id'])) {
  header("Location: login.php");
  exit;
}

if (!isset($_GET['post_id'])) {
  header("Location: home.php");
  exit;
}

require 'dbconf.php';

$post_id = mysqli_real_escape_string($db, $_GET['post_id']);
$user_id = mysqli_real_escape_string($db, $_SESSION['user_id']);
$query = "INSERT INTO LIKES VALUES ('".$user_id."','".$post_id."', CURRENT_TIMESTAMP);";
$res = mysqli_query($db, $query);
$success = $res ? true : false;

echo json_encode(['success' => $success]);
?>
