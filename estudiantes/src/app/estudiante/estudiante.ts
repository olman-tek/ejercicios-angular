import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Estudiante {
  id: number;
  cuenta: string;
  nombre: string;
  carrera: string;
  fechaIngreso: string;
}

@Component({
  selector: 'app-estudiante',
  imports: [],
  templateUrl: './estudiante.html',
  styleUrl: './estudiante.css',
})
export class EstudianteComponent implements OnInit {
  estudiantes: Estudiante[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    if (!localStorage.getItem('sesionEstudiantes')) {
      this.router.navigate(['/login']);
      return;
    }
    this.cargar();
  }

  cargar() {
    const datos = localStorage.getItem('registrosEstudiantes');
    this.estudiantes = datos ? JSON.parse(datos) : [];
  }

  guardarEnStorage() {
    localStorage.setItem('registrosEstudiantes', JSON.stringify(this.estudiantes));
  }

  cerrarSesion() {
    localStorage.removeItem('sesionEstudiantes');
    this.router.navigate(['/login']);
  }
}