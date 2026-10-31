import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  usuario = '';
  contrasena = '';
  mensaje = '';

  constructor(private router: Router) {}

  ingresar() {
    if (this.usuario === 'usuario' && this.contrasena === 'tareas123') {
      localStorage.setItem('sesionTareas', 'activa');
      this.router.navigate(['/tareas']);
    } else {
      this.mensaje = 'Usuario o contraseña incorrectos';
    }
  }
}