<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Paciente extends Model
{
     protected $fillable = [
        'user_id',
        'nombre',
        'numero_identificacion',
        'sexo',
        'fecha_nacimiento',
        'telefono',
        'direccion'
    ];

    public function historia()
    {
        return $this->hasOne(HistoriaClinica::class);
    }
}
