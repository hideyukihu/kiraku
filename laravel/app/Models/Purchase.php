<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Purchase extends Model
{
    use HasFactory;

    protected $fillable = ['id', 'quantity', 'plan_id', 'date'];

    public function plan()
    {
        return $this->belongsTo(Plan::class);
    }
}
