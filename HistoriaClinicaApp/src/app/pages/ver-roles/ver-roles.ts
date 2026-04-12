import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service'; 

@Component({
  selector: 'app-ver-roles',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ver-roles.html',
  styleUrls: ['./ver-roles.css']
})
export class VerRoles implements OnInit {
  rolSeleccionado: string = 'Paciente';
  busqueda: string = '';
  historiaSeleccionada: any = null;
  historiaEditando: any = null;
  vistaDetalle: boolean = false;
  vistaEditarAuxiliar: boolean = false;

  historias: any[] = [];

  constructor(private router: Router, private api: ApiService) {}

  ngOnInit(): void {
    this.cargarDatosReales();
  }

  cargarDatosReales() {
    this.api.obtenerUsuariosPacientes().subscribe({
      next: (pacientes: any) => {
        const pacientesValidos = Array.isArray(pacientes) ? pacientes : pacientes?.usuarios || pacientes?.pacientes || [];
        
        this.historias = pacientesValidos.map((p: any) => {
          const pacienteId = p.paciente_id || p.id;
          
          return {
            id: pacienteId,
            paciente: p.nombre || p.name || 'Sin nombre',
            identificacion: p.numero_identificacion || p.identificacion || '',
            sexo: p.sexo || '',
            telefono: p.telefono || '',
            direccion: p.direccion || '',
            fechaNacimiento: p.fecha_nacimiento || p.fechaNacimiento || '',
            fechaCreacion: p.created_at || p.fecha_creacion || p.fechaCreacion || 'N/A',
            consultas: [],
            motivo: p.motivo_consulta || p.motivo || 'Sin registros'
          };
        });

        this.historias.forEach((historia, index) => {
          this.api.obtenerHistoriaPorPaciente(historia.id).subscribe({
            next: (data: any) => {
              if (Array.isArray(data.consultas) && data.consultas.length > 0) {
                const ultimaConsulta = data.consultas[data.consultas.length - 1];
                this.historias[index].motivo = ultimaConsulta?.motivo_consulta || ultimaConsulta?.motivo || 'Sin registros';
                this.historias[index].fechaCreacion = data.fecha_creacion || this.historias[index].fechaCreacion;
              }
            },
            error: () => {
            }
          });
        });
      },
      error: (err: any) => console.error('Error:', err)
    });
  }

  cambiarRol(rol: string) {
    this.rolSeleccionado = rol;
    this.busqueda = '';
    this.volverLista();
  }

buscarPaciente() {
    if (this.rolSeleccionado === 'Paciente' && this.busqueda.trim() !== '') {
      const encontrado = this.historias.find(h => 
        h.paciente.toLowerCase().includes(this.busqueda.toLowerCase()) || 
        h.identificacion?.includes(this.busqueda)
      );

      if (encontrado) {
        this.verHistoria(encontrado); 
      }
    }
  }

  verHistoria(historia: any) {
    this.api.obtenerHistoriaPorPaciente(historia.id).subscribe({
      next: (data: any) => {
        this.historiaSeleccionada = {
          id: data.id || historia.id,
          ...historia,
          fechaCreacion: data.fecha_creacion || data.created_at || historia.fechaCreacion,
          fechaNacimiento: data.fecha_nacimiento || historia.fechaNacimiento,
          sexo: data.sexo || historia.sexo,
          telefono: data.telefono || historia.telefono,
          direccion: data.direccion || historia.direccion,
          antecedentes: data.antecedentes_generales || data.antecedentes || '',
          firmaPaciente: data.firma_paciente || data.firmaPaciente || '',
          firmaOdontologo: data.firma_odontologo || data.firmaOdontologo || '',
          consultas: Array.isArray(data.consultas)
            ? data.consultas.map((c: any) => ({
                fechaConsulta: c.fecha_consulta || c.fechaConsulta || '',
                motivo: c.motivo_consulta || c.motivo || '',
                examen: c.examen_clinico || c.examen || '',
                diagnostico: c.diagnostico || '',
                tratamiento: c.plan_tratamiento || c.tratamiento || '',
                observaciones: c.observaciones || ''
              }))
            : []
        };
        this.vistaDetalle = true;
      }
    });
  }

  editarHistoria(historia: any) {
    this.api.obtenerHistoriaPorPaciente(historia.id).subscribe({
      next: (data: any) => {
        const primeraConsulta = Array.isArray(data.consultas) ? data.consultas[0] || {} : {};
        this.historiaEditando = {
          id: data.id || historia.id,
          paciente: historia.paciente,
          fechaCreacion: data.fecha_creacion || data.created_at || historia.fechaCreacion,
          fechaNacimiento: data.fecha_nacimiento || historia.fechaNacimiento,
          sexo: data.sexo || historia.sexo,
          identificacion: historia.identificacion,
          telefono: data.telefono || historia.telefono,
          direccion: data.direccion || historia.direccion,
          antecedentes: data.antecedentes_generales || data.antecedentes || '',
          motivo: primeraConsulta.motivo_consulta || primeraConsulta.motivo || '',
          diagnostico: primeraConsulta.diagnostico || '',
          tratamiento: primeraConsulta.plan_tratamiento || primeraConsulta.tratamiento || '',
          observaciones: primeraConsulta.observaciones || ''
        };
        this.vistaEditarAuxiliar = true;
      },
      error: () => alert('Error al cargar la historia para edición')
    });
  }

  guardarCambios() {
    const historiaId = this.historiaEditando?.id;
    if (!historiaId) {
      alert('No se pudo guardar: falta el ID de la historia clínica');
      return;
    }

    this.api.actualizarHistoriaClinica(historiaId, this.historiaEditando).subscribe({
      next: () => {
        alert('Cambios guardados en la base de datos');
        this.cargarDatosReales(); 
        this.volverLista();
      },
      error: () => alert('Error al guardar cambios')
    });
  }

  volverLista() {
    this.vistaDetalle = false;
    this.vistaEditarAuxiliar = false;
    this.historiaSeleccionada = null;
    this.historiaEditando = null;
  }

  get historiasFiltradas() {
    return this.historias.filter(h =>
      h.paciente.toLowerCase().includes(this.busqueda.toLowerCase()) ||
      h.identificacion?.includes(this.busqueda)
    );
  }

  salir() {
    this.router.navigate(['/panel-admin']); 
  }
}