<?php

namespace app\models;

use PDO;

class DbModel
{
    public string $dbname;
    public string $username;
    public string $password;

    public function __construct()
    {
        $dotenv = \Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
        $dotenv->load();
    }

    public function connect()
    {
        try {
            $this->dbname = $_ENV['USER_TABLE_NAME'];
            $this->password = $_ENV['TABLE_PASSWORD'];
            $this->username = $_ENV['TABLE_USERNAME'];

            $pdo = new PDO("mysql:host=localhost;dbname=$this->dbname;port=3307", $this->username, $this->password);

            return $pdo;
        } catch (\PDOException $e) {
            echo $e->getCode() . $e->getMessage();
            die("Could not connect to the database $this->dbname :" . $e->getMessage());
        }
    }
}
