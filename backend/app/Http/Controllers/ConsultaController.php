<?php

namespace App\Http\Controllers;

use App\Models\Consulta;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\HistoriaClinica;

class ConsultaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       $consultas = Consulta::with('historia.paciente')->get();
    return response()->json($consultas);
}

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
    // buscar historia
    $historia = HistoriaClinica::where('paciente_id', $request->paciente_id)->first();

    // crear consulta usando el id correcto
    $consulta = Consulta::create([
        'historia_clinica_id' => $historia->id, 
        'user_id' => $request->user_id,
        'fecha_consulta' => $request->fecha_consulta,
        'motivo_consulta' => $request->motivo_consulta,
        'examen_clinico' => $request->examen_clinico,
        'diagnostico' => $request->diagnostico,
        'plan_tratamiento' => $request->plan_tratamiento,
        'observaciones' => $request->observaciones
    ]);

    return response()->json($consulta, 201);
}

    /**
     * Display the specified resource.
     */
    public function show(Consulta $consulta)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Consulta $consulta)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Consulta $consulta)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Consulta $consulta)
    {
        //
    }
}
