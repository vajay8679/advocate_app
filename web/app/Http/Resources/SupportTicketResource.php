<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SupportTicketResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        // return parent::toArray($request);
        $user  = $this->user;
        return array(
            'uuid' => $this->uuid,
            'subject' => $this->subject,
            'description' => $this->description,
            'tags' => $this->tags,
            'priority' => $this->priority,
            'status' => $this->status->name,
            'type' => $this->status->type,
            'status_id' => $this->status_id,
            'contact_attributes' => $this->contact_attributes,
            'created_by_uuid' => empty($user) ? '' : $user->uuid,
            'created_by' => empty($user) ? '' : $user->getFullName(),
            'assignee' => empty($this->assignee) ? '' : $this->assignee->getFullName(),
            'assigned_to' => empty($this->assigned_to) ? '' : $this->user->uuid,
            'created_at' => format_date('d-m-Y h:i A', $this->created_at),
            'due_at' => format_date('d-m-Y h:i A', $this->due_at),
        );
    }
}
