<?php
session_start();
if (!isset($_SESSION["user_id"])) {
  header("Location: login.php");
  exit;
}

require_once 'dbconf.php';

$user_id = isset($_GET['user_id']) ? mysqli_real_escape_string($db, $_GET["user_id"]) 
    : mysqli_real_escape_string($db, $_SESSION["user_id"]);

$res = mysqli_query($db, "SELECT profile_pic,cover_pic FROM USER_PICS WHERE user='".$user_id."';");
$res = mysqli_fetch_assoc($res);
$resArray = [ 'profile_pic' => [
                                'empty' => isset($res['profile_pic']) ? false : true, 
                                'src' => base64_encode($res['profile_pic'])
                              ],
              'cover_pic' => [
                                'empty' => isset($res['cover_pic']) ? false : true,
                                'src' => base64_encode($res['cover_pic'])
                            ]
            ] ;

mysqli_close($db);
echo json_encode($resArray);
?>
