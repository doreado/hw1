<?php
ini_set('display_errors', 1);
error_reporting(~0);

include 'dbconf.php';

$username = mysqli_real_escape_string($db, $_POST['username']);
$password = mysqli_real_escape_string($db, $_POST['password']);

$user_query = "SELECT * FROM USER WHERE username='$username'";
$res = mysqli_query($db, $user_query);
if (mysqli_num_rows($res) == 0) {
  $message = "NOME UTENTE NON REGISTRATO";
  $success = false;
} else {
  $query_user_id = "SELECT * FROM USER WHERE username='$username' AND password='$password';";
  $res_user_id = mysqli_query($db, $query_user_id);
  if (mysqli_num_rows($res_user_id) == 0) {
    $message = "PASSWORD NON CORRETTA";
    $success = false;
  } else {
    session_start();

    $_SESSION['username'] = $username;
    $_SESSION['user_id'] = mysqli_fetch_assoc($res_user_id)['id'];

    $message = "http://localhost/hw1/home.php";
    $success = true;
  }
}

$response = [ 'message' => $message, 'success' => $success ];
mysqli_close($db);
echo json_encode($response);
?>
