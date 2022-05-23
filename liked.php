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
$query = "SELECT * FROM LIKES WHERE post='".$post_id."' AND user='".$user_id."';" ;
$res = mysqli_query($db, $query);
$success = false;
if ($res) {
  $success = true;
  $like_pic = mysqli_num_rows($res) > 0 ? 'figures/ciak_dark.png' : 'figures/ciak_light.png';
  $liked = mysqli_num_rows($res) > 0;
}

$response = ['success' => $success, 'like_pic' => $like_pic, 'liked' => $liked];
echo json_encode($response);
?>
