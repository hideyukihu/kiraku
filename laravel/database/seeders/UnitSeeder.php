<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UnitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

            DB::table('units')->insert([
                [
                    'id' => 1,
                    'name' => '個',
                ],
                [
                    'id' => 2,
                    'name' => 'ml',
                ],
                [
                    'id' => 3,
                    'name' => 'l',
                ],
                [
                    'id' => 4,
                    'name' => 'kg',
                ],
                [
                    'id' => 5,
                    'name' => 'パック',
                ],
                [
                    'id' => 6,
                    'name' => 'セット'
                ]


            ]);
    }
}
