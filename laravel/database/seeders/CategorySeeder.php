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
                'id' => 1,
                'name' => '食料品',
            ],
            [
                'id' => 2,
                'name' => '生活雑貨',
            ],
            [
                'id' => 3,
                'name' => '化粧品',
            ],
        ]);
    }
}
