<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Purchase extends Model
{
    use HasFactory;

    protected $fillable = ['quantity', 'plan_id', 'date'];

    public function plan()
    {
        return $this->belongsTo(Plan::class);
    }

    public static function calculateAverageCreatedAtByQuantity($planId)
    {
        return self::select('quantity', DB::raw('AVG(created_at) as average_created_at'))
            ->where('plan_id', $planId)
            ->groupBy('quantity')
            ->get();
    }
}
