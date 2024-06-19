<?php

namespace app\core\validation;

use app\core\ProductValidator;

class DvdValidator extends ProductValidator
{
    protected function validateSpecificFields()
    {
        if (!$this->data['size']) {
            return "Please set the size";
        }

        return $this->isNumeric('size', $this->data['size']);
    }
}
