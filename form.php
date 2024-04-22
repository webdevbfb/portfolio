<?php
if(isset($_POST['submit'])) {
  $name = $_POST['name'];
  $email = $_POST['email'];
  $message = $_POST['message'];

  $to = "bilal.bagci@dci-student.org"; // Hier deine E-Mail-Adresse eintragen
  $subject = "Neue Nachricht von $name";
  $body = "Name: $name\nE-Mail: $email\nNachricht: $message";

  if(mail($to, $subject, $body)) {
      echo "<p>Nachricht erfolgreich gesendet. Vielen Dank!</p>";
  } else {
      echo "<p>Es gab ein Problem beim Senden der Nachricht. Bitte versuche es später erneut.</p>";
  }
}
?>