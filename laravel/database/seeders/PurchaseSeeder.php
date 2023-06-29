<?php

namespace Database\Seeders;

use App\Models\Purchase;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PurchaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Purchase::create([
            'plan_id' => 1,
            'quantity' => 10,
            'date' => '2023-06-01',
        ]);

        Purchase::create([
            'plan_id' => 1,
            'quantity' => 5,
            'date' => '2023-06-05',
        ]);

        Purchase::create([
            'plan_id' => 2,
            'quantity' => 4,
            'date' => '2023-06-10',
        ]);

    }
}
