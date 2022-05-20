<?php
// ini_set('display_errors', 1);
// error_reporting(~0);
//
session_start();

if (!isset($_SESSION['user_id'])) {
  header('login.php');
  exit;
}

if (!isset($_GET['movie_id'])) {
  header('home.php');
  exit;
}

require 'dbconf.php';

$movie_id = mysqli_real_escape_string($db, $_GET['movie_id']);

$api_key = "980a7fb12d42cdd948157fd200280abb";
$base_url = "http://api.themoviedb.org/3";
$endpoint = "/movie/".$movie_id."/images?api_key=".$api_key;

$curl = curl_init();
curl_setopt($curl, CURLOPT_URL, $base_url.$endpoint); 
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
$result = curl_exec($curl);
curl_close($curl); 

// echo $result;
$base_url = "https://www.themoviedb.org/t/p/original/";

$result_array = json_decode($result, true);

$poster_id = $result_array['posters'][0]['file_path'];

$src = $base_url.$poster_id;
$success = true;

$response = ['success' => true, 'src' => $src];
// echo $response;
echo json_encode($response);
?>
