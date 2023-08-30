<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;

class LocationController extends ApiController
{
  public function countryList(Request $request){
    return $this->sendResponse();
  }

  public function stateList($countryCode = '', Request $request){
    return $this->sendResponse();
  }

  public function cityList($stateId = '', Request $request){
    return $this->sendResponse();
  }
}
