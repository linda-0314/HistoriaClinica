import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-panel-auxiliar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './panel-auxiliar.html',
  styleUrl: './panel-auxiliar.css'
})
export class PanelAuxiliar implements OnInit {
  busqueda: string = '';

  vistaNuevaConsulta: boolean = true;
  vistaCrearHistoria: boolean = false;
  vistaDetalle: boolean = false;
  vistaEditar: boolean = false;

  pacientesBackend: any[] = [];

  pacienteSeleccionado: any = null;
  historiaSeleccionada: any = null;
  historiaClinicaId: number | null = null;

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

  constructor(
    private router: Router,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.cargarPacientes();
  }

  cargarPacientes() {
    this.api.obtenerUsuariosPacientes().subscribe({
      next: (resp: any) => {
        this.pacientesBackend = Array.isArray(resp)
          ? resp
          : resp?.usuarios || resp?.pacientes || [];
      },
      error: () => {
        this.avisar('No se pudieron cargar los pacientes');
      }
    });
  }

  getNombrePaciente(item: any): string {
    return item?.nombre || item?.name || '';
  }

  getCcPaciente(item: any): string {
    return item?.numero_identificacion || item?.identificacion || item?.cc || '';
  }

  getUserId(item: any): number | null {
    return item?.user_id || item?.user?.id || item?.id || null;
  }

  getPacienteId(item: any): number | null {
    if (item?.paciente_id) return item.paciente_id;
    if (item?.idPaciente) return item.idPaciente;
    if (item?.paciente?.id) return item.paciente.id;
    if (item?.user_id && item?.id) return item.id;
    return null;
  }

  llenarFormularioHistoriaDesdePaciente(item: any) {
    this.nuevaHistoria.nombre = this.getNombrePaciente(item) || '';
    this.nuevaHistoria.fechaNacimiento = item?.fecha_nacimiento || item?.fechaNacimiento || '';
    this.nuevaHistoria.sexo = item?.sexo || '';
    this.nuevaHistoria.numeroIdentificacion = this.getCcPaciente(item) || '';
    this.nuevaHistoria.telefono = item?.telefono || '';
    this.nuevaHistoria.direccion = item?.direccion || '';
  }

  mapHistoriaBackend(resp: any, paciente: any) {
    const fuentePaciente = resp?.paciente || paciente || {};

    return {
      id: resp?.id || null,
      paciente: this.getNombrePaciente(fuentePaciente),
      cc: this.getCcPaciente(fuentePaciente),
      fechaCreacion: resp?.fecha_creacion || resp?.fechaCreacion || '',
      fechaNacimiento: fuentePaciente?.fecha_nacimiento || fuentePaciente?.fechaNacimiento || '',
      sexo: fuentePaciente?.sexo || '',
      identificacion: this.getCcPaciente(fuentePaciente),
      telefono: fuentePaciente?.telefono || '',
      direccion: fuentePaciente?.direccion || '',
      antecedentes: resp?.antecedentes_generales || resp?.antecedentes || '',
      firmaPaciente: resp?.firma_paciente || resp?.firmaPaciente || '',
      firmaOdontologo: resp?.firma_odontologo || resp?.firmaOdontologo || '',
      consultas: Array.isArray(resp?.consultas)
        ? resp.consultas.map((c: any) => ({
            fechaConsulta: c?.fecha_consulta || c?.fechaConsulta || '',
            motivo: c?.motivo_consulta || c?.motivo || '',
            examen: c?.examen_clinico || c?.examen || '',
            diagnostico: c?.diagnostico || '',
            tratamiento: c?.plan_tratamiento || c?.tratamiento || '',
            observaciones: c?.observaciones || ''
          }))
        : []
    };
  }

  buscarPaciente() {
    const texto = this.busqueda.toLowerCase().trim();

    const encontrado = this.pacientesBackend.find((p: any) =>
      this.getNombrePaciente(p).toLowerCase().includes(texto) ||
      this.getCcPaciente(p).includes(texto) ||
      (p?.email || '').toLowerCase().includes(texto)
    );

    if (!encontrado) {
      this.avisar('Paciente no encontrado');
      this.pacienteSeleccionado = null;
      this.historiaSeleccionada = null;
      this.historiaClinicaId = null;
      return;
    }

    this.pacienteSeleccionado = encontrado;
    this.llenarFormularioHistoriaDesdePaciente(encontrado);

    const pacienteId = this.getPacienteId(encontrado);

    if (!pacienteId) {
      this.historiaSeleccionada = null;
      this.historiaClinicaId = null;
      this.vistaNuevaConsulta = false;
      this.vistaCrearHistoria = true;
      this.vistaDetalle = false;
      this.vistaEditar = false;
      this.avisar('Este paciente no tiene historia clínica. Debes crearla.');
      return;
    }

    this.api.obtenerHistoriaPorPaciente(pacienteId).subscribe({
      next: (resp: any) => {
        this.historiaSeleccionada = this.mapHistoriaBackend(resp, encontrado);
        this.historiaClinicaId = resp?.id || null;
        this.vistaNuevaConsulta = true;
        this.vistaCrearHistoria = false;
        this.vistaDetalle = false;
        this.vistaEditar = false;
      },
      error: () => {
        this.historiaSeleccionada = null;
        this.historiaClinicaId = null;
        this.vistaNuevaConsulta = false;
        this.vistaCrearHistoria = true;
        this.vistaDetalle = false;
        this.vistaEditar = false;
        this.avisar('Ese paciente no tiene historia clínica. Debes crearla.');
      }
    });
  }

