<?php

namespace App\Http\Resources;

use App\Models\MediaSection;
use Illuminate\Http\Resources\Json\JsonResource;

class MediaResource extends JsonResource
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
        $mediaSection = MediaSection::$sectionList[$this->media_section_id];
        return array(
            'uuid' => $this->uuid,
            'original_name' => $this->original_name,
            'file_name' => $this->file_name,
            'file_size' => $this->file_size,
            'file_path' => $this->file_path,
            'mime_type' => $this->mime_type,
            'media_section_id' => $this->media_section_id,
            'media_section' => $mediaSection,
            'updated_at' => $this->updated_at,
            'created_at' => $this->created_at,
            'user_uuid' => $this->user->uuid,
            'uploaded_by' => $this->user->getFullName(),
            'file_url' => $this->getFileUrl($mediaSection, $this->file_name),
        );
    }
}
