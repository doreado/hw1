<?php
session_start();
if (!isset($_SESSION['profile']) || !isset($_SESSION['user_id'])) {
  header("Location: login.php");
  exit();
}

require 'dbconf.php';

$user_id = mysqli_real_escape_string($db, $_SESSION['profile']);
$query = "SELECT follower,profile_pic FROM FOLLOW JOIN USER_PICS ON follower=user WHERE following='".$user_id."';";
$res = mysqli_query($db, $query);

if (mysqli_num_rows($res) > 0) {
  $success = true;
  $content = array();
  $count = 0;
  while ($row = mysqli_fetch_assoc($res)) {
    $content[$count] = [ 'id' => $row['follower'],
                         'profile_pic' => base64_encode($row['profile_pic'])
                      ];
    $count++;
  }
} else {
  $success = false;
  $content = "Sembra che ancore nessuno ti segua";
}

$response = ['success' => $success, 'content' => $content];

$res = json_encode($response);
echo json_encode($response);
?>
