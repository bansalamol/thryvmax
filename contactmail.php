<?php
// Include PHPMailer files
require 'phpmailer/Exception.php';
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Sanitize inputs
    $name = htmlspecialchars(trim($_POST['name']));
    $number = htmlspecialchars(trim($_POST['number']));
    $email = htmlspecialchars(trim($_POST['email']));
    $message = htmlspecialchars(trim($_POST['message']));

    $mail = new PHPMailer(true);

    try {
        // SMTP configuration
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'info.thryvmax@gmail.com';
        $mail->Password = 'vbkbbirxyhjaepet';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Email settings
        $mail->setFrom('info.thryvmax@gmail.com', 'Thryvmax Contact Form');
        $mail->addAddress('info@thryvmax.com'); // Recipient
        $mail->addReplyTo($email, $name);

        // Content
        $mail->isHTML(true);
        $mail->Subject = 'New Contact Form Submission';
        $mail->Body = "
        <html>
        <head><title>New Contact Form Submission</title></head>
        <body>
            <h2>New Contact Inquiry Received</h2>
            <p><strong>Name:</strong> {$name}</p>
            <p><strong>Number:</strong> {$number}</p>
            <p><strong>Email:</strong> {$email}</p>
            <p><strong>Message:</strong><br>{$message}</p>
        </body>
        </html>
        ";

        $mail->send();
        header("Location: contactus.html?status=success");
        exit;

    } catch (Exception $e) {
        header("Location: contactus.html?status=error");
        exit;
    }
} else {
    // Prevent direct access
    header("Location: contactus.html");
    exit;
}
?>
