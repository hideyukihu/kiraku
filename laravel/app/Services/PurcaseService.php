<?php

namespace App\Services;

use App\Models\Purchase;
use Illuminate\Support\Facades\DB;

class PurchaseService
{
    public function calculateAverageCreatedAtByQuantity($planId)
    {
        return Purchase::select('quantity', DB::raw('AVG(created_at) as average_created_at'))
            ->where('plan_id', $planId)
            ->groupBy('quantity')
            ->get();
    }
}
