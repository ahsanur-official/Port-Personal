<?php
header('Content-Type: application/json');

// Simple authentication
$ADMIN_PASSWORD = 'admin123'; // CHANGE THIS!

$headers = getallheaders();
$authToken = isset($headers['Authorization']) ? str_replace('Bearer ', '', $headers['Authorization']) : '';

if ($authToken !== $ADMIN_PASSWORD) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit();
}

// Get input
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!isset($data['id']) || !isset($data['status'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing required fields']);
    exit();
}

$messageId = $data['id'];
$newStatus = $data['status'];

// Read messages
$possiblePaths = [
    __DIR__ . '/../database/messages.json',
    dirname(dirname(__FILE__)) . '/database/messages.json',
    getcwd() . '/database/messages.json',
];

$messagesFile = null;
foreach ($possiblePaths as $path) {
    if (file_exists($path)) {
        $messagesFile = $path;
        break;
    }
}

if (!$messagesFile) {
    $messagesFile = dirname(__FILE__) . '/../database/messages.json';
}

if (!file_exists($messagesFile)) {
    http_response_code(404);
    echo json_encode(['success' => false, 'message' => 'Database file not found']);
    exit();
}

$messages = json_decode(file_get_contents($messagesFile), true);

// Update status
$updated = false;
foreach ($messages as &$msg) {
    if ($msg['id'] === $messageId) {
        $msg['status'] = $newStatus;
        $updated = true;
        break;
    }
}

if ($updated) {
    file_put_contents($messagesFile, json_encode($messages, JSON_PRETTY_PRINT));
    echo json_encode(['success' => true, 'message' => 'Status updated']);
} else {
    http_response_code(404);
    echo json_encode(['success' => false, 'message' => 'Message not found']);
}
?>