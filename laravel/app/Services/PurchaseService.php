<?php

namespace App\Services;

use App\Models\Purchase;
use Illuminate\Support\Facades\DB;

class PurchaseService
{
    public function calculateAverageConsumptionDaysPerQuantity($planId)
    {
        // $totalDays = Purchase::where('plan_id', $planId)
        //     ->selectRaw('DATEDIFF(MAX(`date`), MIN(`date`)) + 1');

        // $totalQuantities = Purchase::where('plan_id', $planId)
        //     ->groupBy('quantity')
        //     ->selectRaw('SUM(quantity) as total_quantity')
        //     ->pluck('total_quantity', 'quantity');


        $totalDaysResult = DB::selectOne('SELECT DATEDIFF(MAX(`date`), MIN(`date`)) + 1 AS total_days
        FROM purchases
        WHERE plan_id = ?', [$planId]);

        $totalQuantitiesResult = DB::selectOne('SELECT SUM(quantity) as total_quantities
        FROM purchases
        WHERE plan_id = ?
        GROUP BY quantity', [$planId]);
        dd($totalQuantitiesResult);

        $totalDays = $totalDaysResult->total_days ?? 0;
        $totalQuantities = $totalQuantitiesResult->total_quantities ?? 0;

        if ($totalQuantities != 0) {
            return floatval($totalDays) / floatval($totalQuantities);
        } else {
            return 0; // ゼロでの割り算を回避するために適切なデフォルト値を返す
        }
    }
}
