<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

// Get JSON input
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Validate required fields
if (!isset($data['name']) || !isset($data['email']) || !isset($data['message'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing required fields']);
    exit();
}

// Sanitize inputs
$name = htmlspecialchars(trim($data['name']));
$email = filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL);
$type = isset($data['type']) ? htmlspecialchars(trim($data['type'])) : 'General';
$timeline = isset($data['timeline']) ? htmlspecialchars(trim($data['timeline'])) : 'Flexible';
$message = htmlspecialchars(trim($data['message']));

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid email address']);
    exit();
}

// Create message object
$messageData = [
    'id' => uniqid('msg_', true),
    'timestamp' => date('Y-m-d H:i:s'),
    'name' => $name,
    'email' => $email,
    'type' => $type,
    'timeline' => $timeline,
    'message' => $message,
    'ip' => $_SERVER['REMOTE_ADDR'] ?? 'Unknown',
    'userAgent' => $_SERVER['HTTP_USER_AGENT'] ?? 'Unknown',
    'status' => 'unread'
];

// Read existing messages
// Try multiple paths for database file
$possiblePaths = [
    __DIR__ . '/../database/messages.json',  // Relative to api folder
    dirname(dirname(__FILE__)) . '/database/messages.json',  // Go up two levels
    getcwd() . '/database/messages.json',  // Current working directory
];

$messagesFile = null;
foreach ($possiblePaths as $path) {
    if (is_writable(dirname($path)) || file_exists(dirname($path))) {
        $messagesFile = $path;
        break;
    }
}

// If still no path found, try to create database folder
if (!$messagesFile) {
    $dbDir = dirname(__FILE__) . '/../database';
    if (!is_dir($dbDir)) {
        @mkdir($dbDir, 0755, true);
    }
    $messagesFile = $dbDir . '/messages.json';
}

$messages = [];

if (file_exists($messagesFile)) {
    $content = file_get_contents($messagesFile);
    $messages = json_decode($content, true);
    if (!is_array($messages)) {
        $messages = [];
    }
}

// Add new message to the beginning
array_unshift($messages, $messageData);

// Save to file
if (file_put_contents($messagesFile, json_encode($messages, JSON_PRETTY_PRINT))) {
    // Send email notification (optional)
    $to = 'mdahsanurrahaman@gmail.com';
    $subject = 'New Portfolio Contact: ' . $name;
    $emailBody = "New message from your portfolio:\n\n" .
                 "Name: $name\n" .
                 "Email: $email\n" .
                 "Project Type: $type\n" .
                 "Timeline: $timeline\n\n" .
                 "Message:\n$message\n\n" .
                 "---\n" .
                 "Received: " . date('F j, Y, g:i a') . "\n" .
                 "IP: {$messageData['ip']}";
    
    $headers = "From: noreply@ahsanur-portfolio.com\r\n" .
               "Reply-To: $email\r\n" .
               "X-Mailer: PHP/" . phpversion();
    
    // Uncomment to enable email notifications
    // mail($to, $subject, $emailBody, $headers);
    
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Message sent successfully!',
        'id' => $messageData['id']
    ]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to save message']);
}
?>