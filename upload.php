<?php
/**
 * ROOHIRA WEB STORE - IMAGE & PRINT ARTWORK UPLOAD ENDPOINT
 * Endpoint: upload.php
 * Method: POST (multipart/form-data)
 * Features:
 * - Saves DTF Gang Sheets & Custom Studio artworks to /uploads/ directory
 * - Returns JSON response with file URL, dimensions, and size
 */

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method Not Allowed. Use POST.']);
    exit;
}

$targetDir = __DIR__ . '/uploads/';
if (!is_dir($targetDir)) {
    mkdir($targetDir, 0755, true);
}

if (!isset($_FILES['file']) && !isset($_FILES['image'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'No file was uploaded.']);
    exit;
}

$file = $_FILES['file'] ?? $_FILES['image'];

if ($file['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'File upload error code: ' . $file['error']]);
    exit;
}

// Allowed extensions
$allowedExts = ['jpg', 'jpeg', 'png', 'webp', 'svg', 'pdf', 'tif', 'tiff'];
$fileExt = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));

if (!in_array($fileExt, $allowedExts)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid file extension. Only PNG, JPG, WEBP, SVG, TIFF, PDF accepted.']);
    exit;
}

// Generate unique filename
$uniqueName = 'roohira_' . time() . '_' . bin2hex(random_bytes(4)) . '.' . $fileExt;
$destPath = $targetDir . $uniqueName;

if (move_uploaded_file($file['tmp_name'], $destPath)) {
    $imgDetails = @getimagesize($destPath);
    $width = $imgDetails ? $imgDetails[0] : null;
    $height = $imgDetails ? $imgDetails[1] : null;

    echo json_encode([
        'success' => true,
        'url' => 'uploads/' . $uniqueName,
        'filename' => $uniqueName,
        'size' => $file['size'],
        'width' => $width,
        'height' => $height,
        'mime' => $file['type']
    ]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Failed to save file to destination.']);
}
