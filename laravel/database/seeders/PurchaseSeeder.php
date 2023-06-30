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
            'id' => 1,
            'plan_id' => 1,
            'quantity' => 5,
            'date' => '2023-06-01',
        ]);

        Purchase::create([
            'id' => 2,
            'plan_id' => 1,
            'quantity' => 5,
            'date' => '2023-06-10',
        ]);

        // Purchase::create([
        //     'id' => 3,
        //     'plan_id' => 1,
        //     'quantity' => 5,
        //     'date' => '2023-06-10',
        // ]);

    }
}
