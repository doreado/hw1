<?php
ini_set('display_errors', 1);
error_reporting(~0);

require 'dbconf.php';

session_start();

if (!isset($_SESSION['profile']) && !isset($_SESSION['user_id'])) {
  header("Location: login.php");
  exit;
}

$user_id = isset($_GET['user_id']) ? $_GET['user_id'] : $_SESSION['profile'];

$user_id = mysqli_real_escape_string($db, $user_id);
$query = "SELECT username FROM USER where id='".$user_id."';";
$res = mysqli_query($db, $query);
if (mysqli_num_rows($res) > 0) {
  $success = true;
  $username = mysqli_fetch_assoc($res)['username'];
} else {
  $success = false;
  $username = "";
}

$response = ['success' => $success, 'username' => $username];
echo json_encode($response);
?>
