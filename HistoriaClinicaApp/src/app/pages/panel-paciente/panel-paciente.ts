import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panel-paciente',
  imports: [CommonModule],
  templateUrl: './panel-paciente.html',
  styleUrl: './panel-paciente.css'
})
export class PanelPaciente {
  historia = {
    paciente: 'Juan Pérez',
    fechaCreacion: '10/03/2026',
    fechaNacimiento: '15/03/1995',
    sexo: 'Masculino',
    identificacion: '12345678',
    telefono: '315 678 90 12',
    direccion: 'Calle 123 #45-67',
    antecedentes: 'Asma',
    firmaPaciente: 'Juan Perez',
    firmaOdontologo: 'Dr. Ruiz',
    consultas: [
      {
        fechaConsulta: '15/04/2026',
        motivo: 'Control',
        examen: 'Limpieza dental completa',
        diagnostico: 'Limpieza realizada sin contratiempos',
        tratamiento: 'Cita en 6 meses',
        observaciones: 'Ninguna'
      },
      {
        fechaConsulta: '10/03/2026',
        motivo: 'Dolor',
        examen: '',
        diagnostico: '',
        tratamiento: '',
        observaciones: ''
      }
    ]
  };

  constructor(private router: Router) {}

  cerrarSesion() {
    this.router.navigate(['/']);
  }
}