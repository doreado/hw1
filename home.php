<?php
session_start();

if (!isset($_SESSION['user_id'])) {
  header("Location: login.php");
  exit;
}

$_SESSION['profile'] = $_SESSION['user_id'];
?>

<!DOCTYPE html>
<html lang="it">
  <head>
    <title>Home</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="style/theme.css" rel="stylesheet">
    <link href="style/home.css" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Frijole&display=swap" rel="stylesheet">

    <script src="scripts/layouts.js" defer="true"></script>
    <script src="scripts/home.js" defer="true"></script>
  </head>
  <body>
  </body>

  <section>
    <div id="home-header">
      <div id="profile-pic"></div>
      <div id="home-header-right">
        <div class="tab-row">
          <div class="tab-row-option selected home-header-icon" data-view-type="movie"></div>
          <div class="tab-row-option home-header-icon" data-view-type="people"></div>
        </div>
      </div>
    </div>

    <div id="home-posts"><div id="home-posts-visible"></div></div>
  </section>
</html>
