<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'name' => 'yamada',
                'email' => 'yamada@gmail.com',
                'password' => Hash::make('a1'),
            ],
            [
                'name' => 'b1',
                'email' => 'b1@gmail.com',
                'password' => Hash::make('b1'),
            ]
        ]);
    }
}
