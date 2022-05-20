<?php
ini_set('display_errors', 1);
error_reporting(~0);

session_start();

if (!isset($_SESSION['user_id'])) {
  header("Location: login.php");
  exit;
}

if (!isset($_GET['movie'])) {
  header("Location: home.php");
  exit;
}

require 'dbconf.php';

$api_key = "980a7fb12d42cdd948157fd200280abb";
$movie = urlencode($_GET['movie']);
$endpoint = "https://api.themoviedb.org/3/search/movie?api_key=".$api_key."&query=".$movie;

$curl = curl_init();
curl_setopt($curl, CURLOPT_URL, $endpoint);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
$result = curl_exec($curl);
curl_close($curl);

echo $result;
?>
