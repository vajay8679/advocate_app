<?php

namespace App\Models;

use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Media extends Model
{
    use SoftDeletes;

    static $fileDisk = 'local-image'; //s3';
    static $filePath = 'public/';

    /**
     * @return string
     */
    public function getRouteKeyName()
    {
        return 'uuid';
    }

    /**
     * Get the media section
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function section()
    {
        return $this->belongsTo('App\Models\MediaSection', 'media_section_id', 'id');
    }

    /**
     * Get the media section
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function extension()
    {
        return $this->belongsTo('App\FileExtension', 'file_extension_id', 'id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    /**
     * Get media status
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function status()
    {
        return $this->hasOne(Status::class, 'id', 'status_id');
    }

    /**
     * Return the media url
     * @return array
     */
    public function get_media_url()
    {
        $mediaSection = ($this->section) ? $this->section->alias : '';
        return [
            'filePath' => url(Storage::disk(self::$fileDisk)->url($mediaSection)),
            'fileName' => $this->file_name,
            'uuid' => $this->uuid,
            'fileURL' => url(Storage::disk(self::$fileDisk)->url($mediaSection . '/' . $this->file_name))
        ];
    }

    /**
     *
     * @param type $mediaSection
     * @param type $file_name
     */
    public static function getFileUrl($mediaSection, $file_name)
    {
        return url(Storage::disk(self::$fileDisk)->url($mediaSection . '/' . $file_name));
    }

    /**
     * @param $value
     * @return false|string|null
     */
    public function getUpdatedAtAttribute($value)
    {
        if ($value) {
            return format_date('d, M, Y', ($value));
        }
        return $value;
    }

    /**
     * @param $value
     * @return false|string|null
     */
    public function getCreatedAtAttribute($value)
    {
        if ($value) {
            return format_date('d, M, Y  h:i:s A', ($value));
        }
        return $value;
    }

    /**
     * @param $value
     * @return mixed
     */
    public function getFileSizeAttribute($value)
    {
        if($value){
            return format_size_units($value);
        }
        return $value;
    }
}
