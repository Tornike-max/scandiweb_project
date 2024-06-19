<?php

namespace app\core\validation;

use app\core\ProductValidator;

class BookValidator extends ProductValidator
{
    protected function validateSpecificFields()
    {
        if (!$this->data['weight']) {
            return "Please set the weight";
        }

        return $this->isNumeric('weight', $this->data['weight']);
    }
}
