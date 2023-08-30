<?php


namespace App\Http\Controllers\Api;


use App\Http\Controllers\ApiController;
use App\Http\Requests\ImageUploadRequest;
use App\Http\Requests\UploadBase64ImageRequest;
use App\Http\Resources\MediaResource;
use App\Http\Resources\UserResource;
use App\Models\Status;
use Illuminate\Http\Request;
use App\Models\Media;
use App\Models\MediaSection;
use App\Models\FileExtension;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\ProfilePicRequest;
use Illuminate\Support\Str;
use App\Jobs\ResizeImage;
use File;

class NewUploadController extends ApiController
{
    private $fileDisk;
    private $filePath;

    public function __construct()
    {
        $this->fileDisk = Media::$fileDisk;
        $this->filePath = Media::$filePath;
    }

    /**
     * Upload Image
     * @param Request $request
     * @return \App\Http\Controllers\json
     */
    function image(ImageUploadRequest $request)
    {
        if ($request->hasFile('image')) {
            try {
                $file = $request->file('image');
                $filename = $file->getClientOriginalName();
                $extension = $file->getClientOriginalExtension();
                $size = $file->getSize();
                $mimeType = $file->getMimeType();
                $mediaSectionObj = MediaSection::where('alias', $request->media_section)->first();
                $mediaExtensionObj = FileExtension::where('file_ext_name', $extension)->first();
                $mediaSection = $request->media_section; // mediaSection
                $imageName = date('His') . '-' . $filename; //$filename . '.' . $extension;
                //$destination = ('images/' . $mediaSectionObj->alias);
                $destinationFile = $mediaSection . '/' . $imageName; //new file name
                //$file->move(storage_path('app/public/' . $destination), $imageName);

                if ($this->fileDisk === 's3') {
                    Storage::disk('public')->put($destinationFile, File::get($file), 'public');
                }
                Storage::disk($this->fileDisk)->put($destinationFile, File::get($file), 'public');
                $url = Storage::disk($this->fileDisk)->url($destinationFile, File::get($file));

                //save media
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

                if ($mediaExtensionObj->mediaType->file_type_name === 'image') {
                    //$job = (new ResizeImage($media, $mediaSection, $this->fileDisk, $this->filePath, $companyMediaDir))->onQueue('image_process');
                    $job = (new ResizeImage($media, $mediaSection, 'public', $this->filePath))->onQueue('image_process');
                    dispatch($job);
                }
                $mediaData = MediaResource::make($media);

                $this->apiResponse['data'] = [
                    'uuid' => $media->uuid,
                    'original_name' => $media->original_name,
                    'file_name' => $media->file_name,
                    'media_section_id' => $media->media_section_id,
                    'media_section' => $mediaSection,
                    'image_url' => url('storage/' . $destinationFile),
                ];
                $this->apiResponse['message'] = 'File uploaded successfully.';//trans('message.media.image_sucess');
            } catch (\Exception $exception) {
                $this->setResponseCode(500);
                $msg = $exception->getMessage();
                $this->apiResponse['message'] = $msg;
                //$this->apiResponse['message'] = trans('message.error_ocurred');
                Log::error($msg);
            }

        } else {
            $file = $request->file('image');
            Log::error($file);
            $this->setResponseCode(201);
            $this->apiResponse['message'] = trans('message.media.no_image_selected');
            $this->apiResponse['error'] = 'No iamge';
        }
        return $this->sendResponse();
    }

    public function profilePicture(ProfilePicRequest $request)
    {
        try {
            $media = Media::where('uuid', $request->image_uuid)->first();
            $fileAllowed = ['png', 'jpg', 'jpeg', 'PNG', 'JPG', 'JPEG', 'GIF', 'gif'];
            $imageObject = $request->input('image_data');
            $imageData = $request->input('image_data');

            foreach ($fileAllowed as $farr) {
                $imageData = str_replace('data:image/' . $farr . ';base64,', '', $imageData);
            }

            //get file extension
            $tmp = explode('.', $request->file_name);
            $extension = end($tmp);

            //$mediaExtensionObj = FileExtension::where('file_ext_name', $extension)->first();
            $mediaSectionObj = MediaSection::where('alias', $request->media_type)->first();

            //save a original img
            $imageName = $media->file_name;
            $destinationFile = $mediaSectionObj->alias . '/display/' . $imageName; //new file name

            //Storage::disk($this->fileDisk)->put($destinationFile, base64_decode($imageData), 'public');
            Storage::disk($this->fileDisk)->put($destinationFile, base64_decode($imageData), 'public');

            $user = $request->user();


            // update user
            $user->profile_image = ('storage/' . $destinationFile);
            $user->save();
            $this->apiResponse['data'] = UserResource::make($user);
            $this->apiResponse['message'] = trans('message.media.profile_image_sucess');
        } catch (\Exception $exception) {
            $this->setResponseCode(500);
            $msg = $exception->getMessage();
            $this->apiResponse['message'] = $msg;
            //$this->apiResponse['message'] = trans('message.error_ocurred');
            Log::error($msg);
        }

        return $this->sendResponse();
    }

    /**
     * @param $base64string
     * @return mixed|string
     */
    private function getMimeType($base64string)
    {
        preg_match("/^data:(.*);base64/i", $base64string, $match);
        return isset($match[1]) ? $match[1] : '';
    }

    /**
     * @param $base64Image
     * @return Exception|\Exception|float|int
     */
    private function getBase64ImageSize($base64Image)
    { //return memory size in B, KB, MB
        try {
            $size_in_bytes = (int)(strlen(rtrim($base64Image, '=')) * 3 / 4);
            $size_in_kb = $size_in_bytes / 1024;
            $size_in_mb = $size_in_kb / 1024;

            return $size_in_kb;
        } catch (Exception $e) {
            return $e;
        }
    }

    function base64Image(UploadBase64ImageRequest $request)
    {
        try {
            $filename = $request->file_name;
            $size = $request->size;
            $mimeType = $request->mime_type;
            $mediaSection = $request->media_section; // mediaSection
            $imageData = $request->input('image_data');

            //get extension
            $extArr = explode('/', $mimeType);
            $ext = end($extArr);
            $extension = strtolower($ext);

//            $this->apiResponse['data'] = [
//                'extension' => $extension,
//                'extArr' => $extArr,
//                'filename' => $filename,
//                'mimeType' => $mimeType
//            ];
//            return $this->sendResponse();


            $mediaSectionObj = MediaSection::where('alias', $request->media_section)->first();
            $mediaExtensionObj = FileExtension::where('file_ext_name', $extension)->first();

            $imageName = date('His') . '-' . $filename;
            $destinationFile = $mediaSection . '/' . $imageName; //new file name
            Storage::disk($this->fileDisk)->put($destinationFile, base64_decode($imageData), 'public');
            //$destination = ('images/' . $mediaSectionObj->alias);


            $destinationFile = $mediaSectionObj->alias . '/display/' . $imageName; //new file name
            Storage::disk($this->fileDisk)->put($destinationFile, base64_decode($imageData), 'public');


            //save media
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

            $user = $request->user();


            // update user
            $user->profile_image = ('storage/' . $destinationFile);
            $user->save();
            $this->apiResponse['data'] = UserResource::make($user);
            $this->apiResponse['message'] = trans('message.media.profile_image_sucess');
        } catch (\Exception $exception) {
            $this->setResponseCode(500);
            $msg = $exception->getMessage();
            $this->apiResponse['message'] = $msg;
            //$this->apiResponse['message'] = trans('message.error_ocurred');
            Log::error($msg);
        }

        return $this->sendResponse();
    }
}
