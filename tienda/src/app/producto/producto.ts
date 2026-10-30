import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
  imports: [FormsModule],
  templateUrl: './producto.html',
  styleUrl: './producto.css',
})
export class ProductoComponent implements OnInit {
  productos: Producto[] = [];

  codigo = '';
  nombre = '';
  precio: number | null = null;
  existencias: number | null = null;
  error = '';
  idEditando: number | null = null;

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

  guardar() {
    this.error = '';
    const codigo = this.codigo.trim();
    const nombre = this.nombre.trim();

    if (!codigo || !nombre) {
      this.error = 'Código y nombre son obligatorios';
      return;
    }
    if (this.precio === null || this.precio <= 0) {
      this.error = 'El precio debe ser mayor que cero';
      return;
    }
    if (this.existencias === null || !Number.isInteger(this.existencias) || this.existencias < 0) {
      this.error = 'Las existencias deben ser un entero mayor o igual que cero';
      return;
    }

    if (this.idEditando === null) {
      const nuevoId = this.productos.length ? Math.max(...this.productos.map(p => p.id)) + 1 : 1;
      this.productos.push({ id: nuevoId, codigo, nombre, precio: this.precio, existencias: this.existencias });
    } else {
      const i = this.productos.findIndex(p => p.id === this.idEditando);
      if (i !== -1) {
        this.productos[i] = { id: this.idEditando, codigo, nombre, precio: this.precio, existencias: this.existencias };
      }
    }
    this.guardarEnStorage();
    this.limpiar();
  }

  editar(producto: Producto) {
    this.idEditando = producto.id;
    this.codigo = producto.codigo;
    this.nombre = producto.nombre;
    this.precio = producto.precio;
    this.existencias = producto.existencias;
    this.error = '';
  }

  cancelar() {
    this.limpiar();
  }

  eliminar(id: number) {
    if (confirm('¿Seguro que desea eliminar este producto?')) {
      this.productos = this.productos.filter(p => p.id !== id);
      this.guardarEnStorage();
      if (this.idEditando === id) {
        this.limpiar();
      }
    }
  }

  limpiar() {
    this.idEditando = null;
    this.codigo = '';
    this.nombre = '';
    this.precio = null;
    this.existencias = null;
    this.error = '';
  }
}