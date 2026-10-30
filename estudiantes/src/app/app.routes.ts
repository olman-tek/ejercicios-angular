import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { EstudianteComponent } from './estudiante/estudiante';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'estudiantes', component: EstudianteComponent },
];