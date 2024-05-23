<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;

class UserController extends Controller
{
    function register(Request $request){
        $validatedData = $request->validate([
            "name"=>"required|string|max:255",
            "email"=>"required|email|max:255|unique:users,email",
            "password"=>"required|string|max:255|min:8"
        ]);
        $validatedData['password']=Hash::make($validatedData['password']);
        $user=User::create($validatedData);
        return response()->json(["msg"=>"Registered Successfully"]);
    }
    function login(Request $request){
        $validator = Validator::make($request->all(), [
            'email'=>['required','email'],
            'password' => ['required', Password::min(8)],
        ]);
        $validated = $validator->safe();

        $user= User::where('email',$validated['email'])->first();
        if(!$user || !Hash::check($validated['password'],$user->password)){
        return response()->json(["msg"=>"invalid user"]);
        }
        $token=$user->createToken('PHP-112')->plainTextToken;
        $cookie=cookie('hamedToken',$token);
        return response()->json(["msg"=>"logged in","token"=>$token]);

    }
}
