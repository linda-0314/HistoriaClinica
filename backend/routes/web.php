<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ConsultaController;
use App\Http\Controllers\HistoriaClinicaController;
use App\Http\Controllers\PacienteController;
Route::get('/', function () {
    return view('welcome');
});

Route::post('/users', [UserController::class, 'store'])
    ->withoutMiddleware([\Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class]); // creacion de perfil (fuc adm )

Route::post('/login', [UserController::class, 'login'])
    ->withoutMiddleware([\Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class]); // funcion de loguearse 


Route::post('/pacientes', [PacienteController::class, 'store'])
    ->withoutMiddleware([\Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class]); // creacion de paciente usuario (funcion auxiliar )

Route::get('/usuarios-pacientes', [UserController::class, 'pacientes']);// listar todos los usuario con rol paciente (logueo )

Route::post('/historias', [HistoriaClinicaController::class, 'store'])
    ->withoutMiddleware([\Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class]);// crear historia por primera vez 

Route::post('/consultas', [ConsultaController::class, 'store'])
    ->withoutMiddleware([\Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class]);// crear consultas para historial 

Route::get('/consultas', [ConsultaController::class, 'index']);

Route::get('/historia/paciente/{id}', [HistoriaClinicaController::class, 'porPaciente']); // mostrar todaas las consultas por id 
