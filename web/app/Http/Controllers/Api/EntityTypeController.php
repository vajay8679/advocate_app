<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Models\EntityType;

class EntityTypeController extends ApiController
{
  public function index() {
    $this->apiResponse['data'] = EntityType::addSelect('entity_type', 'entity_name')->get();
    return $this->sendResponse();
  }
}
