<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('categories')->insert([
            [
                'name' => '食料品',
                'item_id' => 1
            ],
            [
                'name' => '生活雑貨',
                'item_id' => 2
            ],
            [
                'name' => '化粧品',
                'item_id' => 3
            ],
        ]);
    }
}
