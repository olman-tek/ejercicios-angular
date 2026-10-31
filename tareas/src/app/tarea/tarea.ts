import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
  fechaLimite: string;
  estado: string;
}

@Component({
  selector: 'app-tarea',
  imports: [FormsModule],
  templateUrl: './tarea.html',
  styleUrl: './tarea.css',
})
export class TareaComponent implements OnInit {
  tareas: Tarea[] = [];

  titulo = '';
  descripcion = '';
  fechaLimite = '';
  estado = 'Pendiente';
  error = '';
  idEditando: number | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
    if (!localStorage.getItem('sesionTareas')) {
      this.router.navigate(['/login']);
      return;
    }
    this.cargar();
  }

  cargar() {
    const datos = localStorage.getItem('agendaTareas');
    this.tareas = datos ? JSON.parse(datos) : [];
  }

  guardarEnStorage() {
    localStorage.setItem('agendaTareas', JSON.stringify(this.tareas));
  }

  cerrarSesion() {
    localStorage.removeItem('sesionTareas');
    this.router.navigate(['/login']);
  }

  guardar() {
    this.error = '';
    const titulo = this.titulo.trim();
    const descripcion = this.descripcion.trim();
    const fechaLimite = this.fechaLimite;
    const estado = this.estado;

    if (!titulo || !descripcion) {
      this.error = 'Título y descripción son obligatorios';
      return;
    }
    if (!fechaLimite) {
      this.error = 'La fecha límite es obligatoria';
      return;
    }
    if (estado !== 'Pendiente' && estado !== 'Completada') {
      this.error = 'El estado debe ser Pendiente o Completada';
      return;
    }

    if (this.idEditando === null) {
      const nuevoId = this.tareas.length ? Math.max(...this.tareas.map(t => t.id)) + 1 : 1;
      this.tareas.push({ id: nuevoId, titulo, descripcion, fechaLimite, estado });
    } else {
      const i = this.tareas.findIndex(t => t.id === this.idEditando);
      if (i !== -1) {
        this.tareas[i] = { id: this.idEditando, titulo, descripcion, fechaLimite, estado };
      }
    }
    this.guardarEnStorage();
    this.limpiar();
  }

  editar(tarea: Tarea) {
    this.idEditando = tarea.id;
    this.titulo = tarea.titulo;
    this.descripcion = tarea.descripcion;
    this.fechaLimite = tarea.fechaLimite;
    this.estado = tarea.estado;
    this.error = '';
  }

  cancelar() {
    this.limpiar();
  }

  eliminar(id: number) {
    if (confirm('¿Seguro que desea eliminar esta tarea?')) {
      this.tareas = this.tareas.filter(t => t.id !== id);
      this.guardarEnStorage();
      if (this.idEditando === id) {
        this.limpiar();
      }
    }
  }

  limpiar() {
    this.idEditando = null;
    this.titulo = '';
    this.descripcion = '';
    this.fechaLimite = '';
    this.estado = 'Pendiente';
    this.error = '';
  }
}