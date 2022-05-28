<?php
ini_set('display_errors', 1);
error_reporting(~0);

session_start();
if (!isset($_SESSION['user_id'])) {
  header("Location: login.php");
  exit;
}

require 'dbconf.php';

if (!isset($_GET['offset'])) {
  header("Location: home.php");
  exit;
}

$user_id = mysqli_real_escape_string($db, $_SESSION['user_id']);
$offset = mysqli_real_escape_string($db, $_GET['offset']);
$query = "SELECT *
          FROM POST
          WHERE user = ".$user_id."
          OR user in (
            SELECT following
            FROM FOLLOW
            WHERE follower = ".$user_id."
          )
          ORDER BY time DESC
          LIMIT 10 OFFSET ".$offset.";";

$res = mysqli_query($db, $query);
$end = false;
if (mysqli_num_rows($res) > 0) {
  $end = mysqli_num_rows($res) < 10;
  $success = true;
  $content = array();
  while ($row = mysqli_fetch_assoc($res)) {
    $content[] = $row;
  }
} else {
  $success = false;
  $content = "Non ci sono post da visualizzare :(";
}

$response = ['success' => $success, 'content' => $content, 'end' => $end];
echo json_encode($response);
?>
