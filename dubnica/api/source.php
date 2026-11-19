<?php
declare(strict_types=1);

// PHP 7.4+ with cURL. Only configured public sources can be requested.
ini_set('display_errors', '0');
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

function respond(array $value, int $status = 200): void {
    http_response_code($status);
    echo json_encode($value, JSON_UNESCAPED_UNICODE | JSON_INVALID_UTF8_SUBSTITUTE);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'GET') {
    header('Allow: GET');
    respond(['error' => 'Method not allowed'], 405);
}
$config = json_decode((string) @file_get_contents(__DIR__ . '/sources.json'), true);
if (!is_array($config) || !isset($config['leagues'], $config['membersUrl'])) {
    respond(['error' => 'Source configuration unavailable'], 503);
}
$source = $_GET['source'] ?? '';
$view = $_GET['view'] ?? '0';
if (!is_string($source) || !is_string($view) || !in_array($view, ['0', '2', '20'], true)) {
    respond(['error' => 'Unknown source'], 400);
}
$url = null;
if ($source === 'members') {
    $url = $config['membersUrl'];
} else {
    foreach ($config['leagues'] as $league) {
        if ($source === 'league-' . $league['id']) {
            $url = $league['url'] . '&art=' . $view;
            break;
        }
    }
}
if ($url === null) respond(['error' => 'Unknown source'], 400);
$parts = parse_url($url);
if (($parts['scheme'] ?? '') !== 'https' ||
    !in_array($parts['host'] ?? '', ['s1.chess-results.com', 's2.chess-results.com', 's3.chess-results.com', 'www.chess.sk'], true)) {
    respond(['error' => 'Invalid source configuration'], 503);
}

// Cache lives outside the public website, in the hosting account's temp directory.
$cacheDir = rtrim(sys_get_temp_dir(), DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR .
    'dubnica-' . substr(hash('sha256', __DIR__), 0, 16);
if ((!is_dir($cacheDir) && !@mkdir($cacheDir, 0700, true)) || !is_writable($cacheDir)) {
    respond(['error' => 'Cache directory unavailable'], 503);
}
$key = hash('sha256', $url);
$file = $cacheDir . DIRECTORY_SEPARATOR . $key . '.json';
$cached = json_decode((string) @file_get_contents($file), true);
$validCache = is_array($cached) && isset($cached['html'], $cached['fetchedAt'], $cached['timestamp']);
if ($validCache && time() - $cached['timestamp'] < 600) respond($cached);
$lock = @fopen($cacheDir . DIRECTORY_SEPARATOR . $key . '.lock', 'c');
if (!$lock || !flock($lock, LOCK_EX | LOCK_NB)) {
    if ($validCache) { $cached['stale'] = true; respond($cached); }
    header('Retry-After: 3');
    respond(['error' => 'Refresh in progress'], 503);
}
try {
    // Another worker may have refreshed this source since the initial cache read.
    $newCache = json_decode((string) @file_get_contents($file), true);
    if (is_array($newCache) && isset($newCache['timestamp'], $newCache['html'], $newCache['fetchedAt']) && time() - $newCache['timestamp'] < 600) respond($newCache);
    if (!function_exists('curl_init')) throw new RuntimeException('cURL unavailable');
    $curl = curl_init($url);
    $html = '';
    curl_setopt_array($curl, [
        CURLOPT_CONNECTTIMEOUT => 8, CURLOPT_TIMEOUT => 20,
        CURLOPT_FOLLOWLOCATION => false,
        CURLOPT_PROTOCOLS => CURLPROTO_HTTPS,
        CURLOPT_USERAGENT => 'DubnicaChessWebsite/1.0',
        CURLOPT_ENCODING => '',
        CURLOPT_WRITEFUNCTION => static function ($handle, string $chunk) use (&$html): int {
            if (strlen($html) + strlen($chunk) > 4 * 1024 * 1024) return 0;
            $html .= $chunk;
            return strlen($chunk);
        },
    ]);
    $ok = curl_exec($curl);
    $status = curl_getinfo($curl, CURLINFO_HTTP_CODE);
    curl_close($curl);
    if ($ok === false || $status !== 200 || stripos($html, '<html') === false) throw new RuntimeException('Download failed');
    // Never replace valid cached pages with login, CAPTCHA, or maintenance content.
    if ($source === 'members') {
        if (strpos($html, 'datagridphp_item') === false) throw new RuntimeException('Invalid member page');
    } elseif (strpos($html, $config['season']) === false || strpos($html, 'CRs1') === false) {
        throw new RuntimeException('Invalid tournament page');
    }
    $value = ['html' => $html, 'fetchedAt' => gmdate('c'), 'timestamp' => time(), 'stale' => false];
    $temp = tempnam($cacheDir, 'source-');
    if ($temp === false) throw new RuntimeException('Cache write failed');
    try {
        if (file_put_contents($temp, json_encode($value, JSON_UNESCAPED_UNICODE | JSON_INVALID_UTF8_SUBSTITUTE)) === false ||
            !rename($temp, $file)) throw new RuntimeException('Cache write failed');
    } finally { if (is_file($temp)) @unlink($temp); }
    respond($value);
} catch (Throwable $error) {
    error_log('Dubnica source refresh failed for ' . $source . ': ' . $error->getMessage());
    if ($validCache) { $cached['stale'] = true; respond($cached); }
    respond(['error' => 'Source temporarily unavailable'], 502);
} finally {
    flock($lock, LOCK_UN);
    fclose($lock);
}
