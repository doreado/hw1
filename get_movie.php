<?php
// Controllo se id è l'identificativo
ini_set('display_errors', 1);
error_reporting(~0);

session_start();

if (!isset($_SESSION['user_id'])) {
  header("Location: login.php");
  exit;
}

if (!isset($_SESSION['profile'])) {
  header("Location: home.php");
  exit;
}

require 'dbconf.php';

$api_key = "980a7fb12d42cdd948157fd200280abb";
$movie = mysqli_real_escape_string($db, $_GET['id']);
$endpoint = "https://api.themoviedb.org/3/movie/".$movie."?api_key=".$api_key;

$curl = curl_init();
curl_setopt($curl, CURLOPT_URL, $endpoint);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
$result = curl_exec($curl);
curl_close($curl);

$success = false;
$data = "Non trovo il film";
if ($result) {
  $result = json_decode($result, true);

  $base_url = "https://www.themoviedb.org/t/p/original/";
  $success = true;
  $data = [ 'title' => $result['title'],
            'release_date' => $result['release_date'],
            'poster' => $base_url.$result['poster_path']
          ];
} else {

}

$response = ['success' => $success, 'data' => $data];
echo json_encode($response);
?>
