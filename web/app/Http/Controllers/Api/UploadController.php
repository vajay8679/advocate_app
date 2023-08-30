<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Http\Requests\UploadRequest;
use App\Models\FileExtension;
use App\Models\Media;
use App\Models\MediaSection;
use App\Models\Status;
use Illuminate\Http\JsonResponse;
use File;
use Illuminate\Support\Facades\Storage;


class UploadController extends ApiController
{
  private $fileDisk;

  public function __construct()
  {
    $this->fileDisk = Media::$fileDisk;
  }

  public function index(UploadRequest $request): JsonResponse {
    $file = $request->file('image');
    $filename = $file->getClientOriginalName();
    $extension = $file->getClientOriginalExtension();
    $size = $file->getSize();
    $mimeType = $file->getMimeType();

    $mediaSection = $request->media_section; // mediaSection
    $imageName = date('His') . '-' . $filename; //$filename . '.' . $extension;

    $mediaSectionObj = MediaSection::where('alias', $mediaSection)->first();
    $mediaExtensionObj = FileExtension::where('file_ext_name', $extension)
      ->with('mediaType')
      ->first();
    $mediaType = $mediaExtensionObj->mediaType->file_type_name;

    $destinationFile =  $mediaSection . '/' . $mediaType . '/' . $imageName;

    Storage::disk($this->fileDisk)->put($destinationFile, File::get($file));

    $media = new Media();
    $media->uuid = \Ramsey\Uuid\Uuid::uuid4();
    $media->user_id = $request->user()->id;
    $media->media_section_id = isset($mediaSectionObj->id) ? $mediaSectionObj->id : 0;
    $media->file_extension_id = isset($mediaExtensionObj->id) ? $mediaExtensionObj->id : 0;
    $media->file_name = $imageName;
    $media->original_name = $filename;
    $media->file_path = $destinationFile; // $destination.'/'.$picture;
    $media->file_size = $size;
    $media->mime_type = $mimeType;
    $media->status_id = Status::ACTIVE;
    $media->save();

    $this->apiResponse['data'] = [
      'uuid' => $media->uuid,
      'original_name' => $media->original_name,
      'file_name' => $media->file_name,
      'media_section_id' => $media->media_section_id,
      'media_section' => $mediaSection,
      'file_url' => asset( Storage::disk($this->fileDisk)->url($destinationFile)),
      'url' => Storage::disk($this->fileDisk)->url($destinationFile),
      'destinationFile' => Storage::disk($this->fileDisk)->path($destinationFile),
    ];

    return $this->sendResponse();
  }
}
