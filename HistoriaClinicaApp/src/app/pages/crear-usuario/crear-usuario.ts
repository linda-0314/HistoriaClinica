import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-usuario',
  imports: [FormsModule],
  templateUrl: './crear-usuario.html',
  styleUrl: './crear-usuario.css'
})
export class CrearUsuario {
  nombre: string = '';
  correo: string = '';
  password: string = '';
  rol: string = '';

  constructor(private router: Router) {}

  guardarUsuario() {
    alert('Usuario creado (solo frontend)');
    console.log({
      nombre: this.nombre,
      correo: this.correo,
      password: this.password,
      rol: this.rol
    });
  }

  volver() {
    this.router.navigate(['/panel-admin']);
  }
}