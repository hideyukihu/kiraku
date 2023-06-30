<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePurchaseRequest;
use App\Http\Requests\UpdatePurchaseRequest;
use App\Models\Purchase;
use App\Services\PurchaseService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class PurchaseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Purchase::create(
            [
                // 'quantity' => $request->input('quantity'),
                'plan_id' => $request->input('plan_id'),
                'quantity' => 1,
                'date' => now()
            ]
        );
        return response()->json('purchase store');
    }

    /**
     * Display the specified resource.
     */
    public function show(Purchase $purchase)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Purchase $purchase)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePurchaseRequest $request, Purchase $purchase)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Purchase $purchase)
    {
        //
    }

    public function averageComsumption(Request $request, PurchaseService $purchaseService) {
        $planIdAll = Purchase::pluck('plan_id')->all();

        $results = [];
        foreach ($planIdAll as $planId) {
            $result = $purchaseService->calculateAverageConsumptionDaysPerQuantity($planId);
            $results[$planId] = $result;
        };

        return Response::json($results, 200, [], JSON_NUMERIC_CHECK);
    }



}
