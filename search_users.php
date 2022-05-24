<?php
ini_set('display_errors', 1);
error_reporting(~0);

require 'dbconf.php';

function followed($db, string $following) {
  $user_id = mysqli_real_escape_string($db, $_SESSION['user_id']);
  $query = "SELECT * FROM FOLLOW WHERE follower='".$user_id."' and following='".$following."';";
  $r = mysqli_query($db, $query);
  return mysqli_num_rows($r) > 0;
}

session_start();

if (!isset($_SESSION['user_id'])) {
  header("Location: login.php");
  exit;
}

if (!isset($_GET['u'])) {
  header("Location: home.php");
  exit;
}

$username = mysqli_real_escape_string($db, $_GET['u']);
$user_id = mysqli_real_escape_string($db, $_SESSION['user_id']);

$query = "SELECT * FROM USER JOIN USER_PICS on id=user
    WHERE user<>".$user_id." AND username like '%".$username."%';";
$res = mysqli_query($db, $query);
$success = false;

if (mysqli_num_rows($res) > 0) {
  $success = true;
  $data = array();
  while ($row = mysqli_fetch_assoc($res)) {
    $data[] = [
      'id' => $row['id'],
      'username' => $row['username'],
      'profile_pic' => base64_encode($row['profile_pic']),
      'cover_pic' => base64_encode($row['cover_pic']),
      'followed' => followed($db, $row['id'])
    ];
  }
}

$result = ['success' => $success, 'data' => $data];
echo json_encode($result);
?>
