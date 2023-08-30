<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $role = $this->getRoleNames();
        return array(
            'uuid' => $this->uuid,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'username' => $this->username,
            //'dob' => $this->dob,
            //'gender' => $this->gender,
            'bio' => $this->bio,
            'profile_image' => $this->profile_image,
            //'balance' => $this->balanceFloat,
            'email' => $this->email,
            'phone' => $this->phone,
            'profile_image' => $this->profile_image,
            'photoURL' => $this->profile_image,
            //'profile_cover' => $this->profile_cover,
            'status' => $this->status->name,
            'status_id' => $this->status_id,
            'email_verified_at' => $this->email_verified_at,
            'referral_code' => $this->referral_code,
            'referral_count' => $this->referral_count,
            'email_verified' => $this->hasVerifiedEmail(),
            'created_at' => format_date('d-m-Y h:i A', $this->created_at),
            'total_points' => $this->total_points,
            'device_info' => $this->device_info,
            'coin_preference' => $this->coin_preference,
            'role' => isset($role[0]) ? $role[0] : 'user',
        );
    }
}
