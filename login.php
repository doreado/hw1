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
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Frijole&display=swap" rel="stylesheet">

    <script src="scripts/login.js" defer="true"> </script>
  </head>

  <body>
    <div id="login-screen">
      <h1 id="site-name">L'occhio tagliato</h1>
      <form name="login">
        <div><input type="text" name="username" placeholder="Username"></div>
        <div><input type="password" name="password" placeholder="Password"></div>
        <div><label>&nbsp;</label><input type="submit"></div>
      </form>
      <div id="new-user">
        <p>Non sei registrato?</p>
        <a href="signup.php">Registrati!</a>
      </div>
    </div>
  </body>
</html>
