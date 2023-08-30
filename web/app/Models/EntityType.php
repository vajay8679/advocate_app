<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EntityType extends Model
{
  use HasFactory;

  public static $entityTypeList = [
    array('entity_type' => 'user', 'url_slug' => 'user', 'entity_name' => 'User'),
    array('entity_type' => 'category', 'url_slug' => 'category', 'entity_name' => 'Category'),
    array('entity_type' => 'file', 'url_slug' => 'file', 'entity_name' => 'File'),
    array('entity_type' => 'page', 'url_slug' => 'page', 'entity_name' => 'Page'),
    array('entity_type' => 'faq', 'url_slug' => 'faq', 'entity_name' => 'Faq'),
  ];
}
