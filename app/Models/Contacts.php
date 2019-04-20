<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contacts extends Model
{
    protected $fillable = ["name","surname","mobile","company","title"];

    public function getFullnameAttribute(){
        return $this->attributes["name"]." ".$this->attributes["surname"];
    }
}
