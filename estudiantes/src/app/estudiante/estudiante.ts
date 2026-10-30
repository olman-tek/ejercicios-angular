import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
  imports: [FormsModule],
  templateUrl: './estudiante.html',
  styleUrl: './estudiante.css',
})
export class EstudianteComponent implements OnInit {
  estudiantes: Estudiante[] = [];

  cuenta = '';
  nombre = '';
  carrera = '';
  fechaIngreso = '';
  error = '';
  idEditando: number | null = null;

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

  guardar() {
    this.error = '';
    const cuenta = this.cuenta.trim();
    const nombre = this.nombre.trim();
    const carrera = this.carrera.trim();
    const fechaIngreso = this.fechaIngreso;

    if (!cuenta || !nombre || !carrera) {
      this.error = 'Cuenta, nombre y carrera son obligatorios';
      return;
    }
    if (!fechaIngreso) {
      this.error = 'La fecha de ingreso es obligatoria';
      return;
    }

    if (this.idEditando === null) {
      const nuevoId = this.estudiantes.length ? Math.max(...this.estudiantes.map(e => e.id)) + 1 : 1;
      this.estudiantes.push({ id: nuevoId, cuenta, nombre, carrera, fechaIngreso });
    } else {
      const i = this.estudiantes.findIndex(e => e.id === this.idEditando);
      if (i !== -1) {
        this.estudiantes[i] = { id: this.idEditando, cuenta, nombre, carrera, fechaIngreso };
      }
    }
    this.guardarEnStorage();
    this.limpiar();
  }

  editar(estudiante: Estudiante) {
    this.idEditando = estudiante.id;
    this.cuenta = estudiante.cuenta;
    this.nombre = estudiante.nombre;
    this.carrera = estudiante.carrera;
    this.fechaIngreso = estudiante.fechaIngreso;
    this.error = '';
  }

  cancelar() {
    this.limpiar();
  }

  limpiar() {
    this.idEditando = null;
    this.cuenta = '';
    this.nombre = '';
    this.carrera = '';
    this.fechaIngreso = '';
    this.error = '';
  }
}