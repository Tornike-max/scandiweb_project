<?php


namespace app\core;

use app\core\validation\BookValidator;
use app\core\validation\DvdValidator;
use app\core\validation\FurnitureValidator;

class Request
{
    public string $requestMethod;
    public string $path;
    public $uri;
    public string | int $requestedId;
    public string $hashedPassword;

    public function __construct($method, $uri)
    {
        $this->uri = $uri;
        $parts = explode('=', $this->uri);
        $this->requestedId = end($parts);

        if ($method === 'post') {
            $this->requestMethod = 'post';
        }

        if ($method === 'get') {
            $this->requestMethod = 'get';
        }
    }

    public function getMethod(): string
    {
        return $this->requestMethod;
    }

    public function getPath()
    {
        $path = $_SERVER['REQUEST_URI'] ?? '/';
        $position = strpos($path, '?');
        if ($position === false) {
            return $path;
        }

        return substr($path, 0, $position);
    }

    public function getPathInfoId()
    {
        if (isset($_SERVER['REQUEST_URI'])) {
            $path = $_SERVER['REQUEST_URI'];

            $lastindex = strrpos($path, '/');
            $id = substr($path, $lastindex + 1);

            return $id;
        }
    }

    public function getData()
    {
        $json = file_get_contents('php://input');
        $data = json_decode($json, true);

        if (empty($data)) {
            throw new \Exception("No data provided");
        }

        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new \Exception("Error decoding JSON: " . json_last_error_msg());
        }

        $validator = null;

        if ($data['type'] === 'dvd' || $data['type'] === 'book' || $data['type'] === 'furniture') {
            switch ($data['type']) {
                case 'dvd':
                    $validator = new DvdValidator($data);
                    break;
                case 'book':
                    $validator = new BookValidator($data);
                    break;
                case 'furniture':
                    $validator = new FurnitureValidator($data);
                    break;
                default:
                    throw new \Exception("Invalid product type");
            }
            $validator->validate();
        }

        return $data;
    }

    public function checkInvalidData()
    {
        $data = $this->getData();

        foreach ($data as $key => $value) {
            if (!isset($value)) {
                throw new \Exception("Please provide all required data for '{$key}'");
            }
        }

        return $data;
    }


    public function getRequestId()
    {
        return (int) $this->requestedId;
    }
}
