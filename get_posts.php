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

$content = null;
$res = mysqli_query($db, $query);

$end = mysqli_num_rows($res) < 10;
$msg = $end ? "Perché non pubblichi un nuovo post?" : "";

$empty = mysqli_num_rows($res) == 0;
while (!$empty && ($row = mysqli_fetch_assoc($res))) {
  $content[] = $row;
}

$response = ['content' => $content, 'msg' => $msg, 'end' => $end, 'empty' => $empty];
echo json_encode($response);
?>
