<?php

namespace app\core;

class Router
{
    public array $routes = [];
    public string $method = '';
    public Request $request;

    public function __construct(string $method, Request $request)
    {
        $this->method = $method;

        $this->request = $request;
    }

    public function get($route, $callback)
    {

        if ($this->request->getMethod() === 'get') {
            $this->method = $this->request->getMethod();
            $this->routes[$this->method][$route] = $callback;
        }
    }

    public function post($route, $callback)
    {
        if ($this->request->getMethod() === 'post') {
            $this->method = $this->request->getMethod();
            $this->routes[$this->method][$route] = $callback;
        }
    }
    public function resolve()
    {
        $path = $this->request->getPath();
        $method = $this->request->getMethod();
        $idIfExists = null;

        foreach ($this->routes[$method] as $route => $callback) {
            $routePattern = str_replace('/', '\/', $route);
            $routePattern = preg_replace('/{([^}]*)}/', '(?P<\1>[^\/]+)', $routePattern);
            if (preg_match('/^' . $routePattern . '$/', $path, $matches)) {
                $idIfExists = $matches['id'] ?? null;
                $class = new $callback[0]();
                $request = $this->request;
                return call_user_func([$class, $callback[1]], $request, $idIfExists);
            }
        }

        http_response_code(404);
    }
}
