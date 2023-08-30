<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserProfileResource extends JsonResource
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
            'uuid' => $this->uuid,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'username' => $this->username,
            'bio' => $this->bio,
            //'dob' => $this->dob,
            //'gender' => $this->gender,
            'profile_image' => $this->profile_image,
            //'balance' => $this->balanceFloat,
            'email' => $this->email,
            'phone' => $this->phone,
            'profile_image' => $this->profile_image,
            //'profile_cover' => $this->profile_cover,
            'status' => $this->status->name,
            'status_id' => $this->status_id,
            //'country_id' => $this->country_id,
            //'country' => empty($this->country) ? '' : $this->country->name,
            //'state_id' => $this->state_id,
            //'state' => empty($this->state) ? '' : $this->state->name,
            //'city_id' => $this->city_id,
            //'city' => empty($this->city) ? '' : $this->state->city,
            'fb_username' => $this->fb_username,
            'twitter_username' => $this->twitter_username,
            'instagram_username' => $this->instagram_username,
            'linkedin_username' => $this->linkedin_username,
            #'skype_username' => $this->skype_username,
            #'github_username' => $this->github_username,
            'total_points' => $this->total_points,
            'coin_preference' => $this->coin_preference,
            'email_verified_at' => $this->email_verified_at,
            'email_verified' => $this->hasVerifiedEmail(),
            'created_at' => format_date('d-m-Y h:i A', $this->created_at),
        );
    }
}
