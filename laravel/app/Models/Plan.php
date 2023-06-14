<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Plan extends Model
{
    use HasFactory;

    protected $fillable = ['is_purchase', 'quantity', 'user_id', 'item_id'];

    public function items()
    {
        return $this->belongsTo(Item::class, 'item_id');
    }

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function purchase() {
        return $this->hasOne(Purchase::class);
    }
}
