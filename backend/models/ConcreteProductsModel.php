<?php

namespace app\models;

use PDOException;
use Exception;

class ConcreteProductsModel extends ProductsModel
{
    public function save($data)
    {
        try {
            $columns = implode(',', array_keys($data));
            $placeholders = implode(', ', array_map(fn ($key) => ":$key", array_keys($data)));

            $query = "insert into products ($columns) values ($placeholders)";
            $stmt = $this->executeStatement($query, $data);

            header('Content-Type: application/json');
            $response = [];
            if ($stmt) {
                $response['message'] = 'Data inserted successfully!';
                return $response;
            } else {
                $response['message'] = 'No Data Inserted!';
                return $response;
            }
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

        $query = "DELETE FROM products WHERE id IN ($placeholders)";
        $stmt = $this->conn->prepare($query);

        if ($stmt->execute($productIds)) {
            return ['message' => 'Product Deleted Successfully'];
        } else {
            return ['message' => 'Product Deletion Failed'];
        }
    }
}
