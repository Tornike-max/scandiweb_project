<?php

namespace app\controllers;

use app\core\Application;
use app\core\Request;
use Exception;

class ProductController
{
    public function products()
    {
        $productsModel = Application::$app->productsModel;

        try {
            $products = $productsModel->getProducts();
            header('Content-Type: application/json');
            echo json_encode($products);
        } catch (Exception $e) {
            http_response_code(404);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }

    public function addProduct()
    {
        $data = Application::$app->request->getData();

        foreach ($data as $value) {
            if (!isset($value)) {
                throw new Exception('No Data Provided!');
                return;
            }
        }

        $productModel = Application::$app->productsModel;
        $response = $productModel->save($data);

        header('Content-Type: application/json');
        echo json_encode($response);
    }

    public function getProduct(Request $requesst, $idIfExists)
    {
        $productModel = Application::$app->productsModel;
        echo $idIfExists;

        try {
            $product = $productModel->getProductById($idIfExists);

            if (!$product) {
                throw new Exception('Product not found');
            }

            header('Content-Type: application/json');
            echo json_encode($product);
        } catch (Exception $e) {
            http_response_code(404);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }

    public function deleteProduct()
    {
        // Implement deleteProduct functionality here
    }

    public function deleteAllProducts()
    {
        // Implement deleteAllProducts functionality here
    }
}
