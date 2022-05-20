<?php
ini_set('display_errors', 1);
error_reporting(~0);

function is_in_db($column) {
  $conn = mysqli_connect("localhost", "root", "", "hw1") or die("Errore: ".mysqli_connect_error());

  $column = mysqli_real_escape_string($conn, $column);
  $value = mysqli_real_escape_string($conn, $_GET[$column]);
  $query = "SELECT * FROM USER WHERE ".$column."='".$value."';";

  $res = mysqli_query($conn, $query);
  $res_array = array('there_is' => mysqli_num_rows($res) == 1 ? true : false);
  return json_encode($res_array);
}

if (isset($_GET['username']) || isset($_GET['email'])) {
  $column = isset($_GET['username']) ? 'username' : 'email';
  echo is_in_db($column);
}
?>
