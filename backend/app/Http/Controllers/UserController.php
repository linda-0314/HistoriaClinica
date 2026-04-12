<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function store(Request $request)
{
    $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => bcrypt($request->password), 
        'role' => $request->role
    ]);

    return response()->json($user, 201);
}
protected $hidden = [
    'password', 
    'remember_token',
];
public function login(Request $request)
{
    $user = User::where('email', $request->email)->first();

    if (!$user || !\Hash::check($request->password, $user->password)) {
        return response()->json(['message' => 'Credenciales incorrectas'], 401);
    }

    return response()->json([
        'message' => 'Login exitoso',
        'user' => $user
    ], 200);
}
public function pacientes()
{
    $pacientes = \App\Models\User::leftJoin('pacientes', 'users.id', '=', 'pacientes.user_id')
        ->where('users.role', 'paciente')
        ->select(
            'users.id',
            'users.name',
            'users.email',
            'users.role',
            'pacientes.id as paciente_id',
            'pacientes.user_id',
            'pacientes.nombre',
            'pacientes.numero_identificacion',
            'pacientes.sexo',
            'pacientes.fecha_nacimiento',
            'pacientes.telefono',
            'pacientes.direccion'
        )
        ->get();

    return response()->json($pacientes);
}
}