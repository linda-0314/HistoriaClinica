import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { PanelAdmin } from './pages/panel-admin/panel-admin';
import { CrearUsuario } from './pages/crear-usuario/crear-usuario';
import { VerRoles } from './pages/ver-roles/ver-roles';
import { PanelPaciente } from './pages/panel-paciente/panel-paciente';
import { PanelOdontologo } from './pages/panel-odontologo/panel-odontologo';
import { PanelAuxiliar } from './pages/panel-auxiliar/panel-auxiliar';

export const routes: Routes = [
{ path: '', component: Login },
{ path: 'panel-admin', component: PanelAdmin },
{ path: 'crear-usuario', component: CrearUsuario },
{ path: 'ver-roles', component: VerRoles },
{ path: 'panel-paciente/:id', component: PanelPaciente },
{ path: 'panel-odontologo', component: PanelOdontologo },
{ path: 'panel-auxiliar', component: PanelAuxiliar }
];