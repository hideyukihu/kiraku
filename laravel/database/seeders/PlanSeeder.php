<?php

namespace Database\Seeders;

use App\Models\Plan;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Plan::create([
            'id' => 1,
            'is_purchase' => 1,
            'quantity' => 1,
            'user_id' => 1,
            'item_id' => 1
        ]);
    }
}
