<?php

namespace App\Services;

use App\Models\Purchase;
use Illuminate\Support\Facades\DB;

class PurchaseService
{
    public function calculateAverageConsumptionDaysPerQuantity($planId)
    {
        $totalDaysResult = DB::selectOne('SELECT DATEDIFF(MAX(`date`), MIN(`date`)) + 1 AS total_days
        FROM purchases
        WHERE plan_id = ?', [$planId]);

        $QuantitiesResult = DB::select('SELECT SUM(quantity) as total_quantities
        FROM purchases
        WHERE plan_id = ?
        GROUP BY quantity', [$planId]);

        $totalQuantities = 0;
        foreach ($QuantitiesResult as $result) {
            $totalQuantities += $result->total_quantities;
        }

        $totalDays = $totalDaysResult->total_days ?? 0;

        if ($totalQuantities != 0) {
            return floatval($totalDays) / floatval($totalQuantities);
        } else {
            return 0; // ゼロでの割り算を回避するために適切なデフォルト値を返す
        }
    }
}
