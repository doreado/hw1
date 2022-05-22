<?php
session_start();
if (!isset($_SESSION['profile']) || !isset($_SESSION['user_id'])) {
  header("Location: login.php");
  exit();
}

require 'dbconf.php';

$user_id = mysqli_real_escape_string($db, $_SESSION['profile']);
$query_post = "SELECT * FROM POST WHERE user='".$user_id."' ORDER BY time DESC;";
$res_post = mysqli_query($db, $query_post);

if (mysqli_num_rows($res_post) > 0) {
  $success = true;
  $content_post = array();
  $count = 0;
  while ($row = mysqli_fetch_assoc($res_post)) {
    $content_post[$count] = $row;
    $count++;
  }
} else {
  $success = false;
  $content_post = "Nessuna attività recente";
}

// $query_like = "SELECT * FROM LIKES WHERE user='".$user_id."' ORDER BY time DESC;";
// $res_like = mysqli_query($db, $query_like);
// if (mysqli_num_rows($res_like) > 0) {
//   $success = true;
//   $content_like = array();
//   $count = 0;
//   while ($row = mysqli_fetch_assoc($res_like)) {
//     $content_like[$count] = $row;
//     $count++;
//   }
// } else {
//   $success = false;
//   $content_like = "Nessuna attività recente";
// }

// $response = ['success' => $success, 'data' => [ 'post' => $content_post,
//                                                 'like' => $content_like ]];
$response = ['success' => $success, 'data' => $content_post];


echo json_encode($response);
?>
