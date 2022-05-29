<?php
ini_set('display_errors', 1);
error_reporting(~0);

require 'dbconf.php';
require 'upload_pics.php';

session_start();

if (isset($_SESSION['username'])) {
  $message = "http://localhost/hw1/home.php";
  $success = true;
  $response = [ 'message' => $message, 'success' => $success ];
  mysqli_close($db);
  echo json_encode($response);
}

if (!isset($_POST['username']) || !isset($_POST['name'])
    || !isset($_POST['surname']) || !isset($_POST['email'])
    || !isset($_POST['password'])) {
  $message = "http://localhost/hw1/signup.php";
  $success = true;
  $response = [ 'message' => $message, 'success' => $success ];
  mysqli_close($db);
  echo json_encode($response);
}

if (strlen($_POST['username']) < 4 || strlen($_POST['username']) > 8) {
  $message = "L'username".$_POST['username']." deve essere compreso tra i 4 e gli 8 caratteri";
  $success = false;
  $response = [ 'message' => $message, 'success' => $success ];

  mysqli_close($db);
  echo json_encode($response);
}

$username = mysqli_real_escape_string($db, $_POST['username']);
$usr_query = "SELECT * FROM USER WHERE username='".$username."';";
$res = mysqli_query($db, $usr_query);
if (mysqli_num_rows($res) > 0) {
  $message = "L'username è già occupato";
  $success = false;
  $response = [ 'message' => $message, 'success' => $success ];
  mysqli_close($db);
  echo json_encode($response);
}

$email = mysqli_real_escape_string($db, $_POST['email']);
$email_query = "SELECT * FROM USER WHERE email='".$email."';";
$res = mysqli_query($db, $email_query);
if (mysqli_num_rows($res) > 0) {
  $message = "Esiste già un account associato a ".$email;
  $success = false;
  $response = [ 'message' => $message, 'success' => $success ];
  mysqli_close($db);
  echo json_encode($response);
}

$name = mysqli_real_escape_string($db, $_POST['name']);
$surname = mysqli_real_escape_string($db, $_POST['surname']);
$password = mysqli_real_escape_string($db, $_POST['password']);

$query = "INSERT INTO USER(username, name, surname, email, password, time) VALUES('".
  $username."','".$name."','".$surname
  ."','".$email."','".$password."',"."CURRENT_TIMESTAMP);";

if (mysqli_query($db, $query)) {
  $_SESSION["username"] = $_POST['username'];
  $_SESSION["user_id"] = mysqli_insert_id($db);

  upload_pics($db);
  mysqli_close($db);

  $message = "http://localhost/hw1/home.php";
  $success = true;
  $response = [ 'message' => $message, 'success' => $success ];

  echo json_encode($response);
}
?>
