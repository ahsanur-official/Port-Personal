<?php
header('Content-Type: application/json');

// Simple authentication - change this password!
$ADMIN_PASSWORD = 'admin123'; // CHANGE THIS!

// Check authentication
$headers = getallheaders();
$authToken = isset($headers['Authorization']) ? str_replace('Bearer ', '', $headers['Authorization']) : '';

if ($authToken !== $ADMIN_PASSWORD) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit();
}

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
    echo json_encode(['success' => true, 'messages' => []]);
    exit();
}

$content = file_get_contents($messagesFile);
$messages = json_decode($content, true);

if (!is_array($messages)) {
    $messages = [];
}

echo json_encode([
    'success' => true,
    'messages' => $messages,
    'total' => count($messages)
]);
?>