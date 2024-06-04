<?php

namespace app\models;

use Exception;
use PDOException;

abstract class ProductsModel extends DbModel
{
    protected $conn;

    public function __construct()
    {
        $this->conn = $this->connect();
    }

    abstract public function save($data);
    abstract public function getProducts();

    protected function executeStatement($query, $params = [])
    {
        try {
            $stmt = $this->conn->prepare($query);

            foreach ($params as $key => $value) {
                $stmt->bindValue(":$key", $value);
            }

            $stmt->execute();
            return $stmt;
        } catch (PDOException $e) {
            echo 'Database error: ' . $e->getMessage();
        } catch (Exception $e) {
            echo 'General error: ' . $e->getMessage();
        }
        return false;
    }
}
