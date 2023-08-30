<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

/**
 * @OA\Info(
 *      version="1.0.0",
 *      title="The Tech Rockers admin Documentation",
 *      description="Admin OpenApi description",
 *      @OA\Contact(
 *          name="Nitin Kumar Soni",
 *          email="er.nitinksoni@gmail.com"
 *      ),
 *      @OA\License(
 *          name="Apache 2.0",
 *          url="http://www.apache.org/licenses/LICENSE-2.0.html"
 *      )
 * )
 *
 * @OA\Server(
 *      url=L5_SWAGGER_CONST_HOST,
 *      description="Demo API Server"
 * )
 */
class ApiController extends Controller
{
    /**
     * API response code
     * @var int
     */
    private $responseCode = 200;

    /**
     * This variable hold the api response object
     * @var array
     */
    protected $apiResponse = array(
        'response_code' => 200,
        'data' => [],
        'message' => '',
        'status' => 'ok'
    );

    public function setResponseData ($data): void{
        $this->apiResponse['data'] = $data;
    }

    /**
     * @return int
     */
    public function getResponseCode(): int
    {
        return $this->responseCode;
    }

    /**
     * @param int $responseCode
     */
    public function setResponseCode(int $responseCode): void
    {
        $this->responseCode = $responseCode;
    }

    /**
     * @return array
     */
    public function getApiResponse(): array
    {
        return $this->apiResponse;
    }

    /**
     * @param array $apiResponse
     */
    public function setApiResponse(array $apiResponse): void
    {
        $this->apiResponse = $apiResponse;
    }

    /**
     *
     * @return json output
     */
    protected function sendResponse(): JsonResponse
    {
        //print_r($this->apiResponse);
        //die('i am sendin this reponse');
        $this->apiResponse['response_code'] = $this->responseCode;
        return response()->json($this->apiResponse, $this->responseCode);
    }

    protected function guard()
    {
        return Auth::guard();
    }

    function getDatesFromRange($start, $end): array
    {
        $dateWithVal = [
            $start => 0
        ];
        $dates = array($start);
        while (end($dates) < $end) {
            $date = date('Y-m-d', strtotime(end($dates) . ' +1 day'));

//            if ($date === $end) {
//                continue;
//            }
            $dates[] = $date;
            $dateWithVal[$date] = 0;
        }
        return $dateWithVal;
    }
}
