<?php
$name = $_POST['name'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$name = htmlspecialchars($name);
$phone = htmlspecialchars($phone);
$email = htmlspecialchars($email);
$name = urldecode($name);
$phone = urldecode($phone);
$email = urldecode($email);
$name = trim($name);
$phone = trim($phone);
$email = trim($email);
//echo $surname;
//echo "<br>";
//echo $name;
//echo "<br>";
//echo $sex;
//echo "<br>";
//echo $age;
//echo "<br>";
//echo $email;
if (mail("ivanov@etiketki24.ru", "Заявка с сайта", "Имя: ".$name.".\n Телефон: ".$phone.".\n E-mail: ".$email , "From: info@sticker-label.ru \r\n"))
 {     echo "Сообщение успешно отправлено. Вернитесь, пожалуйста, на главную страницу";
} else {
    echo "при отправке сообщения возникли ошибки";
}?>
