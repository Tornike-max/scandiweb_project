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
        $request = Application::$app->request;
        $data = $request->getData();

        foreach ($data as $value) {
            if (!isset($value)) {
                http_response_code(400);
                echo json_encode(['error' => 'Please submit required data']);
                return;
            }
        }

        $productModel = Application::$app->productsModel;
        $response = $productModel->save($data);

        header('Content-Type: application/json');
        echo json_encode($response);
    }

    public function getProduct(Request $request, $idIfExists)
    {
        $productModel = Application::$app->productsModel;
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
        $productIds = Application::$app->request->getData();
        try {
            if (is_array($productIds)) {
                foreach ($productIds as $value) {
                    if (!isset($value)) {
                        throw new Exception('No Data Provided!');
                        return;
                    }
                }
            }

            if (!isset($productIds)) {
                throw new Exception('No Data Provided!');
                return;
            }

            $productModel = Application::$app->productsModel;
            $response = $productModel->deleteProductById($productIds);

            header('Content-Type: application/json');
            echo json_encode($response);
        } catch (Exception $e) {
            http_response_code(404);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }

    public function deleteAllProducts()
    {
        // Implement deleteAllProducts functionality here
    }
}
