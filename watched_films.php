<?php
session_start();
if (!isset($_SESSION['profile']) || !isset($_SESSION['user_id'])) {
  header("Location: login.php");
  exit();
}

require 'dbconf.php';

$user_id = mysqli_real_escape_string($db, $_SESSION['profile']);
$query = "SELECT type_id FROM POST WHERE type='movie' AND user='".$user_id."' ORDER BY time DESC;";
$res = mysqli_query($db, $query);

if (mysqli_num_rows($res) > 0) {
  $success = true;
  $content = array();
  $count = 0;
  while ($row = mysqli_fetch_assoc($res)) {
    $content[$count] = $row;
    $count++;
  }
} else {
  $success = false;
  $content = "Ancora non hai aggiunto alcun film";
}

$response = ['success' => $success, 'content' => $content];

echo json_encode($response);
?>
