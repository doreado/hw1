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
$query = "SELECT count(user) as num_like FROM LIKES WHERE post='".$post_id."' GROUP BY post;";
$res = mysqli_query($db, $query);

if ($res) {
  $success = true;
  if (mysqli_num_rows($res) == 0) {
    $num_like = 0;
  } else {
    $num_like = mysqli_fetch_assoc($res)['num_like'];
  }
}

$response = ['success' => $success, 'num_like' => $num_like];

echo json_encode($response);
?>
