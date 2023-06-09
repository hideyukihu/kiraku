<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //

        DB::table('items')->insert([
            [
                'name' => '米',
                'category_id' => 1,
                'unit_id' => 4,
            ],
            [
                'name' => 'トイレットペーパー',
                'category_id' => 2,
                'unit_id' => 6,
            ],
            [
                'name' => 'ファンデーション',
                'category_id' => 3,
                'unit_id' => 6,
            ],
        ]);
    }
}
