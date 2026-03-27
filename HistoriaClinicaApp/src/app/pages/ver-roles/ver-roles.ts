import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ver-roles',
  imports: [CommonModule, FormsModule],
  templateUrl: './ver-roles.html',
  styleUrl: './ver-roles.css'
})
export class VerRoles {
  rolSeleccionado: string = 'Paciente';
  busqueda: string = '';
  historiaSeleccionada: any = null;
  historiaEditando: any = null;
  vistaDetalleHistoria: boolean = false;
  vistaEditarAuxiliar: boolean = false;

  historias = [
    {
      id: 1,
      paciente: 'Juan Pérez',
      fecha: '15/04/2026',
      motivo: 'Control',
      fechaCreacion: '10/03/2026',
      fechaNacimiento: '15/03/1995',
      sexo: 'Masculino',
      identificacion: '12345678',
      telefono: '3156789012',
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
      id: 2,
      paciente: 'María Gómez',
      fecha: '10/03/2026',
      motivo: 'Dolor',
      fechaCreacion: '08/03/2026',
      fechaNacimiento: '20/08/1998',
      sexo: 'Femenino',
      identificacion: '87654321',
      telefono: '3004567890',
      direccion: 'Carrera 12 #20-15',
      antecedentes: 'Ninguno',
      firmaPaciente: 'Maria Gomez',
      firmaOdontologo: 'Dr. Ruiz',
      consultas: [
        {
          fechaConsulta: '10/03/2026',
          motivo: 'Dolor',
          examen: 'Revisión de muela',
          diagnostico: 'Caries dental',
          tratamiento: 'Resina',
          observaciones: 'Control en 15 días'
        }
      ]
    },
    {
      id: 3,
      paciente: 'Carlos Martínez',
      fecha: '05/02/2026',
      motivo: 'Emergencia',
      fechaCreacion: '05/02/2026',
      fechaNacimiento: '12/01/1992',
      sexo: 'Masculino',
      identificacion: '45678912',
      telefono: '3112223344',
      direccion: 'Barrio Centro',
      antecedentes: 'Alergia a penicilina',
      firmaPaciente: 'Carlos Martinez',
      firmaOdontologo: 'Dr. Ruiz',
      consultas: [
        {
          fechaConsulta: '05/02/2026',
          motivo: 'Emergencia',
          examen: 'Dolor fuerte en molar',
          diagnostico: 'Infección',
          tratamiento: 'Medicamento y extracción',
          observaciones: 'Reposo'
        }
      ]
    }
  ];

  constructor(private router: Router) {}

  cambiarRol(rol: string) {
    this.rolSeleccionado = rol;
    this.busqueda = '';
    this.historiaSeleccionada = null;
    this.historiaEditando = null;
    this.vistaDetalleHistoria = false;
    this.vistaEditarAuxiliar = false;
  }

  buscarPaciente() {
    if (this.rolSeleccionado !== 'Paciente') {
      return;
    }

    if (this.busqueda.trim() === '') {
      this.historiaSeleccionada = null;
      return;
    }

    const resultados = this.historiasFiltradas;
    this.historiaSeleccionada = resultados.length > 0 ? resultados[0] : null;
  }

  verHistoria(historia: any) {
    this.historiaSeleccionada = historia;
    this.vistaDetalleHistoria = true;
  }

  editarHistoria(historia: any) {
    const primeraConsulta = historia.consultas[0] || {};

    this.historiaEditando = {
      id: historia.id,
      fechaCreacion: historia.fechaCreacion,
      paciente: historia.paciente,
      fechaNacimiento: historia.fechaNacimiento,
      sexo: historia.sexo,
      identificacion: historia.identificacion,
      telefono: historia.telefono,
      direccion: historia.direccion,
      antecedentes: historia.antecedentes,
      fechaConsulta: primeraConsulta.fechaConsulta || '',
      motivo: primeraConsulta.motivo || '',
      examen: primeraConsulta.examen || '',
      diagnostico: primeraConsulta.diagnostico || '',
      tratamiento: primeraConsulta.tratamiento || '',
      observaciones: primeraConsulta.observaciones || ''
    };

    this.vistaEditarAuxiliar = true;
  }

  guardarCambios() {
    const index = this.historias.findIndex(h => h.id === this.historiaEditando.id);

    if (index !== -1) {
      this.historias[index].fechaCreacion = this.historiaEditando.fechaCreacion;
      this.historias[index].paciente = this.historiaEditando.paciente;
      this.historias[index].fechaNacimiento = this.historiaEditando.fechaNacimiento;
      this.historias[index].sexo = this.historiaEditando.sexo;
      this.historias[index].identificacion = this.historiaEditando.identificacion;
      this.historias[index].telefono = this.historiaEditando.telefono;
      this.historias[index].direccion = this.historiaEditando.direccion;
      this.historias[index].antecedentes = this.historiaEditando.antecedentes;
      this.historias[index].fecha = this.historiaEditando.fechaConsulta;
      this.historias[index].motivo = this.historiaEditando.motivo;

      if (this.historias[index].consultas.length > 0) {
        this.historias[index].consultas[0].fechaConsulta = this.historiaEditando.fechaConsulta;
        this.historias[index].consultas[0].motivo = this.historiaEditando.motivo;
        this.historias[index].consultas[0].examen = this.historiaEditando.examen;
        this.historias[index].consultas[0].diagnostico = this.historiaEditando.diagnostico;
        this.historias[index].consultas[0].tratamiento = this.historiaEditando.tratamiento;
        this.historias[index].consultas[0].observaciones = this.historiaEditando.observaciones;
      }
    }

    alert('Cambios guardados');
    this.vistaEditarAuxiliar = false;
    this.historiaEditando = null;
  }

  volverLista() {
    this.vistaDetalleHistoria = false;
    this.vistaEditarAuxiliar = false;
    this.historiaSeleccionada = null;
    this.historiaEditando = null;
  }

  get historiasFiltradas() {
    return this.historias.filter(historia =>
      historia.paciente.toLowerCase().includes(this.busqueda.toLowerCase())
    );
  }

  salir() {
    if (this.vistaDetalleHistoria || this.vistaEditarAuxiliar) {
      this.volverLista();
    } else {
      this.router.navigate(['/panel-admin']);
    }
  }
}