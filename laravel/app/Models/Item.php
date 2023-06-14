<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Item extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'created_at', 'updated_at', 'category_id', 'unit_id'];

    public function users() {
        return $this->belongsToMany(User::class);
    }


    public function category() {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function unit() {
        return $this->belongsTo(Unit::class, 'unit_id');
    }

    public function plans() {
        return $this->hasMany(Plan::class);
    }

}
