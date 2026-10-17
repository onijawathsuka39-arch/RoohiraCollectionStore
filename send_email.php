<?php
/**
 * ROOHIRA WEB STORE - CONTACT & DIRECT INQUIRY EMAIL SENDER
 * Endpoint: send_email.php
 * Method: POST (JSON body: { email, subject, message, name, phone })
 * Official Email: roohiraonline@gmail.com
 * Backend Alerts: pythonstore2008@gmail.com
 */

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method Not Allowed. Use POST.']);
    exit;
}

// Read raw input
$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!$data) {
    $data = $_POST;
}

$email   = filter_var($data['email'] ?? '', FILTER_VALIDATE_EMAIL);
$name    = htmlspecialchars(trim($data['name'] ?? 'Valued Patron'));
$phone   = htmlspecialchars(trim($data['phone'] ?? 'Not provided'));
$subject = htmlspecialchars(trim($data['subject'] ?? 'Roohira Web Store Inquiry'));
$message = htmlspecialchars(trim($data['message'] ?? ''));

if (!$email) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'A valid email address is required.']);
    exit;
}

if (empty($message)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Message content cannot be empty.']);
    exit;
}

$recipients = [
    'roohiraonline@gmail.com',
    'pythonstore2008@gmail.com'
];

$emailSubject = "[Roohira Store Alert] " . $subject;

$emailBody = "
==================================================
ROOHIRA WEB STORE - NEW CUSTOMER INQUIRY
==================================================
Customer Name: {$name}
Customer Email: {$email}
Customer Phone: {$phone}
Date & Time: " . date('Y-m-d H:i:s') . "
--------------------------------------------------
Message:
{$message}
==================================================
Sent from Roohira Collection Web Application.
";

$headers  = "From: roohiraonline@gmail.com\r\n";
$headers .= "Reply-To: {$email}\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

$mailSent = false;
foreach ($recipients as $to) {
    if (@mail($to, $emailSubject, $emailBody, $headers)) {
        $mailSent = true;
    }
}

// Log locally for debugging or offline inspection
$logEntry = date('[Y-m-d H:i:s]') . " From: {$email} | Subject: {$subject} | Message: " . substr($message, 0, 80) . "...\n";
@file_put_contents(__DIR__ . '/email_logs.txt', $logEntry, FILE_APPEND);

echo json_encode([
    'success' => true,
    'message' => 'Your message has been transmitted to Roohira Concierge successfully.',
    'mailSent' => $mailSent,
    'debug_recipient' => $recipients[0]
]);