  verHistoriaSeleccionada() {
    if (!this.historiaSeleccionada) {
      this.avisar('Primero busca un paciente con historia clínica');
      return;
    }
    this.vistaNuevaConsulta = false;
    this.vistaCrearHistoria = false;
    this.vistaDetalle = true;
    this.vistaEditar = false;
  }

  abrirCrearHistoria() {
    if (!this.pacienteSeleccionado) {
      this.avisar('Primero busca un paciente');
      return;
    }
    this.vistaNuevaConsulta = false;
    this.vistaCrearHistoria = true;
    this.vistaDetalle = false;
    this.vistaEditar = false;
  }

  guardarConsulta() {
    const pId = this.getPacienteId(this.pacienteSeleccionado);
    if (!pId) {
      this.avisar('Primero busca un paciente con historia clínica');
      return;
    }

    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const data = {
      paciente_id: pId,
      user_id: user?.id || 1,
      fecha_consulta: this.nuevaConsulta.fechaConsulta,
      motivo_consulta: this.nuevaConsulta.motivo,
      examen_clinico: this.nuevaConsulta.examen,
      diagnostico: this.nuevaConsulta.diagnostico,
      plan_tratamiento: this.nuevaConsulta.tratamiento,
      observaciones: this.nuevaConsulta.observaciones
    };

    this.api.crearConsulta(data).subscribe({
      next: () => {
        this.reiniciarNuevaConsulta();
        this.vistaNuevaConsulta = true;
        this.vistaCrearHistoria = false;
        this.vistaDetalle = false;
        this.vistaEditar = false;

        this.api.obtenerHistoriaPorPaciente(pId).subscribe({
          next: (resp: any) => {
            this.historiaSeleccionada = this.mapHistoriaBackend(resp, this.pacienteSeleccionado);
            this.historiaClinicaId = resp?.id || null;
          }
        });
        this.avisar('Consulta guardada');
      },
      error: () => {
        this.avisar('Error al guardar consulta');
      }
    });
  }

  guardarHistoria() {
    if (!this.pacienteSeleccionado) {
      this.avisar('Primero busca un paciente');
      return;
    }

    const pacienteIdExistente = this.getPacienteId(this.pacienteSeleccionado);

    if (pacienteIdExistente) {
      this.crearHistoriaClinicaInterna(pacienteIdExistente);
      return;
    }

    const userId = this.getUserId(this.pacienteSeleccionado);
    if (!userId) {
      this.avisar('No se encontró el user_id del paciente');
      return;
    }

    const dataPaciente = {
      user_id: userId,
      nombre: this.nuevaHistoria.nombre,
      numero_identificacion: this.nuevaHistoria.numeroIdentificacion,
      sexo: this.nuevaHistoria.sexo,
      fecha_nacimiento: this.nuevaHistoria.fechaNacimiento,
      telefono: this.nuevaHistoria.telefono,
      direccion: this.nuevaHistoria.direccion
    };

    this.api.crearPaciente(dataPaciente).subscribe({
      next: (resp: any) => {
        const nuevoPacienteId = resp?.id || resp?.paciente?.id || resp?.data?.id || null;
        if (!nuevoPacienteId) {
          this.avisar('Se creó el paciente, pero no llegó el id');
          return;
        }
        this.pacienteSeleccionado = { ...this.pacienteSeleccionado, paciente_id: nuevoPacienteId };
        this.crearHistoriaClinicaInterna(nuevoPacienteId);
      },
      error: () => {
        this.avisar('Error al crear paciente');
      }
    });
  }

  crearHistoriaClinicaInterna(pacienteId: number) {
    const dataHistoria = {
      paciente_id: pacienteId,
      fecha_creacion: this.nuevaHistoria.fechaHistoria,
      antecedentes_generales: this.nuevaHistoria.antecedentes,
      firma_paciente: this.nuevaHistoria.firmaPaciente,
      firma_odontologo: this.nuevaHistoria.firmaOdontologo,
      fecha_firma: this.nuevaHistoria.fechaHistoria
    };

    this.api.crearHistoria(dataHistoria).subscribe({
      next: (resp: any) => {
        this.historiaClinicaId = resp?.id || null;
        this.historiaSeleccionada = this.mapHistoriaBackend(resp, this.pacienteSeleccionado);
        this.reiniciarNuevaHistoria();
        this.reiniciarNuevaConsulta();
        this.volverInicio();
        this.avisar('Historia clínica creada');
      },
      error: () => {
        this.avisar('Error al crear historia clínica');
      }
    });
  }

  editarHistoria() {
    if (!this.historiaSeleccionada) return;
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
    if (!this.historiaSeleccionada || !this.historiaEditando) return;
    this.historiaSeleccionada = { ...this.historiaSeleccionada, ...this.historiaEditando };
    this.avisar('Cambios guardados');
    this.vistaEditar = false;
    this.vistaDetalle = true;
  }

  reiniciarNuevaConsulta() {
    this.nuevaConsulta = { fechaConsulta: '', motivo: '', examen: '', diagnostico: '', tratamiento: '', observaciones: '' };
  }

  reiniciarNuevaHistoria() {
    this.nuevaHistoria = { fechaHistoria: '', nombre: '', fechaNacimiento: '', sexo: '', numeroIdentificacion: '', telefono: '', direccion: '', antecedentes: '', firmaPaciente: '', firmaOdontologo: '' };
  }

  volverInicio() {
    this.vistaNuevaConsulta = true;
    this.vistaCrearHistoria = false;
    this.vistaDetalle = false;
    this.vistaEditar = false;
  }

  avisar(mensaje: string) {
    window.alert(mensaje);
  }

  cerrarSesion() {
    this.router.navigate(['/']);
  }
}