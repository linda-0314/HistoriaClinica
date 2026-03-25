<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HistoriaClinica extends Model
{
    protected $fillable = [
    'paciente_id',
    'fecha_creacion',
    'antecedentes_generales',
    'firma_paciente',
    'firma_odontologo',
    'fecha_firma'
];
public function paciente()
    {
        return $this->belongsTo(Paciente::class);
    }

    public function consultas()
    {
        return $this->hasMany(Consulta::class);
    }

}
