<?php

use app\controllers\ProductController;
use app\core\Application;

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, PATCH");
header("Access-Control-Allow-Headers: *");

error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once __DIR__ . '/vendor/autoload.php';

$app = new Application();

$app->router->get('/products', [ProductController::class, 'products']);
$app->router->get('/products/{:id}', [ProductController::class, 'getProduct']);
$app->router->post('/addproduct', [ProductController::class, 'addProduct']);

$app->router->resolve();
