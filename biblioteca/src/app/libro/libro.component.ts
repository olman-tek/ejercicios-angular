import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Libro {
  id: number;
  codigo: string;
  titulo: string;
  autor: string;
  anio: number;
}

@Component({
  selector: 'app-libro',
  imports: [FormsModule],
  templateUrl: './libro.component.html',
  styleUrl: './libro.component.css',
})
export class LibroComponent implements OnInit {
  libros: Libro[] = [];

  codigo = '';
  titulo = '';
  autor = '';
  anio: number | null = null;
  error = '';
  idEditando: number | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
    if (!localStorage.getItem('sesionBiblioteca')) {
      this.router.navigate(['/login']);
      return;
    }
    this.cargar();
  }

  cargar() {
    const datos = localStorage.getItem('librosBiblioteca');
    this.libros = datos ? JSON.parse(datos) : [];
  }

  guardarEnStorage() {
    localStorage.setItem('librosBiblioteca', JSON.stringify(this.libros));
  }

  cerrarSesion() {
    localStorage.removeItem('sesionBiblioteca');
    this.router.navigate(['/login']);
  }

  guardar() {
    this.error = '';
    const codigo = this.codigo.trim();
    const titulo = this.titulo.trim();
    const autor = this.autor.trim();

    if (!codigo || !titulo || !autor) {
      this.error = 'Código, título y autor son obligatorios';
      return;
    }
    if (this.anio === null || !Number.isInteger(this.anio) || this.anio < 1000 || this.anio > 9999) {
      this.error = 'El año debe ser un entero de cuatro cifras (1000 a 9999)';
      return;
    }

    if (this.idEditando === null) {
      const nuevoId = this.libros.length ? Math.max(...this.libros.map(l => l.id)) + 1 : 1;
      this.libros.push({ id: nuevoId, codigo, titulo, autor, anio: this.anio });
    } else {
      const i = this.libros.findIndex(l => l.id === this.idEditando);
      if (i !== -1) {
        this.libros[i] = { id: this.idEditando, codigo, titulo, autor, anio: this.anio };
      }
    }
    this.guardarEnStorage();
    this.limpiar();
  }

  editar(libro: Libro) {
    this.idEditando = libro.id;
    this.codigo = libro.codigo;
    this.titulo = libro.titulo;
    this.autor = libro.autor;
    this.anio = libro.anio;
    this.error = '';
  }

  cancelar() {
    this.limpiar();
  }

  eliminar(id: number) {
    if (confirm('¿Seguro que desea eliminar este libro?')) {
      this.libros = this.libros.filter(l => l.id !== id);
      this.guardarEnStorage();
      if (this.idEditando === id) {
        this.limpiar();
      }
    }
  }

  limpiar() {
    this.idEditando = null;
    this.codigo = '';
    this.titulo = '';
    this.autor = '';
    this.anio = null;
    this.error = '';
  }
}