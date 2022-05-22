<?php
ini_set('display_errors', 1);
error_reporting(~0);

session_start();

if (!isset($_SESSION['profile']) && !isset($_SESSION['user_id'])) {
  header("Location: login.php");
  exit;
}

echo json_encode(['result' => $_SESSION['profile'] === $_SESSION['user_id']]);
?>
