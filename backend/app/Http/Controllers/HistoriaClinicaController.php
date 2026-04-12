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
        $historiaData = [];

        if ($request->has('fecha_creacion')) {
            $historiaData['fecha_creacion'] = $request->input('fecha_creacion');
        }
        if ($request->has('fechaCreacion')) {
            $historiaData['fecha_creacion'] = $request->input('fechaCreacion');
        }
        if ($request->has('antecedentes_generales')) {
            $historiaData['antecedentes_generales'] = $request->input('antecedentes_generales');
        }
        if ($request->has('antecedentes')) {
            $historiaData['antecedentes_generales'] = $request->input('antecedentes');
        }
        if ($request->has('firma_paciente')) {
            $historiaData['firma_paciente'] = $request->input('firma_paciente');
        }
        if ($request->has('firmaPaciente')) {
            $historiaData['firma_paciente'] = $request->input('firmaPaciente');
        }
        if ($request->has('firma_odontologo')) {
            $historiaData['firma_odontologo'] = $request->input('firma_odontologo');
        }
        if ($request->has('firmaOdontologo')) {
            $historiaData['firma_odontologo'] = $request->input('firmaOdontologo');
        }
        if ($request->has('fecha_firma')) {
            $historiaData['fecha_firma'] = $request->input('fecha_firma');
        }
        if ($request->has('fechaFirma')) {
            $historiaData['fecha_firma'] = $request->input('fechaFirma');
        }

        if (!empty($historiaData)) {
            $historiaClinica->update($historiaData);
        }

        $consulta = $historiaClinica->consultas()->first();
        if ($consulta) {
            $consultaData = [];
            if ($request->has('fecha_consulta')) {
                $consultaData['fecha_consulta'] = $request->input('fecha_consulta');
            }
            if ($request->has('fechaConsulta')) {
                $consultaData['fecha_consulta'] = $request->input('fechaConsulta');
            }
            if ($request->has('motivo_consulta')) {
                $consultaData['motivo_consulta'] = $request->input('motivo_consulta');
            }
            if ($request->has('motivo')) {
                $consultaData['motivo_consulta'] = $request->input('motivo');
            }
            if ($request->has('examen_clinico')) {
                $consultaData['examen_clinico'] = $request->input('examen_clinico');
            }
            if ($request->has('examen')) {
                $consultaData['examen_clinico'] = $request->input('examen');
            }
            if ($request->has('diagnostico')) {
                $consultaData['diagnostico'] = $request->input('diagnostico');
            }
            if ($request->has('plan_tratamiento')) {
                $consultaData['plan_tratamiento'] = $request->input('plan_tratamiento');
            }
            if ($request->has('tratamiento')) {
                $consultaData['plan_tratamiento'] = $request->input('tratamiento');
            }
            if ($request->has('observaciones')) {
                $consultaData['observaciones'] = $request->input('observaciones');
            }

            if (!empty($consultaData)) {
                $consulta->update($consultaData);
            }
        }

        return response()->json([
            'historia' => $historiaClinica->fresh(),
            'consulta' => $consulta ? $consulta->fresh() : null
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(HistoriaClinica $historiaClinica)
    {
        //
    }
}