<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('consultas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('historia_clinica_id')->constrained()->onDelete('cascade');
            $table->foreignId('odontologo_id')->constrained()->onDelete('cascade');
            $table->date('fecha_consulta');
            $table->text('motivo_consulta');
            $table->text('examen_clinico');
            $table->text('diagnostico');
            $table->text('plan_tratamiento');
            $table->text('observaciones')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('consultas');
    }
};
