<?php
session_start();

ini_set('display_errors', 1);
error_reporting(~0);

if (!isset($_SESSION['user_id'])) {
  header("Location: login.php");
  exit;
}

require 'dbconf.php';

$user_id = mysqli_real_escape_string($db, $_SESSION['user_id']);
$query = "SELECT * FROM WANTLIST WHERE user=".$user_id.";";

$res = mysqli_query($db, $query);
if ($res) {
  $success = true;
  $data = array();
  while ($row = mysqli_fetch_assoc($res)) {
    $data[] = $row;
  }
}

$response = ['success' => $success, 'data' => $data];
echo json_encode($response);
?>
