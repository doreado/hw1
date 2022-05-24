<?php
session_start();
if (!isset($_SESSION['user_id']) || !isset($_SESSION['profile'])) {
  header("Location: login.php");
  exit();
}

require 'dbconf.php';

$success = false;
$followed = false;

if ($_SESSION['user_id'] !== $_SESSION['profile']) {
  $follower = mysqli_real_escape_string($db, $_SESSION['user_id']);
  $following = mysqli_real_escape_string($db, $_SESSION['profile']);
  $query = "SELECT * FROM FOLLOW WHERE follower='".$follower."' and following='".$following."';";
  $r = mysqli_query($db, $query);
  $followed =  mysqli_num_rows($r) > 0;
  $success = true;
}

echo json_encode(['success' => $success, 'followed' => $followed]);
?>
