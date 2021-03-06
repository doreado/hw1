<?php
session_start();
if (!isset($_GET['u']) || !isset($_SESSION['user_id'])) {
  header("Location: login.php");
  exit;
} else {
  $_SESSION['profile'] = $_GET['u'];
}
?>

<!DOCTYPE html>
<html lang="it">
  <head>
    <title>Home</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="style/theme.css" rel="stylesheet">
    <!-- <link href="style/home.css" rel="stylesheet"> -->
    <link href="style/profile.css" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Frijole&display=swap" rel="stylesheet">

    <!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"> -->
    <script src="scripts/utils.js" defer="true"></script>
    <script src="scripts/layouts.js" defer="true"></script>
    <script src="scripts/profile.js" defer="true"></script>
  </head>
  <body>
  <header>
    <div id="cover"></div>
    <div id="profile-pic"></div>
    <div id="username"></div>
  </header>

  <section>
    <div class="tab-row">
      <div class="tab-row-option selected" data-view-type="summary">Summary</div>
      <div class="tab-row-option" data-view-type="recently">Attività Recente</div>
    </div>
    <div class="tab-view"></div>
  </section
  </body>
</html>
