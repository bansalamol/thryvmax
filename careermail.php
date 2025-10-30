<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Sanitize inputs
    $name = htmlspecialchars(trim($_POST['name']));
    $number = htmlspecialchars(trim($_POST['number']));
    $email = htmlspecialchars(trim($_POST['email']));
    $position = htmlspecialchars(trim($_POST['position']));
    $message = htmlspecialchars(trim($_POST['message']));

    // Recipient email
    $to = "omkarsp7899@gmail.com"; // ✅ Replace with your email address
    $subject = "New Career Form Submission";

    // Email body (HTML)
    $body = "
    <html>
    <head><title>New Career Submission</title></head>
    <body>
        <h2>New Inquiry Received</h2>
        <p><strong>Name:</strong> {$name}</p>
        <p><strong>Number:</strong> {$number}</p>
        <p><strong>Email:</strong> {$email}</p>
        <p><strong>Position:</strong> {$position}</p>
        <p><strong>Message:</strong><br>{$message}</p>
    </body>
    </html>
    ";

    // Email headers
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8\r\n";
    $headers .= "From: Career Form <no-reply@yourdomain.com>\r\n"; // ✅ use your domain
    $headers .= "Reply-To: {$email}\r\n";

    // Send the email
    if (mail($to, $subject, $body, $headers)) {
        echo "
        <div style='text-align:center; margin-top:50px; font-family:sans-serif;'>
            <h2 style='color:green;'>✅ Message sent successfully!</h2>
            <a href='career.html' style='text-decoration:none; color:#333;'>Go back</a>
        </div>";
    } else {
        echo "
        <div style='text-align:center; margin-top:50px; font-family:sans-serif;'>
            <h2 style='color:red;'>❌ Failed to send message.</h2>
            <a href='career.html' style='text-decoration:none; color:#333;'>Try again</a>
        </div>";
    }
} else {
    // Prevent direct access
    header("Location: /career.html");
    exit;
}
?>
