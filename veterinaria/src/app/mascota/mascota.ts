import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Mascota {
  id: number;
  nombre: string;
  especie: string;
  edad: number;
  propietario: string;
}

@Component({
  selector: 'app-mascota',
  imports: [FormsModule],
  templateUrl: './mascota.html',
  styleUrl: './mascota.css',
})
export class MascotaComponent implements OnInit {
  mascotas: Mascota[] = [];

  nombre = '';
  especie = '';
  edad: number | null = null;
  propietario = '';
  error = '';
  idEditando: number | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
    if (!localStorage.getItem('sesionVeterinaria')) {
      this.router.navigate(['/login']);
      return;
    }
    this.cargar();
  }

  cargar() {
    const datos = localStorage.getItem('mascotasVeterinaria');
    this.mascotas = datos ? JSON.parse(datos) : [];
  }

  guardarEnStorage() {
    localStorage.setItem('mascotasVeterinaria', JSON.stringify(this.mascotas));
  }

  cerrarSesion() {
    localStorage.removeItem('sesionVeterinaria');
    this.router.navigate(['/login']);
  }

  guardar() {
    this.error = '';
    const nombre = this.nombre.trim();
    const especie = this.especie.trim();
    const propietario = this.propietario.trim();

    if (!nombre || !especie || !propietario) {
      this.error = 'Nombre, especie y propietario son obligatorios';
      return;
    }
    if (this.edad === null || !Number.isInteger(this.edad) || this.edad < 0) {
      this.error = 'La edad debe ser un entero mayor o igual que cero';
      return;
    }

    if (this.idEditando === null) {
      const nuevoId = this.mascotas.length ? Math.max(...this.mascotas.map(m => m.id)) + 1 : 1;
      this.mascotas.push({ id: nuevoId, nombre, especie, edad: this.edad, propietario });
    } else {
      const i = this.mascotas.findIndex(m => m.id === this.idEditando);
      if (i !== -1) {
        this.mascotas[i] = { id: this.idEditando, nombre, especie, edad: this.edad, propietario };
      }
    }
    this.guardarEnStorage();
    this.limpiar();
  }

  editar(mascota: Mascota) {
    this.idEditando = mascota.id;
    this.nombre = mascota.nombre;
    this.especie = mascota.especie;
    this.edad = mascota.edad;
    this.propietario = mascota.propietario;
    this.error = '';
  }

  cancelar() {
    this.limpiar();
  }

  limpiar() {
    this.idEditando = null;
    this.nombre = '';
    this.especie = '';
    this.edad = null;
    this.propietario = '';
    this.error = '';
  }
}