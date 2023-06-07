<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Item extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'created_at', 'updated_at', 'user_id', 'ispurchase', 'plan_quantity'];

    public function users() {
        return $this->belongsToMany(User::class);
    }


    public function category():HasOne {
        return $this->hasOne(Category::class);
    }

}
