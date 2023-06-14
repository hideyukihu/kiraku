<?php

namespace App\Http\Controllers;

use App\Http\Requests\PlanRequest;
use App\Models\Plan;
use Illuminate\Http\Request;

class PlanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $userId = $request->user()->id;

        $plan =Plan::find($userId)->get();

        return response()->json($plan);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Plan::create([
            'item_id' => $request->input('item_id'),
            'user_id' => $request->user()->id
        ]);

        return response()->json('created');
    }

    /**
     * Display the specified resource.
     */
    public function show($plan)
    {
        $findplan = Plan::find($plan);

        if (!$findplan) {
            return response()->json(['message' => 'Item not found'], 404);
        }

        return response()->json($findplan);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Plan $plan)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PlanRequest $request, $plan)
    {
        $findplan = Plan::find($plan);

        if (!$findplan) {
            return response()->json(['message' => 'Item not found'], 404);
        }

        $findplan->is_purchase = $request->input('is_purchase');
        $findplan->save();


        return response()->json($findplan);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Plan $plan)
    {
        //
    }
}
