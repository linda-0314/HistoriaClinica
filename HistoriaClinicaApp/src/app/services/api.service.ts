import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
providedIn: 'root'
})
export class ApiService {
private baseUrl = 'http://127.0.0.1:8000';

constructor(private http: HttpClient) {}

login(data: any) {
    return this.http.post(`${this.baseUrl}/login`, data);
}
loginGoogle(data: any) {
    return this.http.post(`${this.baseUrl}/login/google`, data);
}

crearUsuario(data: any) {
    return this.http.post(`${this.baseUrl}/users`, data);
}

crearPaciente(data: any) {
    return this.http.post(`${this.baseUrl}/pacientes`, data);
}

crearHistoria(data: any) {
    return this.http.post(`${this.baseUrl}/historias`, data);
}

crearConsulta(data: any) {
    return this.http.post(`${this.baseUrl}/consultas`, data);
}

obtenerConsultas() {
    return this.http.get(`${this.baseUrl}/consultas`);
}

obtenerUsuariosPacientes() {
    return this.http.get(`${this.baseUrl}/usuarios-pacientes`);
}

obtenerHistoriaPorPaciente(id: number) {
    return this.http.get(`${this.baseUrl}/historia/paciente/${id}`);
}

actualizarHistoriaClinica(id: number, data: any) {
    return this.http.put(`${this.baseUrl}/historias/${id}`, data);
}
}