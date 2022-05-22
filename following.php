<?php
session_start();
if (!isset($_SESSION['user_id']) || !isset($_SESSION['profile'])) {
  header("Location: login.php");
  exit();
}

require 'dbconf.php';

$user_id = mysqli_real_escape_string($db, $_SESSION['profile']);
$query = "SELECT following,profile_pic FROM FOLLOW JOIN USER_PICS ON following=user WHERE follower='".$user_id."';";
$res = mysqli_query($db, $query);

if (mysqli_num_rows($res) > 0) {
  $success = true;
  $content = array();
  $count = 0;
  while ($row = mysqli_fetch_assoc($res)) {
    $content[$count] = [ 'following' => $row['following'],
                         'profile_pic' => base64_encode($row['profile_pic'])
                      ];
    $count++;
  }
} else {
  $success = false;
  $content = "Sembra che ancora non segui nessuno";
}

$response = ['success' => $success, 'content' => $content];

echo json_encode($response);
?>
