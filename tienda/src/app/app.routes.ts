import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { ProductoComponent } from './producto/producto';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'productos', component: ProductoComponent },
];