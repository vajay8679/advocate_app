<?php

namespace App\Http\Middleware;

use App\Models\ApiLog;
use Closure;
use Illuminate\Http\Request;

class ApiLoggerMiddleWare
{
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);
        $path = $request->getPathInfo();
        //dd(get_class_methods(get_class($request)));
        //var_dump($request->url());die;
        $log = [
            'url' => $request->url(),//$request->getUri(),
            'method' => $request->getMethod(),
            'req_body' => json_encode($request->all()),
            'response' => $response->getContent(),
            'created_at' => now(),
        ];
        if(!strpos($path, 'api/page')){
            $log['response'] = '';
        }
        if(strpos($path, 'api/upload')){
            $log['req_body'] = '';
        }
        ApiLog::insert($log);
        return $response;
    }
}
