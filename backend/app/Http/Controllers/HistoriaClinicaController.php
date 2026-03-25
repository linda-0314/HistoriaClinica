<?php

namespace App\Http\Controllers;

use App\Models\HistoriaClinica;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class HistoriaClinicaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    $historia = HistoriaClinica::create([
        'paciente_id' => $request->paciente_id,
        'fecha_creacion' => $request->fecha_creacion,
        'antecedentes_generales' => $request->antecedentes_generales,
        'firma_paciente' => $request->firma_paciente,
        'firma_odontologo' => $request->firma_odontologo,
        'fecha_firma' => $request->fecha_firma
    ]);

    return response()->json($historia, 201);
    }
    

    public function porPaciente($paciente_id)
    {
    $historia = HistoriaClinica::with('consultas')
        ->where('paciente_id', $paciente_id)
        ->first();

    if (!$historia) {
        return response()->json(['error' => 'No tiene historia'], 404);
    }

    return response()->json($historia);
    }
    /**
     * Display the specified resource.
     */
    public function show($id)
    {
      {
    $historia = HistoriaClinica::with('consultas')->find($id);

    return response()->json($historia);
    }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(HistoriaClinica $historiaClinica)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, HistoriaClinica $historiaClinica)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(HistoriaClinica $historiaClinica)
    {
        //
    }
}
