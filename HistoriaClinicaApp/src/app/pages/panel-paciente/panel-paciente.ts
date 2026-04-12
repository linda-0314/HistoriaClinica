import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-panel-paciente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './panel-paciente.html',
  styleUrl: './panel-paciente.css'
})
export class PanelPaciente implements OnInit {
  historia: any = null;
  cargando = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const userId = Number(params.get('id'));
      console.log('--- Depuración: ngOnInit ---');
      console.log('ID detectado en URL:', userId);

      if (!userId) {
        this.cargando = false;
        alert('Sesión no válida');
        this.router.navigate(['/']);
        return;
      }

      const historiaGuardada = localStorage.getItem('historiaClinica');
      if (historiaGuardada) {
        this.historia = JSON.parse(historiaGuardada);
      }

      this.buscarPacienteYHistoria(userId);
    });
  }

  buscarPacienteYHistoria(userId: number) {
    this.cargando = true;
    console.log('Iniciando búsqueda de paciente para user_id:', userId);

    this.api.obtenerUsuariosPacientes().subscribe({
      next: (resp: any) => {
        console.log('Respuesta del servidor (lista de pacientes):', resp);
        
        const lista = Array.isArray(resp) ? resp : resp?.usuarios || resp?.pacientes || resp?.data || [];
        console.log('Lista procesada para búsqueda:', lista);

        const pacienteEncontrado = lista.find((p: any) => 
          Number(p.user_id) === userId || Number(p.id) === userId
        );

        if (!pacienteEncontrado) {
          console.error('ERROR: No se encontró ningún paciente con el ID:', userId);
          this.cargando = false;
          this.cdr.detectChanges();
          return;
        }

        console.log('¡Paciente encontrado!:', pacienteEncontrado);
        const pacienteId = pacienteEncontrado.paciente_id || pacienteEncontrado.id;
        this.cargarHistoria(pacienteId, pacienteEncontrado);
      },
      error: (err) => {
        console.error('Error al obtener la lista de pacientes:', err);
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

  cargarHistoria(pacienteId: number, pacienteEncontrado: any) {
    console.log('Cargando historia para pacienteId:', pacienteId);
    
    this.api.obtenerHistoriaPorPaciente(pacienteId).subscribe({
      next: (resp: any) => {
        console.log('Datos de la historia recibidos:', resp);

        const datosMapeados = {
          paciente: pacienteEncontrado?.nombre || pacienteEncontrado?.name || 'Usuario',
          fechaCreacion: resp?.fecha_creacion || 'No registrada',
          fechaNacimiento: pacienteEncontrado?.fecha_nacimiento || 'N/A',
          sexo: pacienteEncontrado?.sexo || 'N/A',
          identificacion: pacienteEncontrado?.numero_identificacion || pacienteEncontrado?.identificacion || 'N/A',
          telefono: pacienteEncontrado?.telefono || 'N/A',
          direccion: pacienteEncontrado?.direccion || 'N/A',
          antecedentes: resp?.antecedentes_generales || 'Ninguno',
          firmaPaciente: resp?.firma_paciente || 'Pendiente',
          firmaOdontologo: resp?.firma_odontologo || 'Pendiente',
          consultas: Array.isArray(resp?.consultas) ? resp.consultas.map((c: any) => ({
            fechaConsulta: c?.fecha_consulta || '',
            motivo: c?.motivo_consulta || '',
            examen: c?.examen_clinico || '',
            diagnostico: c?.diagnostico || '',
            tratamiento: c?.plan_tratamiento || '',
            observaciones: c?.observaciones || ''
          })) : []
        };

        this.historia = datosMapeados;
        localStorage.setItem('historiaClinica', JSON.stringify(this.historia));
        
        this.cargando = false;
        console.log('Carga finalizada con éxito.');
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar la historia:', err);
        this.cargando = false;
        this.historia = null;
        alert('No se pudo encontrar una historia clínica para este paciente.');
        this.cdr.detectChanges();
      }
    });
  }

  cerrarSesion() {
    localStorage.removeItem('historiaClinica');
    this.router.navigate(['/']);
  }
}