import { Component, OnInit } from '@angular/core';
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
  imports: [],
  templateUrl: './mascota.html',
  styleUrl: './mascota.css',
})
export class MascotaComponent implements OnInit {
  mascotas: Mascota[] = [];

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
}