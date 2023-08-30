<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TranslationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array
     */
    public function toArray($request)
    {
        //return parent::toArray($request);
        return array(
            'id' => $this->id,
            'language_code' => $this->language_code,
            'language_name' => $this->language_name,
            'text' => $this->text,
            'key' => $this->key,
        );
    }
}
