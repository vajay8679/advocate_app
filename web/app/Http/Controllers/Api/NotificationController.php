<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Http\Resources\NotificationResource;
use Illuminate\Http\Request;

class NotificationController extends ApiController
{
    public function index(Request $request)
    {
        $page = $request->get('page', 1);
        $pageSize = $request->get('page_size', 25);

        $user = $request->user();
        $unReadNotificationsCount = $user->unreadNotifications->count();
        $notificatoins = $user->notifications()->paginate($pageSize, ['*'], 'page', $page);
        $this->apiResponse['data'] = $notificatoins;
        //return $this->sendResponse();
        return NotificationResource::collection($notificatoins)->additional(['meta' => [
            'total_unread' => $unReadNotificationsCount,
        ]]);
    }

    public function markRead(Request $request)
    {
        $request->user()->unreadNotifications->markAsRead();
        return $this->sendResponse();
    }
}
