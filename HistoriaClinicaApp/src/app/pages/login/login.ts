import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  email = '';
  password = '';

  constructor(
    private router: Router,
    private api: ApiService
  ) {}

  iniciarSesion() {
    const data = {
      email: this.email,
      password: this.password
    };

    this.api.login(data).subscribe({
      next: (resp: any) => {
        const role = resp.user.role;
        const userId = resp.user.id;

        if (role === 'administrador') {
          this.router.navigate(['/panel-admin']);
        } else if (role === 'paciente') {
          this.router.navigate(['/panel-paciente', userId]);
        } else if (role === 'odontologo') {
          this.router.navigate(['/panel-odontologo']);
        } else if (role === 'auxiliar') {
          this.router.navigate(['/panel-auxiliar']);
        } else {
          alert('Rol no reconocido');
        }
      },
      error: () => {
        alert('Correo o contraseña incorrectos');
      }
    });
  }
}