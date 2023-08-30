<?php

namespace App\Listeners;

use App\Events\LogActivity;
use Exception;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Arr;

class ActivityLogger
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  LogActivity  $event
     * @return void
     */
    public function handle(LogActivity $event)
    {
        $location = $this->getIpLocation($event->activity->ip_address);

        $activity = $event->activity;
        $activity->latitude = $location['latitude'];
        $activity->longitude = $location['longitude'];
        $activity->save();
        //$event->activity->save();
    }


    function getIpLocation($ip){
        $latitude = 0.0;
        $longitude = 0.0;
        try{
            $ip = $ip == '127.0.0.1' ? '157.34.181.210' : $ip;
            $url = 'http://api.ipstack.com/' . $ip . '?access_key='. env('IP_STACK_KEY', '420994a266304a1f013699e40ac64774');
            $location = file_get_contents($url);
            $obj = json_decode($location, true);
            $latitude = isset($obj['latitude']) ? $obj['latitude'] : null;
            $longitude = isset($obj['longitude']) ? $obj['longitude'] : null;
        }catch(Exception $e){

        }
        return array(
            'latitude' => $latitude,
            'longitude' => $longitude,
        );
    }
}
