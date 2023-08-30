<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class NotificationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'notification_text' => isset($this->data['notification_text']) ? $this->data['notification_text'] : '',
            'read_at' => $this->read_at,
            'created_at' => format_date('M ,d Y  h:i A', $this->created_at),
            'updated_at' => $this->updated_at,
        ];
    }
}
