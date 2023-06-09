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
                'id' => 1,
                'name' => '米',
                'category_id' => 1,
                'unit_id' => 4,
            ],
            [
                'id' => 2,
                'name' => 'トイレットペーパー',
                'category_id' => 2,
                'unit_id' => 6,
            ],
            [
                'id' => 3,
                'name' => 'ファンデーション',
                'category_id' => 3,
                'unit_id' => 6,
            ],
        ]);
    }
}
