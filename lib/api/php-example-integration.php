<?php
/**
 * Next.js Cache Revalidation - PHP Integration
 * 
 * Copy this file to your PHP backend project
 * File: includes/nextjs-revalidate.php
 * 
 * Usage:
 * require_once 'includes/nextjs-revalidate.php';
 * revalidateNextJsCache('brands', ['lang' => 'tr']);
 */

// ============================================================================
// CONFIGURATION
// ============================================================================

// Option 1: Direct configuration
if (!defined('NEXTJS_REVALIDATE_SECRET')) {
    define('NEXTJS_REVALIDATE_SECRET', 'your-secret-token-here'); // CHANGE THIS!
}

if (!defined('NEXTJS_WEBHOOK_URL')) {
    define('NEXTJS_WEBHOOK_URL', 'https://citysresidences.com/api/revalidate'); // Your Next.js domain
}

// Option 2: Using .env file (if using PHP dotenv)
// $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
// $dotenv->load();
// $secret = $_ENV['NEXTJS_REVALIDATE_SECRET'];
// $webhookUrl = $_ENV['NEXTJS_WEBHOOK_URL'];

// ============================================================================
// MAIN REVALIDATION FUNCTION
// ============================================================================

/**
 * Trigger Next.js cache revalidation
 *
 * @param string|array $type - Type(s) to revalidate
 *   Options: 'categories', 'subcategories', 'floors', 'brands', 'events',
 *           'citys-park', 'citys-living', 'citys-members-club', 'all'
 * 
 * @param array $options - Optional parameters
 *   - lang: string - Language code (e.g., 'tr', 'en')
 *   - categoryId: string - Category ID for subcategories
 *   - filters: array - Filters for brands
 *     - category: string
 *     - subCategory: string
 *     - floor: string
 * 
 * @return array - Response array with 'success' boolean and data
 *
 * @example
 * // Revalidate all brands
 * revalidateNextJsCache('brands');
 * 
 * // Revalidate Turkish brands
 * revalidateNextJsCache('brands', ['lang' => 'tr']);
 * 
 * // Revalidate brands in specific category
 * revalidateNextJsCache('brands', [
 *     'lang' => 'tr',
 *     'filters' => ['category' => '123']
 * ]);
 * 
 * // Revalidate multiple types
 * revalidateNextJsCache(['brands', 'categories']);
 */
function revalidateNextJsCache($type, $options = []) {
    $webhookUrl = NEXTJS_WEBHOOK_URL;
    $secret = NEXTJS_REVALIDATE_SECRET;
    
    // Validate configuration
    if (empty($secret) || $secret === 'your-secret-token-here') {
        error_log('Next.js revalidation: Secret not configured!');
        return ['success' => false, 'error' => 'Secret not configured'];
    }
    
    // Build request body
    $data = ['type' => $type];
    
    if (!empty($options['lang'])) {
        $data['lang'] = $options['lang'];
    }
    
    if (!empty($options['categoryId'])) {
        $data['categoryId'] = $options['categoryId'];
    }
    
    if (!empty($options['filters'])) {
        $data['filters'] = $options['filters'];
    }
    
    // Initialize cURL
    $ch = curl_init($webhookUrl);
    if ($ch === false) {
        error_log('Next.js revalidation: Failed to initialize cURL');
        return ['success' => false, 'error' => 'cURL initialization failed'];
    }
    
    // Set cURL options
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'X-Revalidate-Secret: ' . $secret
    ]);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10); // 10 second timeout
    
    // Optional: For development only (REMOVE IN PRODUCTION)
    // curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    // curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
    
    // Execute request
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlError = curl_error($ch);
    curl_close($ch);
    
    // Handle cURL errors
    if ($curlError) {
        error_log("Next.js revalidation failed: " . $curlError);
        return ['success' => false, 'error' => $curlError];
    }
    
    // Handle HTTP errors
    if ($httpCode !== 200) {
        error_log("Next.js revalidation returned HTTP $httpCode: " . $response);
        return [
            'success' => false,
            'httpCode' => $httpCode,
            'response' => $response
        ];
    }
    
    // Success
    return [
        'success' => true,
        'response' => json_decode($response, true)
    ];
}

// ============================================================================
// ASYNC REVALIDATION (NON-BLOCKING)
// ============================================================================

/**
 * Trigger revalidation asynchronously (fire and forget)
 * Use this to avoid blocking your API response
 *
 * @param string|array $type - Type(s) to revalidate
 * @param array $options - Optional parameters
 * @return void
 */
function revalidateNextJsCacheAsync($type, $options = []) {
    $webhookUrl = NEXTJS_WEBHOOK_URL;
    $secret = NEXTJS_REVALIDATE_SECRET;
    
    if (empty($secret) || $secret === 'your-secret-token-here') {
        return; // Fail silently in async mode
    }
    
    $data = ['type' => $type] + $options;
    
    $ch = curl_init($webhookUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'X-Revalidate-Secret: ' . $secret
    ]);
    curl_setopt($ch, CURLOPT_TIMEOUT_MS, 100); // Very short timeout - don't wait
    
    curl_exec($ch);
    curl_close($ch);
    // Don't check response - fire and forget
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Revalidate cache after response is sent to client
 * This prevents blocking the user's request
 *
 * @param string|array $type - Type(s) to revalidate
 * @param array $options - Optional parameters
 * @return void
 */
