<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $checkIn = $data['checkIn'];
    $checkOut = $data['checkOut'];
    $firstName = $data['firstName'];
    $lastName = $data['lastName'];
    $companyName = $data['companyName'];
    $phone = $data['phone'];
    $email = $data['email'];

    // Save booking (use a database in a real application)
    file_put_contents("bookings.txt", "Check-in: $checkIn, Check-out: $checkOut, Name: $firstName $lastName, Company: $companyName, Phone: $phone, Email: $email\n", FILE_APPEND);

    // Send email notification
    $to = "your-email@example.com"; // Replace with your actual email
    $subject = "New Booking from $firstName $lastName";
    $message = "New booking details:\nCheck-in: $checkIn\nCheck-out: $checkOut\nName: $firstName $lastName\nCompany: $companyName\nPhone: $phone\nEmail: $email";
    $headers = "From: no-reply@yourwebsite.com";

    mail($to, $subject, $message, $headers);

    echo "Booking confirmed! You will receive a confirmation email.";
}
?>