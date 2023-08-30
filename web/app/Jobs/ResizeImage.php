<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use App\Models\Media;
//use Image;
use Intervention\Image\ImageManagerStatic as Image;
use Illuminate\Support\Facades\Log;

class ResizeImage implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

  protected $media;
  protected $mediaSection;
  protected $fileDisk;
  protected $filePath;
  protected $companyMediaDir;
  private $thumbSize = array(
    'wall' => [array('height' => '100', 'width' => '100'), array('height' => '200', 'width' => '200'), array('height' => '600', 'width' => '700')],
    'profile' => [array('height' => '100', 'width' => '100'), array('height' => '36', 'width' => '36'), array('height' => '500', 'width' => '950')],
    'category' => [array('height' => '100', 'width' => '100')],
    'profile-banner' => [array('height' => '295', 'width' => '1140'), array('height' => '170', 'width' => '260')],
    'ckeditor' => [array('height' => '100', 'width' => '100'), array('height' => '36', 'width' => '36'), array('height' => '500', 'width' => '950')],
  );

  /**
   *
   * @param Media $media
   * @param array $thumbArray
   * @param string $fileDisk
   * @param string $filePath
   */
  public function __construct(Media $media, $mediaSection, $fileDisk, $filePath, $companyMediaDir='') {
    $this->media = $media;
    $this->fileDisk = $fileDisk;
    $this->filePath = $filePath;
    $this->mediaSection = $mediaSection;
    $this->companyMediaDir = $companyMediaDir;
  }

  public function handle() {
    if (isset($this->thumbSize[$this->mediaSection])) {
       $file_path = public_path($this->companyMediaDir . $this->mediaSection . '/' . $this->media->file_name);
       //echo public_path($file_path);die;
      //print_r(((Storage::disk($this->fileDisk)->getDriver()->fileSize($file_path))));die;
      //print_r(get_class_methods(get_class(Storage::disk($this->fileDisk)->getDriver())));die;
      //$storagePath = Storage::disk($this->fileDisk)->getDriver()->getAdapter()->getPathPrefix();

      //die;

      //$file_path = $storagePath . $this->companyMediaDir . $this->mediaSection . '/' . $this->media->file_name;
      //echo $file_path;die;
echo $file_path;
      $thumbSize = $this->thumbSize[$this->mediaSection];
      //Log::info('$thumbSize: ' . json_encode($thumbSize));
      $thumb_img = Image::make($file_path);
      // backup status
      $thumb_img->backup();
      foreach ($thumbSize as $thumb) {
        $thumbDir = $thumb['width'] . 'x' . $thumb['height'];
        $destinationPath = $storagePath . $this->companyMediaDir . $this->mediaSection . '/' . $thumbDir;
        if (Storage::disk($this->fileDisk)->exists($destinationPath) === false) {

          Storage::disk($this->fileDisk)->makeDirectory($this->companyMediaDir . $this->mediaSection . '/' . $thumbDir, 777);
        }
        //$thumb_img->resize($thumb['width'], $thumb['height']);
        $thumb_img->fit($thumb['width'], $thumb['height']);
        /* $thumb_img = Image::make($file_path)->resize($thumb['width'], $thumb['height'], function($constraint) {
          $constraint->aspectRatio();
          }); */
        //$thumb_img->invert();
        $thumb_img->save($destinationPath . '/' . $this->media->file_name);
        $thumb_img->reset();

        if (Media::$fileDisk == 's3') {
          Storage::disk('s3')->put($this->mediaSection . '/' . $thumbDir . '/' . $this->media->file_name, File::get($destinationPath . '/' . $this->media->file_name), 'public');
          Storage::disk('public')->delete($this->mediaSection . '/' . $thumbDir . '/' . $this->media->file_name);
          //echo $destinationPath . '/' . $this->media->file_name;
        }
      }
      if (Media::$fileDisk == 's3') {
        //Storage::disk('public')->delete($this->mediaSection . '/' . $this->media->file_name);
      }
    }
  }
}
