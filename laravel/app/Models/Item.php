<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Item extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'category_id', 'created_at', 'updated_at', 'user_id', 'ispurchase'];

    public function category():HasOne {
        return $this->hasOne(Category::class);
    }

}
