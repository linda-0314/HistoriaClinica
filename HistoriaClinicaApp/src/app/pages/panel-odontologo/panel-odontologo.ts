import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-panel-odontologo',
  standalone: true, 
  imports: [CommonModule, FormsModule],
  templateUrl: './panel-odontologo.html',
  styleUrl: './panel-odontologo.css'
})
export class PanelOdontologo implements OnInit {
  busqueda: string = '';
  cargando = true;

  historias: any[] = [];
  historiasFiltradas: any[] = [];

  historiaSeleccionada: any = null;
  vistaDetalle = false;

  constructor(
    private router: Router,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.cargarHistorias();
  }

  cargarHistorias() {
    this.cargando = true;

    this.api.obtenerUsuariosPacientes().subscribe({
      next: (resp: any) => {
        const pacientes = Array.isArray(resp)
          ? resp
          : resp?.usuarios || resp?.pacientes || resp?.data || [];

        if (!pacientes.length) {
          this.historias = [];
          this.historiasFiltradas = [];
          this.cargando = false;
          return;
        }

        const peticiones = pacientes.map((paciente: any) => {
          const pacienteId = paciente?.paciente_id || paciente?.id;

          if (!pacienteId) return of(null);

          return this.api.obtenerHistoriaPorPaciente(pacienteId).pipe(
            catchError(() => of(null)) 
          );
        });

        (forkJoin(peticiones) as any).subscribe({
          next: (respuestas: any[]) => {
            const resultado: any[] = [];

            respuestas.forEach((historiaResp: any, index: number) => {
              const paciente = pacientes[index];

              if (!historiaResp) return;

              const consultas = Array.isArray(historiaResp?.consultas)
                ? historiaResp.consultas
                : [];

              const ultimaConsulta = consultas.length > 0 ? consultas[consultas.length - 1] : null;

              resultado.push({
                id: historiaResp?.id,
                paciente_id: paciente?.paciente_id || paciente?.id,
                paciente: paciente?.nombre || paciente?.name || 'Sin nombre',
                fechaCreacion: historiaResp?.fecha_creacion || '',
                fechaNacimiento: paciente?.fecha_nacimiento || 'N/A',
                sexo: paciente?.sexo || 'N/A',
                identificacion: paciente?.numero_identificacion || paciente?.identificacion || '',
                telefono: paciente?.telefono || '',
                direccion: paciente?.direccion || '',
                antecedentes: historiaResp?.antecedentes_generales || 'Ninguno',
                firmaPaciente: historiaResp?.firma_paciente || 'Pendiente',
                firmaOdontologo: historiaResp?.firma_odontologo || 'Pendiente',
                
                // Mapeo del array de consultas para el detalle
                consultas: consultas.map((c: any) => ({
                  fechaConsulta: c?.fecha_consulta || '',
                  motivo: c?.motivo_consulta || '',
                  examen: c?.examen_clinico || '',
                  diagnostico: c?.diagnostico || '',
                  tratamiento: c?.plan_tratamiento || '',
                  observaciones: c?.observaciones || ''
                })),

                fechaTabla: ultimaConsulta?.fecha_consulta || historiaResp?.fecha_creacion || '',
                motivoTabla: ultimaConsulta?.motivo_consulta || 'Sin consultas',
                diagnosticoTabla: ultimaConsulta?.diagnostico || 'Pendiente'
              });
            });

            this.historias = resultado;
            this.historiasFiltradas = [...resultado];
            this.cargando = false;
          },
          error: (err: any) => {
            console.error('Error en forkJoin:', err);
            this.cargando = false;
          }
        });
      },
      error: (err: any) => {
        console.error('Error al obtener pacientes:', err);
        this.cargando = false;
        alert('No se pudieron cargar los datos del servidor.');
      }
    });
  }

  buscarPaciente() {
    const texto = this.busqueda.toLowerCase().trim();

    if (!texto) {
      this.historiasFiltradas = [...this.historias];
      return;
    }

    this.historiasFiltradas = this.historias.filter((h: any) =>
      (h.paciente || '').toLowerCase().includes(texto) ||
      (h.identificacion || '').toString().includes(texto)
    );
  }

  verHistoria(historia: any) {
    this.historiaSeleccionada = historia;
    this.vistaDetalle = true;
  }

  volverListado() {
    this.vistaDetalle = false;
    this.historiaSeleccionada = null;
  }

  cerrarSesion() {
    this.router.navigate(['/']);
  }
}