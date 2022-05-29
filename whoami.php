<?php
ini_set('display_errors', 1);
error_reporting(~0);

session_start();

if (!isset($_SESSION['user_id']) || !isset($_SESSION['username'])) {
  header("Location: login.php");
  exit;
}

echo json_encode(['id' => $_SESSION['user_id'], 'username' => $_SESSION['username']]);
?>
