<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Consulta extends Model
{
    protected $fillable = [
        'historia_clinica_id',
        'user_id',
        'fecha_consulta',
        'motivo_consulta',
        'examen_clinico',
        'diagnostico',
        'plan_tratamiento',
        'observaciones'
    ];

    public function historia()
    {
        return $this->belongsTo(HistoriaClinica::class);
    }
    
    public function odontologo()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
