<?php

namespace app\core\validation;

use app\core\ProductValidator;

class FurnitureValidator extends ProductValidator
{
    protected function validateSpecificFields()
    {
        if (!$this->data['width'] || !$this->data['height'] || !$this->data['length']) {
            return "Please set width, height, and length";
        }

        $widthCheck = $this->isNumeric('width', $this->data['width']);
        if ($widthCheck !== true) return $widthCheck;

        $heightCheck = $this->isNumeric('height', $this->data['height']);
        if ($heightCheck !== true) return $heightCheck;

        return $this->isNumeric('length', $this->data['length']);
    }
}
