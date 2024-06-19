<?php

namespace app\core;

abstract class ProductValidator
{
    protected $data;

    public function __construct($data)
    {
        $this->data = $data;
    }

    abstract protected function validateSpecificFields();

    public function validate()
    {
        if (empty($this->data)) {
            throw new \Exception("No data provided");
        }

        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new \Exception("Error decoding JSON: " . json_last_error_msg());
        }

        foreach ($this->data as $key => $value) {
            if (!isset($value)) {
                throw new \Exception("Please provide all required data for '{$key}'");
            }
        }

        $specificValidationResult = $this->validateSpecificFields();
        if ($specificValidationResult !== true) {
            throw new \Exception($specificValidationResult);
        }

        return true;
    }

    protected function isNumeric($field, $value)
    {
        if (!isset($value) || !is_numeric($value)) {
            return ucfirst($field) . " must be a numeric value";
        }
        return true;
    }
}
