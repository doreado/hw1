<?php
session_start();

if (isset($_SESSION["username"])) {
  header("Location: home.php");
  exit;
}

if (isset($_POST["username"]) && isset($_POST["password"])) {
  // TODO check if username exists and if password is correct
  $_SESSION["username"] = $_POST["username"];
  header("Location: home.php");
  exit;
} else {
  $errore = true;
}
?>

<html lang="en">
  <head>
    <title>Mediashare</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="style/login.css" rel="stylesheet">
    <script src="login.js" defer="true"> </script>
  </head>

  <body>
    <h1>Mediashare</h1>
    <form name="login" method="post" action="home.php">
      <p><input type="text" name="username" placeholder="Username"></p> 
      <p><input type="password" name="password" placeholder="Password"></p> 
      <p><label>&nbsp;</label><input type="submit"></p>
    </form>
    <div id="new-user">
      <p>Non sei registrato?</p>
      <a href="oiwje">Registrati!</a>
    </div>
  </body>
</html>
