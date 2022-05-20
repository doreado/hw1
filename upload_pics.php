<?php
function upload_pics($db) {
  // ini_set('display_errors', 1);
  // error_reporting(~0);

  if (!isset($_SESSION['user_id'])) {
    $message="http://localhost/hw1/login.php";
    $success = false;
    $response = [ 'message' => $message, 'success' => $success ];
    echo json_encode($response);
    exit;
  }

  $user_id = mysqli_real_escape_string($db, $_SESSION['user_id']);
  // if file upload form is submitted 
  $message = 'Pics not selected';
  $success = false;

  if(isset($_FILES["profile-image"]["name"]) || isset($_FILES["cover-image"]["name"])) {
    $profilepic = $coverpic = "NULL";

    if(!empty($_FILES["profile-image"]["name"])) { 
      // get file info 
      $filename = basename($_FILES["profile-image"]["name"]); 
      $filetype = pathinfo($filename, PATHINFO_EXTENSION); 

      // allow certain file formats 
      $allowtypes = array('jpg','png','jpeg','gif'); 
      if(in_array($filetype, $allowtypes)){ 
        $image = $_FILES['profile-image']['tmp_name']; 
        $profilepic = addslashes(file_get_contents($image)); 
      }
    }

    if(!empty($_FILES["cover-image"]["name"])) { 
      // get file info 
      $filename = basename($_FILES["cover-image"]["name"]); 
      $filetype = pathinfo($filename, PATHINFO_EXTENSION); 

      // allow certain file formats 
      $allowtypes = array('jpg','png','jpeg','gif'); 
      if(in_array($filetype, $allowtypes)){ 
        $image = $_FILES['cover-image']['tmp_name']; 
        $coverpic = addslashes(file_get_contents($image)); 
      }
    }

    $query = "INSERT INTO USER_PICS VALUES ('".$user_id."','".$profilepic."','".$coverpic."')";
    if(mysqli_query($db, $query)){ 
      $success = true;
      $message = "file uploaded successfully."; 
    } else { 
      $success = false;
      $message = "file upload failed, please try again."; 
    }  

    // $response = [ 'message' => $message, 'success' => $success ];
    // echo json_encode($response);
  }
  return;
}
?>
