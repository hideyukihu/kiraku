<?php

namespace App\Http\Controllers;

use App\Mail\RegistUser;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class UserController extends Controller
{
    public function store(Request $request)
    {
        $user = User::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => $request->input('password')
        ]);
        redirect('http://localhost/login');
        $request->session()->regenerate();

        Mail::to($request->user())->send(new RegistUser($user));

        return response()->json("User Create!!");
    }
}
