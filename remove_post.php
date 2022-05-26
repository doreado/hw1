<?php
ini_set('display_errors', 1);
error_reporting(~0);

session_start();

if (!isset($_SESSION['user_id'])) {
  header("Location: login.php");
  exit;
}

if (!isset($_GET['post'])) {
  header("Location: home.php");
  exit;
}

require 'dbconf.php';

$post_id = mysqli_real_escape_string($db, $_GET['post']);
$query = "DELETE FROM POST WHERE id=".$post_id.";";
$res = mysqli_query($db, $query);

mysqli_close($db);

echo json_encode(['success' => $res]);
?>
