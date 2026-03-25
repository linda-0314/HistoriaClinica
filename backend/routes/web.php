<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

Route::get('/', function () {
    return view('welcome');
});

Route::post('/users', [UserController::class, 'store'])
    ->withoutMiddleware([\Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class]); // creacion de perfil (fuc adm )

Route::post('/login', [UserController::class, 'login'])
    ->withoutMiddleware([\Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class]); // funcion de loguearse 
use App\Http\Controllers\PacienteController;

Route::post('/pacientes', [PacienteController::class, 'store'])
    ->withoutMiddleware([\Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class]); // creacion de paciente usuario (funcion auxiliar )

Route::get('/usuarios-pacientes', [UserController::class, 'pacientes']);// listar todos los usrio con rol paciente (logueo )

Route::post('/historias', [HistoriaClinicaController::class, 'store'])
    ->withoutMiddleware([\Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class]);// crear historia por primera vez 

Route::post('/consultas', [ConsultaController::class, 'store'])
    ->withoutMiddleware([\Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class]);//
use App\Http\Controllers\HistoriaClinicaController;
