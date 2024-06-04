<?php

namespace app\core;

use app\models\ConcreteProductsModel;
use app\models\DbModel;

class Application
{
    public Router $router;
    public Request $request;
    public static Application $app;
    public DbModel $db;
    public $productsModel;


    public function __construct()
    {
        self::$app = $this;
        $this->db = new DbModel();
        $this->request = new Request(strtolower($_SERVER['REQUEST_METHOD']), $_SERVER['REQUEST_URI']);
        $this->router = new Router($this->request->getMethod(), $this->request);
        $this->productsModel = new ConcreteProductsModel();
    }
}
