import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panel-odontologo',
  imports: [CommonModule, FormsModule],
  templateUrl: './panel-odontologo.html',
  styleUrl: './panel-odontologo.css'
})
export class PanelOdontologo {
  busqueda: string = '';
  vistaDetalle: boolean = false;
  historiaSeleccionada: any = null;

  historias = [
    {
      paciente: 'Juan Pérez',
      fecha: '15/04/2026',
      motivo: 'Control',
      diagnostico: 'Limpieza',
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
    },
    {
      paciente: 'María Gómez',
      fecha: '10/03/2026',
      motivo: 'Dolor',
      diagnostico: 'Caries',
      fechaCreacion: '08/03/2026',
      fechaNacimiento: '08/07/1998',
      sexo: 'Femenino',
      identificacion: '87654321',
      telefono: '300 456 78 90',
      direccion: 'Carrera 10 #22-15',
      antecedentes: 'Ninguno',
      firmaPaciente: 'Maria Gomez',
      firmaOdontologo: 'Dr. Ruiz',
      consultas: [
        {
          fechaConsulta: '10/03/2026',
          motivo: 'Dolor',
          examen: 'Revisión de muela',
          diagnostico: 'Caries',
          tratamiento: 'Resina dental',
          observaciones: 'Control en 15 días'
        }
      ]
    },
    {
      paciente: 'Carlos Martínez',
      fecha: '05/02/2026',
      motivo: 'Dolor',
      diagnostico: 'Caries',
      fechaCreacion: '05/02/2026',
      fechaNacimiento: '21/01/1992',
      sexo: 'Masculino',
      identificacion: '45678912',
      telefono: '311 222 33 44',
      direccion: 'Barrio Centro',
      antecedentes: 'Alergia a penicilina',
      firmaPaciente: 'Carlos Martinez',
      firmaOdontologo: 'Dr. Ruiz',
      consultas: [
        {
          fechaConsulta: '05/02/2026',
          motivo: 'Dolor',
          examen: 'Dolor fuerte en molar',
          diagnostico: 'Caries',
          tratamiento: 'Medicamento y extracción',
          observaciones: 'Reposo'
        }
      ]
    },
    {
      paciente: 'Laura Torres',
      fecha: '20/01/2026',
      motivo: 'Control',
      diagnostico: 'Gingivitis',
      fechaCreacion: '18/01/2026',
      fechaNacimiento: '03/11/1990',
      sexo: 'Femenino',
      identificacion: '99887766',
      telefono: '320 555 66 77',
      direccion: 'Neiva',
      antecedentes: 'Ninguno',
      firmaPaciente: 'Laura Torres',
      firmaOdontologo: 'Dr. Ruiz',
      consultas: [
        {
          fechaConsulta: '20/01/2026',
          motivo: 'Control',
          examen: 'Revisión general',
          diagnostico: 'Gingivitis',
          tratamiento: 'Limpieza y control',
          observaciones: 'Usar seda dental'
        }
      ]
    },
    {
      paciente: 'José Ramírez',
      fecha: '12/01/2026',
      motivo: 'Emergencia',
      diagnostico: 'Absceso',
      fechaCreacion: '12/01/2026',
      fechaNacimiento: '14/06/1988',
      sexo: 'Masculino',
      identificacion: '11223344',
      telefono: '300 111 22 33',
      direccion: 'Aipe',
      antecedentes: 'Diabetes',
      firmaPaciente: 'Jose Ramirez',
      firmaOdontologo: 'Dr. Ruiz',
      consultas: [
        {
          fechaConsulta: '12/01/2026',
          motivo: 'Emergencia',
          examen: 'Inflamación severa',
          diagnostico: 'Absceso',
          tratamiento: 'Medicamento y drenaje',
          observaciones: 'Control urgente'
        }
      ]
    }
  ];

  constructor(private router: Router) {}

  get historiasFiltradas() {
    return this.historias.filter(historia =>
      historia.paciente.toLowerCase().includes(this.busqueda.toLowerCase())
    );
  }

  verHistoria(historia: any) {
    this.historiaSeleccionada = historia;
    this.vistaDetalle = true;
  }

  salir() {
    if (this.vistaDetalle) {
      this.vistaDetalle = false;
      this.historiaSeleccionada = null;
    } else {
      this.router.navigate(['/']);
    }
  }

  cerrarSesion() {
    this.router.navigate(['/']);
  }
}