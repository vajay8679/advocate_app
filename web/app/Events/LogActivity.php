<?php

namespace App\Events;

use App\Models\Activity;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use hisorange\BrowserDetect\Parser as Browser;

class LogActivity
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * @var \App\Models\Activity
     */
    public $activity;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Activity $activity)
    {
        $activity->user_agent = Browser::userAgent();
        $activity->browser_name = Browser::browserName();
        $activity->browser_family = Browser::browserFamily();
        $activity->browser_version = Browser::browserVersion();
        $activity->os_name = Browser::platformName();
        $activity->os_family = Browser::platformFamily();
        $activity->os_version = Browser::platformVersion();
        $activity->points = 1;
        $activity->save();

        $this->activity = $activity;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('channel-name');
    }
}