function revalidateAfterResponse($type, $options = []) {
    register_shutdown_function(function() use ($type, $options) {
        revalidateNextJsCache($type, $options);
    });
}

/**
 * Safe revalidation wrapper that never throws exceptions
 * Use this in production to prevent revalidation errors from breaking your API
 *
 * @param string|array $type - Type(s) to revalidate
 * @param array $options - Optional parameters
 * @return bool - True if successful, false otherwise
 */
function safeRevalidate($type, $options = []) {
    try {
        $result = revalidateNextJsCache($type, $options);
        return $result['success'] ?? false;
    } catch (Exception $e) {
        error_log("Safe revalidation error: " . $e->getMessage());
        return false;
    }
}

// ============================================================================
// USAGE EXAMPLES
// ============================================================================

/*

// Example 1: Basic usage
require_once 'includes/nextjs-revalidate.php';
revalidateNextJsCache('brands');


// Example 2: With language
revalidateNextJsCache('brands', ['lang' => 'tr']);


// Example 3: After database update (blocking)
$query = "UPDATE brands SET title = ? WHERE id = ?";
$stmt = $mysqli->prepare($query);
$stmt->bind_param("si", $title, $id);
if ($stmt->execute()) {
    revalidateNextJsCache('brands', ['lang' => 'tr']);
    echo json_encode(['success' => true]);
}


// Example 4: After database update (non-blocking)
$query = "UPDATE brands SET title = ? WHERE id = ?";
$stmt = $mysqli->prepare($query);
$stmt->bind_param("si", $title, $id);
if ($stmt->execute()) {
    // Send response first
    echo json_encode(['success' => true]);
    
    // Then revalidate (doesn't block response)
    revalidateAfterResponse('brands', ['lang' => 'tr']);
}


// Example 5: With specific filters
revalidateNextJsCache('brands', [
    'lang' => 'tr',
    'filters' => [
        'category' => '123',
        'floor' => 'ground'
    ]
]);


// Example 6: Multiple types
revalidateNextJsCache(['brands', 'categories', 'subcategories']);


// Example 7: Safe revalidation (never fails)
$success = safeRevalidate('brands');
if (!$success) {
    // Log but continue
    error_log('Revalidation failed but continuing...');
}


// Example 8: Complete CRUD endpoint example
<?php
header('Content-Type: application/json');
require_once 'includes/nextjs-revalidate.php';

switch ($_SERVER['REQUEST_METHOD']) {
    case 'POST':
        // Create brand
        $data = json_decode(file_get_contents('php://input'), true);
        $query = "INSERT INTO brands (title, categoryID, lang) VALUES (?, ?, ?)";
        $stmt = $mysqli->prepare($query);
        $stmt->bind_param("sss", $data['title'], $data['categoryID'], $data['lang']);
        
        if ($stmt->execute()) {
            revalidateAfterResponse('brands', ['lang' => $data['lang']]);
            echo json_encode(['success' => true, 'id' => $mysqli->insert_id]);
        }
        break;
        
    case 'PUT':
        // Update brand
        $data = json_decode(file_get_contents('php://input'), true);
        $query = "UPDATE brands SET title = ? WHERE id = ?";
        $stmt = $mysqli->prepare($query);
        $stmt->bind_param("si", $data['title'], $data['id']);
        
        if ($stmt->execute()) {
            revalidateAfterResponse('brands');
            echo json_encode(['success' => true]);
        }
        break;
        
    case 'DELETE':
        // Delete brand
        $id = $_GET['id'];
        $query = "DELETE FROM brands WHERE id = ?";
        $stmt = $mysqli->prepare($query);
        $stmt->bind_param("i", $id);
        
        if ($stmt->execute()) {
            revalidateAfterResponse('brands');
            echo json_encode(['success' => true]);
        }
        break;
}
?>

*/

// ============================================================================
// TESTING
// ============================================================================

/**
* Test the revalidation function
* Run: php test-revalidation.php
*/
if (php_sapi_name() === 'cli' && basename(__FILE__) === basename($_SERVER['PHP_SELF'])) {
echo "=== Next.js Cache Revalidation Test ===\n\n";

// Test 1: Simple revalidation
echo "Test 1: Revalidating brands...\n";
$result = revalidateNextJsCache('brands', ['lang' => 'tr']);

if ($result['success']) {
echo "✅ Success!\n";
echo "Response: " . json_encode($result['response'], JSON_PRETTY_PRINT) . "\n\n";
} else {
echo "❌ Failed!\n";
echo "Error: " . ($result['error'] ?? 'Unknown error') . "\n\n";
}

// Test 2: With filters
echo "Test 2: Revalidating brands with filters...\n";
$result = revalidateNextJsCache('brands', [
'lang' => 'tr',
'filters' => ['category' => '1']
]);

if ($result['success']) {
echo "✅ Success!\n\n";
} else {
echo "❌ Failed!\n\n";
}

// Test 3: Multiple types
echo "Test 3: Revalidating multiple types...\n";
$result = revalidateNextJsCache(['brands', 'categories']);

if ($result['success']) {
echo "✅ Success!\n\n";
} else {
echo "❌ Failed!\n\n";
}

echo "=== Test Complete ===\n";
}