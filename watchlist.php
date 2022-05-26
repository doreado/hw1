<?php
session_start();

ini_set('display_errors', 1);
error_reporting(~0);

if (!isset($_SESSION['user_id'])) {
  header("Location: login.php");
  exit;
}

if (!isset($_GET['movie_id'])) {
  header("Location: home.php");
  exit;
}

require 'dbconf.php';

$user_id = mysqli_real_escape_string($db, $_SESSION['user_id']);
$movie_id = mysqli_real_escape_string($db, $_GET['movie_id']);
$query = "SELECT * FROM WANTLIST WHERE user=".$user_id." AND type_id=".$movie_id."; ";
$in_watchlist = mysqli_num_rows(mysqli_query($db, $query)) > 0 ;

$delete = "DELETE FROM WANTLIST WHERE user=".$user_id." AND type_id=".$movie_id.";";
$insert = "INSERT INTO WANTLIST VALUES(".$user_id.", 'movie', ".$movie_id.", CURRENT_TIME());";
$query = $in_watchlist ?  $delete : $insert;
$res = mysqli_query($db, $query);

echo json_encode(['success' => $res, 'in_watchlist' => !$in_watchlist]);
?>
