<?php

namespace app\models;

use PDOException;
use Exception;
use PDO;

class ConcreteProductsModel extends ProductsModel
{
    public function save($data)
    {
        try {
            $columns = implode(',', array_keys($data));
            $placeholders = implode(', ', array_map(fn ($key) => ":$key", array_keys($data)));

            $query = 'select * from products where sku = :sku';
            $stmt = $this->conn->prepare($query);
            $stmt->bindValue(':sku', $data['sku']);
            $stmt->execute();
            $skuExists = $stmt->fetch(\PDO::FETCH_ASSOC);

            if ($skuExists) {
                http_response_code(409);
                echo json_encode(['message' => "Error: The data you're trying to insert already exists"]);
                exit;
            }

            $query = "INSERT INTO products ($columns) VALUES ($placeholders)";
            $stmt = $this->executeStatement($query, $data);

            $response = [];
            if ($stmt) {
                $response['message'] = 'Data inserted successfully!';
            } else {
                $response['message'] = 'No Data Inserted!';
            }

            header('Content-Type: application/json');
            echo json_encode($response);
        } catch (PDOException $e) {
            echo 'Database error: ' . $e->getMessage();
        } catch (Exception $e) {
            echo 'General error: ' . $e->getMessage();
        }
    }


    public function getProducts()
    {
        $query = 'select * from products order by id desc';
        $stmt = $this->executeStatement($query);

        if ($stmt->rowCount() === 0) {
            throw new PDOException('There are zero products in db');
        }

        $products = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        return $products;
    }

    public function getProductById($idIfExists)
    {
        $query = "select * from products where id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $idIfExists);
        $stmt->execute();
        $product = $stmt->fetch(\PDO::FETCH_ASSOC);
        return $product;
    }

    public function deleteProductById($productIds)
    {
        if (empty($productIds)) {
            return ['message' => 'No Product IDs provided'];
        }

        $placeholders = implode(',', array_fill(0, count($productIds), '?'));

        $query = "delete from products where id in ($placeholders)";
        $stmt = $this->conn->prepare($query);

        if ($stmt->execute($productIds)) {
            return ['message' => 'Product Deleted Successfully'];
        } else {
            return ['message' => 'Product Deletion Failed'];
        }
    }
}
