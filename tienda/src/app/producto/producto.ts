import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Producto {
  id: number;
  codigo: string;
  nombre: string;
  precio: number;
  existencias: number;
}

@Component({
  selector: 'app-producto',
  imports: [],
  templateUrl: './producto.html',
  styleUrl: './producto.css',
})
export class ProductoComponent implements OnInit {
  productos: Producto[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    if (!localStorage.getItem('sesionTienda')) {
      this.router.navigate(['/login']);
      return;
    }
    this.cargar();
  }

  cargar() {
    const datos = localStorage.getItem('productosTienda');
    this.productos = datos ? JSON.parse(datos) : [];
  }

  guardarEnStorage() {
    localStorage.setItem('productosTienda', JSON.stringify(this.productos));
  }

  cerrarSesion() {
    localStorage.removeItem('sesionTienda');
    this.router.navigate(['/login']);
  }
}