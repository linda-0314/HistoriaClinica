import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panel-auxiliar',
  imports: [CommonModule, FormsModule],
  templateUrl: './panel-auxiliar.html',
  styleUrl: './panel-auxiliar.css'
})
export class PanelAuxiliar {
  busqueda: string = '';

  vistaNuevaConsulta: boolean = true;
  vistaCrearHistoria: boolean = false;
  vistaDetalle: boolean = false;
  vistaEditar: boolean = false;

  pacienteSeleccionado: any = {
    nombre: 'Juan Pérez',
    cc: '12345678'
  };

  historias = [
    {
      id: 1,
      paciente: 'Juan Pérez',
      cc: '12345678',
      fechaCreacion: '2026-03-10',
      fechaNacimiento: '1995-03-15',
      sexo: 'Masculino',
      identificacion: '12345678',
      telefono: '3156789012',
      direccion: 'Calle 123 #45-67',
      antecedentes: 'Asma',
      firmaPaciente: 'Juan Perez',
      firmaOdontologo: 'Dr. Ruiz',
      consultas: [
        {
          fechaConsulta: '2026-04-15',
          motivo: 'Control',
          examen: 'Limpieza dental completa',
          diagnostico: 'Limpieza realizada sin contratiempos',
          tratamiento: 'Cita en 6 meses',
          observaciones: 'Ninguna'
        },
        {
          fechaConsulta: '2026-03-10',
          motivo: 'Dolor',
          examen: '',
          diagnostico: '',
          tratamiento: '',
          observaciones: ''
        }
      ]
    },
    {
      id: 2,
      paciente: 'María Gómez',
      cc: '87654321',
      fechaCreacion: '2026-03-08',
      fechaNacimiento: '1998-08-20',
      sexo: 'Femenino',
      identificacion: '87654321',
      telefono: '3004567890',
      direccion: 'Carrera 12 #20-15',
      antecedentes: 'Ninguno',
      firmaPaciente: 'Maria Gomez',
      firmaOdontologo: 'Dr. Ruiz',
      consultas: [
        {
          fechaConsulta: '2026-03-10',
          motivo: 'Dolor',
          examen: 'Revisión de muela',
          diagnostico: 'Caries dental',
          tratamiento: 'Resina',
          observaciones: 'Control en 15 días'
        }
      ]
    }
  ];

  historiaSeleccionada: any = this.historias[0];

  nuevaConsulta = {
    fechaConsulta: '',
    motivo: '',
    examen: '',
    diagnostico: '',
    tratamiento: '',
    observaciones: ''
  };

  nuevaHistoria = {
    fechaHistoria: '',
    nombre: '',
    fechaNacimiento: '',
    sexo: '',
    numeroIdentificacion: '',
    telefono: '',
    direccion: '',
    antecedentes: '',
    firmaPaciente: '',
    firmaOdontologo: ''
  };

  historiaEditando: any = null;

  constructor(private router: Router) {}

  buscarPaciente() {
    const texto = this.busqueda.toLowerCase().trim();
    const encontrado = this.historias.find(h =>
      h.paciente.toLowerCase().includes(texto) ||
      h.cc.includes(texto)
    );

    if (encontrado) {
      this.pacienteSeleccionado = {
        nombre: encontrado.paciente,
        cc: encontrado.cc
      };
      this.historiaSeleccionada = encontrado;
    }
  }

  verHistoriaSeleccionada() {
    if (this.historiaSeleccionada) {
      this.vistaNuevaConsulta = false;
      this.vistaCrearHistoria = false;
      this.vistaDetalle = true;
      this.vistaEditar = false;
    }
  }

  abrirCrearHistoria() {
    this.vistaNuevaConsulta = false;
    this.vistaCrearHistoria = true;
    this.vistaDetalle = false;
    this.vistaEditar = false;
  }

  guardarConsulta() {
    alert('Consulta guardada');
    this.nuevaConsulta = {
      fechaConsulta: '',
      motivo: '',
      examen: '',
      diagnostico: '',
      tratamiento: '',
      observaciones: ''
    };
  }

  guardarHistoria() {
    alert('Historia clínica creada');
    this.vistaNuevaConsulta = true;
    this.vistaCrearHistoria = false;
  }

  editarHistoria() {
    this.historiaEditando = {
      fechaCreacion: this.historiaSeleccionada.fechaCreacion,
      paciente: this.historiaSeleccionada.paciente,
      fechaNacimiento: this.historiaSeleccionada.fechaNacimiento,
      sexo: this.historiaSeleccionada.sexo,
      identificacion: this.historiaSeleccionada.identificacion,
      telefono: this.historiaSeleccionada.telefono,
      direccion: this.historiaSeleccionada.direccion,
      antecedentes: this.historiaSeleccionada.antecedentes,
      fechaConsulta: this.historiaSeleccionada.consultas[0]?.fechaConsulta || '',
      motivo: this.historiaSeleccionada.consultas[0]?.motivo || '',
      examen: this.historiaSeleccionada.consultas[0]?.examen || '',
      diagnostico: this.historiaSeleccionada.consultas[0]?.diagnostico || '',
      tratamiento: this.historiaSeleccionada.consultas[0]?.tratamiento || '',
      observaciones: this.historiaSeleccionada.consultas[0]?.observaciones || ''
    };

    this.vistaNuevaConsulta = false;
    this.vistaCrearHistoria = false;
    this.vistaDetalle = false;
    this.vistaEditar = true;
  }

  guardarCambios() {
    this.historiaSeleccionada.fechaCreacion = this.historiaEditando.fechaCreacion;
    this.historiaSeleccionada.paciente = this.historiaEditando.paciente;
    this.historiaSeleccionada.fechaNacimiento = this.historiaEditando.fechaNacimiento;
    this.historiaSeleccionada.sexo = this.historiaEditando.sexo;
    this.historiaSeleccionada.identificacion = this.historiaEditando.identificacion;
    this.historiaSeleccionada.telefono = this.historiaEditando.telefono;
    this.historiaSeleccionada.direccion = this.historiaEditando.direccion;
    this.historiaSeleccionada.antecedentes = this.historiaEditando.antecedentes;

    if (this.historiaSeleccionada.consultas.length > 0) {
      this.historiaSeleccionada.consultas[0].fechaConsulta = this.historiaEditando.fechaConsulta;
      this.historiaSeleccionada.consultas[0].motivo = this.historiaEditando.motivo;
      this.historiaSeleccionada.consultas[0].examen = this.historiaEditando.examen;
      this.historiaSeleccionada.consultas[0].diagnostico = this.historiaEditando.diagnostico;
      this.historiaSeleccionada.consultas[0].tratamiento = this.historiaEditando.tratamiento;
      this.historiaSeleccionada.consultas[0].observaciones = this.historiaEditando.observaciones;
    }

    alert('Cambios guardados');
    this.vistaEditar = false;
    this.vistaDetalle = true;
  }

  volverInicio() {
    this.vistaNuevaConsulta = true;
    this.vistaCrearHistoria = false;
    this.vistaDetalle = false;
    this.vistaEditar = false;
  }

  cerrarSesion() {
    this.router.navigate(['/']);
  }
}