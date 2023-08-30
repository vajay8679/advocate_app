<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class RoleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array
     */
    public function toArray($request)
    {
        return array(
            'id' => $this->id,
            'name' => $this->name,
            'guard_name' => $this->guard_name,
            'can_delete' => ($this->id == '1' || $this->id == '2' || $this->id == 3) ? 0 : 1,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        );
    }
}
