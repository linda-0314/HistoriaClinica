import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panel-admin',
  templateUrl: './panel-admin.html',
  styleUrl: './panel-admin.css'
})
export class PanelAdmin {
  constructor(private router: Router) {}

  crearUsuario() {
    this.router.navigate(['/crear-usuario']);
  }

  verUsuarios() {
    this.router.navigate(['/ver-roles']);
  }

  cerrarSesion() {
    this.router.navigate(['/']);
  }
}