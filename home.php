<?php
session_start();

if (!isset($_SESSION['user_id'])) {
  header("Location: login.php");
  exit;
}

// if (isset($_SESSION['profile'])) {
$_SESSION['profile'] = $_SESSION['user_id'];
  // unset($_SESSION['profile']);
// }
?>

<!DOCTYPE html>
<html lang="it">
  <head>
    <title>Home</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="style/theme.css" rel="stylesheet">
    <link href="style/home.css" rel="stylesheet">
    <!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"> -->
    <script src="scripts/home.js" defer="true"></script>
  </head>
  <body>
  <nav>
    <div id = "title-link">
      <div id="nav-title"> MEDIASHARE </div>
      <div> Benvenuto, <a id="profile" href="profile.php?u=<?php echo $_SESSION['user_id'];?>"><?php echo $_SESSION["username"]; ?></a> </div>
    </div>

    <div>
      <a href="logout.php">Logout</a>
    </div>
  </nav>
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

    <div id="home-posts"></div>
  </section>
</html>
