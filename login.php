<?php
session_start();
if (isset($_SESSION["username"])) {
  header("Location: home.php");
}
?>

<html lang="en">
  <head>
    <title>Mediashare</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="style/theme.css" rel="stylesheet">
    <link href="style/login.css" rel="stylesheet">
    <script src="scripts/login.js" defer="true"> </script>
  </head>

  <body>
    <h1>Mediashare</h1>
    <form name="login">
      <p><input type="text" name="username" placeholder="Username"></p> 
      <p><input type="password" name="password" placeholder="Password"></p> 
      <p><label>&nbsp;</label><input type="submit"></p>
    </form>
    <div id="new-user">
      <p>Non sei registrato?</p>
      <a href="signup.php">Registrati!</a>
    </div>
  </body>
</html>
