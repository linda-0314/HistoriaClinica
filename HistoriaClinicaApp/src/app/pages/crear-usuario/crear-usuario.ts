import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-crear-usuario',
  imports: [FormsModule],
  templateUrl: './crear-usuario.html',
  styleUrl: './crear-usuario.css'
})
export class CrearUsuario {
  nombre = '';
  correo = '';
  password = '';
  rol = '';

  constructor(
    private router: Router,
    private api: ApiService
  ) {}

  guardarUsuario(form: NgForm) {
    const data = {
      name: this.nombre,
      email: this.correo,
      password: this.password,
      role: this.rol
    };

    this.api.crearUsuario(data).subscribe({
      next: () => {
        this.nombre = '';
        this.correo = '';
        this.password = '';
        this.rol = '';
        form.resetForm();

        alert('Creado exitoso');
      },
      error: (error) => {
        if (error?.error?.errors?.email) {
          alert(error.error.errors.email[0]);
        } else if (error?.error?.message) {
          alert(error.error.message);
        } else {
          alert('No se pudo crear');
        }
      }
    });
  }

  volver() {
    this.router.navigate(['/panel-admin']);
  }
}