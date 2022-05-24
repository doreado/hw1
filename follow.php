<?php
ini_set('display_errors', 1);
error_reporting(~0);

session_start();

if (!isset($_SESSION['user_id'])) {
  header("Location: login.php");
  exit;
}

if (!isset($_GET['to_follow'])) {
  header("Location: home.php");
  exit;
}

require 'dbconf.php';

$followed = !isset($_GET['followed_id']) && isset($_SESSION['profile']) ?
    mysqli_real_escape_string($db, $_SESSION['profile']) :
    mysqli_real_escape_string($db, $_GET['followed_id']);

$follower = mysqli_real_escape_string($db, $_SESSION['user_id']);

$insert_query = "INSERT INTO FOLLOW VALUES (".$follower.",".$followed.");";
$delete_query = "DELETE FROM FOLLOW WHERE following='".$followed."' AND follower='".$follower."';";
$query = $_GET['to_follow']=='false' ? $delete_query :  $insert_query;
$res = mysqli_query($db, $query);

echo json_encode(['success' => $res]);
?>
