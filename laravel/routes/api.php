<?php

use App\Http\Controllers\LoginController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use \App\Models\User;

Route::post('login', [LoginController::class, 'login']);
Route::post('logout', [LoginController::class, 'logout']);

Route::middleware('auth:sanctum')->get('/users', function () {
    return User::all();
});

Route::get('/hello', function () {
    return 'Hello Next.js';
});


